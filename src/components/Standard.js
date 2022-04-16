import React, { useEffect, useState } from "react";
import StandardHighlight from "./StandardHighlight";
import Grid from "@mui/material/Grid";
// import { Droppable } from "react-beautiful-dnd";
import "./style.css";
import "./standard.css";

const Standard = ({
  buckets,
  randomHighlights,
  setRandomHighlights,
  setBuckets,
  bucketList,
}) => {
  const [allHighlights, setAllHighlights] = useState([]);
  useEffect(() => {
    let result = [];
    if (buckets.length > 0) {
      buckets.forEach((bucket) => {
        bucket.highlights.forEach((highlight) => {
          result.push({ ...highlight });
        });
      });
    }
    if (randomHighlights.length > 0) {
      result = [...result, ...randomHighlights];
    }
    setAllHighlights([...result]);
  }, [buckets, randomHighlights, setBuckets]);

  return (
    <div>
      {/* <Droppable droppableId="Standard"> */}
      {/* {(provided) => { */}
      {/* return ( */}
      {/* <div ref={provided.innerRef} {...provided.droppableProps}> */}
      <Grid container>
        {allHighlights.map((highlight, index) => {
          return (
            <StandardHighlight
              key={highlight._id.toString()}
              index={index}
              buckets={buckets}
              randomHighlights={randomHighlights}
              setRandomHighlights={setRandomHighlights}
              setBuckets={setBuckets}
              highlight={highlight}
              bucketList={bucketList}
            />
          );
        })}
      </Grid>
      {/* {provided.placeholder} */}
      {/* </div> */}
      {/* ); */}
      {/* }} */}
      {/* </Droppable> */}
    </div>
  );
};

export default Standard;
