interface BlockData {
    info: string;
}

interface Block {
    index: number;
    timestamp: number;
    data: BlockData;
    previousHash: string | null;
    hash: string;
}

export { BlockData, Block };
