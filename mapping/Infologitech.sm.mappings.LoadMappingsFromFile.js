ns('Infologitech.sm.mappings')

var mappings = {

}

var mappingFileNames = {
    'purchaseOrder': 'FILE_PATH'
}

Infologitech.sm.mappings.LoadMappingsFromFile = function () {
    return {
        getMappings : function (recType) {
            return mappings.recType
        }
    }
}

Infologitech.sm.mappings.LoadMappingsFromFile.getMappings = function (recType) {
    return mappings.recType
}