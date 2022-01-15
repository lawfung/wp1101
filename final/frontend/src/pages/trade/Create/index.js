import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// mui
// import AdapterMoment from "@mui/lab/AdapterMoment";
// import DateTimePicker from "@mui/lab/DateTimePicker";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Slider } from "@mui/material";
// constants
// import { TODO } from "../../constants";
// const TODO = "TODO";
// const INPROGRESS = "INPROGRESS";
// const DONE = "DONE";
// graphql
// import { useMutation } from "@apollo/react-hooks";
// TODO 4.2 Uncomment the following line
// import { GET_TASKS_QUERY, CREATE_TASK_MUTATION } from "../../graphql";

// const TITLE = "title";
// const CONTENT = "content";
// const DUEDATE = "dueDate";

// const initialFormData = {
//   [TITLE]: "",
//   [CONTENT]: "",
//   [DUEDATE]: "",
// };
import { marksTimes } from "../../../tools/constant";

export default function CreateTaskModal({ open, openMB, handleCloseCreate, handleCreate }) {
  // form data control
  const handleChange = (f) => ((e) => {setDisplayError(false);f(e.target.value);})
  const [tabName, settabName] = useState('name');
  const [startTime, setStartTime] = useState('2021-01-01T00:00');
  const [endTime, setEndTime] = useState('2021-01-01T02:00');
  const [assetType, setAssetType] = useState('BTC');
  const marks = marksTimes.map((x, i) => ({value: i, label: x}));
  const [timeScale, setTimeScale] = useState(0);
//   const [formData, setFormData] = useState(initialFormData);
  const [displayError, setDisplayError] = useState(false);

//   const handleChangeFormData = (key, value) => {
//     setDisplayError(false);
//     setFormData({
//       ...formData,
//       [key]: value,
//     });
//   };

  // TODO 4.2 Uncomment the following lines
//   const [createTask] = useMutation(CREATE_TASK_MUTATION);
//   const handleCreate = () => {
//     if (Object.values(formData).some((v) => !v)) {
//       setDisplayError(true);
//       return;
//     }
//     // TODO 4.2 Uncomment the following lines
//     createTask({
//       variables: {
//         input: {
//           id: uuidv4(),
//           title: formData.title,
//           content: formData.content,
//           dueDate: parseInt(formData.dueDate.format("x")),
//           status: TODO,
//         },
//       },
//       refetchQueries: [GET_TASKS_QUERY], // refetch after createTask
//       onCompleted: () => {
//         handleClose();
//       },
//     });
//   };

  const handleClose = () => {
    // reset data
    // setFormData(initialFormData);
    handleCloseCreate();
  };
  const nameL = 10;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Create a new {openMB ? "Backtest" : "Monitor"}</DialogTitle>
      <DialogContent>
      {/* <TextField label="Start time" value={startTime} type="datetime-local" onChange={handleChange(setStartTime)} InputLabelProps={{ shrink: true }}/> */}
      <TextField
          error={displayError && ((!tabName) || (tabName.length > nameL)) }
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          variant="standard"
          value={tabName}
          onChange={handleChange(settabName)}
          helperText={displayError && (((!tabName) && "The field can't be empty!") || ((tabName.length > nameL) && `Length of tab name can't exceed ${nameL}`) )}
        />
        <TextField
          error={displayError && (!startTime)}
          margin="dense"
          label="Start time"
          fullWidth
          variant="standard"
          type="datetime-local"
          value={startTime}
          onChange={handleChange(setStartTime)}
          helperText={displayError && (!startTime) && "The field can't be empty!"}
        />
        <TextField
          error={displayError && (!endTime)}
          margin="dense"
          label="End Time"
          fullWidth
          variant="standard"
          type="datetime-local"
          value={endTime}
          onChange={handleChange(setEndTime)}
          helperText={displayError && (!endTime) && "The field can't be empty!"}
        />
        <TextField
          error={displayError && (!assetType)}
          margin="dense"
          label="Asset type"
          fullWidth
          variant="standard"
          value={assetType}
          onChange={handleChange(setAssetType)}
          helperText={displayError && (!assetType) && "The field can't be empty!"}
        />
        Time Scale
        <Slider
            value={timeScale}
            onChange={handleChange(setTimeScale)}
            step={null}
            marks={marks}
            max={marksTimes.length - 1}
            sx={{width: "100%", marginTop: "0vh"}}
            track={false}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={()=>{
            if(!tabName || !startTime || !endTime || !assetType || tabName.length > nameL){
              setDisplayError(true);
              return;
            }
            handleClose();
            handleCreate({tabName, startTime, endTime, assetType, openMB, timeScaleString: marksTimes[timeScale]});
          }}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
