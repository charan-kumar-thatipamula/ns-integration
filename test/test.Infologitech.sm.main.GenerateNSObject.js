var mapper = require('../main/Infologitech.sm.main.GenerateNSObject.js')
var fs = require('fs')

var mapConfig = eval(fs.readFileSync('E:\\Personal\\Projects\\Project1\\Codes\\mapping\\mappings.js') + '')
var exportRecord = eval(fs.readFileSync('E:\\Personal\\Projects\\Project1\\Codes\\test\\data\\POReceiptData.js') + '')
// console.log(JSON.stringify(POReceiptMappings))
// console.log(JSON.stringify(POReceiptJSON))
var createNSObj = new mapper()
createNSObj.generateNSObject(inventoryMappings, inventoryData)
