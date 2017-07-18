var POReceiptMappings = {
    "recType": "itemreceipt",
    "mappings": {
        "bodyLevel": {
            "path": "PurchaseOrderReceiptBatch.POReceipt",
            "mappings": [
                {
                    "externalField": "POReceiptNumber",
                    "nsField": "custbody_bibo_unique_tran_id"
                },
                {
                    "externalField": "PONumber",
                    "nsField": "createdfrom" // This is the PurchaseOrder when we need to create the Item Receipt
                }
            ]
        },
        "sublists": {
            "item": {
                "sublistPath": "PurchaseOrderReceiptBatch.POReceipt.POReceiptLines.ReceiptLine",
                "mappings": [
                    {
                        "externalField": "POLineNo",
                        "nsField": "orderline" // Line Number from the PurchaseOrder
                    },
                    {
                        "externalField": "POReceiptLineNo",
                        "nsField": "custcol_bibo_item_line_no"
                    },
                    {
                        "externalField": "OriginalProductID",
                        "nsField": "vendorname"
                    },
                    {
                        "externalField": "ProductID",
                        "nsField": "itemid"
                    },
                    {
                        "externalField": "WHLocation",
                        "nsField": "location" //This must be haded coded to "LDC East – Receiving" ID: 16
                    },
                    {
                        "externalField": "QuantityReceived",
                        "nsField": "quantity"
                    }
                ]
            }
        }
    }
}

{
	"recType" : "itemreceipt",
	"bodyFields" : {
		"custbody_bibo_unique_tran_id" : "Y12345601",
		"createdfrom" : "Y123456"
	},
	"lineFields" : {
		"item" : [{
				"orderline" : "1",
				"custcol_bibo_item_line_no" : "1",
				"vendorname" : "997000123456",
				"itemid" : "00121314",
				"location" : "LDC East – Receiving",
				"quantity" : "30"
			}, {
				"orderline" : "3",
				"custcol_bibo_item_line_no" : "2",
				"vendorname" : "997000123459",
				"itemid" : "00121317",
				"location" : "LDC East – Receiving",
				"quantity" : "20"
			}
		]
	}
}
