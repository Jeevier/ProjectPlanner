import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
const BucketModal = ({ setBuckets, setIsAddModal }) => {
  const bucketName = useRef(null);
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
    console.log(finalHighlights);
    setBuckets((prev) => {
      return [
        ...prev,
        {
          _id: uuidv4(),
          name: bucketName.current.value,
          highlights: finalHighlights,
        },
      ];
    });
    setIsAddModal(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Bucket Name:</p>
        <TextField fullWidth inputRef={bucketName} required />
        <p>Highlights:</p>
        <small>Separated by (&amp;)</small>
        <br />
        <TextField fullWidth inputRef={newHighlights} multiline rows={4} />

        {/* {highlights &&
          highlights.map((highlight) => {
            return (<>
              <div
                style={{
                    backgroundColor: "pink",
                    padding: "4px",
                    borderRadius: "4px",
                    margin: "6px",
                }}
              >
                {highlight}
              </div>
                </>
            );
          })} */}
        <br />
        <br />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default BucketModal;
