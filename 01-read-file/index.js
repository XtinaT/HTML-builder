const fs = require('fs');
const path = require('path');
const {stdout} = process;
const rs = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
rs.on('data', chunk => stdout.write(chunk));