var jwt = require('jsonwebtoken');
require('dotenv').config();

const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = function (app) {
    app.get('/googleAnalytics', function (req, res) {
   //     console.log('function: '+analyticsFunction)
        res.send('Hello ***')
    })
    app.get('/getToken', function (req, res) {
        let token = jwt.sign({
            data: 'foobar'
        }, 'secret', { expiresIn: '1h' });
        console.log('Token: ' + token)
        res.send(token)
    })
    app.get('/createFirstGraph', async function (req, res) {        
        const doc = new GoogleSpreadsheet(process.env.REACT_APP_GOOGLE_SPREAD_SHEET);
        await doc.useServiceAccountAuth({
            client_email: process.env.REACT_APP_GOOGLE_ANALYTICS_CLIENT_EMAIL,
            private_key: process.env.REACT_APP_GOOGLE_ANALYTICS_PRIVATE_KEY
        });
        await doc.loadInfo(); // loads document properties and worksheets
        console.log('TITLE*: '+doc.title);        
        const sheet = doc.sheetsByIndex[1]; // or use doc.sheetsById[id]
        console.log('Sheet: '+sheet.title);
      // get cells
        console.log('Cell*** ' + JSON.stringify(sheet.gridProperties))
        console.log('Sheet type: ' + sheet.sheetType);
        await sheet.loadCells('A15:B17')
        console.log(sheet.cellStats);
        const a1 = sheet.getCell(16, 1); // access cells using a zero-based index
    //    const c6 = sheet.getCellByA1('C6'); // or A1 style notation
        // access everything about the cell
        console.log(a1.value);
        console.log(a1.formula);
        console.log(a1.formattedValue);
        //get rows
        const rows = await sheet.getRows()
        console.log('rows length: ' + rows.length)
        console.log(Object.values(rows[14]).length)//returns 4
        console.log(Object.values(rows[15])[3])
        let startIndex = 14
        let endIndex = rows.length;
        //get values from coll1 for rows
        let arrRows = []
        for (let i = startIndex; i < endIndex; i++) {
            arrRows.push(Object.values(rows[i])[3])
           // console.log(Object.values(rows[i])[3])
        }
        console.log('Array 1: ' + arrRows)
        //get values from coll1 for cells
        let arrCells = []
        for (let i = startIndex + 1; i < endIndex + 1; i++) {
            arrCells.push(sheet.getCell(i,1).value)
        }
        console.log('Cells array: ' + JSON.stringify(arrCells))
        ///create object array from 2 arrays(arrRows and arrCells)
        let objRowsCells = []
        let ln = endIndex - startIndex

        for (let i = 0; i < ln; i++) {
            let val = {}
            val[arrRows[i]] = arrCells[i]
            objRowsCells.push(val)
        }
        console.log('Our array user per browser: ' + JSON.stringify(objRowsCells))
        let ar2 = [5, 3]
        let arr3 = ['a', 'b']
        let obj = []
        for (let i = 0; i < 2; i++) {
            let a = {}
            a[arr3[i]]=ar2[i]
            obj.push( a )
        }
        
        console.log('ARRAY 2: ' + JSON.stringify(obj))

        res.send(objRowsCells)
    })
}