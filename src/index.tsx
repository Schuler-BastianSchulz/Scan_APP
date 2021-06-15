import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import AppHistory from "./AppHistory";
import './i18n';

declare global {
    interface Window {
    }
}

declare global {
    interface Navigator {
    }
}

function startApp () {
    ReactDOM.render(<AppHistory />, document.getElementById('root'));
}

startApp();

serviceWorker.unregister();
