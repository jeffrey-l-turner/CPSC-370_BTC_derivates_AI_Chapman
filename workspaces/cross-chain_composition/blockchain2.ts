import * as crypto from 'crypto';

interface Block {
    index: number;
    timestamp: number;
    data: any;
    previousHash: string | null;
    hash: string;
}

const Blockchain2 = () => {
    let chain: Block[] = [];

    const fs = require('fs');
    const logFile = 'blockchain2.log';

    const createBlock = (data: any) => {
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
    };

    const calculateHash = (block: Block) => {
        const { index, timestamp, data, previousHash } = block;
        return crypto.createHash('sha256').update(index + timestamp + JSON.stringify(data) + previousHash).digest('hex');
    };

    // Create the genesis block
    createBlock({ info: 'Genesis Block' });

    const startProducingBlocks = () => {
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
export default Blockchain2;
