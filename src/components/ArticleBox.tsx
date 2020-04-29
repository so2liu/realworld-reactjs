import React, { useState } from "react";
import { Box, Text, Heading, Button, Avatar, IconButton } from "gestalt";
import moment from "moment";
import { Article, NewArticle, NewComment } from "../Interface";
import { ProfileRow } from "./ProfileRow";
import { createArticle } from "../API";
import Comment from "./Comment";
import { sentenceTruncationByChar } from "../utils";

const BRIEF_TITLE_LENGTH = 20;
const BRIEF_BODY_LENGTH = 140;

const handleForward = (article: Article, comment: NewComment) => {
  const author = article.author;
  const body: NewArticle = {
    title: `${sentenceTruncationByChar(
      comment.body,
      BRIEF_TITLE_LENGTH
    )} \\\\ @${author.username} ${article.title}`,
    description: article.description,
    tagList: article.tagList,
    body: `${comment.body} \\\\ @${author.username} ${article.body}`,
  };
  createArticle(body);
};

export default ({ article }: { article: Article }) => {
  const [openComment, setOpenComment] = useState(false);

  const leerComment: NewComment = { body: "" };
  return (
    <Box
      color="lightWash"
      rounding={3}
      padding={3}
      marginTop={3}
      marginBottom={3}
    >
      <ProfileRow user={article.author} />
      <Heading size="sm" color="navy">
        {article.title}
      </Heading>
      <Heading size="sm" color="darkGray">
        {article.description}
      </Heading>
      <Text>{sentenceTruncationByChar(article.body, BRIEF_BODY_LENGTH)}</Text>
      <Text italic align="right" color="gray">
        {moment(article.updatedAt).fromNow()}
      </Text>
      <Box marginTop={2} marginBottom={2} display="flex" direction="row">
        <IconButton
          accessibilityLabel="Comment"
          icon="speech"
          bgColor="transparent"
          iconColor="darkGray"
          onClick={() => setOpenComment((prev) => !prev)}
        />
        <IconButton
          accessibilityLabel="Comment"
          icon="twitter"
          bgColor="transparent"
          iconColor="darkGray"
          onClick={() => handleForward(article, leerComment)}
        />
      </Box>
      {openComment && (
        <Comment
          slug={article.slug}
          handleForward={(comment: NewComment) =>
            handleForward(article, comment)
          }
        />
      )}
    </Box>
  );
};
