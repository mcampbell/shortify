import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// https://dev.to/annequinkenstein/adding-fonts-to-create-react-app-3ed7
import './fonts/NHaasGroteskTXPro-55Rg.ttf';
import './fonts/NHaasGroteskTXPro-65Md.ttf';
import './fonts/NHaasGroteskTXPro-75Bd.ttf';

import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
