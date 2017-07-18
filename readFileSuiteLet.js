function readFile() {
  var postData = {}
  try {
    var res = nlapiRequestURL('http://gc.boxinboxout.com/box_test/YDG_Export_files/ShipReqest0706171147.xml', null, null, null, 'POST')
    var xmlString = res.getBody()
    nlapiLogExecution('DEBUG', 'xml as string', JSON.stringify(xmlString))
    nlapiLogExecution('DEBUG', 'typeof X2JS', typeof X2JS)
    var xToJS = new X2JS()
    var xmlAsJson = xToJS.xml_str2json(xmlString)
    nlapiLogExecution('DEBUG', 'xml converted to json', JSON.stringify(xmlAsJson))
  } catch (e) {
    nlapiLogExecution('ERROR', 'e', JSON.stringify(e))
  }
}


function readFileNames() {
  var postData = []
  var homePath = '/var/www'
  var filesPath = '/ydg_ns/BIBO_TO_YDG'
  var scriptName = '/testRun.php'
  var scriptPath = '/box_test/YDG_Export_files'
  var uri = 'http://gc.boxinboxout.com'
  var testFileName = 'ShipConfirm1.xml'
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
        continue
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
        nlapiLogExecution('DEBUG', 'xml converted to json', JSON.stringify(xmlAsJson))
      }
    }
    // nlapiLogExecution('DEBUG', 'xml as string', JSON.stringify(xmlString))
  } catch (e) {
    nlapiLogExecution('ERROR', 'e', JSON.stringify(e))
  }
}
