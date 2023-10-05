import BlockData from './types';

interface Block {
    index: number;
    timestamp: number;
    data: BlockData;
    previousHash: string | null;
    hash: string;
}

export default Block;
