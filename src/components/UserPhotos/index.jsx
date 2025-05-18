import React, { useEffect, useState } from "react";
import { Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchModel } from "../../lib/fetchModelData";
import "./styles.css";
import TopBar from "../TopBar";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [userMap, setUserMap] = useState({}); // map user_id -> user object

  useEffect(() => {
    fetchModel(`https://rj8p6w-8081.csb.app/photosOfUser/${userId}`).then(
      (data) => {
        if (data) {
          setPhotos(data);
        }
      }
    );
  }, [userId]);

  useEffect(() => {
    fetchModel(`https://rj8p6w-8081.csb.app/user/${userId}`).then((data) => {
      setUser(data);
    });

    fetchModel("https://rj8p6w-8081.csb.app/user/list").then((users) => {
      const map = {};
      users.forEach((u) => {
        map[u._id] = u;
      });
      setUserMap(map);
    });
  }, [userId]);

  if (!user) return null;

  return (
    <>
      <TopBar
        context={user ? `Photos of ${user.first_name} ${user.last_name}` : ""}
      />
      <div>
        {photos.map((photo) => (
          <Paper
            key={photo._id}
            className="photo-container"
            elevation={3}
            style={{ padding: 16, marginBottom: 24 }}
          >
            <img
              src={`/images/${photo.file_name}`}
              alt={`Photo ${photo._id}`}
              style={{ maxWidth: "100%", marginBottom: 12 }}
            />
            <Typography variant="body2" color="textSecondary">
              Taken at: {photo.date_time}
            </Typography>
            {photo.comments && photo.comments.length > 0 && (
              <>
                <Typography variant="subtitle1" style={{ marginTop: 16 }}>
                  Comments:
                </Typography>
                <List dense>
                  {photo.comments.map((comment, index) => {
                    const cmtUser = userMap[comment.user_id] || {
                      first_name: "Unknown",
                      last_name: "User",
                    };
                    return (
                      <ListItem
                        key={comment._id || index}
                        alignItems="flex-start"
                      >
                        <ListItemText
                          primary={`${cmtUser.first_name} ${cmtUser.last_name}`}
                          secondary={
                            <>
                              <Typography variant="body2" color="textPrimary">
                                {comment.comment}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                {comment.date_time}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </>
            )}
          </Paper>
        ))}
      </div>
    </>
  );
}

export default UserPhotos;
