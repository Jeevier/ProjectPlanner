import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";

const HighlightModal = ({ setIsHighlightModal, setRandomHighlights }) => {
  const newHighlights = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = newHighlights.current.value;
    const splittedHighlights = text.split("&");
    const cleanedHighlights = splittedHighlights.filter(function (e) {
      return e === 0 || e;
    });
    const finalHighlights = cleanedHighlights.map((ele) => {
      return { _id: uuidv4(), hName: ele };
    });

    setRandomHighlights((prev) => {
      return [...prev, ...finalHighlights];
    });
    setIsHighlightModal(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Add New Highlights:</p>
        <small>Separated by (&amp;)</small>
        <br />
        <TextField fullWidth inputRef={newHighlights} multiline rows={4} />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Submit Changes
        </Button>
      </form>
    </div>
  );
};

export default HighlightModal;
