import React, { useState, useEffect, useMemo } from "react";
import { createEditor, Text, Node } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Divider, Box, Button, Icon } from "gestalt";
import { NewArticle } from "../Interface";
import { createArticle } from "../API";
import { Tag } from "antd";

type ContentElement = {
  type: string;
  children: Text[];
};

const initContent: Node[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of title" }],
  },
  {
    type: "paragraph",
    children: [{ text: "A line of description" }],
  },
  {
    type: "paragraph",
    children: [{ text: "A line of tag" }],
  },
];
const initLocalContent: Node[] = JSON.parse(
  localStorage.getItem("newPost") || JSON.stringify(initContent)
);

export default () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [content, setContent] = useState(initLocalContent);
  const [local, setLocal] = useState(initLocalContent);
  const header = {
    title: content[0]["children"][0]["text"],
    description: (content[1] || content[0])["children"][0]["text"],
    tagList: ((content[2] || content[1] || content[0]) as ContentElement)[
      "children"
    ][0]["text"]
      .split(/\.| /)
      .filter((each) => each.length > 1),
  };
  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const article: NewArticle = {
      ...header,
      body: JSON.stringify(content),
    };
    await createArticle(article);
    localStorage.removeItem("newPost");
  };

  const handleChange = (value: Node[]) => {
    setContent(value);
    localStorage.setItem("newPost", JSON.stringify(value));
    setLocal(JSON.parse(localStorage.getItem("newPost") || ""));
    setContent(initLocalContent || initContent);
  };

  return (
    <>
      <h2>{header.title}</h2>
      <h3>{header.description}</h3>
      {header.tagList.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
      <form onSubmit={handlePost}>
        <Slate editor={editor} value={content} onChange={handleChange}>
          <Editable />
        </Slate>
        <Box display="flex" justifyContent="center" margin={2}>
          <Button text="Post" type="submit" inline />
        </Box>
      </form>
      <Divider />
      <pre>{JSON.stringify(header, null, 2)}</pre>
      <pre>{JSON.stringify(local, null, 2)}</pre>
    </>
  );
};
