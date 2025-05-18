import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";
import { fetchModel } from "../../lib/fetchModelData";
/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchModel("https://rj8p6w-8081.csb.app/user/list").then((data) => {
      setUsers(data);
    });
  }, []);
  return (
    <div>
      <Typography variant="body1">
        This is the user list, which takes up 3/12 of the window. You might
        choose to use <a href="https://mui.com/components/lists/">Lists</a> and{" "}
        <a href="https://mui.com/components/dividers/">Dividers</a> to display
        your users like so:
      </Typography>
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem component={Link} to={`/users/${user._id}`}>
              <ListItemText primary={user.first_name} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Typography variant="body1">
        The model comes in from models.userListModel()
      </Typography>
    </div>
  );
}

export default UserList;
