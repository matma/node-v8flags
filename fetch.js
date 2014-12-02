const fs = require('fs');
const path = require('path');

const version = process.versions.v8;
const tmpfile = path.join(__dirname, version+'.flags.json');
const flagsFile = path.join(__dirname, 'flags.temp');

if (!fs.existsSync(tmpfile)) {
  fs.readFile( flagsFile, function( execErr, result) {
    var flags;
    if (execErr) {
      throw new Error(execErr);
    } else {
      flags = result.toString().match(/\s\s--(\w+)/gm).map(function (match) {
        return match.substring(2);
      });
      fs.writeFile(tmpfile, JSON.stringify(flags), { encoding:'utf8' },
        function (writeErr) {
          if (writeErr) {
            throw new Error(writeErr);
          } else {
            console.log('flags for v8 '+version+' cached.');
          }
        }
      );
    }
  });
}

module.exports = require.bind(null, tmpfile);
