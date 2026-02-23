function onFormSubmit(e) {
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    const data = e.values;
    sheet.appendRow(data);
}

function setupTrigger() {
    const form = FormApp.openById('YOUR_FORM_ID');
    ScriptApp.newTrigger('onFormSubmit')
        .forForm(form)
        .onFormSubmit()
        .create();
}