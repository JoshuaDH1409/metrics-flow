require('dotenv').config();
const http = require('http');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

// Create and export server
const server = http.createServer(app);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`[MetricsFlow Server] Running on http://localhost:${PORT}`);
  });
}

module.exports = server;
