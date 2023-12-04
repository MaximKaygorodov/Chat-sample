import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
// import "./App.css";

function ActionGroup({ onChange, onSubmit }) {
  return (
    <Grid container spacing={1} my={1} alignItems="center">
      <InputBase
        sx={{ ml: 3, flex: 1 }}
        onChange={onChange}
        name="message"
        placeholder="Write a message..."
      />
      <IconButton onClick={onSubmit} type="button">
        <SendIcon />
      </IconButton>
    </Grid>
  );
}

export default ActionGroup;
