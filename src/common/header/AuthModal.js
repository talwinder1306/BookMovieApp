import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import {Button, makeStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {ValidatorForm,TextValidator} from 'react-material-ui-form-validator'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function AuthModal(props) {
    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        modalBody: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        paper: {
            flexGrow: 1,
        },
    }));

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [loginMsg,setLoginMsg] = useState('');

    const [loginForm,setLoginForm] = useState({
        username: '',
        password: ''
    });

    const loginInputChangedHandler = (e) => {
        const state = loginForm;
        state[e.target.name] = e.target.value;

        setLoginForm({...state})

    }

    const onLoginFormSubmitted = async (e) => {
        e.preventDefault();
        let stringToEncode = username + ':' + password;
        let basicAuth = window.btoa(stringToEncode);
        const rawResponse = await fetch('http://localhost:8085/api/v1/auth/login', {
            method:'POST',
            headers:{
                'Authorization': `Basic ${basicAuth}`
            },
        });

        const response = await rawResponse.json();
        if(rawResponse.ok) {
            props.setAccessToken(rawResponse.headers.get('access-token'));
            props.setLoginBtn('Logout');
            setLoginForm({
                username: '',
                password: ''
            });
            setLoginMsg('');
            props.handleClose();
        } else {
            const errorCode = rawResponse.status;
            const errorMsg = response.message;
            setLoginMsg(`${errorCode} : ${errorMsg}`);
        }
    }

    const [registerForm,setRegisterForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        passwordReg: '',
        contact: ''
    });

    const [regSuccessMsg,setRegSuccessMsg] = useState('');


    const registerInputChangedHandler = (e) => {
        const state = registerForm;
        state[e.target.name] = e.target.value;

        setRegisterForm({...state})

    }

    const onRegisterFormSubmitted = async (e) => {
        e.preventDefault();
        const body = {
            "email_address": registerForm.email,
            "first_name": registerForm.firstname,
            "last_name": registerForm.lastname,
            "mobile_number": registerForm.contact,
            "password": registerForm.passwordReg
        }

        const rawResponse = await fetch('http://localhost:8085/api/v1/signup', {
            method:'POST',
            body: JSON.stringify(body),
            headers:{
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json'
            },
        });
        const response = await rawResponse.json();
        console.log(response);
        const regSuccessMessage = 'Registration Successful. Please Login!'
        setRegSuccessMsg(regSuccessMessage);
    }

    
    const {username,password}=loginForm;
    const {firstname,lastname,email, passwordReg, contact}=registerForm;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const body = (
        <div className={classes.modalBody}>
            <Paper className={classes.paper}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="LOGIN" {...a11yProps(0)}/>
                    <Tab label="REGISTER" {...a11yProps(1)}/>
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                <ValidatorForm className="login-form" onSubmit={onLoginFormSubmitted}>
                    <TextValidator
                        id="username"
                        label="Username *"
                        type="text"
                        name="username"
                        onChange={loginInputChangedHandler}
                        value={username}
                        validators={['required']}
                        errorMessages={['required']}
                    >
                    </TextValidator>

                    <TextValidator
                        id="password"
                        type="password"
                        name="password"
                        onChange={loginInputChangedHandler}
                        label="Password *"
                        value={password}
                        validators={['required']}
                        errorMessages={['required']}
                    ></TextValidator>
                    <br /><br />
                    <p>{loginMsg}</p>
                    <Button className="loginBtn" name="Login" variant="contained" color="primary"
                            type="submit">Login</Button>
                </ValidatorForm>
            </TabPanel>
            <TabPanel value={value} index={1} >
                <ValidatorForm className="register-form" onSubmit={onRegisterFormSubmitted} >
                    <TextValidator
                        id="firstname"
                        label="First Name *"
                        type="text"
                        name="firstname"
                        onChange={registerInputChangedHandler}
                        value={firstname}
                        validators={['required']}
                        errorMessages={['required']}
                    >
                    </TextValidator>

                    <TextValidator
                        id="lastname"
                        label="Last Name *"
                        type="text"
                        name="lastname"
                        onChange={registerInputChangedHandler}
                        value={lastname}
                        validators={['required']}
                        errorMessages={['required']}
                    ></TextValidator>

                    <TextValidator
                        id="email"
                        label="Email *"
                        type="text"
                        name="email"
                        onChange={registerInputChangedHandler}
                        value={email}
                        validators={['required']}
                        errorMessages={['required']}
                    ></TextValidator>

                    <TextValidator
                        id="passwordReg"
                        label="Password *"
                        type="password"
                        name="passwordReg"
                        onChange={registerInputChangedHandler}
                        value={passwordReg}
                        validators={['required']}
                        errorMessages={['required']}
                    ></TextValidator>

                    <TextValidator
                        id="contact"
                        label="Contact No. *"
                        type="text"
                        name="contact"
                        onChange={registerInputChangedHandler}
                        value={contact}
                        validators={['required']}
                        errorMessages={['required']}
                    ></TextValidator>
                    <p>{regSuccessMsg}</p>
                    <br /><br />
                    <Button className="registerBtn" name="Register" variant="contained" color="primary"
                            type="submit">Register</Button>
                </ValidatorForm>
            </TabPanel>
        </div>
    );

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            className={classes.modal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    )
}
