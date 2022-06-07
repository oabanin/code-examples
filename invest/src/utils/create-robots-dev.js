const fs = require('fs');
const path = require('path');

const content = 'User-agent: *\nDisallow: /';

fs.writeFile(`${process.cwd()}/public/robots.txt`, content, (err) => {
  if (err) {
    console.error(err);
  }
});
