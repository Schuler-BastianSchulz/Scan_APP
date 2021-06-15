import React, {Suspense} from 'react';
import './App.css';

import {HashRouter as Router} from "react-router-dom"
import Application from "./Application";

function AppHistory() {

    return (
         <Router>
             <Suspense fallback="loading">
                <Application/>
             </Suspense>
         </Router>
    )
}

export default AppHistory

