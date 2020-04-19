import React, { useContext } from "react";

import { makeStyles, Typography } from "@material-ui/core";

import { CurrentUserContext } from "../../App";
import { HamburgerMenuItem } from "./HamburgerMenuItem";
import { navContent, superuserNavContent } from "./NavContent";

const useStyles = makeStyles((theme) => ({
  navigation: {
    "& > li > a": {
      display: "block",
      borderRadius: 0,
      padding: theme.spacing(2),
    },
  },
  superUser: {
    marginTop: theme.spacing(2),
  },
}));

export const HamburgerMenuItemList = ({ toggle }) => {
  const { isSuperuser } = useContext(CurrentUserContext);

  const classes = useStyles();
  return (
    <>
      <ul className={classes.navigation}>
        {navContent.map((navItem) => (
          <HamburgerMenuItem
            key={navItem.key}
            content={navItem.content}
            linkTo={navItem.to}
            toggle={toggle}
          />
        ))}
      </ul>
      {isSuperuser && (
        <div className={classes.superUser}>
          <Typography variant="h6" align="center">
            Admin
          </Typography>
          <ul className={classes.navigation}>
            {superuserNavContent.map((navItem) => (
              <HamburgerMenuItem
                key={navItem.key}
                content={navItem.content}
                linkTo={navItem.to}
                toggle={toggle}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
