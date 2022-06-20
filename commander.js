const commander = require('commander');

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-p, --port <port>', 'Port to run exporter on', '9236')
  .option('-r, --rpcurl <rpcurl>', 'JSON RPC url to connect to ethereum backend', 'http://localhost:8136')
  .option('-d, --dir <dir>', 'Directory where blockchain is stored', '/opt/coins/data/ethereum/backend/')
  .option('-g, --geth <geth>', 'Geth binary', '/opt/coins/nodes/ethereum/geth')
  .option('-i, --ipcdir <ipcdir>', 'Directory where geth.ipc file is located', '/opt/coins/data/ethereum/backend/')
  .parse(process.argv);

const options = commander.opts();

console.log('Starting backend_ethereum_exporter...', options)

module.exports = {
  port: options.port,
  rpcurl: options.rpcurl,
  dir: options.dir,
  geth: options.geth,
  ipcdir: options.ipcdir
}