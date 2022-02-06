"use strict";
import { success, failure } from "Library";

module.exports.hello = async (event) => {
  var Result = { message: "Message not found!" };
  return success(Result);
};
