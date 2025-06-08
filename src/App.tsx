import { Router } from './router/Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" position="bottom" />
    </QueryClientProvider>
  )
}

export default App
