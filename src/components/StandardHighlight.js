import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
// import { Draggable } from "react-beautiful-dnd";
import "./style.css";
import "./standard.css";

const StandardHighlight = ({
  buckets,
  randomHighlights,
  setRandomHighlights,
  setBuckets,
  highlight,
  bucketList,
  // index,
}) => {
  const [edit, setEdit] = useState(false);
  const [editedText, setEditedText] = useState(highlight.hName);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenu = Boolean(anchorEl);
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
  const handleMove = (e, highlight) => {
    const { myValue } = e.currentTarget.dataset;
    const sourceId = highlight.gId;
    const destinationId = myValue;

    if (sourceId) {
      if (sourceId === destinationId) {
        return;
      }
      let startBucket = buckets.find((bucket) => {
        return bucket._id === highlight.gId;
      });
      let startArr = startBucket.highlights;

      const movedItemIndex = startArr.findIndex(
        (item) => item._id === highlight._id
      );
      const movedItemCopy = { ...startArr[movedItemIndex] };

      let targetBucket = buckets.find((bucket) => {
        return bucket._id.toString() === destinationId;
      });
      let targetArr = targetBucket.highlights;

      movedItemCopy.gName = targetBucket.name;
      movedItemCopy.gId = targetBucket._id;

      startArr.splice(movedItemIndex, 1);
      targetArr.push(movedItemCopy);
      console.log(targetBucket);
      console.log(startBucket);

      setBuckets((prev) => [...prev]);
    } else {
      let movedItem = randomHighlights.find((item) => {
        return item._id === highlight._id;
      });
      const fileteredHighlights = randomHighlights.filter((item) => {
        return item._id !== highlight._id;
      });
      let targetBucket = buckets.find(
        (bucket) => bucket._id.toString() === destinationId
      );
      let targetArr = targetBucket.highlights;

      movedItem.gId = targetBucket._id;
      movedItem.gName = targetBucket.name;
      targetArr.push(movedItem);
      setRandomHighlights(fileteredHighlights);
      setBuckets((prev) => [...prev]);
    }
  };
  return (
    <Grid item xs={12} sm={4}>
      {/* <Draggable
        draggableId={highlight._id.toString()}
        key={highlight._id.toString()}
        index={index}
      >
        {(provided) => {
          return ( */}
      <div
        className="standard-single-highlight"
        // ref={provided.innerRef}
        // {...provided.draggableProps}
        // {...provided.dragHandleProps}
      >
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
              <Tooltip title="Confirm" placement="top-start" arrow>
                <DoneIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEdit(highlight)}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Edit" placement="top-start" arrow>
                <EditIcon
                  onClick={() => {
                    setEdit(true);
                  }}
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
            )}
            <Tooltip title="Delete" placement="top-start" arrow>
              <DeleteIcon
                onClick={() => handleDelete(highlight)}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
            <Tooltip title="Move to Another Bucket" placement="top-start" arrow>
              <FileUploadIcon
                onClick={(event) => setAnchorEl(event.currentTarget)}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
            <Menu
              open={isMenu}
              onClose={() => setAnchorEl(null)}
              anchorEl={anchorEl}
              TransitionComponent={Fade}
            >
              {bucketList.map((bucket) => {
                return (
                  <MenuItem
                    data-my-value={bucket._id}
                    key={bucket._id}
                    onClick={(e) => handleMove(e, highlight)}
                  >
                    {bucket.name}
                  </MenuItem>
                );
              })}
              {bucketList.length === 0 && <MenuItem>No buckets!</MenuItem>}
            </Menu>
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
      {/* );
        }}
      </Draggable> */}
    </Grid>
  );
};

export default StandardHighlight;
