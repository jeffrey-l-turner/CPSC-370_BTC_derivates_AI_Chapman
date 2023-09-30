const { MongoClient, ObjectId } = require("mongodb");
const debug = require("debug");

const utils = require("./utils.js");
const passwordUtils = require("./passwordUtils.js");

const debugLog = debug("app:db");


const createClient = async (dbHost, dbPort, dbUsername, dbPassword, dbName, dbSchema) => {
	const db = await connectToDbAndRefreshSchema(dbHost, dbPort, dbUsername, dbPassword, dbName, dbSchema);

	return {
		countDocuments: async (collectionName, query={}) => {
			return _countDocuments(db, collectionName, query);
		},
		aggregate: (collectionName, aggregateProperties=[]) => {
			return _aggregate(db, collectionName, aggregateProperties)
		},
		findMany: async (collectionName, query, options={}, limit=-1, offset=0, returnAsArray=true) => {
			return _findMany(db, collectionName, query, options, limit, offset, returnAsArray);
		},
		findOne: async (collectionName, query, options={}) => {
			return _findOne(db, collectionName, query, options);
		},
		insertMany: async (collectionName, documents) => {
			return _insertMany(db, collectionName, documents);
		},
		insertOne: async (collectionName, document) => {
			return _insertOne(db, collectionName, document);
		},
		updateOne: async (collectionName, query, changeObj) => {
			return _updateOne(db, collectionName, query, changeObj);
		},
		deleteOne: async (collectionName, query) => {
			return _deleteOne(db, collectionName, query);
		},
		deleteMany: async (collectionName, query) => {
			return _deleteMany(db, collectionName, query);
		},
		getCollection: async (collectionName) => {
			return _getCollection(db, collectionName);
		},
		getRawDb: () => {
			return db;
		}
	};
};

const connectToDbAndRefreshSchema = async (dbHost, dbPort, dbUsername, dbPassword, dbName, dbSchema) => {
	let authMechanism = "SCRAM-SHA-256";

	let usernamePassword = `${encodeURIComponent(dbUsername || "")}:${encodeURIComponent(dbPassword || "")}@`;

	let connectionUrl = `mongodb://${usernamePassword}${dbHost}:${dbPort}/?authMechanism=${authMechanism}`;

	//debugLog(`Connecting to database: ${connectionUrl}`);
	debugLog(`Connecting to database: ${dbHost}:${dbPort}`);
	
	const client = new MongoClient(connectionUrl);

	try {
		await client.connect();

		await client.db("admin").command({ ping: 1 });

		debugLog(`Success: Connected to database`);

		let db = client.db(dbName);

		await setupSchema(db, dbSchema);

		return db;

	} catch (err) {
		utils.logError("mongodb.connection-failure", err);

		await client.close();

		throw err;
	}
}

function normalizeQuery(query) {
	// _id: "string" -> "ObjectId"
	if (query._id) {
		if (typeof query._id == "string") {
			query._id = new ObjectId(query._id);
		}
	}

	return query;
}



async function setupSchema(db, dbSchema) {
	const existingCollections = await db.listCollections().toArray();
	const existingCollectionNames = existingCollections.map(c => c.name);

	debugLog("Existing collections: " + JSON.stringify(existingCollectionNames));

	dbSchema.forEach(async (collection) => {
		if (!existingCollectionNames.includes(collection.name)) {
			debugLog(`setupSchema: creating collection '${collection.name}'`);
	
			await db.createCollection(collection.name);

		} else {
			debugLog(`setupSchema: collection '${collection.name}' already exists`);
		}

		await setupCollectionIndexes(db, collection.name, collection.indexes);
	});
}

async function setupCollectionIndexes(db, collectionName, neededIndexes) {
	const existingIndexNames = await getCollectionIndexes(db, collectionName);

	neededIndexes.forEach(async (neededIndex) => {
		if (!existingIndexNames.includes(neededIndex.name)) {
			debugLog(`setupSchema: ${collectionName}.index[${neededIndex.name}] being created`);

			await db.collection(collectionName).createIndex( neededIndex.key, neededIndex.properties);

		} else {
			debugLog(`setupSchema: ${collectionName}.index[${neededIndex.name}] already exists`);
		}
	});
}

