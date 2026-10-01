const csv = require('csv-parser');
const fs = require('fs');

/**
 * Parses a CSV file and returns a promise with the array of records.
 * @param {string} filePath - The path to the uploaded CSV file.
 * @returns {Promise<Array>} - Array of objects representing the rows.
 */
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

module.exports = { parseCSV };
