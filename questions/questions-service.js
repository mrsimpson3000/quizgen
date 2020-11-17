const excelToJson = require('convert-excel-to-json');

module.exports = {
  convertExcel,
}

function convertExcel(filepath) {
  const result = excelToJson({
    sourceFile: filepath,
    header: {
      rows: 1
    },
    sheets: ['Sheet1'],
    columnToKey: {
      A: 'id',
      B: 'book',
      C: 'chapter',
      D: 'verse',
      E: 'series',
      F: 'type',
      G: 'question',
      H: 'answer'
    }
  })
return result.Sheet1
}
