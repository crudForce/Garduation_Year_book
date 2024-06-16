// GoogleDataFetcher.cjs
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const keyFilePath = path.resolve(__dirname, './google-sheets-service-account.json');

if (!fs.existsSync(keyFilePath)) {
  console.error(`Credentials file not found at path: ${keyFilePath}`);
  process.exit(1);
}

console.log('Credentials file found.');

async function getAuthClient() {
  try {
    const keyFileContent = require(keyFilePath);

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: keyFileContent.client_email,
        private_key: keyFileContent.private_key,
      },
      scopes: SCOPES,
    });

    const authClient = await auth.getClient();
    console.log('Successfully authenticated');
    return authClient;
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
}

async function GetData() {
  try {
    const authClient = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    const spreadsheetId = '1K8g58K_OyjSY07r12l8OZSu-N0RwnrnjCb_SYCq_MwE'; // Replace with your spreadsheet ID

    let allData = [];
    let i = 2; // Start at row 2

    while (true) {
      const range = `importThis!B${i}:L${i}`; // Dynamically construct the range string
      console.log(`Fetching data from range: ${range}`);

      const startTime = Date.now();
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      const endTime = Date.now();
      console.log(`Data fetched from range ${range} in`, (endTime - startTime), 'ms');

      const rows = response.data.values;

      if (!rows || rows.length === 0 || !rows[0].length) {
        console.log('No more data found.');
        break;
      }

      const data = rows.map((row) => ({
        fullName: row[0], // Assuming column B is index 0 for full name
        studentId: row[1], // Assuming column C is index 1 for student ID
        department: row[2], // Assuming column D is index 2 for department
        nickname: row[3], // Assuming column E is index 3 for nickname
        lastWord: row[4], // Assuming column F is index 4 for last word
        describeYourself: row[5], // Assuming column G is index 5 for describe yourself
        futureSelf: row[6], // Assuming column H is index 6 for future self
        friendsSay: row[7], // Assuming column I is index 7 for friends say
        instagramHandle: row[8], // Assuming column J is index 8 for instagram handle
        headshot: row[9], // Assuming column K is index 9 for headshot URL
        fullBody: row[10], // Assuming column L is index 10 for full body URL
      }));

      allData.push(data[0]); // Each row's data as a separate object in the array
      i++;
    }

    return allData;
  } catch (err) {
    console.error('The API returned an error: ' + err);
    return null;
  }
}

module.exports = { GetData };

