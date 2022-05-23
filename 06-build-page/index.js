const fs = require('fs');
const path = require('path');
const {readdir} = require('fs/promises');
const fsPromises = fs.promises;
let data = '';


(async function createFoldersAndFiles() {
  try {
    await fsPromises.rm(path.join(__dirname, 'project-dist'), { force: true, recursive: true });
  await fsPromises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
  await fsPromises.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true });
  await fsPromises.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
    if(err) throw err;
  });
  await fsPromises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', (err) => {
    if(err) throw err;
  });
  createBundle();
  copy(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
} catch (err) {
  console.error(err);
} 
})();




async function createBundle() {
  try {
  const files = await readdir(path.join(__dirname,'styles'), {withFileTypes: true});
  for (let elem of files) {
    if (path.extname(path.join(__dirname, 'styles', elem.name))==='.css') {
      const input = fs.createReadStream(path.join(__dirname,'styles', elem.name));
      const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

      input.on('data', chunk => data += chunk);
      input.on('end', () => output.write(data));
    }
  }
  
} catch (err) {
  console.error(err);
} 
};


async function copy(directory, copyDirectory) {
  try {
  const files = await readdir(path.join(directory), {withFileTypes: true});
  for (let elem of files) {
    if (elem.isFile()) {
      fs.copyFile(path.join(directory,elem.name), path.join(copyDirectory,elem.name), (err) => {
        if(err) throw err;
      });
    } else {
      await fsPromises.mkdir(path.join(copyDirectory,elem.name), { recursive: true });
      await copy(path.join(directory,elem.name),path.join(copyDirectory,elem.name))
    }
  }
} catch (err) {
  console.error(err);
} 
};

