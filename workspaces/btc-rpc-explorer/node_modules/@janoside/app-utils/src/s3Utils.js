const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand }  = require('@aws-sdk/client-s3');

const utils = require("./utils.js");

const debug = require("debug");
const debugLog = debug("app:s3Utils");
const verboseLog = debug("app:s3Verbose");

/*
if (process.env.AWS_PROFILE_NAME) {
	debugLog(`Using AWS Credentials from profile '${process.env.AWS_PROFILE_NAME}'`);

	var credentials = new AWS.SharedIniFileCredentials({profile: process.env.AWS_PROFILE_NAME});
	AWS.config.credentials = credentials;
}*/

let s3Client = null;


const streamToBuffer = (stream) =>
	new Promise((resolve, reject) => {
		const chunks = [];
		stream.on("data", (chunk) => chunks.push(chunk));
		stream.on("error", reject);
		stream.on("end", () => resolve(Buffer.concat(chunks)));
	});



const isSuccessful = (s3Response) => {
	let statusCodeCategory = ~~(s3Response["$metadata"].httpStatusCode / 100);

	return (statusCodeCategory == 2);
};


const createBucket = (bucket, bucketRegion, pathPrefix, bucketOptions={}) => {
	if (s3Client == null) {
		// ref: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/loading-node-credentials-shared.html
		if (process.env.AWS_PROFILE) {
			debugLog(`Creating S3 Client with AWS Profile '${process.env.AWS_PROFILE}' for Region '${bucketRegion}'`);
			// AWS.config.credentials.accessKeyId

		} else {
			debugLog(`Creating S3 Client with [default] AWS Profile for Region '${bucketRegion}'`);
		}

		s3Client = new S3Client({ region: bucketRegion });

		//debugLog(`Creating S3 Client with AWS Access Key: ${AWS.config.credentials.accessKeyId}`);
		
		//s3Client = new AWS.S3({apiVersion: '2006-03-01'});
	}

	debugLog(`Creating S3 Bucket: name=${bucket}, region=${bucketRegion}, pathPrefix=${pathPrefix}, bucketOptions=${JSON.stringify(bucketOptions)}`);

	let prefix = (pathPrefix || "").trim();
	if (prefix.length > 0 && !prefix.endsWith("/")) {
		prefix = (prefix + "/");
	}

	return {
		put: async (data, path, options={}) => {
			if (bucketOptions.readOnly) {
				debugLog("Bucket is marked read-only: skipping PUT");

				verboseLog(`S3.PUT(SKIPPING DUE TO READONLY BUCKET OPTION): path=${path}, options=${JSON.stringify(options)}, `);

				return;
			}

			verboseLog(`S3.PUT: path=${path}, options=${JSON.stringify(options)}`);

			let uploadParams = options || {};

			uploadParams.Bucket = bucket;
			uploadParams.Key = `${prefix}${path}`;
			uploadParams.Body = data;
			
			const putObjectCommand = new PutObjectCommand(uploadParams);

			const s3Response = await s3Client.send(putObjectCommand);

			
			if (!isSuccessful(s3Response)) {
				throw new Error(`S3.PUT Error: response=${JSON.stringify(s3Response)}`);

			} else {
				verboseLog(`S3.PUT: path=${path}, response=${JSON.stringify(s3Response)}`);
			}
		},

		get: async (path) => {
			var getParams = {
				Bucket: bucket,
				Key: `${prefix}${path}`,
			};
			
			try {
				const getObjectCommand = new GetObjectCommand(getParams);

				const s3Response = await s3Client.send(getObjectCommand);

				// aws sdk, v2 -> v3: s3Response.Body changed from Buffer (I think) to a stream;
				// now there's a new util function streamToBuffer above to convert
				// ref: https://github.com/aws/aws-sdk-js-v3/issues/1877

				const stream = s3Response.Body;

				return await streamToBuffer(stream);

			} catch (err) {
				if (err.Code == "NoSuchKey") {
					return null;

				} else {
					throw err;
				}
			}
		},

		del: async (path) => {
			if (bucketOptions.readOnly) {
				debugLog("Bucket is marked read-only: skipping DEL");
				
				return;
			}

			var deleteParams = {
				Bucket: bucket,
				Key: `${prefix}${path}`,
			};

			const deleteObjectCommand = new DeleteObjectCommand(deleteParams);

			const s3Response = await s3Client.send(deleteObjectCommand);

			
			if (!isSuccessful(s3Response)) {
				throw new Error(`S3.DEL Error: response=${JSON.stringify(s3Response)}`);

			} else {
				verboseLog(`S3.DEL: path=${path}, response=${JSON.stringify(s3Response)}`);
			}

				
			return s3Response;
		}
	};
};



module.exports = {
	createBucket: createBucket
};