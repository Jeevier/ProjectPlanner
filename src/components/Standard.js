import React, { useEffect, useState } from "react";
import StandardHighlight from "./StandardHighlight";
import Grid from "@mui/material/Grid";
import "./style.css";
import "./standard.css";

const Standard = ({
  buckets,
  randomHighlights,
  setRandomHighlights,
  setBuckets,
}) => {
  const [allHighlights, setAllHighlights] = useState([]);
  useEffect(() => {
    let result = [];
    if (buckets.length > 0) {
      buckets.forEach((bucket) => {
        bucket.highlights.forEach((highlight) => {
          result.push(highlight);
        });
      });
    }
    if (randomHighlights.length > 0) {
      result = [...result, ...randomHighlights];
    }
    setAllHighlights(result);
  }, [buckets, randomHighlights]);

  return (
    <div>
      <Grid container>
        {allHighlights.map((highlight) => {
          return (
            <Grid item xs={12} sm={4} key={highlight._id}>
              <StandardHighlight
                buckets={buckets}
                randomHighlights={randomHighlights}
                setRandomHighlights={setRandomHighlights}
                setBuckets={setBuckets}
                highlight={highlight}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Standard;
