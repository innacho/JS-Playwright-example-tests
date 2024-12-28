const { spawn } = require('child_process');

let skin = process.env.SKIN;
if (process.env.CI) {
    skin = process.env.skinName
    process.env.SKIN = skin
}

// Функция для запуска команды и отображения её вывода
function runCommand(command, args) {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args, { stdio: 'inherit', shell: true });

        process.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}

// Основная последовательность выполнения
(async () => {
    try {
        console.log(`Running tests for skin: ${skin}`);
        await runCommand('npx', ['playwright', 'test', `--project=${skin}`]);
    } catch (err) {
        console.error('Error running tests:', err.message);
    }

    try {
        console.log('Sending report to Zephyr...');
        await runCommand('node', ['send-report-to-zephyr.js']);
    } catch (err) {
        console.error('Error sending report:', err.message);
    }
})();