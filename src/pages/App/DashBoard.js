import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import "./DashBoard.css";
import oops from "../../assets/oops.png"
import Bucket from "../../components/Bucket";
import BucketModal from "../../components/BucketModal";
import HighlightModal from "../../components/HighlightModal";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { DragDropContext } from "react-beautiful-dnd";
import Standard from "../../components/Standard";
import Navbar from "../../Navbar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import emoji from "../../assets/emoji.png"
import API from "../../api";
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
  // console.log(buckets);
  // console.log(bucketList);
  // console.log(randomHighlights);

  const { user } = useAuth0();

  useEffect(() => {
    const fetchAndUpdateData = async () => {
      const body = {
        name: user.name,
        email: user.email,
        picture: user.picture,
      };
      const user_id = user.sub;
      API.post(`userProfile/${user_id}`, body)
        .then((res) => {
          res.data.bucket === undefined
            ? setBuckets([])
            : setBuckets(res.data.bucket);
          res.data.bucketList === undefined
            ? setBuckets([])
            : setBucketList(res.data.bucketList);
          res.data.randomHighlight === undefined
            ? setBuckets([])
            : setRandomHighlights(res.data.randomHighlight);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
        });
    };
    fetchAndUpdateData();
  }, [user.name, user.email, user.sub, user.picture]);

  useEffect(() => {
    const updateData = async () => {
      const body = {
        bucket: buckets,
        bucketList: bucketList,
        randomHighlight: randomHighlights,
      };
      const user_id = user.sub;
      API.patch(`userProfile/${user_id}`, body)
        .then((res) => {
          // console.log(res);
        })
        .catch((error) => {
          if (error.response) {
            // console.log(error.response);
            // console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
        });
    };
    updateData();
  }, [buckets, bucketList, randomHighlights, user.sub]);

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
    let targetBucket = buckets.find(
      (bucket) => bucket._id === destination.droppableId
    );
    let targetArr = targetBucket.highlights;
    movedItem.gName = targetBucket.name;
    movedItem.gId = targetBucket._id;
    startArr.splice(source.index, 1);
    targetArr.splice(destination.index, 0, movedItem);

    setBuckets((prev) => [...prev]);
  };

  return (
    <>
      <Navbar />
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <div className="top-container">
            <div className="top-container__heading-container">
              <div className="top-container__heading">Let's Plan</div>
              <img src={emoji} alt="eyes" style={{width:"40px"}}/>
              </div>
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
                style={
                  isGroupView
                    ? { backgroundColor: "#dedede", color: "#111" }
                    : {}
                }
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
                randomHighlights={randomHighlights}
              />
            </Box>
          </Modal>

          {isGroupView ? (
            <Grid container>
              {buckets.length===0 && 
                <Grid item xs={12} style={{ textAlign: "center"}}>
                <img src={oops} alt="oops" style={{width:"300px"}} />
                <div style={{  fontSize: "2rem"}}>No Buckets Present!!</div>
                </Grid>
              }
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
              bucketList={bucketList}
            />
          )}
        </div>
      </DragDropContext>
    </>
  );
}

export default App;
