import React, { useState } from "react";
import Form, { TInput } from "../components/Form";
import { createArticle } from "../API";
import { TextField, Box, TextArea } from "gestalt";

const inputs: TInput[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "description", label: "Description", type: "text" },
];

export default () => {
  const [tagList, setTagList] = useState([] as string[]);
  const [body, setBody] = useState("");
  const [article, setArticle] = useState({});
  return (
    <>
      <Form
        inputs={inputs}
        btnText="Send"
        sendReq={createArticle}
        setRes={setArticle}
        extraValue={{ tagList, body }}
      >
        <TextField
          id="tags"
          label="Tags"
          onChange={({ value }) =>
            setTagList(value.split(" ").filter((tag) => tag.length > 1))
          }
        />
        <TextArea
          id="body"
          label="Body"
          onChange={({ value }) => setBody(value)}
        />
      </Form>
      <pre>{JSON.stringify(tagList, null, 2)}</pre>
      <pre>{JSON.stringify(article, null, 2)}</pre>
      <pre>{JSON.stringify(article, null, 2)}</pre>
    </>
  );
};
