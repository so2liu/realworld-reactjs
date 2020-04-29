import React, { useState } from "react";
import { IconButton, TextField, Box, Text, Avatar } from "gestalt";
import { useComments, sendComment } from "../API";
import moment from "moment";
import { Comment, NewComment } from "../Interface";

export default (props: {
  slug: string;
  handleForward: (x: NewComment) => void;
}) => {
  const initMyNewComment: NewComment = { body: "" };
  const [myNewComment, setMyNewComment] = useState(initMyNewComment);
  const comments = useComments(props.slug);
  const initMyComments: Comment[] = [];
  const [myComments, setMyComments] = useState(initMyComments);

  const handleSend = () => {
    props.handleForward(myNewComment);
    sendComment(props.slug, myNewComment).then((res) => {
      if (res) setMyComments((prev) => [res, ...prev]);
      setMyNewComment(initMyNewComment);
    });
  };

  return (
    <>
      <Box display="flex" direction="row">
        <Box paddingX={1} flex="grow">
          <TextField
            id={props.slug}
            value={myNewComment.body}
            onChange={({ value }) => setMyNewComment({ body: value })}
          />
        </Box>
        <IconButton
          icon="send"
          accessibilityLabel="Send"
          bgColor="gray"
          size="md"
          onClick={handleSend}
        />
      </Box>
      <Box display="flex" direction="column">
        {myComments.concat(comments).map((comment) => {
          return (
            <Box key={comment.id} display="flex" direction="row" marginTop={1}>
              <Box paddingX={1}>
                <Text weight="bold">{comment.author.username}</Text>
              </Box>
              <Box paddingX={1} flex="grow">
                <Text>{comment.body}</Text>
              </Box>
              <Box paddingX={1}>
                <Text color="gray" italic>
                  {moment(comment.updatedAt).fromNow()}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};
