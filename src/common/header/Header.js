import React from 'react';
import './Header.css';
import {Button} from '@material-ui/core'
import {ReactComponent as Logo} from '../../assets/logo.svg'

export default function Header() {
    console.log(Logo);
    return (
       <header className="header-element" >
           <div className="logo-container">
               <Logo className="logo"/>
           </div>
           <div className="header-btn-container">
               <Button className="header-btn" variant="contained" name="login">Login</Button>
           </div>
        </header>
        /*<AppBar position="static">
            <Toolbar>
               {/!* <LogoIcon />*!/}
               {/!* <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
                    <SvgIcon component={logo} viewBox="0 0 24 24" htmlColor="red">
                    </SvgIcon>
                </IconButton>*!/}
                <Typography variant="h6" className="title">
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>*/
        /*<React.Fragment>
            <AppBar position="fixed">
                <Toolbar>{/!* content *!/}</Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment>*/
    )
}
