const { exec } = require('child_process');

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
};

const main = async () => {
  try {
    console.log('Updating Angular packages...');

    const updateCommand = `
      ng update \
        @angular/cli@^18 \
        @angular/compiler-cli@^18 \
        @angular/localize@^18 \
        @angular-devkit/build-angular@^18
    `;
    const updateOutput = await runCommand(updateCommand);
    console.log(updateOutput);

    console.log('Installing packages...');

    const installOutput = await runCommand('npm install');
    console.log(installOutput);

    console.log('Everythin is up to date!');
  } catch (error) {
    console.error(error);
  }
};

main();