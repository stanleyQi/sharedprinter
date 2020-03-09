import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Route } from 'react-router-dom'

import Home from "./App"
import Print from "./Components/Print/Print"

ReactDOM.render(
    <Router>
        <div>
            <main>
                <Route exact path="/" component={Home} />
                <Route path="/print" component={Print} />
            </main>
        </div>
    </Router>, 
    document.getElementById("root")
)