async function getCollectionIndexes(db, collectionName) {
	const cursor = await db.collection(collectionName).listIndexes();
	const existingIndexNames = [];

	while (await cursor.hasNext()) {
		const existingIndex = await cursor.next();
		
		if (existingIndex != null && existingIndex.name != null) {
			existingIndexNames.push(existingIndex.name);
		}
	}

	return existingIndexNames;
}




async function _findOne(db, collectionName, query, options={}) {
	let objects = await _findMany(db, collectionName, normalizeQuery(query), options);

	return objects[0];
}

async function _findMany(db, collectionName, query, options={}, limit=-1, offset=0, returnAsArray=true) {
	let collection = db.collection(collectionName);

	let cursor = await collection.find(normalizeQuery(query), options);

	if (offset > 0) {
		cursor.skip(offset);
	}

	if (limit > 0) {
		cursor.limit(limit);
	}

	if (returnAsArray) {
		return cursor.toArray();

	} else {
		return cursor;
	}
}

async function _countDocuments(db, collectionName, query={}) {
	let collection = db.collection(collectionName);

	const count = await collection.countDocuments(normalizeQuery(query));

	return count;
}

function _aggregate(db, collectionName, aggregateProperties=[]) {
	let collection = db.collection(collectionName);

	return collection.aggregate(aggregateProperties);
}

async function _insertOne(db, collectionName, document) {
	const insertedObjectIds = await _insertMany(db, collectionName, [document]);

	return insertedObjectIds[0];
}

async function _insertMany(db, collectionName, documents) {
	let collection = db.collection(collectionName);

	documents.forEach((doc) => {
		if (!doc.createdAt) {
			doc.createdAt = new Date();
		}

		doc.updatedAt = new Date();
	});

	const result = await collection.insertMany(documents);

	const insertedObjectIds = [];
	for (let i = 0; i < result.insertedCount; i++) {
		insertedObjectIds.push(result.insertedIds[`${i}`]);
	}

	debugLog(`${collectionName}: inserted ${result.insertedCount} document(s)`);

	return insertedObjectIds;
}

async function _updateOne(db, collectionName, query, changeObj) {
	let collection = db.collection(collectionName);

	const result = await collection.updateOne(normalizeQuery(query), changeObj);

	return result;
}

async function _deleteOne(db, collectionName, query) {
	let collection = db.collection(collectionName);

	const result = await collection.deleteOne(normalizeQuery(query));

	return result;
}

async function _deleteMany(db, collectionName, query) {
	let collection = db.collection(collectionName);

	const result = await collection.deleteMany(normalizeQuery(query));

	return result;
}

async function _getCollection(db, collectionName) {
	return new Promise(async (resolve, reject) => {
		resolve(db.collection(collectionName));
	});
}



const createAdminUserIfNeeded = async (db, username, password) => {
	// create admin user if needed
	const adminUser = await db.findOne("users", {username: username});
	if (!adminUser) {
		debugLog(`Creating admin user '${username}'...`);

		const passwordHash = await passwordUtils.hash(password);

		const adminUser = {
			username: username,
			passwordHash: passwordHash,
			roles: ["admin"]
		};

		await db.insertOne("users", adminUser);

		debugLog(`Admin user '${username}' created.`);

	} else {
		debugLog(`Admin user '${username}' already exists`);
	}
};

const createObjectByUniquePropertyIfNeeded = async (db, objectType, propertyName, propertyValue, obj) => {
	let filter = {};
	filter[propertyName] = propertyValue;

	const existingObject = await db.findOne(objectType, filter);

	if (!existingObject) {
		await db.insertOne(objectType, obj);

		debugLog(`${objectType}(${propertyName}=${propertyValue}) created.`);
	}
};



