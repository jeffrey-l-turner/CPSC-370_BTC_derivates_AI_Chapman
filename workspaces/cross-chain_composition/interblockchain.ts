import { Block } from './types';

interface Blockchain {
    chain: Block[];
    createBlock: (data: Record<string, unknown>) => void;
}

const InterBlockchain = () => {
    import Blockchain1 from './blockchain1';
    import Blockchain2 from './blockchain2';

    console.log('InterBlockchain function called');

    const blockchain1 = Blockchain1();
    const blockchain2 = Blockchain2();

    let sharedState: Block[] = [...blockchain1.getState(), ...blockchain2.getState()];

    let lastBlockTime: number | null = null;

    const updateSharedState = () => {
        sharedState = [...blockchain1.getState(), ...blockchain2.getState()];
        blockchain1.setState(sharedState);
        blockchain2.setState(sharedState);
    };

const fs = require('fs');
const path = require('path');
const logFile1 = path.join(__dirname, 'blockchain1.log');
const logFile2 = path.join(__dirname, 'blockchain2.log');

// Create the log files if they do not exist
fs.open(logFile1, 'a', (err: NodeJS.ErrnoException | null) => {
    if (err) throw err;
});
fs.open(logFile2, 'a', (err: NodeJS.ErrnoException | null) => {
    if (err) throw err;
});

let chain1Length = fs.readFileSync(logFile1, 'utf-8').split('\n').filter(Boolean).length;
let chain2Length = fs.readFileSync(logFile2, 'utf-8').split('\n').filter(Boolean).length;

    const checkForNewBlocks = setInterval(() => {
        const blocks1 = fs.readFileSync(logFile1, 'utf-8').split('\n').filter(Boolean).map(JSON.parse);
        const blocks2 = fs.readFileSync(logFile2, 'utf-8').split('\n').filter(Boolean).map(JSON.parse);

        if (blocks1.length + blocks2.length - chain1Length - chain2Length >= 7) {
            console.log('7 new blocks produced. Terminating...');
            clearInterval(checkForNewBlocks);
            process.exit(0);
        } else {
            const currentTime = Date.now();
            if (lastBlockTime) {
                const interval = currentTime - lastBlockTime;
                console.log(`Time interval between blocks: ${interval} ms`);
            }
            lastBlockTime = currentTime;

            console.log('Shared State:', sharedState);
        }
    }, 3000); // Check every 3 seconds
    setTimeout(() => {
        console.log('One minute passed. Terminating...');
        clearInterval(checkForNewBlocks);
        process.exit(0);
    }, 60000); // Terminate after one minute
    // Removed direct calls to createBlock method of both blockchains
    // Removed logs of the blockchain chains and shared state

    // Methods for interblockchain communication and managing shared state go here
    return {
        sharedState
    }
}

export default InterBlockchain;
