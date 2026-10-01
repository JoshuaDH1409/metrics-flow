// Mock Database / Metrics Repository
const WORKSPACES_DATA = {
  growth: {
    id: "growth",
    title: "Agencia Growth Media Latam",
    description: "Indicadores consolidados de ingresos, margen operativo y rendimiento por canal.",
    sync: "PostgreSQL: Sincronizado hace 2 min",
    kpis: {
      v1: "$48,250 USD", b1: "+18.4%",
      v2: "$42.10 USD", b2: "-12.8%",
      v3: "128 Cuentas", b3: "+9.4%",
      v4: "68.4%", b4: "+3.1%"
    },
    aiBullets: [
      "El volumen de cierre superó la proyección mensual por $14,200 USD debido a la consolidación de clientes retenidos con ticket alto.",
      "El costo unitario disminuyó a $42.10 USD mediante la reasignación de partidas presupuestales a canales de conversión directa.",
      "Fidelizar el 15% de cuentas con contratos en renovación en los próximos 14 días para asegurar un flujo constante en Q4."
    ],
    trendLabels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    incomeData: [32000, 38500, 42000, 48250],
    costData: [12000, 13100, 14200, 15200],
    channelLabels: ["Google Ads", "Meta Business", "LinkedIn B2B", "Cuentas Directas"],
    channelData: [45, 25, 20, 10],
    records: [
      { id: "GM-9021", client: "Fintech Klar MX", service: "Estrategia B2B & Adquisición", amount: "$12,400 USD", status: "Pagado", date: "01 Oct 2026" },
      { id: "GM-9022", client: "Comercio Electrónico MX", service: "Auditoría de Conversión", amount: "$4,500 USD", status: "Pagado", date: "29 Sep 2026" },
      { id: "GM-9023", client: "SaaS Logística Urbana", service: "Campaña de Performance", amount: "$8,900 USD", status: "En Proceso", date: "28 Sep 2026" },
      { id: "GM-9024", client: "Despacho Legal Corporativo", service: "Portal Institucional Astro", amount: "$3,200 USD", status: "Pagado", date: "27 Sep 2026" },
      { id: "GM-9025", client: "Consultoría de Talento", service: "Estructura de Captación", amount: "$6,100 USD", status: "Pendiente", date: "26 Sep 2026" },
      { id: "GM-9026", client: "Cadena Comercial Norte", service: "Retargeting Multicanal", amount: "$13,150 USD", status: "Pagado", date: "25 Sep 2026" },
    ]
  }
};

function getWorkspaces(req, res) {
  const list = Object.keys(WORKSPACES_DATA).map(key => ({
    id: key,
    title: WORKSPACES_DATA[key].title,
    description: WORKSPACES_DATA[key].description
  }));
  res.json({ workspaces: list });
}

function getMetrics(req, res) {
  const workspaceId = req.params.id;
  const data = WORKSPACES_DATA[workspaceId] || WORKSPACES_DATA['growth'];
  res.json({ success: true, workspace: data });
}

module.exports = { getWorkspaces, getMetrics };
