import { useState } from "react";
import Grid from "@mui/material/Grid";
import "./App.css";
import Bucket from "./components/Bucket";
import BucketModal from "./components/BucketModal";
import HighlightModal from "./components/HighlightModal";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { DragDropContext } from "react-beautiful-dnd";
import Standard from "./components/Standard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  borderRadius: "10px",
  p: 4,
};

function App() {
  const [buckets, setBuckets] = useState([]);
  const [bucketList, setBucketList] = useState([]);
  const [randomHighlights, setRandomHighlights] = useState([]);
  const [isGroupView, setIsGroupView] = useState(false);
  const [isBucketModal, setIsBucketModal] = useState(false);
  const [isHighlightModal, setIsHighlightModal] = useState(false);
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let startArr = buckets.find(
      (bucket) => bucket._id === source.droppableId
    ).highlights;
    let movedItem = startArr[source.index];
    let targetArr = buckets.find(
      (bucket) => bucket._id === destination.droppableId
    ).highlights;
    startArr.splice(source.index, 1);
    targetArr.splice(destination.index, 0, movedItem);

    setBuckets((prev) => [...prev]);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div className="top-container">
          <div className="top-container__heading">Project Planning</div>
          <div className="top-container__button-container">
            <div
              className="top-container__button"
              onClick={() => {
                setIsHighlightModal(true);
              }}
            >
              Create a Highlight
            </div>
            <div
              className="top-container__button"
              onClick={() => {
                setIsBucketModal(true);
              }}
            >
              Create a Bucket
            </div>
            <div
              className="top-container__button"
              onClick={() => {
                setIsGroupView(!isGroupView);
              }}
            >
              {isGroupView ? "UnGroup Highlights" : "Group Highlights"}
            </div>
          </div>
        </div>

        {/* BucketModal */}
        <Modal
          open={isBucketModal}
          onClose={() => {
            setIsBucketModal(false);
          }}
        >
          <Box sx={style}>
            <BucketModal
              setBuckets={setBuckets}
              setIsBucketModal={setIsBucketModal}
              setBucketList={setBucketList}
            />
          </Box>
        </Modal>

        {/* HighlightModal */}
        <Modal
          open={isHighlightModal}
          onClose={() => {
            setIsHighlightModal(false);
          }}
        >
          <Box sx={style}>
            <HighlightModal
              setRandomHighlights={setRandomHighlights}
              setIsHighlightModal={setIsHighlightModal}
            />
          </Box>
        </Modal>

        {isGroupView ? (
          <Grid container>
            {buckets.map((bucket) => {
              return (
                <Bucket
                  name={bucket.name}
                  highlights={bucket.highlights}
                  key={bucket._id.toString()}
                  _id={bucket._id}
                  setBuckets={setBuckets}
                  buckets={buckets}
                  setBucketList={setBucketList}
                  bucketList={bucketList}
                />
              );
            })}
          </Grid>
        ) : (
          <Standard
            buckets={buckets}
            setBuckets={setBuckets}
            setRandomHighlights={setRandomHighlights}
            randomHighlights={randomHighlights}
          />
        )}
      </div>
    </DragDropContext>
  );
}

export default App;
