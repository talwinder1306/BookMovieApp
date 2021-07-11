import React from 'react';
import Home from "./home/Home";
import Details from "./details/Details";
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function Controller() {


    return(
        <Router>
            <div>
                <Route exact path="/" render={(props) => <Home {...props} />} />
                <Route exact path="/detail" render={({history}, props) => <Details {...props} />} />
            </div>
        </Router>
        /*<Home />*/
       /* <Details />*/
    )
}
