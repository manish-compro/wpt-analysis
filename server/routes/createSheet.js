var express = require('express');
var router = express.Router();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const keys = require('../keys.json');


const doc = new GoogleSpreadsheet('1TyKraiaM7Pqwxmm2VJx2TPpkTiYdmzw9d8PalBU4iwc');

 router.post('/', function(req, res, next) {


 createSheet(req, res);

    // Authorize a client with credentials, then call the Google Sheets API.
    //authorize(listMajors);


});

 async function createSheet(req, res){
    try {
    await doc.useServiceAccountAuth(keys);
    await doc.loadInfo();
    console.log(doc.title);
    const sheet = await doc.addSheet({ title: req.body.sheetName,  headerValues: ['run','step','label', 'miss', 'loadtime','thumbnailUrl']  });
    await sheet.loadCells('A1:H10');
    
    const a1 = sheet.getCell(0, 0)
    const b1 = sheet.getCell(0, 1)
    const c1 = sheet.getCell(0, 2)
    const d1 = sheet.getCell(0, 3)
    const e1 = sheet.getCell(0, 4)
    const f1 = sheet.getCell(0, 5)
    const i1 = sheet.getcell(0,9);    
    const h1 = sheet.getcell(0, 8)

    a1.backgroundColor = { green : 1 };
    b1.backgroundColor = { green : 1 };
    c1.backgroundColor = { green : 1 };
    d1.backgroundColor = { green : 1 };
    e1.backgroundColor = { green : 1 };
    f1.backgroundColor = { green : 1 };
    
    await sheet.addRows(req.body.data);
    h1.value = 'Test Link:';
    i1.value = req.body.testUrl;

    
    a1.textFormat = { bold: true };
    b1.textFormat = { bold: true };
    c1.textFormat = { bold: true };
    d1.textFormat = { bold: true };
    e1.textFormat = { bold: true };
    f1.textFormat = { bold: true };
    h1.textFormat = { bold: true };
  

    await sheet.saveUpdatedCells();

   
        return res.status(200).send("data sent to sheets");
    } catch (error) {
        console.log(error);
        
        return res.status(400).send("bad request");
    }
    
    
}




module.exports = router;
