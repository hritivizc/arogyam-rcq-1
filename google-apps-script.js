// ════════════════════════════════════════════════════
//  AROGYAM YOGA — Google Sheets Web App Script
//  Paste this into Google Apps Script and deploy as Web App
// ════════════════════════════════════════════════════
//
//  SETUP STEPS:
//  1. Open your Google Sheet:
//     https://docs.google.com/spreadsheets/d/1HiaV6kuWjr7M8XZ6nid_q0kYdJwDPLOomrIDTPHEaHU/edit
//
//  2. Click Extensions → Apps Script
//
//  3. Delete any existing code and paste this entire file
//
//  4. Click Save (💾)
//
//  5. Click Deploy → New Deployment
//     • Type: Web App
//     • Execute as: Me
//     • Who has access: Anyone
//     Click Deploy → Authorize → Copy the Web App URL
//
//  6. In index.html, replace:
//       const SHEET_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
//     with your actual Web App URL
// ════════════════════════════════════════════════════

const SHEET_NAME = 'Responses'; // Will create this sheet tab automatically

function doPost(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName(SHEET_NAME);

    // Create sheet + header row if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Phone',
        'Followed Instagram',
        'Reviewed Google'
      ]);

      // Style the header
      const header = sheet.getRange(1, 1, 1, 5);
      header.setFontWeight('bold');
      header.setBackground('#7a9e7e');
      header.setFontColor('#ffffff');
    }

    // Parse incoming JSON
    const data = JSON.parse(e.postData.contents);

    // Append the new row
    sheet.appendRow([
      data.timestamp       || new Date().toLocaleString(),
      data.name            || '',
      data.phone           || '',
      data.followedInstagram ? 'Yes' : 'No',
      data.reviewedGoogle    ? 'Yes' : 'No'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test this by running doGet from the Apps Script editor
function doGet(e) {
  return ContentService
    .createTextOutput('Arogyam Yoga Sheet API is live 🪷')
    .setMimeType(ContentService.MimeType.TEXT);
}
