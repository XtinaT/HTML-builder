const fs = require('fs');
const path = require('path');
const {readdir} = require('fs/promises');
const fsPromises = fs.promises;

copy('files', 'files-copy');

async function copy(directory, copyDirectory) {
  try {
    await fsPromises.rm(path.join(__dirname, copyDirectory), { force: true, recursive: true });
  await fsPromises.mkdir(path.join(__dirname, copyDirectory), { recursive: true });
  const files = await readdir(path.join(__dirname,directory), {withFileTypes: true});
  for (let elem of files) {
    if (elem.isFile()) {
      fs.copyFile(path.join(__dirname, directory,elem.name), path.join(__dirname, copyDirectory,elem.name), (err) => {
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



