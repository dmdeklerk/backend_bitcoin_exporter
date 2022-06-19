const path = require('path');
const { readdir, stat } = require('fs/promises');

const dirSize = async directory => {
  const files = await readdir( directory );
  const stats = files.map( file => stat( path.join( directory, file ) ) );

  return ( await Promise.all( stats ) ).reduce( ( accumulator, { size } ) => accumulator + size, 0 );
}

module.exports = { dirSize }