const runMigrationsAsNeeded = async (db, migrationsList) => {
	const migrateCollection = async (migrationName, collectionName, filter, updateFunc) => {
		const collection = await db.getCollection(collectionName);

		const objs = await db.findMany(collectionName, filter);
		
		debugLog(`Preparing migration '${migrationName}': filter=${JSON.stringify(filter)}, updateFunc=${JSON.stringify(updateFunc)}`);
		debugLog(`Running migration '${migrationName}' on ${objs.length} object(s)...`);

		const updateResult = await collection.updateMany(filter, updateFunc);

		debugLog(`Migration '${migrationName}' done: ${JSON.stringify(updateResult)}`)
		
		/*for (let i = 0; i < objs.length; i++) {
			if (i % 1 == 0) {
				debugLog(`Migration '${migrationName}' update: done with ${i + 1} objects...`);
			}

			
		}*/
	};

	// this migrates each doc in a collection individually with an app function
	const migrateCollectionViaApplicationFunction = async (db, migrationName, collectionName, filter, appFunc) => {
		const collection = await db.getCollection(collectionName);

		const objs = await db.findMany(collectionName, filter);
		
		debugLog(`Preparing migration '${migrationName}': filter=${JSON.stringify(filter)}, func=${JSON.stringify(appFunc)}`);
		debugLog(`Running migration '${migrationName}' on ${objs.length} object(s)...`);

		let failureIds = [];
		for (let i = 0; i < objs.length; i++) {
			let doc = objs[i];
			
			try {
				await appFunc(doc);
				
				const updateResult = await collection.updateOne({_id:doc._id}, {$set: doc});

				debugLog(`Migration result[${i}]: ${JSON.stringify(updateResult)}`);

			} catch (err) {
				appUtils.utils.logError(`migration-${migrationName}-doc-${doc._id}`, err, {doc: doc});

				failureIds.push(doc._id);
			}
		}

		debugLog(`Migration '${migrationName}' done, failures: ${failureIds.length}`);

		if (failureIds.length > 0) {
			debugLog(`Failure IDs (${failureIds.length.toLocaleString()}): ${failureIds}`);
		}

		/*for (let i = 0; i < objs.length; i++) {
			if (i % 1 == 0) {
				debugLog(`Migration '${migrationName}' update: done with ${i + 1} objects...`);
			}

			
		}*/
	};

	// this allows running arbitrary DB operations with an app function
	const migrateDbViaApplicationFunction = async (migrationName, appFunc) => {
		debugLog(`Running migration '${migrationName}': func=${JSON.stringify(appFunc)}`);
		
		try {
			await appFunc();

			debugLog(`Migration done, without error.`);

		} catch (err) {
			appUtils.utils.logError(`migration-${migrationName}`, err);

			debugLog(`Migration done, with ERROR!`);

			throw err;
		}
	};


	for (let i = 0; i < migrationsList.length; i++) {
		const migration = migrationsList[i];

		const dataMigrationsCollection = await db.getCollection("dataMigrations");
		
		let dataMigration = await db.findOne("dataMigrations", {name:migration.name});
		if (!dataMigration) {
			try {
				if (migration.appFunction) {
					if (migration.collection) {
						await migrateCollectionViaApplicationFunction(migration.name, migration.collection, migration.filter, migration.appFunction);

					} else {
						await migrateDbViaApplicationFunction(migration.name, migration.appFunction);
					}

				} else if (migration.updateFunc) {
					await migrateCollection(migration.name, migration.collection, migration.filter, migration.updateFunc);

				} else {
					throw new Error(`Unknown migration type: ${migration.name}`);
				}


				dataMigration = {
					name: migration.name
				};

				await db.insertOne("dataMigrations", dataMigration);


			} catch (err) {
				appUtils.utils.logError(`migration-failure-${migration.name}`, err);
			}
		} else {
			debugLog(`Migration '${migration.name}' already done.`);
		}
	}
};


module.exports = {
	createClient: createClient,
	createObjectByUniquePropertyIfNeeded: createObjectByUniquePropertyIfNeeded,
	createAdminUserIfNeeded: createAdminUserIfNeeded,
	runMigrationsAsNeeded: runMigrationsAsNeeded
}