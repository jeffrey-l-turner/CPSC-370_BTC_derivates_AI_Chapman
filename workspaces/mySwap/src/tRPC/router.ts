import { createRouter } from '@trpc/server'
import { z } from 'zod'

// Define input schema for TrendingTokens procedure
const TrendingTokensInput = z.object({
  chain: z.string(),
})

// Define tRPC router
export const router = createRouter()
  .query('TrendingTokens', {
    input: TrendingTokensInput,
    resolve: async ({ input }) => {
      // Replace this with your actual logic to fetch trending tokens
      // For now, it just returns a placeholder data
      return {
        topTokens: [
          {
            id: '1',
            decimals: 18,
            name: 'Token 1',
            chain: input.chain,
            standard: 'ERC20',
            address: '0x...',
            symbol: 'TOKEN1',
            market: {
              id: '1',
              price: {
                id: '1',
                value: '1.00',
                currency: 'USD',
              },
              pricePercentChange: {
                id: '1',
                value: '0.01',
              },
              volume24H: {
                id: '1',
                value: '1000.00',
                currency: 'USD',
              },
            },
            project: {
              id: '1',
              logoUrl: 'https://example.com/logo.png',
              safetyLevel: 'SAFE',
            },
          },
          // Add more tokens as needed
        ],
      }
    },
  })
