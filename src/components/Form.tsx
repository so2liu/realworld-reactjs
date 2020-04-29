import React, { useState } from "react";
import { TextField, Button, Box } from "gestalt";
import { AxiosResponse } from "axios";

export type TInput = {
  name: string;
  label: string;
  type?: "number" | "text" | "date" | "email" | "password" | "url";
};

export interface Form {
  inputs: TInput[];
  btnText: string;
  extraValue?: object;
  children?: JSX.Element | JSX.Element[];
  sendReq: (x: any) => Promise<void | AxiosResponse<any>>;
  setRes: React.Dispatch<React.SetStateAction<any>> | ((x: object) => void);
}
export default (props: Form) => {
  interface InitValues {
    [x: string]: string;
  }
  const initValues: InitValues = {};
  props.inputs.forEach(({ name }) => (initValues[name] = ""));

  const [values, setValues] = useState(initValues);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await props.sendReq({
      ...values,
      ...props.extraValue,
    });
    if (res) props.setRes(res);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          direction="column"
          justifyContent="center"
          alignItems="center"
          margin={2}
        >
          {props.inputs.map((input) => (
            <TextField
              key={input.name}
              id={input.name}
              onChange={({ value }) =>
                setValues({ ...values, [input.name]: value })
              }
              label={input.label}
              value={values[input.name as keyof typeof values]}
              type={input.type}
            />
          ))}
          {props.children}
        </Box>
        <Box display="flex" justifyContent="center" margin={2}>
          <Button text={props.btnText} type="submit" inline />
        </Box>
      </form>
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </>
  );
};
