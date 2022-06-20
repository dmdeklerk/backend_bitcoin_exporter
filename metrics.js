const { Gauge } = require('prom-client');

const protocolVersionMetric = new Gauge({
  name: 'backend_ethereum_protocol_version',
  help: 'The client protocol version',
});

const latestBlockHeightMetric = new Gauge({
    name: 'backend_ethereum_latest_block_height',
    help: 'The latest block height or index',
});

const latestBlockTimestampMetric = new Gauge({
  name: 'backend_ethereum_latest_block_timestamp',
  help: 'The latest block timestamp',
});

const latestBlockTransactionCountMetric = new Gauge({
  name: 'backend_ethereum_latest_block_transaction_count',
  help: 'Number of transactions in latest block',
});

const blockchainSizeOnDiskBytesMetric = new Gauge({
  name: 'backend_ethereum_blockchain_size_on_disk_bytes',
  help: 'Blockchain size on disk in bytes',
});

const syncingHighestBlockMetric = new Gauge({
  name: 'backend_ethereum_syncing_highest_block',
  help: 'The highest block reported by syncing',
});

const syncingCurrentBlockMetric = new Gauge({
  name: 'backend_ethereum_syncing_current_block',
  help: 'The current block reported by syncing',
});

const syncingSyncedAccountsMetric = new Gauge({
  name: 'backend_ethereum_syncing_synced_accounts',
  help: 'The synced accounts reported by syncing',
});

module.exports = {
  latestBlockHeightMetric,
  latestBlockTimestampMetric,
  latestBlockTransactionCountMetric,
  blockchainSizeOnDiskBytesMetric,
  syncingHighestBlockMetric,
  syncingCurrentBlockMetric,
  syncingSyncedAccountsMetric,
}