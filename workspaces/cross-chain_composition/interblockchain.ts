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

    blockchain1.createBlock({ info: 'New block in Blockchain1' });
    blockchain2.createBlock({ info: 'New block in Blockchain2' });

    console.log('Blockchain1:', blockchain1.chain);
    console.log('Blockchain2:', blockchain2.chain);
    console.log('Shared State:', sharedState);

    // Methods for interblockchain communication and managing shared state go here

    return {
        blockchain1,
        blockchain2,
        sharedState
    }
}
export default InterBlockchain;
