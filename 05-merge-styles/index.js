const fs = require('fs');
const path = require('path');
const {readdir} = require('fs/promises');
const fsPromises = fs.promises;
let data = '';


(async function createBundle() {
  try {
    await fsPromises.rm(path.join(__dirname, 'project-dist','bundle.css'), { force: true, recursive: true });
  await fsPromises.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
    if(err) throw err;
  });
  const files = await readdir(path.join(__dirname,'styles'), {withFileTypes: true});
  for (let elem of files) {
    if (path.extname(path.join(__dirname, 'project-dist', elem.name))==='.css') {
      const input = fs.createReadStream(path.join(__dirname,'styles', elem.name));
      const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

      input.on('data', chunk => data += chunk);
      input.on('end', () => output.write(data));
    }
  }
  
} catch (err) {
  console.error(err);
} 
})();





