import React from "react";

import Form, { TInput } from "../components/Form";
import { Heading } from "gestalt";
import { updateUser } from "../API";
import { userInfo } from "os";
import { useStore } from "../contextProvider";

export default () => {
  const user = useStore().userStore;
  const settingInputs: Array<TInput> = [
    { name: "profileURL", label: "URL of avatar", type: "text" },
    { name: "username", label: "Username", type: "text" },
    { name: "bio", label: "Share your Bio", type: "text" },
    { name: "email", label: "New Email", type: "email" },
    // { name: "password", label: "Old Password", type: "password" },
    { name: "password", label: "New Password", type: "password" },
  ];
  return (
    <>
      {" "}
      <Heading>Settings</Heading>
      <Form
        btnText="Update"
        inputs={settingInputs}
        sendReq={updateUser}
        setRes={user.setUser}
      />
    </>
  );
};
