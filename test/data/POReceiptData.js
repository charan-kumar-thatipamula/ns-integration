var POReceiptJSON = {
	"PurchaseOrderReceiptBatch" : {
		"POReceipt" : {
			"POReceiptNumber" : "Y12345601",
			"PONumber" : "Y123456",
			"POReceiptDate" : "06252017",
			"POReceiptTimestamp" : "061320170858",
				"POShipMethod" : "127198",
			"POReceiptLines" : {
				"ReceiptLine" : [{
						"POLineNo" : "1",
						"POReceiptLineNo" : "1",
						"OriginalProductID" : "997000123456",
						"ProductID" : "00121314",
						"WHLocation" : "LDC East – Receiving",
						"QuantityReceived" : "30"
					}, {
						"POLineNo" : "3",
						"POReceiptLineNo" : "2",
						"OriginalProductID" : "997000123459",
						"ProductID" : "00121317",
						"WHLocation" : "LDC East – Receiving",
						"QuantityReceived" : "20"
					}
				]
			}
		}
	}
}

var inventoryData = {
	"Warehouse" : "LDCE",
	"ProductID" : "Suresh Test Item",
	"OriginalProductID" : "",
	"AdjustmentType" : "",
	"AdjustmentReason" : "Adjust",
	"FrWHLocation" : "LDC East - Receiving",
	"ToWHLocation" : "LDC East",
	"Quantity" : "15",
	"ReferenceCode" : "",
	"AdjTimestamp" : "07172017-0923"
}
