const fs = require('fs/promises');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const ZEPHYR_BASE_URL = process.env.ZEPHYR_API_URL;
const ZEPHYR_API_TOKEN = process.env.ZEPHYR_AUTH_TOKEN;
let SKIN = process.env.SKIN;
if (process.env.CI) {
    SKIN = process.env.skinName
}

async function waitForFile(filePath, timeout = 20000) {
    const start = Date.now();
    console.log(`[waitForFile] Start waiting for file: ${filePath}`);

    while (Date.now() - start < timeout) {
        try {
            console.log(`[waitForFile] Checking file... Elapsed: ${Date.now() - start}ms`);
            await fs.access(filePath); // Check if the file exists
            console.log(`[waitForFile] File found: ${filePath}`);
            return true; // File exists
        } catch (err) {
            console.log(`[waitForFile] File not found yet. Retrying...`);
            await new Promise((resolve) => setTimeout(resolve, 500)); // Wait 500ms
        }
    }

    // File not found within timeout
    const errorMessage = `[waitForFile] File "${filePath}" not found within ${timeout}ms`;
    throw new Error(errorMessage);
}

async function updateTestExecution() {

    const filePath = path.resolve('./reports/junit-report.xml'); // Resolve absolute path
    console.log('[updateTestExecution] in after script')

    console.log(`[updateTestExecution] Waiting for the report file: ${filePath}`);
    try {
        // Wait for the file to be created
        await waitForFile(filePath);
        console.log(`[updateTestExecution] Report file found: ${filePath}`);

        const fileData = await fs.readFile(filePath, 'utf-8'); // Read file asynchronously
        console.log(`[updateTestExecution] File data loaded.`);

        console.log(`[updateTestExecution] Skin: ${SKIN}`);

        const testCycle = {
            projectKey: 'PWC', // Replace with your Jira project key
            name: `${SKIN.toUpperCase()} smoke test cycle`, // Custom test cycle name
        };

        const blob = new Blob([fileData], { type: 'application/xml' });
        const file = new File([blob], 'junit-report.xml', { type: 'application/xml' });

        const formData = new FormData();
        formData.append('file', file);
        formData.append('testCycle', new Blob([JSON.stringify(testCycle)], { type: 'application/json' }));

        console.log(`[updateTestExecution] Sending data to API: ${ZEPHYR_BASE_URL}`);
        const response = await fetch(`${ZEPHYR_BASE_URL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${ZEPHYR_API_TOKEN}`,
            },
            body: formData,
        });

        if (!response.ok) {
            console.error(`[updateTestExecution] API Error: Status ${response.status}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`[updateTestExecution] Test Cases updated successfully:`, data);
    } catch (error) {
        console.error(`[updateTestExecution] Error:`, error.message);
    }
}

async function parseJUnitReport(filePath) {
    try {
        const xmlData = fs.readFileSync(filePath, 'utf8');
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(xmlData);
        return result.testsuites.testsuite;
    } catch (err) {
        console.error('Error reading JUnit report:', err);
        throw err;
    }
}

async function sendResultsToZephyr(testSuites) {
    try {
        for (const suite of testSuites) {
            console.log(`Processing suite: ${suite.$.name}`);
            for (const testcase of suite.testcase) {
                const testName = testcase.$.name;
                console.log(`Sending result for: ${testName}`);

                const payload = {
                    projectKey: 'PWC',
                    name: `${SKIN} Smoke Test Cycle`,
                    testCaseKey: testName,
                    status: testcase.failure ? 'Fail' : 'Pass',
                    description: testcase.failure ? testcase.failure[0].$.message : 'Test passed successfully',
                };

                console.log('URL', `${ZEPHYR_BASE_URL}/v1/testResults`)

                await axios.post(
                    `${ZEPHYR_BASE_URL}/v1/testResults`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${ZEPHYR_API_TOKEN}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log(`Result sent for: ${testName}`);
            }
        }
    } catch (err) {
        console.error('Error sending results to Zephyr:', err);
        throw err;
    }
}

async function main() {
    try {
        //const testSuites = await parseJUnitReport('reports/junit-report.xml');
        //await sendResultsToZephyr(testSuites);
        await updateTestExecution()
    } catch (err) {
        console.error('Failed to send JUnit report:', err);
    }
}

main();