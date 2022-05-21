const path = require('path');
const fs = require('fs/promises');
const {readdir} = require('fs/promises');

(async function() {
  try {
  const files = await readdir(path.join(__dirname,'secret-folder'), {withFileTypes: true});
  for (let elem of files) {
    if (elem.isFile()) {
      const stat = await fs.stat(path.join(__dirname, 'secret-folder', elem.name));
      console.log(`${path.parse(path.join(__dirname, 'secret-folder', elem.name)).name} - ${path.extname(path.join(__dirname, 'secret-folder', elem.name))} - ${stat.size}`);
    }
  }
  
} catch (err) {
  console.error(err);
} 
})();
