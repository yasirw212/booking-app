import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppContextProvider } from './contexts/AppContext.tsx'
import { SearchContextProvider } from './contexts/SearchContext.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <SearchContextProvider>
            <App />
          </SearchContextProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>,
); 
