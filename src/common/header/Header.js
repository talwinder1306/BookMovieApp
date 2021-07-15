import React, {useEffect, useState, Fragment} from 'react';
import './Header.css';
import {Button} from '@material-ui/core'
import logo from '../../assets/logo.svg'
import AuthModal from "./AuthModal";
import {Link} from "react-router-dom";

/**
 * This component renders the header with rotating logo and Login/Logout and Book Show buttons
 * @param props isDetailPage, accessToken, setAccessToken
 * @returns {JSX.Element}
 * @constructor
 */
export default function Header({isDetailPage, loginBtn, accessToken, setAccessToken, setLoginBtn, baseUrl, movieId}) {

    /**
     * State
     */
    const [open, setOpen] = React.useState(false); //Modal
    const [showBookShow, setShowBookShow] = useState(false);
    const [redirectBookShow, setRedirectBookShow] = useState(false);

    useEffect(() => {
        setShowBookShow(isDetailPage === 'true');
        setRedirectBookShow(accessToken !== '')
    }, []);

    /**
     * These method handles the opening and closing of Login/Register modal.
     */

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /**
     * This method handles the Logout function
     *
     */

    const handleLogout = async () => {
        const rawResponse = await fetch(baseUrl+'auth/logout', {
            method:'POST',
            headers:{
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if(rawResponse.ok) {
            setLoginBtn('Login');
        }
    };
    /**
     * This method handles the Book Show button.
     * It displays Login/Register modal if the user is not logged in
     * Else it redirects to bookshow page
     */
    const handleBookShow = () => {
        if(accessToken === '' || loginBtn === 'Login') {
            handleOpen();
        } else {
            setRedirectBookShow(true);
        }
    };

    return (
        <Fragment>
            <header className="header-element" >
                <div className="logo-container">
                    <img src={logo} className="logo" alt="logo"/>
                </div>
                <div className="header-btn-container">
                    {showBookShow ?
                        redirectBookShow ?
                            <Link to={"/bookshow/" + movieId}>
                                <Button className="bookShow" name="Book Show" variant="contained" color="primary"
                                        onClick={handleBookShow}>
                                    Book Show
                                </Button>
                            </Link>
                            :
                            <Button className="bookShow" name="Book Show" variant="contained" color="primary"
                                    onClick={handleBookShow}>
                                Book Show
                            </Button> : null
                    }

                    {loginBtn === 'Login' ?
                        <Button className="header-btn" variant="contained" name={loginBtn}
                                onClick={handleOpen}>{loginBtn}</Button> :
                        <Button className="header-btn" variant="contained" name={loginBtn}
                                onClick={handleLogout}>{loginBtn}</Button>}

                    <AuthModal open={open}
                               handleClose={handleClose}
                               setAccessToken={setAccessToken}
                               setLoginBtn={setLoginBtn}
                               baseUrl={baseUrl}/>
                </div>
            </header>
        </Fragment>

    )
}
