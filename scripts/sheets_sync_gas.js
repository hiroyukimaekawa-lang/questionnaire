/**
 * Google Apps Script (GAS) to receive Firestore data and populate a Spreadsheet.
 * 
 * Instructions:
 * 1. Create a new Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this code and save.
 * 4. Click "Deploy" > "New Deployment".
 * 5. Select "Web App", set "Execute as" to "Me", and "Who has access" to "Anyone".
 * 6. Copy the Web App URL and set it in useSyncToSheets.ts.
 */

function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    if (data.length === 0) return ContentService.createTextOutput("No data");

    // Clear existing data (except header)
    sheet.clearContents();

    // Set headers
    var headers = ["ID", "Score", "Purpose", "Language", "Submitted At", "Is High Score", "Staff Name"];
    sheet.appendRow(headers);

    // Append data
    data.forEach(function (row) {
        sheet.appendRow([
            row.id,
            row.score,
            row.purpose,
            row.language,
            row.submittedAt,
            row.isHighScore,
            row.staffName
        ]);
    });

    return ContentService.createTextOutput("Success");
}
