/**
 * @name QueryProvider
 * @description
 * @author darcrand
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AbortController, abortableFetch } from 'abortcontroller-polyfill/dist/cjs-ponyfill'
import { PropsWithChildren } from 'react'

globalThis.AbortController = AbortController
globalThis.fetch = abortableFetch

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

export default function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
