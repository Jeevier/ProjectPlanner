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
  setBucketList,
  bucketList,
}) => {
  const bucketName = useRef(null);
  const newHighlights = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedItem = buckets.find((bucket) => {
      return bucket._id === _id;
    });
    const editedItemInList = bucketList.find((bucket) => {
      return bucket._id === _id;
    });
    const text = newHighlights.current.value;
    const splittedHighlights = text.split("&");
    const cleanedHighlights = splittedHighlights.filter(function (e) {
      return e === 0 || e;
    });
    const finalHighlights = cleanedHighlights.map((ele) => {
      return {
        _id: uuidv4(),
        hName: ele,
        gId: _id,
        gName: bucketName.current.value,
      };
    });

    editedItem.name = bucketName.current.value;
    editedItemInList.name = bucketName.current.value;
    editedItem.highlights = [...editedItem.highlights, ...finalHighlights];
    setIsEditModal(false);
    setBuckets((prev) => [...prev]);
    setBucketList((prev) => [...prev]);
  };
  const handleDelete = () => {
    const filteredBuckets = buckets.filter((bucket) => {
      return bucket._id !== _id;
    });
    const filteredBucketList = bucketList.filter((bucket) => {
      return bucket._id !== _id;
    });
    setIsEditModal(false);
    setBuckets(filteredBuckets);
    setBucketList(filteredBucketList);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Change Bucket Name:</p>
        <TextField inputRef={bucketName} required defaultValue={name} />
        <p>Add New Highlights:</p>
        <small>Separated by (&amp;)</small>
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
