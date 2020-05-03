import React, { useState } from "react";
import { TextField, Heading } from "gestalt";

import Form, { TInput } from "../components/Form";
import { signup, login } from "../API";
import { useStore } from "../contextProvider";
import { observer } from "mobx-react-lite";
import { User } from "../Interface";
import { useHistory } from "react-router-dom";

export const Signup = observer(() => {
  const history = useHistory();
  const user = useStore().userStore;
  const signupInputs: Array<TInput> = [
    { name: "username", label: "Username" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  const handleSetUser = (userRes: User) => {
    user.setUser(userRes);
    history.replace("/");
  };

  return (
    <>
      <Heading>Sign up</Heading>
      <Form
        btnText="Signup"
        inputs={signupInputs}
        sendReq={signup}
        setRes={handleSetUser}
      />
    </>
  );
});

export const Login = observer(() => {
  const history = useHistory();
  const user = useStore().userStore;
  const signupInputs: Array<TInput> = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  const handleSetUser = (userRes: User) => {
    user.setUser(userRes);
    history.replace("/");
  };

  return (
    <>
      <Heading>Log in</Heading>
      <Form
        btnText="Login"
        inputs={signupInputs}
        sendReq={login}
        setRes={handleSetUser}
      />
    </>
  );
});
