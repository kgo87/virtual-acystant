import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  makeStyles,
} from "@material-ui/core";
import colors from "./colors";
import API from "../utils/API";
import "../index.css";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    marginTop: theme.spacing(15),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    backgroundColor: colors.blue2,
    marginBottom: theme.spacing(15),
    borderRadius: "5px",
  },
  title: {
    padding: "5px",
    fontSize: "2.5em",
    color: colors.superLightGrey
  },
  subtitle: {
    padding: "5px",
    fontSize: "1.5em",
    color: colors.superLightGrey
  },
  paragraph: {
    padding: "15px 15px 15px 0px",
    borderRadius: "5px",
    fontSize: "1.25em",
    color: colors.superLightGrey
  },
  liEl: {
    padding: "5px 5px 5px 0px",
    borderRadius: "5px",
    fontSize: "1.25em",
    color: colors.superLightGrey
  },
  image: {
    maxWidth: "400px",
    maxHeight: "auto",
  },
  uploader: {
    marginBottom: "20px",
  },
}));

export default function LoadResults() {
  const classes = useStyles();
  const [results, setResults] = useState({});
  const [show, toggleShow] = React.useState(true);

  const getAllResults = () => {
    API.loadPredictions()
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllResults();
  }, []);

  return (
    <Container maxWidth='lg' className={classes.searchBar}>
      <h1 className={classes.title}>All Saved Results</h1>
      {results.length ? (
        <div>
          {results.map((result) => (
            <Grid
              style={{ justifyContent: "space-between" }}
              container
              spacing={10}
              key={result._id}
            >
              <Grid item xs={12} sm={6}>
                <h4 className={classes.subtitle}>Saved Result as of {result.date.slice(0, -14)} </h4>
              </Grid>
              <Grid item xs={12} sm={6}>
                <li className={classes.liEl}>
                  {result.findings[0].className} with probability{" "}
                  {(result.findings[0].probability * 100).toFixed(3)} %
                </li>
                <li className={classes.liEl}>
                  {result.findings[1].className} with probability{" "}
                  {(result.findings[1].probability * 100).toFixed(3)} %
                </li>
                <li className={classes.liEl}>
                  {result.findings[2].className} with probability{" "}
                  {(result.findings[2].probability * 100).toFixed(3)} %
                </li>
              </Grid>
            </Grid>
          ))}
          <br></br>
        </div>
      ) : (
        <p className='search__form--alert'>
          It looks like you don't have any saved results!
        </p>
      )}
    </Container>
  );
}