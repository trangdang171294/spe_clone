import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import './index.css';
import { AppProvider } from './contexts/app.context';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // disable option khi focus windown thi ko refetch lai data
            refetchOnWindowFocus: false,
            // disable retry query
            retry: 0,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AppProvider>
                    <App />
                </AppProvider>
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
