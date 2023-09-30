const crypto = require("crypto");
const { DateTime } = require("luxon");

const debug = require("debug");
const debugLog = debug("app:utils");
const debugErrorLog = debug("app:error");
const debugErrorVerboseLog = debug("app:errorVerbose");



// safely handles circular references
JSON.safeStringify = (obj, indent = 2) => {
	let cache = [];
	const retVal = JSON.stringify(
	  obj,
	  (key, value) =>
		typeof value === "object" && value !== null
		  ? cache.includes(value)
			? undefined // Duplicate reference found, discard key
			: cache.push(value) && value // Store value in our collection
		  : value,
	  indent
	);
	cache = null;
	return retVal;
};

function formatDate(date, formatStr="yyyy-MM-dd h:mma") {
	return DateTime.fromJSDate(date).toFormat(formatStr).replace("AM", "am").replace("PM", "pm");
}

function randomString(length, chars="aA#") {
	var mask = "";
	
	if (chars.indexOf("a") > -1) {
		mask += "abcdefghijklmnopqrstuvwxyz";
	}
	
	if (chars.indexOf("A") > -1) {
		mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	}
	
	if (chars.indexOf("#") > -1) {
		mask += "0123456789";
	}
	
	if (chars.indexOf("!") > -1) {
		mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
	}
	
	var result = "";
	for (var i = length; i > 0; --i) {
		result += mask[Math.floor(Math.random() * mask.length)];
	}
	
	return result;
}

function ellipsize(str, length, ending="…") {
	if (str.length <= length) {
		return str;

	} else {
		return str.substring(0, length - ending.length) + ending;
	}
}

function ellipsizeFront(str, length, start="…") {
	if (str.length <= length) {
		return str;

	} else {
		return start + str.substring(str.length - length + start.length);
	}
}

function ellipsizeMiddle(str, length, replacement="…", extraCharAtStart=true) {
	if (str.length <= length) {
		return str;

	} else {
		//"abcde"(3)->"a…e"
		//"abcdef"(3)->"a…f"
		//"abcdef"(5)->"ab…ef"
		//"abcdef"(4)->"ab…f"
		if ((length - replacement.length) % 2 == 0) {
			return str.substring(0, (length - replacement.length) / 2) + replacement + str.slice(-(length - replacement.length) / 2);

		} else {
			if (extraCharAtStart) {
				return str.substring(0, Math.ceil((length - replacement.length) / 2)) + replacement + str.slice(-Math.floor((length - replacement.length) / 2));

			} else {
				return str.substring(0, Math.floor((length - replacement.length) / 2)) + replacement + str.slice(-Math.ceil((length - replacement.length) / 2));
			}
			
		}
	}
}


function seededRandom(seed) {
	var x = Math.sin(seed++) * 10000;
	return x - Math.floor(x);
}

function seededRandomIntBetween(seed, min, max) {
	var rand = seededRandom(seed);
	return (min + (max - min) * rand);
}

function randomInt(min, max) {
	return min + Math.floor(Math.random() * max);
}





function dayMillis() {
	return 1000 * 60 * 60 * 24;
}

function weekMillis() {
	return dayMillis() * 7;
}

function monthMillis() {
	return dayMillis() * 30;
}

function yearMillis() {
	return parseInt(dayMillis() * 365.2422);
}

function toUrlString(str) {
	return str.replace(" ", "-");
}

function objectProperties(obj) {
	const props = [];
	for (const prop in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, prop)) {
			props.push(prop);
		}
	}

	return props;
}

function objectHasProperty(obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
}

const sha256 = (data) => {
	return crypto.createHash("sha256").update(data).digest("hex");
};

const descBuffer = (buffer, format="base64", fullDetail=false) => {
	let formatted = buffer.toString(format);
	
	if (fullDetail) {
		return {
			length: buffer.length,
			sha256: sha256(buffer).substring(0, 16) + "...",
			data: `${formatted.substring(0, 16)}...${formatted.substring(100, 116)}...${formatted.substring(formatted.length - 16, formatted.length)}`
		};
	} else {
		return `buffer: len=${buffer.length.toLocaleString()}, ${formatted.substring(0, 16)}...${formatted.substring(100, 116)}...${formatted.substring(formatted.length - 16, formatted.length)}, sha256: ${sha256(buffer).substring(0, 16)}...`;
	}
};

const intArray = (min, max) => {
	let array = [];
	for (let i = min; i <= max; i++) {
		array.push(i);
	}

	return array;
};


global.errorStats = {};
function logError(errorId, err, optionalUserData = {}, logStacktrace=true) {
	if (!global.errorLog) {
		global.errorLog = [];
	}

	if (!global.errorStats[errorId]) {
		global.errorStats[errorId] = {
			count: 0,
			firstSeen: new Date().getTime(),
			properties: {}
		};
	}

	if (optionalUserData && err.message) {
		optionalUserData.errorMsg = err.message;
	}

	if (optionalUserData) {
		for (const [key, value] of Object.entries(optionalUserData)) {
			if (!global.errorStats[errorId].properties[key]) {
				global.errorStats[errorId].properties[key] = {};
			}

			if (!global.errorStats[errorId].properties[key][value]) {
				global.errorStats[errorId].properties[key][value] = 0;
			}

			global.errorStats[errorId].properties[key][value]++;
		}
	}

	global.errorStats[errorId].count++;
	global.errorStats[errorId].lastSeen = new Date().getTime();

	global.errorLog.push({errorId:errorId, error:err, userData:optionalUserData, date:new Date()});
	while (global.errorLog.length > 100) {
		global.errorLog.splice(0, 1);
	}

	debugErrorLog("Error " + errorId + ": " + err + ", json: " + JSON.stringify(err) + (optionalUserData != null ? (", userData: " + optionalUserData + " (json: " + JSON.stringify(optionalUserData) + ")") : ""));
	
	if (err && err.stack && logStacktrace) {
		debugErrorVerboseLog("Stack: " + err.stack);
	}

	if (err.cause) {
		debugErrorLog("Caused by: " + err.cause);

		if (err.cause.stack && logStacktrace) {
			debugErrorVerboseLog("Cause Stack: " + err.cause.stack);
		}
	}

	var returnVal = {errorId:errorId, error:err};
	if (optionalUserData) {
		returnVal.userData = optionalUserData;
	}

	return returnVal;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const pluralize = (str, num) => { return (str + (num == 1 ? "" : "s")); };

const roundToNearest15 = (date = new Date()) => {
	const minutes = 15;
	const ms = 1000 * 60 * minutes;

	// 👇️ replace Math.round with Math.ceil to always round UP
	return new Date(Math.round(date.getTime() / ms) * ms);
};


// ref: https://stackoverflow.com/a/53577159/673828
function stdev(array) {
	const n = array.length;
	const mean = array.reduce((a, b) => a + b) / n;

	return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}


module.exports = {
	formatDate: formatDate,
	randomString: randomString,
	seededRandom: seededRandom,
	seededRandomIntBetween: seededRandomIntBetween,
	randomInt: randomInt,
	ellipsize: ellipsize,
	ellipsizeFront: ellipsizeFront,
	ellipsizeMiddle: ellipsizeMiddle,
	dayMillis: dayMillis,
	weekMillis: weekMillis,
	monthMillis: monthMillis,
	yearMillis: yearMillis,
	toUrlString: toUrlString,
	objectProperties: objectProperties,
	objectHasProperty: objectHasProperty,
	sha256: sha256,
	logError: logError,
	descBuffer: descBuffer,
	sleep: sleep,
	pluralize: pluralize,
	intArray: intArray,
	stdev: stdev
};