import { Box, Card, Avatar, Link, Button, Text } from "gestalt";
import React from "react";
import { Profile } from "../Interface";

export default function ProfileCard(props: Profile) {
  return (
    <Box maxWidth={236} padding={2} column={12}>
      <Card
        image={
          <Avatar
            name={props.username}
            src={
              props.image ||
              `https://avatars.dicebear.com/v2/male/:${props.username}`
            }
          />
        }
      >
        <Text align="center" weight="bold">
          <Box paddingX={3} paddingY={2}>
            {props.username}
          </Box>
        </Text>
        <Text align="center">{props.bio}</Text>
        <Button
          accessibilityLabel={`Follow ${props.username}`}
          color="red"
          text="Follow"
        />
      </Card>
    </Box>
  );
}
