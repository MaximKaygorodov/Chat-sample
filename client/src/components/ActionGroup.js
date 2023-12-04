import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

// import "./App.css";

function ActionGroup({ onChange, onSubmit }) {
  return (
    <Grid container spacing={1} my={1} alignItems="center">
      <Grid item xs={10}>
        <TextField
          name="message"
          label="Second Text Field"
          fullWidth
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default ActionGroup;
