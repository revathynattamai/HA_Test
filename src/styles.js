import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  wrapper: {
    maxWidth: 1000,
    margin: "auto"
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr"
  },
  root: {
    maxWidth: 345,
    margin: 10
  },
  media: {
    height: 140
  },
  pagination: {
    padding: 20,
    display: "flex",
    justifyContent: "center"
  }
});
