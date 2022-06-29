const { Gauge } = require('prom-client');

const totalBlocksMetric = new Gauge({
  name: 'backend_bitcoin_total_blocks',
  help: 'Number of blocks',
});
const totalHeadersMetric = new Gauge({
  name: 'backend_bitcoin_total_headers',
  help: 'Number of headers',
});
const totalProgressPercentageMetric = new Gauge({
  name: 'backend_bitcoin_total_progress_percentage',
  help: 'Percentage of sync completion',
});

const blockchainSizeOnDiskBytesMetric = new Gauge({
  name: 'backend_bitcoin_blockchain_size_on_disk_bytes',
  help: 'Blockchain size on disk in bytes',
});

module.exports = {
  totalBlocksMetric,
  totalHeadersMetric,
  totalProgressPercentageMetric,
  blockchainSizeOnDiskBytesMetric,
}