
var One = {}

One.SaveRecord = function () {
  this.saveRecord = function (nsRecord) {
    var recType = nsRecord.recType
    var bodyFields = nsRecord.bodyFields
    var record
    try {
    if (recType === 'itemreceipt') {
      nlapiLogExecution('DEBUG', 'transforming record', recType)
      record = nlapiTransformRecord('purchaseorder', bodyFields.createdfrom, 'itemreceipt')
    } else if (nsRecord && nsRecord.bodyFields && nsRecord.bodyFields.internalId) {
      record = nlapiLoadRecord(recType, nsRecord.bodyFields.internalId)
    } else {
      record = nlapiCreateRecord(recType)
    }
    for (var f in bodyFields) {
      if (bodyFields.hasOwnProperty(f)) {
        record.setFieldValue(f, bodyFields[f])
      }
    }

    var sublists = nsRecord.lineFields
    if (recType !== 'itemreceipt') {
      for (var sublistName in sublists) {
        if (sublists.hasOwnProperty(sublistName)) {
          var lines = sublists[sublistName]
          for (var ind = 0; ind < lines.length; ind++) {
            var line = lines[ind]
            record.selectNewLineItem(sublistName)
            for (var fld in line) {
              if (line.hasOwnProperty(fld)) {
                nlapiLogExecution('DEBUG', 'sublistName, fld, line[fld]', sublistName + ':' + fld + ':' + line[fld])
                record.setCurrentLineItemValue(sublistName, fld, line[fld])
              }
            }
            record.commitLineItem(sublistName)
            nlapiLogExecution('DEBUG', 'committed line item', '****')
          }
        }
      }
    }
    nlapiLogExecution('DEBUG', 'submitting record', '****')
    var recordId = nlapiSubmitRecord(record)
    nlapiLogExecution('DEBUG', 'record saved', recType + ': ' + recordId)
    } catch(e) {
      nlapiLogExecution('ERROR', 'exception while saving', JSON.stringify(e))
    }
  }
}
