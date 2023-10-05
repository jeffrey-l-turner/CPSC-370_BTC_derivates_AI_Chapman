import Blockchain1 from './blockchain1';
import Blockchain2 from './blockchain2';

interface Blockchain {
    chain: any[];
    createBlock: (data: any) => void;
}

    const InterBlockchain = () => {
        console.log('InterBlockchain function called');
        const blockchain1: Blockchain = Blockchain1();
        const blockchain2: Blockchain = Blockchain2();
        const sharedState: any = {};

        let chain1Length = blockchain1.chain.length;
        let chain2Length = blockchain2.chain.length;
        let lastBlockTime: number | null = null;

    const fs = require('fs');
    const logFile1 = 'blockchain1.log';
    const logFile2 = 'blockchain2.log';

    const checkForNewBlocks = setInterval(() => {
        const blocks1 = fs.readFileSync(logFile1, 'utf-8').split('\n').filter(Boolean).map(JSON.parse);
        const blocks2 = fs.readFileSync(logFile2, 'utf-8').split('\n').filter(Boolean).map(JSON.parse);

        if (blocks1.length + blocks2.length >= 10) {
            console.log('10 blocks produced. Terminating...');
            clearInterval(checkForNewBlocks);
            process.exit(0);
        } else {
            const currentTime = Date.now();
            if (lastBlockTime) {
                const interval = currentTime - lastBlockTime;
                console.log(`Time interval between blocks: ${interval} ms`);
            }
            lastBlockTime = currentTime;

            chain1Length = blocks1.length;
            chain2Length = blocks2.length;

            sharedState.blockchain1CurrentHash = blocks1[blocks1.length - 1].hash;
            sharedState.blockchain2CurrentHash = blocks2[blocks2.length - 1].hash;

            console.log('Blockchain1:', blocks1);
            console.log('Blockchain2:', blocks2);
            console.log('Shared State:', sharedState);
        }
    }, 1000); // Check every second
        setTimeout(() => {
            console.log('One minute passed. Terminating...');
            clearInterval(checkForNewBlocks);
            process.exit(0);
        }, 60000); // Terminate after one minute

        // Removed direct calls to createBlock method of both blockchains
        // Removed logs of the blockchain chains and shared state

        // Methods for interblockchain communication and managing shared state go here
        return {
            blockchain1,
            blockchain2,
            sharedState
        }
    }

    export default InterBlockchain;
