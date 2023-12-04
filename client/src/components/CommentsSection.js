import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import moment from "moment";

function CommentsSection({ comments }) {
  return (
    <Grid container direction="row" spacing={2}>
      {comments.map((comment) => (
        <Grid item container key={comment?.id}>
          <Paper
            sx={{
              width: "auto",
              height: "100%",
            }}
          >
            <Grid key={comment.id} item container py={1} px={2}>
              <Grid item>
                <Typography variant="h6">{comment.author}</Typography>
              </Grid>

              <Grid justifyContent="space-between" item container>
                <Grid item>
                  <Typography sx={{ wordBreak: "break-word" }}>
                    {comment.message}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography noWrap variant="caption" sx={{ color: "gray" }}>
                    {moment(comment.date).format("DD/MM HH:mm")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default CommentsSection;
