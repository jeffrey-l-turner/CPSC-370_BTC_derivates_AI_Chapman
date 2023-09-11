"use strict";

const utils = require("../utils.js");
const config = require("../config.js");
const coins = require("../coins.js");

const SHA256 = require("crypto-js/sha256");
const axios = require("axios");

const earliestBlockTime = 1231006505;
const avgBlockTime = 200000;
const currentBlockHeight = 1234567;

async function getBlockchainInfo() {
  return {
    blocks: currentBlockHeight
  };
}

async function getNetworkInfo() {
  return getRpcData("getnetworkinfo");
}

async function getNetTotals() {
  return getRpcData("getnettotals");
}

async function getMempoolInfo() {
  return getRpcData("getmempoolinfo");
}

async function getUptimeSeconds() {
  return getRpcData("uptime");
}

async function getRawMempool() {
  return getRpcDataWithParams("getrawmempool", true);
}

async function getBlockByHeight(blockHeight) {
  const txCount = utils.seededRandomIntBetween(blockHeight, 1, 20);
  const txids = [];
  for (let i = 0; i < txCount; i++) {
    txids.push(SHA256("" + blockHeight + "_" + i));
  }

  return {
    "hash": SHA256("" + blockHeight),
    "confirmations": currentBlockHeight - blockHeight,
    "strippedsize": 56098,
    "size": 65384,
    "weight": 233678,
    "height": blockHeight,
    "version": 536870912,
    "versionHex": "20000000",
    "merkleroot": "567a3d773b07372179ad651edc02776f851020af69b7375a68ad89557dcbff5b",
    "tx": txids,
    "time": 1529848136,
    "mediantime": 1529846560,
    "nonce": 3615953854,
    "bits": "17376f56",
    "difficulty": "5077499034879.017",
    "chainwork": SHA256("xyz" + blockHeight),
    "previousblockhash": SHA256("" + (blockHeight - 1)),
    "nextblockhash": SHA256("" + (blockHeight + 1))
  };
}

async function getBlocksByHeight(blockHeights) {
  console.log("mock.getBlocksByHeight: " + blockHeights);
  const blocks = [];
  for (let i = 0; i < blockHeights.length; i++) {
    const result = await getBlockByHeight(blockHeights[i]);
    blocks.push(result);
  }

  return blocks;
}

async function getBlockByHash(blockHash) {
  return {
    "hash": blockHash,
    "confirmations": 3,
    "strippedsize": 56098,
    "size": 65384,
    "weight": 233678,
    "height": 123456,
    "version": 536870912,
    "versionHex": "20000000",
    "merkleroot": "567a3d773b07372179ad651edc02776f851020af69b7375a68ad89557dcbff5b",
    "tx": [
      "a97a04ebcaaca0ec80a6b2f295171eb8b082b4bc5446cd085444c304dca6f014",
      "223fdd9cae01f3253adc0f0133cc8e6bebdb6f1481dfa0cd9cbfebff656f32f8",
      "e999b2b8f1ee1e0b1adcc138d96d16e4fb65f2b422fc08d59a3b306b6a5c73d6",
      "328ae013c7870ab29ffd93e1a1c01db6205229f261a91a04e73539c99861923f",
      "b0604a447db9a0170a10a8d6cd2d68258783ae3061e5bfe5e26bcb6e76728c08",
    ],
    "time": 1529848136,
    "mediantime": 1529846560,
    "nonce": 3615953854,
    "bits": "17376f56",
    "difficulty": "5077499034879.017",
    "chainwork": "00000000000000000000000000000000000000000226420affb91a60111258b4",
    "previousblockhash": "0000000000000000003147c5229962ca4e38714fc5aee8cf38670cf1a4ef297b",
    "nextblockhash": "0000000000000000003382a0eef5b127c5d5ea270c85d9db3f3c605d32287cc5"
  };
}

async function getBlocksByHash(blockHashes) {
  const blocks = [];
  for (let i = 0; i < blockHashes.length; i++) {
    blocks.push({
      "hash": blockHashes[i],
      "confirmations": 3,
      "strippedsize": 56098,
      "size": 65384,
      "weight": 233678,
      "height": 123456,
      "version": 536870912,
      "versionHex": "20000000",
      "merkleroot": "567a3d773b07372179ad651edc02776f851020af69b7375a68ad89557dcbff5b",
      "tx": [
        "a97a04ebcaaca0ec80a6b2f295171eb8b082b4bc5446cd085444c304dca6f014",
        "223fdd9cae01f3253adc0f0133cc8e6bebdb6f1481dfa0cd9cbfebff656f32f8",
        "e999b2b8f1ee1e0b1adcc138d96d16e4fb65f2b422fc08d59a3b306b6a5c73d6",
        "328ae013c7870ab29ffd93e1a1c01db6205229f261a91a04e73539c99861923f",
        "b0604a447db9a0170a10a8d6cd2d68258783ae3061e5bfe5e26bcb6e76728c08",
      ],
      "time": 1529848136,
      "mediantime": 1529846560,
      "nonce": 3615953854,
      "bits": "17376f56",
      "difficulty": "5077499034879.017",
      "chainwork": "00000000000000000000000000000000000000000226420affb91a60111258b4",
      "previousblockhash": "0000000000000000003147c5229962ca4e38714fc5aee8cf38670cf1a4ef297b",
      "nextblockhash": "0000000000000000003382a0eef5b127c5d5ea270c85d9db3f3c605d32287cc5"
    });
  }

  return blocks;
}

