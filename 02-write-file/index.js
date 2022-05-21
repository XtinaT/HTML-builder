const fs = require('fs');
const path = require('path');
const {stdout, stdin} = process;

fs.writeFile(path.join(__dirname, 'text.txt'), '', (err) => {
  if(err) throw err;
});

const ws = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Hello, friend! Print something!\n');

process.on('SIGINT', () => {
  stdout.write('Bye, friend!\n');
  process.exit();
});

stdin.on('data', (data) => {
  if (data.toString().trim()==='exit') {
    stdout.write('Bye, friend!\n');
    process.exit();
  }
  ws.write(data);
})