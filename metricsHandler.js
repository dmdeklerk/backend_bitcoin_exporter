const { register } = require("prom-client");
const options = require("./commander");
const { dirSize } = require('./utils')
const ethers = require("ethers");
const {
  latestBlockHeightMetric,
  latestBlockIdMetric,
  latestBlockTimestampMetric,
  latestBlockTransactionCountMetric,
  blockchainSizeOnDiskBytesMetric,
} = require("./metrics");

const metricsHandler = async (req, res) => {
  res.set("Content-Type", register.contentType);

  const provider = new ethers.providers.JsonRpcProvider(options.rpcurl);
  const blockNumberPromise = provider.getBlockNumber().then((number) => {
    latestBlockHeightMetric.set(number);

    return provider.getBlock(number).then((block) => {
      latestBlockIdMetric.set(block.hash);
      latestBlockTimestampMetric.set(block.timestamp);
      latestBlockTransactionCountMetric.set(block.transactions.length);
    });
  });

  const sizeOnDiskPromise = dirSize(options.dir).then((size) => {
    blockchainSizeOnDiskBytesMetric.set(size);
  });

  Promise.all([blockNumberPromise, sizeOnDiskPromise])
    .then(() => res.end(register.metrics()))
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
