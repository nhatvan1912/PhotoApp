import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import models from "../../modelData/models";
import { fetchModel } from "../../lib/fetchModelData";

import TopBar from "../TopBar";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  //   const users = models.userListModel();
  //   const user = users.find((u) => u._id === userId);
  const [user, setUser] = useState("");
  useEffect(() => {
    fetchModel(`https://rj8p6w-8081.csb.app/user/${userId}`).then((data) => {
      setUser(data);
    });
  }, [userId]);
  return (
    <>
      <TopBar context={`${user.first_name} ${user.last_name}`} />
      <div>
        <h1>{user.userId}</h1>
        <h2>
          {user.first_name} {user.last_name}
        </h2>
        <p>Location: {user.location}</p>
        <p>Description: {user.description}</p>
        <p>Occupation: {user.occupation}</p>
        <Link to={`/photos/${user._id}`}>View Photos</Link>
      </div>
    </>
  );
}

export default UserDetail;
