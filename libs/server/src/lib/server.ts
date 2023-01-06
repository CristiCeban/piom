import { exec } from 'child_process';

export function server() {
  exec(
    'yarn json-server --watch "./assets/db.json" ',
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
}
