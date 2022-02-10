import { success, failure } from "./Library/response";

exports.initialize = async (event) => {
  var XLSX = require("xlsx");
  var workbook = XLSX.readFile("CMVOLT_10022022.csv");
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
  var Result = { message: "Message not found!!!" };
  return failure(Result);
};
