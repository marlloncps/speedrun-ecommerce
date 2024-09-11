import React from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

export default function ListOrder({ number, items, data }) {
  return (
    <ListItem
      sx={{ border: "1px solid blue", borderRadius: "5px", display: "flex", gap: 1 }}
    >
      <ListItemText
        primary={`Pedido número: #${number}`}
        secondary={`Realizado no dia ${data}`}
      />
      <ListItemText primary={`Items: ${items}`} />
    </ListItem>
  );
}
