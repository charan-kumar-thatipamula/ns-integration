// if (typeof module.exports !== 'undefined' && module.exports) {
//     var ns = require('../util/ns.js')
//     console.log(JSON.stringify(Infologitech))
// }
// ns('Infologitech.sm.main')

var Infologitech = { 'sm': { 'main': {} } }

Infologitech.sm.main.GenerateNSObject = function () {
  this.generateNSObject = function (mapConfig, exportRecord) {
    nlapiLogExecution('DEBUG', 'mapConfig', JSON.stringify(mapConfig))
    nlapiLogExecution('DEBUG', 'exportRecord', JSON.stringify(exportRecord))
    if (!mapConfig || !exportRecord) {
      return {}
    }
    var nsRecord = {}
    if (!mapConfig.recType) {
      throw new Error('mapping configuration is missing recordType')
    }
    nsRecord.recType = mapConfig.recType
    nsRecord.bodyFields = {}
    nsRecord.lineFields = {}
    var mappings = mapConfig.mappings

    if (!mappings) {
      throw new Error('no mappings in mapping configuration')
    }

    updateBodyFields(nsRecord.bodyFields, mappings.bodyLevel.mappings, mappings.bodyLevel.path, exportRecord)
    // console.log(JSON.stringify(nsRecord))
    updateLineFields(nsRecord.lineFields, mappings.sublists, exportRecord)
    nlapiLogExecution('DEBUG', 'nsRecord', JSON.stringify(nsRecord))
    var sr = new One.SaveRecord()
    sr.saveRecord(nsRecord)
    // saveRecord(nsRecord)
    // console.log(JSON.stringify(nsRecord))
  }

  function updateBodyFields(nsBodyFieldsObj, bodyMap, path, exportRecord) {
    for (var i = 0; bodyMap && i < bodyMap.length; i++) {
      var curMap = bodyMap[i]
      var value = getValue(curMap, exportRecord, path, false)
      value = parseInt(value) ? parseInt(value) : value
      nsBodyFieldsObj[curMap.nsField] = value
    }
  }

  function updateLineFields(nsSublistFieldsObj, sublistMap, exportRecord) {
    for (var sublistName in sublistMap) {
      if (sublistMap.hasOwnProperty(sublistName)) {
        var sublistPath = sublistMap[sublistName].sublistPath || ''
        // "PurchaseOrderReceiptBatch.POReceipt.POReceiptLines.ReceiptLine"
        var exportSublist = jsonPath(exportRecord, '$.' + sublistPath) || ['']
        exportSublist = exportSublist[0]
        if (!exportSublist || exportSublist.length === 0) {
          throw new Error('sublistPath: [' + sublistPath + '] is not found in exportRecord')
        }
        // Create an entry for the sublist
        nsSublistFieldsObj[sublistName] = []
        var sublistMappings = sublistMap[sublistName].mappings
        for (var i = 0; sublistMappings && i < sublistMappings.length; i++) {
          var curMap = sublistMappings[i]
          var values = getValue(curMap, exportRecord, sublistPath, true)
          for (var j = 0; j < values.length; j++) {
            if (nsSublistFieldsObj[sublistName].length < j + 1) {
              nsSublistFieldsObj[sublistName].push({})
            }
            var v = parseInt(values[j]) ? parseInt(values[j]) : values[j]
            nsSublistFieldsObj[sublistName][j][curMap.nsField] = v
          }
        }
      }
    }
  }

  function getValue(curMap, exportRecord, path, isSublist) {
    if (isSublist) {
      return getSublistValue(curMap, exportRecord, path)
    } else {
      return getBodyValue(curMap, exportRecord, path)
    }
  }

  function getSublistValue(curMap, exportRecord, sublistPath) {
    var sublists = jsonPath(exportRecord, '$.' + sublistPath) || ['']
    sublists = sublists[0]
    if (!Array.isArray(sublists)) {
      sublists = [sublists]
    }
    var values = []
    for (var i = 0; i < sublists.length; i++) {
      var curSublistExported = sublists[i]
      values.push(curSublistExported[curMap.externalField])
    }
    return values
  }

  function getBodyValue(curMap, exportRecord, path) {
    var r = jsonPath(exportRecord, '$.' + path) || []
    if (r.length === 0) {
      return ''
    } else {
      r = r[0]
    }
    var mapType = curMap.type || ''
    // log('curMap', JSON.stringify(curMap))
    switch (mapType) {
      case 'oneToOne':
        // log('OneToOne', '')
        return getFieldOneToOne(curMap, r)
        break
      case 'hardCoded':
        // log('hardCoded', '')
        return curMap.hardCodedValue
        break
      default:
        // log('default mapping type', '')
        return r[curMap.externalField] || ''
    }
  }

  function getFieldOneToOne(curMap, exportRecord) {
    var valueMapObj = curMap.valueMappings || {}
    var exportedValue = exportRecord[curMap.externalField] || ''
    return valueMapObj.exportedValue || valueMapObj.default || ''
  }
}

function trigger(dataIn) {
  nlapiLogExecution('DEBUG', 'in trigger', JSON.stringify(dataIn))
  var c = new Infologitech.sm.main.GenerateNSObject()
  c.generateNSObject(dataIn.mappings, dataIn.data)
}

// if (typeof module.exports !== 'undefined' && module.exports) {
//   module.exports = Infologitech.sm.main.GenerateNSObject
//   var jsonPath = require('../lib/jsonpath-0.8')
//   function nlapiLogExecution(one, two, three) {
//     console.log(two + ' : ' + three)
//   }
// }
