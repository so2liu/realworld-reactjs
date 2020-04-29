import { Profile } from "../Interface";
import { Box, Avatar, Button, Text } from "gestalt";
import React, { useState } from "react";
import { unfollow, follow } from "../API";

export const ProfileRow = (props: { user: Profile }) => {
  const [user, setUser] = useState(props.user);

  return (
    <Box
      alignItems="center"
      direction="row"
      display="flex"
      marginStart={-1}
      marginEnd={-1}
    >
      <Box paddingX={1}>
        <Avatar name={user.username} size="md" src={user.image || undefined} />
      </Box>
      <Box paddingX={1} flex="grow">
        <Text weight="bold">{user.username}</Text>
        <Text>{user.bio}</Text>
      </Box>
      {user.following ? (
        <Box paddingX={1}>
          <Button
            text="Unfollow"
            size="sm"
            color="gray"
            onClick={() =>
              unfollow(user.username).then((res) => {
                if (res) setUser(res);
              })
            }
          />
        </Box>
      ) : (
        <Box paddingX={1}>
          <Button
            text="Follow"
            size="sm"
            color="red"
            onClick={() =>
              follow(user.username).then((res) => {
                if (res) setUser(res);
              })
            }
          />
        </Box>
      )}
    </Box>
  );
};
