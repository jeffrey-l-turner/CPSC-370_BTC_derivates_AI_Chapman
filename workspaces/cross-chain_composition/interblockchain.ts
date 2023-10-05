import Blockchain1 from './blockchain1';
import Blockchain2 from './blockchain2';

const InterBlockchain = () => {
    const blockchain1 = Blockchain1();
    const blockchain2 = Blockchain2();
    const sharedState = {};

    console.log('Blockchain1:', blockchain1);
    console.log('Blockchain2:', blockchain2);
    console.log('Shared State:', sharedState);

    // Methods for interblockchain communication and managing shared state go here

    return {
        blockchain1,
        blockchain2,
        sharedState
    }
}
export default InterBlockchain;
