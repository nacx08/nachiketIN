"use strict";
import { success, failure } from "Lib";

module.exports.hello = async (event) => {
  var Result = { message: "Message not found!!!" };
  return success(Result);
};
