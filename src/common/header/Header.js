import React, {useEffect, useState} from 'react';
import './Header.css';
import {Button} from '@material-ui/core'
import logo from '../../assets/logo.svg'
import AuthModal from "./AuthModal";

export default function Header(props) {

    const [open, setOpen] = React.useState(false); //Modal

    const [accessToken, setAccessToken] = useState('');
    const [loginBtn, setLoginBtn] = useState('Login');
    const [showBookShow, setShowBookShow] = useState(false);

    useEffect(() => {
        setShowBookShow(props.isDetailPage === 'true');
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
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if(rawResponse.ok) {
            setLoginBtn('Login');
        }
    };

    const handleBookShow = () => {
        if(accessToken === '' || loginBtn === 'Login') {
            handleOpen();
        } else {
            alert("Show Booked")
        }
    };

    return (
       <header className="header-element" >
           <div className="logo-container">
               <img src={logo} className="logo" alt="logo"/>
           </div>
           <div className="header-btn-container">
               {showBookShow?
                   <Button className="bookShow" name="Book Show" variant="contained" color="primary" onClick={handleBookShow}>Book Show</Button> : null}

               {loginBtn === 'Login' ? <Button className="header-btn" variant="contained" name={loginBtn} onClick={handleOpen}>{loginBtn}</Button> :
                   <Button className="header-btn" variant="contained" name={loginBtn} onClick={handleLogout}>{loginBtn}</Button>}

               <AuthModal open={open} handleClose={handleClose} setAccessToken={setAccessToken} setLoginBtn={setLoginBtn}/>
           </div>
        </header>
    )
}
