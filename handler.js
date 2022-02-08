import { success, failure } from "./Library/response";
import obj from "/data.json";

exports.initialize = async (event) => {
  console.log(obj);
  var Result = { message: "Message not found!!!" };
  return success(Result);
};

exports.errorhello = async (event) => {
  var Result = { message: "Message not found!!!" };
  return failure(Result);
};
