const fs = require("fs");

process.env.DEBUG="*";
process.env.AWS_PROFILE = "links-app";

const appUtils = require("../index.js");

const s3Utils = appUtils.s3Utils;
const utils = appUtils.utils;

const s3Bucket = s3Utils.createBucket("links.rest", "us-east-2", "testing/app-utils");


let testKey = 'test-data/test2.txt';


const buffer = Buffer.from("abc");
console.log("Data: " + buffer);

(async () => {
	try {
		await s3Bucket.put(buffer, testKey);

		const getData = await s3Bucket.get(testKey);

		console.log("Data (retrieved): " + getData);

		const deleteResult = await s3Bucket.del(testKey);

		console.log("deleteResult: " + JSON.stringify(deleteResult));

		const getDataNonExistent = await s3Bucket.get("nonexistent-key");

		console.log("NonExistent: " + getDataNonExistent);

	} catch (err) {
		utils.logError("asdfuashdfe3", err);
	}
})();

/*
var ciphertext = Buffer.from(JSON.stringify(encryptor.encrypt(buffer)));
console.log("cipherLength: " + ciphertext.length);
console.log("cipher: " + JSON.stringify(ciphertext));

var credentials = new AWS.SharedIniFileCredentials({profile: 'links-app'});
AWS.config.credentials = credentials;

console.log("cred: " + JSON.stringify(AWS.config.credentials));

(async () => {
	var objectParams = {Bucket: bucketName, Key: keyName, Body: ciphertext};
	var s3Client = new AWS.S3({apiVersion: '2006-03-01'});
	var response = await s3Client.putObject(objectParams).promise();

	console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
	console.log("response: " + JSON.stringify(response));
})();*/