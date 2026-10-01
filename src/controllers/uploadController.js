const db = require('../config/db');
const { parseCSV } = require('../services/csvParser');
const fs = require('fs');

async function uploadCSV(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Default tenant for MVP purposes. Real app would extract from JWT.
    // Ensure this tenant exists or use a robust seed process.
    let tenantId = '00000000-0000-0000-0000-000000000000'; 
    try {
        const tenantResult = await db.query('SELECT id FROM tenants LIMIT 1');
        if (tenantResult.rows.length > 0) {
            tenantId = tenantResult.rows[0].id;
        }
    } catch(e) {
        console.log("No tenants table or empty, will skip DB insertion if missing schema");
    }

    const records = await parseCSV(req.file.path);
    
    let insertedCount = 0;
    for (const record of records) {
      // Validate expected columns: folio, cliente, concepto, monto, estado, fecha
      const { folio, cliente, concepto, monto, estado, fecha } = record;
      
      if (!folio || !cliente || !monto) continue;

      // Clean amount (remove $, commas)
      const cleanAmount = parseFloat(monto.toString().replace(/[^0-9.-]+/g, ''));
      
      // Parse date gracefully (assume YYYY-MM-DD or use current date)
      let parsedDate = null;
      if (fecha) {
         const d = new Date(fecha);
         if (!isNaN(d.valueOf())) {
             parsedDate = d.toISOString().split('T')[0];
         }
      }

      // Allowed statuses: 'Pagado', 'Pendiente', 'En Proceso'
      const validStatuses = ['Pagado', 'Pendiente', 'En Proceso'];
      const status = validStatuses.includes(estado) ? estado : 'Pendiente';

      try {
        await db.query(`
          INSERT INTO transactions (tenant_id, folio, client_name, service_concept, amount, status, date)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (tenant_id, folio) DO UPDATE 
          SET client_name = EXCLUDED.client_name,
              service_concept = EXCLUDED.service_concept,
              amount = EXCLUDED.amount,
              status = EXCLUDED.status,
              date = EXCLUDED.date
        `, [tenantId, folio, cliente, concepto, cleanAmount, status, parsedDate]);
        insertedCount++;
      } catch (dbErr) {
        console.error('Failed to insert row', dbErr);
        // Continue with other rows
      }
    }

    // Clean up file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      message: `Archivo procesado. ${insertedCount} transacciones importadas.`,
      count: insertedCount
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { uploadCSV };
