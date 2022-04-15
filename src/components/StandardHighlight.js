import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TextField from "@mui/material/TextField";
import "./style.css";
import "./standard.css";

const StandardHighlight = ({
  buckets,
  randomHighlights,
  setRandomHighlights,
  setBuckets,
  highlight,
}) => {
  const [edit, setEdit] = useState(false);
  const [editedText, setEditedText] = useState(highlight.hName);

  const handleDelete = (highlight) => {
    if (highlight.gId) {
      const editedItem = buckets.find((bucket) => {
        return bucket._id === highlight.gId;
      });
      const filteredHighlights = editedItem.highlights.filter((item) => {
        return item._id !== highlight._id;
      });

      editedItem.highlights = filteredHighlights;
      setBuckets((prev) => [...prev]);
    } else {
      const filteredRandomHighlights = randomHighlights.filter(
        (randomHighlight) => {
          return randomHighlight._id !== highlight._id;
        }
      );
      setRandomHighlights(filteredRandomHighlights);
    }
  };
  const handleEdit = (highlight) => {
    if (highlight.gId) {
      const editedItem = buckets.find((bucket) => {
        return bucket._id === highlight.gId;
      });
      const editedHighlight = editedItem.highlights.find((item) => {
        return item._id === highlight._id;
      });
      editedHighlight.hName = editedText;
      setBuckets((prev) => [...prev]);
      setEdit(false);
    } else {
      const editedHighlight = randomHighlights.find((randomHighlight) => {
        return randomHighlight._id === highlight._id;
      });
      editedHighlight.hName = editedText;
      setRandomHighlights((prev) => [...prev]);
      setEdit(false);
    }
  };
  const handleMove = (highlight) => {
    if (highlight.gId) {
    } else {
    }
  };

  return (
    <div className="standard-single-highlight">
      <div className="standard-single-highlight__top-container">
        <div
          className="standard-single-highlight__heading"
          style={
            highlight.gId
              ? { backgroundColor: "rgb(229, 226, 226)" }
              : { backgroundColor: "#ccffcc" }
          }
        >
          {highlight.gId ? highlight.gName : null}
        </div>
        <div>
          {edit ? (
            <CloseIcon
              style={{ cursor: "pointer" }}
              onClick={() => handleEdit(highlight)}
            />
          ) : (
            <EditIcon
              onClick={() => {
                setEdit(true);
              }}
              style={{ cursor: "pointer" }}
            />
          )}

          <DeleteIcon
            onClick={() => handleDelete(highlight)}
            style={{ cursor: "pointer" }}
          />
          <FileUploadIcon
            onClick={() => handleMove(highlight)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      {edit ? (
        <TextField
          fullWidth
          multiline
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <div className="standard-single-highlight__content">
          {highlight.hName}
        </div>
      )}
    </div>
  );
};

export default StandardHighlight;
