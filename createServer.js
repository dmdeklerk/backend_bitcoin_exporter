const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const options = require('./commander')

const createServer = (metricsHandler) => {
  const port = options.port;
  const app = express();

  app.use(compression());
  app.use(helmet());
  app.get("/metrics", metricsHandler);

  app.use((req, res) => {
    console.warn(`Requested URL ${req.url} resulted in a 404 not found error.`);
    res.status(404).send("# This metric doesn't exists\n");
  });

  app.listen(port, () =>
    console.info(
      `Backend Bitcoin Exporter started on http://localhost:${port}`
    )
  );

  process.on("SIGINT", () => {
    console.info(`Wallet exporter gracefully shut down from SIGINT (Ctrl-C)`);
    process.exit(0);
  });

  return app;
};

module.exports = createServer;
