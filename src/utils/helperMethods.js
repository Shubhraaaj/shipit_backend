// import * as fs from 'fs'
// import * as XLSX from 'xlsx'
// export HelperMethod { 


// }

// export function xlsxtojson(createTariffChartInput) {
// 	let buff = Buffer.from(createTariffChartInput.tariff, 'base64');
// 	let filePath = `${createTariffChartInput.vendor_id}.xlxs`
// 	fs.writeFileSync(filePath, buff);
// 	var workbook = XLSX.readFile(filePath);
// 	var sheet_name_list = workbook.SheetNames;
// 	let chartJsonArr = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
// 	let tariffChartJson = {}

// 	for (let chart of chartJsonArr) {
// 		let key = chart['0']
// 		delete chart['0']
// 		tariffChartJson[key] = chart

// 	}
// 	return tariffChartJson

// }