import { ChangeEvent, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import headerLogo from "../../images/headerLogo.png";
import "../Styles/LoginRegisterStyles.scss";
import { SignUpLogInBtn } from '../logIn-signUp-btns/SignUp-LogIn-Btn';
import { LaptopImg } from '../register-page/laptop-img/LaptopImg';
import { darkGreen } from "../register-page/register-form/form/BoxElement";

import { PasswordInput } from "../register-page/register-form/user-input/UserInputTextFields";
import { userTextFieldIcon, userInputSx } from "../register-page/register-form/user-input/UserInput";
import { localhostURL } from "../register-page/register-form/user-input/UserInput";

const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [responseMessageFromServer, setResponseMessageFromServer] = useState<string>("");

  const loginHandler = () => {
    const loginObject = { usernameOrEmail, password };

    //@dev This statement is for test cases in SignIn.test.js
    if(usernameOrEmail.length === 0 || password.length === 0) {
      return setResponseMessageFromServer('Please make sure to fill all the fields');
    }

    localStorage.removeItem('userCookie');
    fetch(`${localhostURL}/api/v1/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginObject)
    }).then(response => response.json())
    .then((responseData) => {
       if(responseData.status === 200){

         if(localStorage.getItem('userCookie') === null){
            localStorage.setItem('userCookie', responseData.content.accessToken);
          }

          setResponseMessageFromServer(responseData.message);
          return window.location.href = "/";
       } else {
        setResponseMessageFromServer(responseData.message);
       }
    }).catch(() => {
      return setResponseMessageFromServer('Please make sure to fill all the fields');
    })

  }

  return (
    <div className="wrapper">
      <LaptopImg />
      <Box
        className="Form"
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"start"}
        marginTop={"7vh"}
        borderRadius={5}
        boxShadow={"3px 13px 80px rgba(0, 0, 0, 0.25)"}
      >
        <img src={headerLogo.src} alt="HeaderLogo" className="HeaderLogo" />

        <Box data-testid="error-message-login">{ responseMessageFromServer.length > 0 ? responseMessageFromServer : null }</Box>

        <TextField
          className="textField"
          variant="standard"
          InputProps={userTextFieldIcon}
          inputProps={{ "data-testid": "emailorUsername" }}
          margin="dense"
          type={"text"}
          placeholder='Username'
          sx={userInputSx}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setUsernameOrEmail(event.target.value)}
        />

        {PasswordInput((event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), "password-input")}
        <Button
          sx={{
            marginTop: 3,
            marginBottom: 3,
            borderRadius: 4,
            backgroundColor: darkGreen,
            boxShadow: "2px 4px 4px rgba(74, 122, 99, 0.54)",
            color: "white",
            fontFamily: "Roboto",
            fontSize: 20,
            letterSpacing: 0.5,
            width: 130,
            height: 50,
          }}
          variant="contained"
          color="success"
          data-testid="login-button"
          onClick={loginHandler}
        >
          Log In
        </Button>
        <Button
          href="/register"
          sx={{
            marginBottom: 3,
            borderRadius: 4,
            backgroundColor: darkGreen,
            boxShadow: "2px 4px 4px rgba(74, 122, 99, 0.54)",
            color: "white",
            fontFamily: "Roboto",
            fontSize: 20,
            letterSpacing: 0.5,
            width: 130,
            height: 50,
          }}
          variant="contained"
          color="success"
        >
          Sign up
        </Button>
      </Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <SignUpLogInBtn />
      </Box>
    </div>
  );
};

export default LoginForm;
