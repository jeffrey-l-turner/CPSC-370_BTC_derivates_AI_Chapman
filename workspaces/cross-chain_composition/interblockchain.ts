interface Blockchain {
    chain: any[];
    createBlock: (data: any) => void;
}

    const InterBlockchain = () => {
        console.log('InterBlockchain function called');
        const sharedState: any = {};

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
            sharedState
        }
    }

    export default InterBlockchain;
