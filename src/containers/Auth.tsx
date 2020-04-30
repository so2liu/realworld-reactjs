import React, { useState } from "react";
import { TextField, Heading } from "gestalt";

import Form, { TInput } from "../components/Form";
import { signup, login } from "../API";
import { useStore } from "../contextProvider";
import { observer } from "mobx-react-lite";

export const Signup = observer(() => {
  const user = useStore().userStore;
  const signupInputs: Array<TInput> = [
    { name: "username", label: "Username" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  return (
    <>
      <Heading>Sign up</Heading>
      <Form
        btnText="Signup"
        inputs={signupInputs}
        sendReq={signup}
        setRes={user.setUser}
      />
    </>
  );
});

export const Login = observer(() => {
  const user = useStore().userStore;
  const signupInputs: Array<TInput> = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  return (
    <>
      <Heading>Log in</Heading>
      <Form
        btnText="Login"
        inputs={signupInputs}
        sendReq={login}
        setRes={user.setUser}
      />
    </>
  );
});
