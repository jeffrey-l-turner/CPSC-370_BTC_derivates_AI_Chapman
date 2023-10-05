import * as crypto from 'crypto';

interface Block {
    index: number;
    timestamp: number;
    data: any;
    previousHash: string | null;
    hash: string;
}

const Blockchain1 = () => {
    let chain: Block[] = [];

    const fs = require('fs');
    const logFile = 'blockchain1.log';

    const createBlock = (data: any) => {
        console.log('createBlock called in Blockchain1');
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
        console.log(`Blockchain1: wrote block to log file 1, ${block}`);
    };

    const calculateHash = (block: Block) => {
        const { index, timestamp, data, previousHash } = block;
        return crypto.createHash('sha256').update(index + timestamp + JSON.stringify(data) + previousHash).digest('hex');
    };

    // Initialize the chain with blocks from the log file
    const blocks = fs.readFileSync(logFile, 'utf-8').split('\n').filter(Boolean).map(JSON.parse);
    if (blocks.length === 0) {
        // Create the genesis block if the log file is empty
        createBlock({ info: 'Genesis Block' });
    } else {
        chain = blocks;
    }

    const startProducingBlocks = () => {
        // Start producing blocks from the last block in the chain
        let blockCount = chain.length;
        let blockCount = 0;
        const intervalId = setInterval(() => {
            if (blockCount < 5) {
                createBlock({ info: `New block in Blockchain1 at ${Date.now()}` });
                blockCount++;
            } else {
                clearInterval(intervalId);
            }
        }, 10000); // Create a new block every 10 seconds
    };

    // Start producing blocks
    startProducingBlocks();

    return {
        chain,
        createBlock
    };
}
Blockchain1();
export default Blockchain1;
