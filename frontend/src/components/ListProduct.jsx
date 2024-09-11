import React from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { Delete, Favorite } from "@mui/icons-material";

export default function ListProduct({
  title,
  price,
  src,
  onDelete,
  onRemoveFav,
}) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={src}>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} secondary={price} />
      {onDelete && (
        <IconButton onClick={onDelete}>
          <Delete />
        </IconButton>
      )}
      {onRemoveFav && (
        <IconButton onClick={onRemoveFav}>
          <Favorite />
        </IconButton>
      )}
    </ListItem>
  );
}
