import { success, failure } from "./Library/response";
var XLSX = require("xlsx");
var path = require("path");
var http = require("http");
var fs = require("fs");
var moment = require("moment");

exports.initialize = async (event) => {
  // Url of the image
  var fileName = "";
  var dt = new Date();
  var n = dt.getDay();
  if (n == 0) {
    dt = addDays(dt, -1);
  }

  dt = dt.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  console.log(dt);

  fileName = await downloadUrl(dt);

  var workbook = XLSX.readFile(path.combine(__dirname, "/files/" + fileName));
  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  for (var i = 0; i < xlData.length; i++) {
    xlData[i]["DailyPercent"] =
      xlData[i][
        "Current Day Underlying Daily Volatility (E) = Sqrt(0.995*D*D + 0.005*C*C)"
      ] * 100;
    xlData[i]["AnnualPercent"] =
      xlData[i]["Underlying Annualised Volatility (F) = E*Sqrt(365)"] * 100;
  }

  var Nifty50 = [];
  Nifty50.push("ONGC");
  Nifty50.push("TATASTEEL");
  Nifty50.push("INFY");
  Nifty50.push("SBILIFE");
  Nifty50.push("HDFCBANK");
  Nifty50.push("GRASIM");
  Nifty50.push("KOTAKBANK");
  Nifty50.push("M&M");
  Nifty50.push("HDFC");
  Nifty50.push("JSWSTEEL");
  Nifty50.push("POWERGRID");
  Nifty50.push("TATAMOTORS");
  Nifty50.push("TECHM");
  Nifty50.push("SBIN");
  Nifty50.push("HINDALCO");
  Nifty50.push("WIPRO");
  Nifty50.push("NTPC");
  Nifty50.push("BAJAJFINSV");
  Nifty50.push("HCLTECH");
  Nifty50.push("TATACONSUM");
  Nifty50.push("HDFCLIFE");
  Nifty50.push("SUNPHARMA");
  Nifty50.push("CIPLA");
  Nifty50.push("AXISBANK");
  Nifty50.push("LT");
  Nifty50.push("INDUSINDBK");
  Nifty50.push("EICHERMOT");
  Nifty50.push("BRITANNIA");
  Nifty50.push("BHARTIARTL");
  Nifty50.push("BAJFINANCE");
  Nifty50.push("ICICIBANK");
  Nifty50.push("ASIANPAINT");
  Nifty50.push("HINDUNILVR");
  Nifty50.push("BAJAJ - AUTO");
  Nifty50.push("TITAN");
  Nifty50.push("HEROMOTOCO");
  Nifty50.push("DIVISLAB");
  Nifty50.push("NESTLEIND");
  Nifty50.push("DRREDDY");
  Nifty50.push("BPCL");
  Nifty50.push("UPL");
  Nifty50.push("RELIANCE");
  Nifty50.push("COALINDIA");
  Nifty50.push("ADANIPORTS");
  Nifty50.push("ULTRACEMCO");
  Nifty50.push("SHREECEM");
  Nifty50.push("IOC");
  Nifty50.push("MARUTI");

  var result = xlData.filter(function (x) {
    return x["DailyPercent"] > 3 && Nifty50.indexOf(x.Symbol) > -1;
  });

  console.log(result);

  return success(result);
};

exports.errorhello = async (event) => {
  var Result = { message: "Message not found!!" };
  return failure(Result);
};

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const downloadUrl = async function (dt) {
  dt = addDays(dt, -1);
  var fileName = `CMVOLT_${moment(dt).format("DDMMYYYY")}.CSV`;
  //const fileName = "CMVOLT_10022022.csv";

  var downLoadURL = `https://www1.nseindia.com/archives/nsccl/volt/${fileName}`;
  // Path at which image will get downloaded
  const filePath = `${__dirname}/files`;
  try {
    await download(downLoadURL, filePath);
    return fileName;
  } catch (ex) {
    console.log(downLoadURL, ex);
    fileName = downloadUrl(dt);
    return fileName;
  }
};

const download = async function (url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http
    .get(url, function (response) {
      response.pipe(file);
      file.on("finish", function () {
        file.close(cb); // close() is async, call cb after close completes.
      });
    })
    .on("error", function (err) {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message);
    });
};
