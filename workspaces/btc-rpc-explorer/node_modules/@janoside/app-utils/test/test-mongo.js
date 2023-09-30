process.env.DEBUG = "*";


const appUtils = require("../index.js");

const mongoClient = appUtils.mongoClient;


let dbHost = "localhost";
let dbPort = 27017;
let dbName = "app-utils-test";

let dbSchema = [
	{
		name: "users",
		indexes: [
			{
				name: "username_1",
				key: { "username":1 },
				properties: { unique:true }
			},
			{
				name:"roles_1",
				key: { "roles":1 }
			}
		]
	},
	{
		name: "links",
		indexes: [
			{
				name: "userId_1",
				key: { "userId": 1 }
			},
			{
				name: "username_1",
				key: { "username": 1 }
			},
			{
				name: "date_1",
				key: { "date": 1 }
			},
			{
				name: "desc_1",
				key: { "desc": 1}
			},
			{
				name: "tags_1",
				key: { "tags": 1}
			}
		]
	}
];


(async() => {
	const db = await mongoClient.createClient(dbHost, dbPort, "testAdmin", "test", dbName, dbSchema);

	console.log("deleting just in case");
	await db.deleteOne("users", {username:"abc"});

	let abc = await db.findOne("users", {username: "abc"});

	console.log("abc: " + abc);

	let abcInsert = await db.insertOne("users", {username:"abc", roles:["haha"]});

	abc = await db.findOne("users", {username: "abc"});

	console.log("abc: " + JSON.stringify(abc));

	await db.deleteOne("users", {username:"abc"});

	abc = await db.findOne("users", {username: "abc"});

	console.log("abc: " + abc);

	await db.getRawDb().dropDatabase(() => {
		console.log("dropped db");

		process.exit();
	});
})();
