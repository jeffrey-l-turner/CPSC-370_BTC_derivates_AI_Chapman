import crypto from 'crypto';

const Blockchain1 = () => {
    let chain = [];

    const createBlock = (data) => {
        const previousBlock = chain[chain.length - 1];
        const block = {
            index: chain.length,
            timestamp: Date.now(),
            data,
            previousHash: previousBlock ? previousBlock.hash : null,
            hash: ''
        };
        block.hash = calculateHash(block);
        chain.push(block);
    };

    const calculateHash = (block) => {
        const { index, timestamp, data, previousHash } = block;
        return crypto.createHash('sha256').update(index + timestamp + JSON.stringify(data) + previousHash).digest('hex');
    };

    // Create the genesis block
    createBlock({ info: 'Genesis Block' });

    return {
        chain,
        createBlock
    };
}
export default Blockchain1;
