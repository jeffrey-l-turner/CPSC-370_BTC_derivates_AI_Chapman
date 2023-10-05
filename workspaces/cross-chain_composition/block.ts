interface Block {
    index: number;
    timestamp: number;
    data: Record<string, unknown>;
    previousHash: string | null;
    hash: string;
}

export default Block;
