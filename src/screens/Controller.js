import React, {useState} from 'react';
import Home from "./home/Home";
import Details from "./details/Details";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookShow from "./bookshow/BookShow";
import Confirmation from "./confirmation/Confirmation";

export default function Controller() {

    const [accessToken, setAccessToken] = useState('');
    const [loginBtn, setLoginBtn] = useState('Login');

    const baseUrl = 'http://localhost:8085/api/v1/';

    return(
        <Router>
            <div>
                <Route exact path="/" render={(props) =>
                    <Home {...props} baseUrl={baseUrl}
                        accessToken={accessToken} loginBtn={loginBtn}
                          setAccessToken={setAccessToken} setLoginBtn={setLoginBtn}
                    />} />
                <Route exact path="/movie/:id" render={({history}, props) =>
                    <Details {...props} baseUrl={baseUrl}
                             accessToken={accessToken} loginBtn={loginBtn}
                             setAccessToken={setAccessToken} setLoginBtn={setLoginBtn}
                    />} />
                <Route exact path={"/bookshow/:id"} render={({history}, props) =>
                    <BookShow {...props} baseUrl={baseUrl}
                              accessToken={accessToken} loginBtn={loginBtn}
                              setAccessToken={setAccessToken} setLoginBtn={setLoginBtn}
                    />} />
                <Route exact path={"/confirm/:id"} render={({history}, props) =>
                    <Confirmation {...props} baseUrl={baseUrl}
                              accessToken={accessToken} loginBtn={loginBtn}
                              setAccessToken={setAccessToken} setLoginBtn={setLoginBtn}
                    />} />
            </div>
        </Router>
        /*<Home />*/
       /* <Details />*/
    )
}
