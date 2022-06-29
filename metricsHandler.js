const { register } = require("prom-client");
const options = require("./commander");
const { dirSize } = require("./utils");
const Client = require('bitcoin-core');
const {
  totalBlocksMetric,
  totalHeadersMetric,
  totalProgressPercentageMetric,
  blockchainSizeOnDiskBytesMetric,
} = require("./metrics");
const client = new Client({ 
  host: options.host, 
  username: options.user, 
  password: options.pass, 
  port: options.rpcport 
});  

const metricsHandler = async (req, res) => {
  res.set("Content-Type", register.contentType);

  const blockchainInfoPromise = client.getBlockchainInfo().then((data) => {
    totalBlocksMetric.set(data.blocks)
    totalHeadersMetric.set(data.headers)
    const percentage = parseFloat(data.verificationprogress) * 100
    totalProgressPercentageMetric.set(percentage)
  });

  const sizeOnDiskPromise = dirSize(options.dir).then((size) => {
    blockchainSizeOnDiskBytesMetric.set(size);
  });

  Promise.all([blockchainInfoPromise, sizeOnDiskPromise])
    .then(() =>
      register.metrics().then((metrics) => {
        res.end(metrics);
      })
    )
    .catch((error) => {
      console.error(error);

      let code = 500;
      if (error.code === -28) {
        code = 503;
      } else if (error.code === 403) {
        code = 403;
      }

      return res.status(code).send(`# ${error.message}\n`);
    });
};

module.exports = metricsHandler;
