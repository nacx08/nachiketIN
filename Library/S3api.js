import { SentryTrack } from "Sentry";
import * as AWS from "aws-sdk";
const AWS_BUCKET = process.env.AWS_BUCKET;
const AWS_BUCKET_JSON = process.env.AWS_BUCKET_JSON;
const AWS_KEY = process.env.AWS_KEY;
const AWS_SECRET = process.env.AWS_SECRET;

class S3api {
  #_s3;
  #_bucketName;
  #_bucketNameJson;
  #_folderName;
  #_fileName;

  set s3(value) {
    this.#_s3 = value;
  }
  get s3() {
    return this.#_s3;
  }

  set bucketName(value) {
    this.#_bucketName = value;
  }
  get bucketName() {
    return this.#_bucketName;
  }

  set folderName(value) {
    this.#_folderName = value;
  }
  get folderName() {
    return this.#_folderName;
  }

  set fileName(value) {
    this.#_fileName = value;
  }
  get fileName() {
    return this.#_fileName;
  }

  constructor() {
    this.#_s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      accessKeyId: AWS_KEY,
      secretAccessKey: AWS_SECRET,
    });
    AWS.config.update({ region: "us-east-1" });
    this.#_bucketName = AWS_BUCKET;
    this.#_bucketNameJson = AWS_BUCKET_JSON;
  }

  deleteObject = async () => {
    var ReturnObject = new Promise(async (resolve, reject) => {
      try {
        var params = { Bucket: this.#_bucketName, Key: this.#_fileName };
        var ReturnObjectIn = this.#_s3
          .deleteObject(params)
          .promise()
          .then(
            (data) => {
              return data;
            },
            (err) => {
              return err;
            }
          );
        resolve(ReturnObjectIn);
      } catch (error) {
        SentryTrack.trackError(
          "error while deleting object in s3 bucket",
          error
        );
        reject({
          error: "Sequelize error while deleting object in s3 bucket: " + error,
        });
      }
    });
    return ReturnObject;
  };

  objectExists = async () => {
    var ReturnObject = new Promise(async (resolve, reject) => {
      try {
        var params = { Bucket: this.#_bucketName, Key: this.#_fileName };
        var ReturnObjectIn = this.#_s3
          .waitFor("objectExists", params)
          .promise()
          .then(
            (data) => {
              return data;
            },
            (err) => {
              return err;
            }
          );
        resolve(ReturnObjectIn);
      } catch (error) {
        SentryTrack.trackError(
          "error while searching for object in s3 bucket",
          error
        );
        reject({
          error:
            "Sequelize error while searching for object in s3 bucket: " + error,
        });
      }
    });
    return ReturnObject;
  };

  listObjects = async () => {
    var ReturnObject = new Promise(async (resolve, reject) => {
      try {
        var params = { Bucket: this.#_bucketName };
        if (this.folderName) {
          params.Delimiter = "/";
          params.Prefix = this.folderName;
        }
        var ReturnObjectIn = this.#_s3
          .listObjects(params)
          .promise()
          .then(
            (data) => {
              return data;
            },
            (err) => {
              return err;
            }
          );
        resolve(ReturnObjectIn);
      } catch (error) {
        SentryTrack.trackError("error while fetching list s3 bucket", error);
        reject({
          error: "Sequelize error while fetching list s3 bucket: " + error,
        });
      }
    });
    return ReturnObject;
  };

  getData = async () => {
    var ReturnObject = new Promise(async (resolve, reject) => {
      try {
        var params = {
          Bucket: this.#_bucketName,
          Key: this.#_fileName,
        };
        var ReturnObjectIn = this.#_s3
          .getObject(params)
          .promise()
          .then(
            (data) => {
              return data;
            },
            (err) => {
              return err;
            }
          );
        resolve(ReturnObjectIn);
      } catch (error) {
        reject({
          error: "Sequelize error while upload Data to s3 bucket: " + error,
        });
      }
    });
    return ReturnObject;
  };

  uploadData = async (bodyContent, contentType) => {
    var ReturnObject = new Promise(async (resolve, reject) => {
      try {
        var params = {
          // ACL: 'public-read',
          Bucket: this.#_bucketName,
          Key: this.#_fileName,
          Body: bodyContent,
          ContentType: contentType,
        };
        var ReturnObjectIn = this.#_s3
          .putObject(params)
          .promise()
          .then(
            (data) => {
              return data;
            },
            (err) => {
              return err;
            }
          );
        resolve(ReturnObjectIn);
      } catch (error) {
        SentryTrack.trackError("error while upload Data to s3 bucket", error);
        reject({
          error: "Sequelize error while upload Data to s3 bucket: " + error,
        });
      }
    });
    return ReturnObject;
  };

  uploadDataJson = async (bodyContent, contentType, userEvent) => {
    var ReturnObject = new Promise(async (resolve, reject) => {
      try {
        const RootfolderPath = `useroperations/${userEvent}/${Date.now()}.json`;
        var params = {
          // ACL: 'public-read',
          Bucket: this.#_bucketNameJson,
          Key: RootfolderPath,
          Body: JSON.stringify(bodyContent),
          ContentType: contentType,
        };
        var ReturnObjectIn = await this.#_s3
          .putObject(params)
          .promise()
          .then(
            (data) => {
              return data;
            },
            (err) => {
              return err;
            }
          );
        resolve(ReturnObjectIn);
      } catch (error) {
        console.log(error);
        SentryTrack.trackError("error while upload Data to s3 bucket", error);
        reject({
          error: "Sequelize error while upload Data to s3 bucket: " + error,
        });
      }
    });
    return ReturnObject;
  };

  uploadDataJsonWithBucketName = async (
    bodyContent,
    contentType,
    userEvent,
    bucketName
  ) => {
    var ReturnObject = new Promise(async (resolve, reject) => {
      try {
        const RootfolderPath = `useroperations/${userEvent}/${Date.now()}.json`;
        var params = {
          // ACL: 'public-read',
          Bucket: bucketName,
          Key: RootfolderPath,
          Body: JSON.stringify(bodyContent),
          ContentType: contentType,
        };
        var ReturnObjectIn = await this.#_s3
          .putObject(params)
          .promise()
          .then(
            (data) => {
              return data;
            },
            (err) => {
              return err;
            }
          );
        resolve(ReturnObjectIn);
      } catch (error) {
        console.log(error);
        SentryTrack.trackError("error while upload Data to s3 bucket", error);
        reject({
          error: "Sequelize error while upload Data to s3 bucket: " + error,
        });
      }
    });
    return ReturnObject;
  };
}
export default S3api;
