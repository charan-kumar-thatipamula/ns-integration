function readFileNames() {
  var postData = []
  var homePath = '/var/www'
  var filesPath = '/ydg_ns/BIBO_TO_YDG/Demo'
  var scriptName = '/testRun.php'
  var scriptPath = '/box_test/YDG_Export_files'
  var uri = 'http://gc.boxinboxout.com'
  var testFileName = 'POReceipt1.xml'
  scriptPath = uri + scriptPath + scriptName
  try {
    postData['dirPath'] = homePath + filesPath
    var res = nlapiRequestURL(scriptPath, postData, null, null, 'POST')
    var resBody = res.getBody()
    nlapiLogExecution('DEBUG', 'resBody', resBody)
    // return
    // var fileNames = resBody.split('\n')[0].split('|')
    var fileNames = resBody.split('|')
    nlapiLogExecution('DEBUG', 'fileNames', JSON.stringify(fileNames))
    for (var i in fileNames) {
      var fileName = fileNames[i]
      if (fileName !== testFileName) {
        // continue
      }
      // nlapiLogExecution('DEBUG', 'fileName', fileName)
      if (fileName && fileName.length && fileName.indexOf('.xml') !== -1) {
        nlapiLogExecution('DEBUG', 'fileName', fileName)
        // nlapiLogExecution('DEBUG', 'fileName.indexOf(.xml)', fileName.indexOf('.xml'))
        res = nlapiRequestURL(uri + filesPath + '/' + fileName, null, null, null, 'POST')
        var xmlString = res.getBody()
        xmlString = xmlString.substring(xmlString.indexOf('<'), xmlString.length)
        var xToJS = new X2JS()
        var xmlAsJson = xToJS.xml_str2json(xmlString)
        passRecordJson(xmlAsJson, fileName)
        nlapiLogExecution('DEBUG', 'xml converted to json', JSON.stringify(xmlAsJson))
      }
    }
    // nlapiLogExecution('DEBUG', 'xml as string', JSON.stringify(xmlString))
  } catch (e) {
    nlapiLogExecution('ERROR', 'e', JSON.stringify(e))
  }
}


function passRecordJson(recordsJson, fileName) {
  var c = new Infologitech.sm.main.GenerateNSObject()
  nlapiLogExecution('DEBUG', 'fileName.startsWith(\'ShipConfirm\')', fileName.indexOf('ShipConfirm'))
  var mappings
  if (fileName.indexOf('ShipConfirm') === 0) {
    mappings = shipmentMappings
  } else if (fileName.indexOf('InventoryAdj') === 0) {
    mappings = inventoryAdjustmentMappings
  } else if (fileName.indexOf('POReceipt') === 0) {
    mappings = poRecieptMappings
  }

  recordsJson = jsonPath(recordsJson, '$.' + mappings.recordsPath) || ['']
  recordsJson = recordsJson[0]
  if (!Array.isArray(recordsJson)) {
    recordsJson = [recordsJson]
  }
  nlapiLogExecution('DEBUG','recordsJson', JSON.stringify(recordsJson))
  for (var i = 0; i < recordsJson.length; i++) {
    nlapiLogExecution('DEBUG','recordsJson', recordsJson[i]['AdjustmentReason'])
    if (fileName.indexOf('InventoryAdj') === 0 && recordsJson[i]['AdjustmentReason'] === 'Put-Away') {
      mappings = inventoryTransferMappings
    }
    c.generateNSObject(mappings, recordsJson[i])
  }
}
