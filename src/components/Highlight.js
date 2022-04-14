import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { Draggable } from "react-beautiful-dnd";
import "./style.css";

const Highlight = ({
  setBuckets,
  hName,
  highlights,
  _id,
  hId,
  buckets,
  index,
  highlight
}) => {
  const [edit, setEdit] = useState(false);
  const [editedText, setEditedText] = useState(hName);

  const handleDelete = () => {
    const filteredHighlights = highlights.filter((highlight) => {
      return highlight._id !== hId;
    });
    const editedItem = buckets.find((bucket) => {
      return bucket._id === _id;
    });
    editedItem.highlights = filteredHighlights;
    setBuckets((prev) => [...prev]);
  };

  const handleEdit = () => {
    setEdit(false);
    const editedHighlight = highlights.find((highlight) => {
      return highlight._id == hId;
    });
    editedHighlight.hName = editedText;
    setBuckets((prev) => [...prev]);
  };
  return (
    <Draggable draggableId={highlight._id.toString()} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="single-highlight"
          >
            {edit ? (
              <TextField
                fullWidth
                multiline
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
            ) : (
              <div className="single-highlight__text">{hName}</div>
            )}
            {edit ? (
              <CloseIcon onClick={handleEdit} />
            ) : (
              <EditIcon
                onClick={() => {
                  setEdit(true);
                }}
              />
            )}
            <DeleteIcon onClick={handleDelete} />
          </div>
        );
      }}
    </Draggable>
  );
};

export default Highlight;
