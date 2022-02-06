import { success, failure } from "./Library/response";

module.exports.initialize = async (event) => {
  var Result = { message: "Message not found!!!" };
  return success(Result);
};

module.exports.errorhello = async (event) => {
  var Result = { message: "Message not found!!!" };
  return failure(Result);
};
