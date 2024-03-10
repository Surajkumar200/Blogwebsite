import styled from '@emotion/styled';
import { Box, Button, TextField, Typography } from '@mui/material/'
import { useState,useContext } from 'react';
import { API } from '../../service/api.js';
import { DataContext } from '../../context/DataProvider.jsx';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 200,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0  0'
});
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;
const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;
const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    username: '',
    password: '',
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};
const Login = ({ isUserAuthenticated }) => {

    const [account, toggleAccount] = useState("login");
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState("");
    const [login, setLogin] = useState(loginInitialValues);

    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () => {
        account === "signup" ? toggleAccount('login') : toggleAccount('signup');
    };

    const onInputChange = (e) => {
        console.log(e.target.name, e.target.value);
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login')
        } else {
            setError('Something went wrong! please try again later');
        }
    }

    const onValueChange = (e) => {
        console.log(e.target.name, e.target.value);
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            setError('');

            sessionStorage.setItem('accessToken' , `Beare ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken' , `Beare ${response.data.refreshToken}`);
            
            setAccount({ username: response.data.username, name: response.data.name});
           
            isUserAuthenticated(true);
            
            navigate('/');
            

        } else {
            setError('Something went wrong! please try again later');
        }
    }



    return (
        <Component >
            <Box >
                <Image src='https://dypdvfcjkqkg2.cloudfront.net/large/5646617-7370.png' alt='login' />
                <Text style={{ textAlign: 'center' }}> Blog </Text>
                <Text style={{ textAlign: 'center' }}>Create Your own Space </Text>
                {
                    account == 'login' ?
                        <Wrapper>
                            <TextField variant='standard' value={login.username} onChange={(e) => onValueChange(e)} name='username' label="Enter username" />
                            <TextField variant='standard' value={login.password} onChange={(e) => onValueChange(e)} name='password' label="Enter password" />

                            {error && <Error>{error}</Error>}
                            <LoginButton variant='contained' onClick={() => loginUser()}>Login</LoginButton>
                            <Typography style={{ textAlign: 'center' }}>OR</Typography>
                            <SignupButton onClick={() => toggleSignup()}>Create an account</SignupButton>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant='standard' label='Enter' name='name' onChange={(e) => onInputChange(e)} />
                            <TextField variant='standard' label='Enter Username' name='username' onChange={(e) => onInputChange(e)} />
                            <TextField variant='standard' label='Enter Password' name='password' onChange={(e) => onInputChange(e)} />

                            {error && <Error>{error}</Error>}
                            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant='contained' onClick={() => toggleSignup()}>Already have a account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}
export default Login;
