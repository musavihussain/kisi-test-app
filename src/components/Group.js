import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

function Group({ item }) {
  const slugCreator = (Text) => {
    return Text.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <>
      <Link
        to={`locks/${slugCreator(item.name)}`}
        state={{ item }}
        style={linkStyle}
      >
        <ListItem>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>
                <GroupOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.name} secondary={item.description} />
          </ListItemButton>
        </ListItem>
      </Link>
    </>
  );
}

export default Group;
