const fs = require('fs');
const https = require('https');
const path = require('path');

const buildStartTime = fs.readFileSync('./buildStartTime.txt', 'utf8').trim();
const buildEndTime = fs.readFileSync('./buildEndTime.txt', 'utf8').trim();
const nodeModulesSize = fs.readFileSync('./nodeModulesSize.txt', 'utf8').trim();
const commitId = fs.readFileSync('./commitId.txt', 'utf8').trim();
const buildId = fs.readFileSync('./buildId.txt', 'utf8').trim();

(async () => {

  const allDistFiles = getAllFileStats('./dist');

  const data = {
    type: 'WEB', // todo: implement different types
    buildStartTime: buildStartTime,
    buildEndTime: buildEndTime,
    buildSize: allDistFiles.reduce((previousValue, currentValue) => currentValue.size + previousValue, 0),
    nodeModulesSize: nodeModulesSize,
    commitId: commitId,
    buildId: buildId,
    filesCount: allDistFiles.length,
  };

  const response = await sendRequest(data);
  console.log(response);

})();

function getAllFileStats(basePath) {
  const dirsToCheck = [{dirPath: basePath, files: fs.readdirSync(basePath)}];

  const allFiles = [];

  while (dirsToCheck.length > 0) {

    const currentDir = dirsToCheck.pop();

    for (const fileName of currentDir.files) {
      const filePath = path.join(currentDir.dirPath, fileName);
      const stat = fs.lstatSync(filePath);

      if (stat.isFile()) {
        allFiles.push(stat);
      } else if (stat.isDirectory()) {
        dirsToCheck.push({
          dirPath: filePath,
          files: fs.readdirSync(filePath),
        });
      }
    }

  }

  return allFiles;
}

function sendRequest(jsonData) {
  const data = JSON.stringify(jsonData);
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'us-central1-notes-app-analytics.cloudfunctions.net',
      port: 443,
      path: '/buildSuccess',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);

      res.on('data', (d) => {
        resolve(d.toString());
      });
    });

    req.on('error', (error) => {
      console.error(error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}
