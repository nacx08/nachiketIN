import { success, failure } from "./Library/response";

exports.initialize = async (event) => {
  var Result = { message: "Message not found!!" };
  return success(Result);
};

exports.errorhello = async (event) => {
  var Result = { message: "Message not found!!" };
  return failure(Result);
};
