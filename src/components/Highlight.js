import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import DoneIcon from "@mui/icons-material/Done";
import { Draggable } from "react-beautiful-dnd";
import Tooltip from "@mui/material/Tooltip";
import "./style.css";

const Highlight = ({
  setBuckets,
  hName,
  highlights,
  _id,
  hId,
  buckets,
  index,
  highlight,
}) => {
  const [edit, setEdit] = useState(false);
  const [editedText, setEditedText] = useState(hName);
  //   const colorArray = ["#FF99FF", "#FFFF99", "#99FFFF", "#99FF99", "#FF9999"];
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
      return highlight._id === hId;
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
              <Tooltip title="Confirm" placement="top-start" arrow>
                <DoneIcon style={{ cursor: "pointer" }} onClick={handleEdit} />
              </Tooltip>
            ) : (
              <Tooltip title="Edit" placement="top-start" arrow>
                <EditIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setEdit(true);
                  }}
                />
              </Tooltip>
            )}
            <Tooltip title="Delete" placement="top-start" arrow>
              <DeleteIcon
                style={{ cursor: "pointer" }}
                onClick={handleDelete}
              />
            </Tooltip>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Highlight;
