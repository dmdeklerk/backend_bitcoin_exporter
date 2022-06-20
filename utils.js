const path = require('path');
const {promises} = require('fs');
const { readdir, stat } = promises
const { exec } = require('child_process')

const dirSize = async directory => {
  const files = await readdir( directory );
  const stats = files.map( file => stat( path.join( directory, file ) ) );

  return ( await Promise.all( stats ) ).reduce( ( accumulator, { size } ) => accumulator + size, 0 );
}

const execCmd = command => {
  return new Promise((resolve,reject) => {
    exec(command, (err,output) => {
      console.log('execCmd',{command,err,output})
      if (err) {
        reject(err)
      }
      else {
        resolve(output)
      }
    })
  })
}

module.exports = { dirSize, execCmd }