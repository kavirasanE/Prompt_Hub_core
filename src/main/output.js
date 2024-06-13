import { spawn } from 'child_process';

const output = (command, callback) => {
  let result = '';

  // Split the command and its arguments
  const [cmd, ...args] = command.split(' ');

  const child = spawn(cmd, args);

  child.stdout.on("data", (data) => {
    result += data.toString();
  });

  child.stderr.on('data', (data) => {
    // Log the error message
    console.error(data.toString());
  });

  child.on('error', (err) => {
    // Log the error
    console.error('Error:', err.message);
  });

  child.on('exit', (code, signal) => {
    // Log exit code or signal if non-zero
    if (code !== 0) {
      console.error(`Process exited with code ${code}`);
    }
    if (signal) {
      console.error(`Process terminated due to signal: ${signal}`);
    }

    // Pass result to callback
    callback(result);
  });
};

export default output;
