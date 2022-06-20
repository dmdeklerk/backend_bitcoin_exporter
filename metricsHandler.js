const { register } = require("prom-client");
const options = require("./commander");
const { dirSize, execCmd } = require("./utils");
const { providers, BigNumber } = require("ethers");
const {
  latestBlockHeightMetric,
  latestBlockTimestampMetric,
  latestBlockTransactionCountMetric,
  blockchainSizeOnDiskBytesMetric,
  syncingHighestBlockMetric,
  syncingCurrentBlockMetric,
  syncingSyncedAccountsMetric,
} = require("./metrics");

const metricsHandler = async (req, res) => {
  res.set("Content-Type", register.contentType);

  const provider = new providers.JsonRpcProvider(options.rpcurl);
  const blockNumberPromise = provider.getBlockNumber().then((blockNumber) => {
    const number = BigNumber.from(blockNumber).toNumber();
    latestBlockHeightMetric.set(number);

    return provider.getBlock(number).then((block) => {
      latestBlockTimestampMetric.set(block.timestamp);
      latestBlockTransactionCountMetric.set(block.transactions.length);
    });
  });

  const sizeOnDiskPromise = dirSize(options.dir).then((size) => {
    blockchainSizeOnDiskBytesMetric.set(size);
  });

  const command = `${options.geth} attach --datadir ${options.ipcdir} --exec 'JSON.stringify(web3.eth.syncing)'`;
  const ipcSyncingPromise = execCmd(command).then((output) => {
    
    console.log('output 1', { output, typeof: typeof output })
    const data = JSON.parse(output);
    console.log('output 2', { data, typeof: typeof data })

    if (typeof data == "object") {
      const { currentBlock, highestBlock, syncedAccounts } = data;
      syncingHighestBlockMetric.set(highestBlock);
      syncingCurrentBlockMetric.set(currentBlock);
      syncingSyncedAccountsMetric.set(syncedAccounts);
    }
  });

  Promise.all([blockNumberPromise, sizeOnDiskPromise, ipcSyncingPromise])
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
