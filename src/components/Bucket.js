import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Highlight from "./Highlight";
import EditModal from "./EditModal";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Droppable } from "react-beautiful-dnd";
import "./style.css";

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

const Bucket = ({ name, highlights, _id, setBuckets, buckets }) => {
  const [isEditModal, setIsEditModal] = useState(false);

  return (
    <Grid item mt={3} xs={12} sm={6}>
      <div className="bucket">
        <div className="bucket-header">
          <div className="bucket-header__heading">{name}</div>
          <div
            onClick={() => {
              setIsEditModal(true);
            }}
            className="bucket-header__edit"
          >
            Edit
          </div>
        </div>

        <Modal
          open={isEditModal}
          onClose={() => {
            setIsEditModal(false);
          }}
        >
          <Box sx={style}>
            <EditModal
              setBuckets={setBuckets}
              name={name}
              _id={_id}
              buckets={buckets}
              setIsEditModal={setIsEditModal}
            ></EditModal>
          </Box>
        </Modal>

        <Droppable droppableId={_id.toString()}>
          {(provided) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {highlights.length === 0 && (
                  <div className="single-highlight">Nothing to see here</div>
                )}

                {highlights.length !== 0 &&
                  highlights.map((highlight, index) => {
                    return (
                      <Highlight
                        key={highlight._id.toString()}
                        index={index}
                        buckets={buckets}
                        setBuckets={setBuckets}
                        highlights={highlights}
                        _id={_id}
                        hId={highlight._id}
                        hName={highlight.hName}
                        highlight={highlight}
                      />
                    );
                  })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </Grid>
  );
};

export default Bucket;
