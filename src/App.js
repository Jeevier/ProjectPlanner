import { useState } from "react";
import Grid from "@mui/material/Grid";
import "./App.css";
import Bucket from "./components/Bucket";
import BucketModal from "./components/BucketModal";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { DragDropContext } from "react-beautiful-dnd";

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
  const [isAddModal, setIsAddModal] = useState(false);
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
          <div
            className="top-container__button"
            onClick={() => {
              setIsAddModal(true);
            }}
          >
            Let's Create a Bucket
          </div>
        </div>
        <Modal
          open={isAddModal}
          onClose={() => {
            setIsAddModal(false);
          }}
        >
          <Box sx={style}>
            <BucketModal
              setBuckets={setBuckets}
              setIsAddModal={setIsAddModal}
            />
          </Box>
        </Modal>
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
              />
            );
          })}
        </Grid>
      </div>
    </DragDropContext>
  );
}

export default App;
