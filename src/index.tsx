import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {MantineProvider} from "@mantine/core";
import {ModalsProvider} from "@mantine/modals";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colorScheme: 'dark',
            }}>
            <ModalsProvider>
                <App/>
            </ModalsProvider>
        </MantineProvider>
    </React.StrictMode>
);
