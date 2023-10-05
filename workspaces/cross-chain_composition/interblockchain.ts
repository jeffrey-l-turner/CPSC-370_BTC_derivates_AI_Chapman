import Blockchain1 from './blockchain1';
import Blockchain2 from './blockchain2';

interface Blockchain {
    chain: any[];
    createBlock: (data: any) => void;
}

    const InterBlockchain = () => {
        const blockchain1: Blockchain = Blockchain1();
        const blockchain2: Blockchain = Blockchain2();
        const sharedState: any = {};

        let chain1Length = blockchain1.chain.length;
        let chain2Length = blockchain2.chain.length;
        let lastBlockTime: number | null = null;

        const checkForNewBlocks = setInterval(() => {
            if (blockchain1.chain.length === chain1Length && blockchain2.chain.length === chain2Length) {
                console.log('No new blocks produced. Terminating...');
                clearInterval(checkForNewBlocks);
                process.exit(0);
            } else {
                const currentTime = Date.now();
                if (lastBlockTime) {
                    const interval = currentTime - lastBlockTime;
                    console.log(`Time interval between blocks: ${interval} ms`);
                }
                lastBlockTime = currentTime;

                chain1Length = blockchain1.chain.length;
                chain2Length = blockchain2.chain.length;

                sharedState.blockchain1CurrentHash = blockchain1.chain[blockchain1.chain.length - 1].hash;
                sharedState.blockchain2CurrentHash = blockchain2.chain[blockchain2.chain.length - 1].hash;
            }
        }, 10000); // Check every 10 seconds

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
