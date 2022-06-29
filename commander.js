const commander = require('commander');

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-p, --port <port>', 'Port to run exporter on', '9237')
  .option('-h, --host <host>', 'RPC host', 'localhost')
  .option('-u, --user <user>', 'RPC user', 'rpc')
  .option('-p, --pass <pass>', 'RPC pass', 'rpc')
  .option('-r, --rpcport <rpcport>', 'RPC port', '8030')
  .option('-d, --dir <dir>', 'Directory where blockchain is stored', '/opt/coins/data/bitcoin/backend')
  .parse(process.argv);

const options = commander.opts();

console.log('Starting backend_bitcoin_exporter...', options)

module.exports = {
  port: options.port,
  host: options.host,
  user: options.user,
  pass: options.pass,
  rpcport: options.rpcport
}