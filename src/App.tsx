import { AuthProvider } from "./context/auth"
import { Router } from "./router/Router"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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
    </QueryClientProvider>
  )
}

export default App
