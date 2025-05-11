import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import "./styles.css";
import {Link} from "react-router-dom";

function TopBar({ context }) {
    const fullName = "Hoàng Đình Nhật Văn";

    return (
        <AppBar className="topbar-appBar" position="absolute">
            <Toolbar style={{ justifyContent: "space-between" }}>
                <Typography variant="h6" color="inherit">
                    <Link to={`/`}>{fullName}</Link>
                </Typography>
                {context && (
                    <Typography variant="h6" color="inherit">
                        {context}
                    </Typography>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
