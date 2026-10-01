const ai = require('../config/gemini');

/**
 * Generates executive insights based on metrics.
 * @param {Object} metrics - Data containing revenue, costs, etc.
 * @returns {Promise<Array<string>>} - Array of 3 bullet points.
 */
async function generateExecutiveInsights(metrics) {
  if (!ai) {
    // Deterministic fallback if API key is not configured
    return [
      `Análisis de Ingresos: El ingreso bruto alcanzó $${metrics.income || 'N/A'}, reflejando estabilidad.`,
      `Eficiencia de Costos: Los costos operativos se mantuvieron bajo control en un ${metrics.margin || 'N/A'}% de margen.`,
      `Recomendación Estratégica: Priorizar retención de cuentas clave para mantener previsibilidad financiera.`
    ];
  }

  const prompt = `
Eres un analista financiero B2B de alto nivel.
Basado en los siguientes datos financieros:
${JSON.stringify(metrics, null, 2)}

Genera exactamente 3 conclusiones ejecutivas en formato JSON.
El JSON debe ser un arreglo de strings, sin Markdown adicional, solo el arreglo puro. Ejemplo: ["conclusion 1", "conclusion 2", "conclusion 3"].
Las conclusiones deben cubrir:
1) Análisis de ingresos.
2) Eficiencia de costos.
3) Recomendación estratégica accionable.
`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
    });
    
    const text = response.text;
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.length >= 3) {
        return parsed.slice(0, 3);
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', text);
    }
    
    // Fallback if parsing fails or invalid format
    return [
      "No se pudo generar un análisis de ingresos válido.",
      "Revisar configuración de eficiencia de costos.",
      "Recomendación: Verificar los datos de entrada para la IA."
    ];
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate insights');
  }
}

module.exports = { generateExecutiveInsights };
