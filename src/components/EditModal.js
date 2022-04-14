import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
const BucketModal = ({
  setBuckets,
  name,
  _id,
  buckets,
  setIsEditModal,
}) => {
  const bucketName = useRef(null);
  const newHighlights = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedItem = buckets.find((bucket) => {
      return bucket._id === _id;
    });

    const text = newHighlights.current.value;
    const splittedHighlights = text.split(",");
    let finalHighlights = splittedHighlights.map((highlight) => {
      if (highlight) {
        return { _id: uuidv4(), hName: highlight };
      }
      return undefined;
    });
    if (finalHighlights[0] === undefined) finalHighlights = [];

    editedItem.name = bucketName.current.value;
    editedItem.highlights = [...editedItem.highlights, ...finalHighlights];
    setIsEditModal(false);
    setBuckets((prev) => [...prev]);
  };
  const handleDelete = () => {
    const filteredBucktes = buckets.filter((bucket) => {
      return bucket._id !== _id;
    });
    setIsEditModal(false);
    setBuckets(filteredBucktes);
  };
  return (
    <div >
      <form onSubmit={handleSubmit}>
        <p>Change Bucket Name:</p>
        <TextField inputRef={bucketName} required defaultValue={name} />
        <p>Add New Highlights:</p>
        <small>Separated by Comma</small>
        <br />
        <TextField fullWidth inputRef={newHighlights} multiline rows={4} />
        <br />
        <br />
        <Button
          variant="contained"
          type="submit"
          style={{ marginRight: "8px" }}
        >
          Submit Changes
        </Button>
        <Button variant="contained" onClick={handleDelete} color="error">
          Delete Bucket
        </Button>
      </form>
    </div>
  );
};

export default BucketModal;
