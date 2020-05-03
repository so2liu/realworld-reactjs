import React, { Props, useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { Box, Avatar, Button, IconButton, Link } from "gestalt";
import { User } from "../Interface";
import { observer, useObserver } from "mobx-react-lite";

interface Navbar {
  isSignedin: boolean;
  user?: User;
  logout: () => void;
}
const Navbar = observer(({ isSignedin, user, logout }: Navbar) => {
  const guestNav = (
    <>
      <Box marginLeft={2}>
        <NavLink className={styles.item} to="/login">
          Sign in
        </NavLink>
      </Box>
      <Box marginLeft={2}>
        <NavLink className={styles.item} to="/signup">
          Sign up
        </NavLink>
      </Box>
    </>
  );
  const authNav = (
    <>
      <Box marginLeft={2}>
        <NavLink className={styles.item} to="/short">
          <IconButton
            accessibilityLabel="Write a new post"
            size="sm"
            icon="edit"
          />
        </NavLink>
      </Box>
      <Box marginLeft={2}>
        <IconButton
          accessibilityLabel="Logout"
          icon="logout"
          onClick={logout}
          size="sm"
        />
      </Box>
      <Box marginLeft={2}>
        <NavLink className={styles.item} to="/settings">
          <Avatar
            name={`${user?.username}'s Avatar`}
            src={user?.image}
            size="sm"
          />
        </NavLink>
      </Box>
    </>
  );

  return useObserver(() => (
    <>
      <Box display="flex" direction="row" paddingX={2}>
        <Box flex="grow">
          <Link href="/">Home</Link>
        </Box>
        <Box display="flex" direction="row">
          {isSignedin ? authNav : guestNav}
        </Box>
      </Box>
    </>
  ));
});

export default Navbar;