async function getRawTransaction(txid) {
  return {
    "txid": txid,
    "hash": txid,
    "version": 1,
    "size": 237,
    "vsize": 210,
    "locktime": 0,
    "vin": [
      {
        "coinbase": "03851208fabe6d6d7bf60491521f081d77fa018fb41a167dd447bf20e7d2487426c3cee65332cdb50100000000000000266508019fcf7fcb7b01002ffd0c2f736c7573682f",
        "sequence": 0
      }
    ],
    "vout": [
      {
        "value": 12.51946416,
        "n": 0,
        "scriptPubKey": {
          "asm": "OP_DUP OP_HASH160 7c154ed1dc59609e3d26abb2df2ea3d587cd8c41 OP_EQUALVERIFY OP_CHECKSIG",
          "hex": "76a9147c154ed1dc59609e3d26abb2df2ea3d587cd8c4188ac",
          "reqSigs": 1,
          "type": "pubkeyhash",
          "addresses": [
            "1CK6KHY6MHgYvmRQ4PAafKYDrg1ejbH1cE"
          ]
        }
      },
      {
        "value": 0,
        "n": 1,
        "scriptPubKey": {
          "asm": "OP_RETURN aa21a9ed2b367f88dbcc39b83e89703d5425a9b51fa3d2d921b8f39a42bc54492b986281",
          "hex": "6a24aa21a9ed2b367f88dbcc39b83e89703d5425a9b51fa3d2d921b8f39a42bc54492b986281",
          "type": "nulldata"
        }
      }
    ],
    "hex": "010000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff4503851208fabe6d6d7bf60491521f081d77fa018fb41a167dd447bf20e7d2487426c3cee65332cdb50100000000000000266508019fcf7fcb7b01002ffd0c2f736c7573682f0000000002b02f9f4a000000001976a9147c154ed1dc59609e3d26abb2df2ea3d587cd8c4188ac0000000000000000266a24aa21a9ed2b367f88dbcc39b83e89703d5425a9b51fa3d2d921b8f39a42bc54492b9862810120000000000000000000000000000000000000000000000000000000000000000000000000",
    "blockhash": "000000000000000000001542470d8261b9e5a2c3c2be2e2ab292d1a4c8250b12",
    "confirmations": 3,
    "time": 1529848136,
    "blocktime": 1529848136
  };
}

async function getAddress(address) {
  try {
    const response = await axios.get(`https://blockchain.com/rawaddr/${address}`);
    const data = response.data;

    return {
      "address": data.address,
      "balance": data.final_balance,
      "totalReceived": data.total_received,
      "totalSent": data.total_sent,
      "transactionCount": data.n_tx,
      "transactions": data.txs.map(tx => tx.hash)
    };
  } catch (error) {
    throw new Error("Failed to get address information");
  }
}

async function getRawTransactions(txids) {
  const txs = [];
  for (let i = 0; i < txids.length; i++) {
    txs.push({
      "txid": txid,
      "hash": txid,
      "version": 1,
      "size": 237,
      "vsize": 210,
      "locktime": 0,
      "vin": [
        {
          "coinbase": "03851208fabe6d6d7bf60491521f081d77fa018fb41a167dd447bf20e7d2487426c3cee65332cdb50100000000000000266508019fcf7fcb7b01002ffd0c2f736c7573682f",
          "sequence": 0
        }
      ],
      "vout": [
        {
          "value": 12.51946416,
          "n": 0,
          "scriptPubKey": {
            "asm": "OP_DUP OP_HASH160 7c154ed1dc59609e3d26abb2df2ea3d587cd8c41 OP_EQUALVERIFY OP_CHECKSIG",
            "hex": "76a9147c154ed1dc59609e3d26abb2df2ea3d587cd8c4188ac",
            "reqSigs": 1,
            "type": "pubkeyhash",
            "addresses": [
              "1CK6KHY6MHgYvmRQ4PAafKYDrg1ejbH1cE"
            ]
          }
        },
        {
          "value": 0,
          "n": 1,
          "scriptPubKey": {
            "asm": "OP_RETURN aa21a9ed2b367f88dbcc39b83e89703d5425a9b51fa3d2d921b8f39a42bc54492b986281",
            "hex": "6a24aa21a9ed2b367f88dbcc39b83e89703d5425a9b51fa3d2d921b8f39a42bc54492b986281",
            "type": "nulldata"
          }
        }
      ],
      "hex": "010000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff4503851208fabe6d6d7bf60491521f081d77fa018fb41a167dd447bf20e7d2487426c3cee65332cdb50100000000000000266508019fcf7fcb7b01002ffd0c2f736c7573682f0000000002b02f9f4a000000001976a9147c154ed1dc59609e3d26abb2df2ea3d587cd8c4188ac0000000000000000266a24aa21a9ed2b367f88dbcc39b83e89703d5425a9b51fa3d2d921b8f39a42bc54492b9862810120000000000000000000000000000000000000000000000000000000000000000000000000",
      "blockhash": "000000000000000000001542470d8261b9e5a2c3c2be2e2ab292d1a4c8250b12",
      "confirmations": 3,
      "time": 1529848136,
      "blocktime": 1529848136
    });
  }

  return txs;
}

async function getHelp() {
  throw new Error("Not implemented");
}

async function getRpcMethodHelp(methodName) {
  throw new Error("Not implemented");
}

module.exports = {
  getBlockchainInfo,
  getNetworkInfo,
  getNetTotals,
  getMempoolInfo,
  getBlockByHeight,
  getBlocksByHeight,
  getBlockByHash,
  getRawTransaction,
  getRawTransactions,
  getRawMempool,
  getUptimeSeconds,
  getHelp,
  getRpcMethodHelp,
  getAddress
};
