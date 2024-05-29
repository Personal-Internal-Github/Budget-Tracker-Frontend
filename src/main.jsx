import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </QueryClientProvider>
)
