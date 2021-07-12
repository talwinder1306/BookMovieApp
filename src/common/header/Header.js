import React, {useEffect, useState, Fragment} from 'react';
import './Header.css';
import {Button} from '@material-ui/core'
import logo from '../../assets/logo.svg'
import AuthModal from "./AuthModal";
import {Link} from "react-router-dom";

export default function Header(props) {

    const [open, setOpen] = React.useState(false); //Modal

    const [showBookShow, setShowBookShow] = useState(false);
    const [redirectBookShow, setRedirectBookShow] = useState(false);

    useEffect(() => {
        setShowBookShow(props.isDetailPage === 'true');
        setRedirectBookShow(props.accessToken !== '')
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = async () => {
        const rawResponse = await fetch('http://localhost:8085/api/v1/auth/logout', {
            method:'POST',
            headers:{
                'Authorization': `Bearer ${props.accessToken}`
            },
        });

        if(rawResponse.ok) {
            props.setLoginBtn('Login');
        }
    };

    const handleBookShow = () => {
        if(props.accessToken === '' || props.loginBtn === 'Login') {
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
                            <Link to={"/bookshow/" + props.movieId}>
                                <Button className="bookShow" name="Book Show" variant="contained" color="primary" onClick={handleBookShow}>
                                    Book Show
                                </Button>
                            </Link>
                                :
                        <Button className="bookShow" name="Book Show" variant="contained" color="primary" onClick={handleBookShow}>
                            Book Show
                        </Button> : null}

                    {props.loginBtn === 'Login' ? <Button className="header-btn" variant="contained" name={props.loginBtn} onClick={handleOpen}>{props.loginBtn}</Button> :
                        <Button className="header-btn" variant="contained" name={props.loginBtn} onClick={handleLogout}>{props.loginBtn}</Button>}

                    <AuthModal open={open} handleClose={handleClose} setAccessToken={props.setAccessToken} setLoginBtn={props.setLoginBtn}/>
                </div>
            </header>
        </Fragment>

    )
}
