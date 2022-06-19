const commander = require('commander');

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-p, --port <port>', 'Port to run exporter on', '9236')
  .option('-r, --rpcurl', 'JSON RPC url to connect to ethereum backend', 'http://localhost:8136')
  .option('-d, --dir', 'Directory where blockchain is stored', '/opt/coins/data/ethereum/backend/')
  .parse(process.argv);

const options = commander.opts();

console.log('options', options)

module.exports = {
  port: options.port,
  rpcurl: options.rpcurl,
  dir: options.dir
}