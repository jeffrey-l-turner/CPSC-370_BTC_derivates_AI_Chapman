import * as crypto from 'crypto';
import { Block } from './types';

const Blockchain2 = () => {
    let chain: Block[] = [];

    const fs = require('fs');
    const logFile = 'blockchain2.log';

    // Create the log file if it does not exist
    if (!fs.existsSync(logFile)) {
        fs.writeFileSync(logFile, '');
    }

import BlockData from './types';

    const createBlock = (data: BlockData) => {
        console.log('createBlock called in Blockchain2');
        const previousBlock = chain[chain.length - 1];
        const block: Block = {
            index: chain.length,
            timestamp: Date.now(),
            data,
            previousHash: previousBlock ? previousBlock.hash : null,
            hash: ''
        };
        block.hash = calculateHash(block);
        chain.push(block);

        // Write the block to the log file
        fs.appendFileSync(logFile, JSON.stringify(block) + '\n');
        console.log(`Blockchain2: wrote block to log file 2, ${block}`);
    };

    const calculateHash = (block: Block) => {
        const { index, timestamp, data, previousHash } = block;
        return crypto.createHash('sha256').update(index + timestamp + JSON.stringify(data) + previousHash).digest('hex');
    };

    // Create the genesis block if the chain is empty
    if (chain.length === 0) {
        createBlock({ info: 'Genesis Block' });
        console.warn(`Blockchain2: wrote genesis block to log file 1, ${chain.length}`);
    }
    // Initialize the chain with blocks from the log file
    const blocks = fs.readFileSync(logFile, 'utf-8').split('\n').filter(Boolean).map(JSON.parse);
    chain = blocks;

    const startProducingBlocks = () => {
        // Start producing blocks from the last block in the chain
        let blockCount = 0;
        const intervalId = setInterval(() => {
            if (blockCount < 5) {
                createBlock({ info: `New block in Blockchain2 at ${Date.now()}` });
                blockCount++;
            } else {
                clearInterval(intervalId);
            }
        }, 5000); // Create a new block every 5 seconds
        };

    // Start producing blocks
    startProducingBlocks();

    return {
        chain,
        createBlock
    };
}

Blockchain2();
export default Blockchain2;
