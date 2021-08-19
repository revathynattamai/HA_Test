import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

import { useData } from "./hooks/useData";
import { useStyles } from "./styles";

export default function App() {
  const [page, setPage] = useState(1);
  const data = useData(page);
  const classes = useStyles();

  const onPageChange = (ev, value) => {
    setPage(value);
  };

  if (!data) return <div>Loading..</div>;

  const {
    info,
    results,
    error
  } = data;

  if (error) return <div>{error}</div>;

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        {results?.map((character) => (
          <Character key={character.id} {...character} />
        ))}
      </div>
      <Pages value={page} total={info?.pages} onPageChange={onPageChange} />
    </div>
  );
}

const Character = ({ name, image, species, location, origin }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="subtitle1">{species}</Typography>
          <Typography variant="body2">{location?.name}</Typography>
          <Typography variant="body2">{origin?.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const Pages = ({ value, total, onPageChange }) => {
  const classes = useStyles();

  return (
    <Pagination
      id='pagination'
      page={value}
      count={total}
      onChange={onPageChange}
      className={classes.pagination}
    />
  );
};
