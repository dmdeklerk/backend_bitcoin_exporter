const path = require('path');
const {promises} = require('fs');
const { readdir, stat } = promises

const dirSize = async directory => {
  const files = await readdir( directory );
  const stats = files.map( file => stat( path.join( directory, file ) ) );

  return ( await Promise.all( stats ) ).reduce( ( accumulator, { size } ) => accumulator + size, 0 );
}

module.exports = { dirSize }