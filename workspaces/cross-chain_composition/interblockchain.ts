import Blockchain1 from './blockchain1';
import Blockchain2 from './blockchain2';

const InterBlockchain = () => {
    const blockchain1 = Blockchain1();
    const blockchain2 = Blockchain2();
    const sharedState = {};

    // Methods for interblockchain communication and managing shared state go here

    return {
        blockchain1,
        blockchain2,
        sharedState
    }
}
export default InterBlockchain;
