import React from "react";
import { Typography, Paper, List, ListItem, Divider } from "@mui/material";

export default function Stats() {
  const keys = Object.keys(localStorage);
  const data = keys.map((key) => JSON.parse(localStorage.getItem(key)));

  return (
    <Paper style={{ padding: "2rem", margin: "2rem", background: "#1e1e2f", color: "#fff" }}>
      <Typography variant="h4">📊 URL Stats</Typography>
      <List>
        {data.map((entry, i) => (
          <React.Fragment key={i}>
            <ListItem>
              <Typography>
                <strong>{entry.shortcode}</strong> → {entry.originalUrl}  
                <br />
                Created: {entry.createdAt} | Expires: {entry.expiresAt}
                <br />
                Clicks: {entry.clicks.length}
              </Typography>
            </ListItem>
            <Divider style={{ background: "#555" }} />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}
