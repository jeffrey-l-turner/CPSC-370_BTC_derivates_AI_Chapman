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
      // For now, it just returns the input as is
      return input
    },
  })
