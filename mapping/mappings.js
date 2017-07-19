var shipmentMappings = {
  "recType": "itemfulfillment",
  "mappings": {
    "bodyLevel": {
      "path": "ShipmentConfirmationBatch.ShipmentConfirmation",
      "mappings": [
        {
          "externalField": "ShipmentNumber",
          "nsField": "internalid"
        },
        {
          "type": "hardCoded",
          "hardCodedValue": "B",
          "nsField": "shipstatus"
        }
      ]
    },
    "sublists": {
      "packageups": {
        "sublistPath": "ShipmentConfirmationBatch.ShipmentConfirmation.Packages.Package",
        "mappings": [
          {
            "externalField": "Weight",
            "nsField": "packageweightups"
          },
          {
            "externalField": "PackageTrackingNo",
            "nsField": "packagetrackingnumberups"
          }
        ]
      }
    }
  }
}


var inventoryAdjustmentMappings = {
  "recType": "inventoryadjustment",
  "recordsPath": "InventoryAdjustmentBatch.InventoryAdjustment",
  "mappings": {
    "bodyLevel": {
      "path": "",
      "mappings": [{
        "externalField": "AdjustmentReason",
        "nsField": "memo"
      },
      {
        "type": "hardCoded",
        "nsField": "account",
        "hardCodedValue": "1"
      }
      ]
    },
    "sublists": {
      "inventory": {
        "sublistPath": "",
        "mappings": [{
          "externalField": "ProductID",
          "nsField": "item"
        },
        {
          "externalField": "Quantity",
          "nsField": "adjustqtyby"
        },
        {
          "externalField": "FrWHLocation",
          "nsField": "location"
        }
        ]
      }
    }
  }
}

var inventoryTransferMappings = {
  "recType": "inventorytransfer",
  "recordsPath": "InventoryAdjustmentBatch.InventoryAdjustment",
  "mappings": {
    "bodyLevel": {
      "path": "",
      "mappings": [{
        "externalField": "FrWHLocation",
        "nsField": "location"
      }, {
        "externalField": "ToWHLocation",
        "nsField": "transferlocation"
      }, {
        "externalField": "AdjustmentReason",
        "nsField": "memo"
      },{
        "type": "hardCoded",
        "nsField": "account",
        "hardCodedValue": "1"
      }
      ]
    },
    "sublists": {
      "inventory": {
        "sublistPath": "",
        "mappings": [{
          "externalField": "ProductID",
          "nsField": "item"
        },
        {
          "externalField": "Quantity",
          "nsField": "adjustqtyby"
        }
        ]
      }
    }
  }
}


var poRecieptMappings = {
		"recType" : "itemreceipt",    
    "recordsPath" : "PurchaseOrderReceiptBatch.POReceipt",
		"mappings" : {
      "path": "",
			"bodyLevel" : {
				"mappings" : [{
						"externalField" : "POReceiptNumber",
						"nsField" : "custbody_bibo_unique_tran_id"
					}, {
						"externalField" : "PONumber",
						"nsField" : "createdfrom"
					}, {
						"externalField" : "POShipMethod",
						"nsField" : "shipmethod"
					}
				]
			},
			"sublists" : {
				}
		}
	}
