const fs = require('fs');
const path = require('path');
const {readdir} = require('fs/promises');
const fsPromises = fs.promises;

/*if (path.join(__dirname, 'files-copy')) {
  fs.rmdir(path.join(__dirname, 'files-copy'), (err) => {
    if(err) throw err;
  });
};*/

/*fs.mkdir(path.join(__dirname, 'files-copy'), {recursive:true}, (err) => {
  if(err) throw err;
});*/

(async function copy() {
  try {
    await fsPromises.rm(path.join(__dirname, 'files-copy'), { force: true, recursive: true });
  await fsPromises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
  const files = await readdir(path.join(__dirname,'files'), {withFileTypes: true});
  for (let elem of files) {
    if (elem.isFile()) {
      fs.copyFile(path.join(__dirname, 'files',elem.name), path.join(__dirname, 'files-copy',elem.name), (err) => {
        if(err) throw err;
      });
    }
  }
  const copyFiles = await readdir(path.join(__dirname,'files-copy'), {withFileTypes: true});
 /* for (let elem of copyFiles) {
    if (!files.includes(elem)) {
      fs.unlink(path.join(__dirname, 'files-copy',elem.name), (err) => {
        if(err) throw err;
      });
    }
  }*/
} catch (err) {
  console.error(err);
} 
})();



