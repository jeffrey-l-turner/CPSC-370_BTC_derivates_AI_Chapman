import InterBlockchain from './interblockchain';

describe('InterBlockchain', () => {
    it('should produce valid blocks', () => {
        const interBlockchain = InterBlockchain();
        // Add your test logic here
        // For example, you can check the length of the chain
        // expect(interBlockchain.chain.length).toBeGreaterThan(0);
    });
});
import InterBlockchain from './interblockchain';

describe('InterBlockchain', () => {
  it('should have an empty shared state initially', () => {
    const interBlockchain = InterBlockchain();
    expect(interBlockchain.sharedState).toEqual({});
  });

  // Add more tests as needed
});
