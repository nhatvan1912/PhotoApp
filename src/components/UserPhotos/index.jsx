import React, { useEffect, useState } from "react";
import { Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import { useParams } from "react-router-dom";

import models from "../../modelData/models";
import "./styles.css";
import TopBar from "../TopBar";

function UserPhotos() {
    const { userId } = useParams();
    const [photos, setPhotos] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchedPhotos = models.photoOfUserModel(userId);
        setPhotos(fetchedPhotos);

        const users = models.userListModel();
        const foundUser = users.find((u) => u._id === userId);
        setUser(foundUser);
    }, [userId]);

    return (
        <>
            <TopBar context={user ? `Photos of ${user.first_name} ${user.last_name}` : ""} />
            <div>
                {photos.map((photo) => (
                    <Paper key={photo._id} className="photo-container" elevation={3} style={{ padding: 16, marginBottom: 24 }}>
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
                                    {photo.comments.map((comment) => (
                                        <ListItem key={comment._id} alignItems="flex-start">
                                            <ListItemText
                                                primary={`${comment.user.first_name} ${comment.user.last_name}`}
                                                secondary={
                                                    <>
                                                        <Typography variant="body2" color="textPrimary">
                                                            {comment.comment}
                                                        </Typography>
                                                        <Typography variant="caption" color="textSecondary">
                                                            {comment.date_time}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                    ))}
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
