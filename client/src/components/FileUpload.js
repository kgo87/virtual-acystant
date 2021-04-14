import React from "react";
import * as tf from "@tensorflow/tfjs";
import { Container, Grid, makeStyles, Button, Input, LinearProgress } from "@material-ui/core";
import colors from "./colors";
import { useStoreContext } from "../store/index";
import API from "../utils/API";
import Wikipedia from "./Wikipedia";
import WikiCard from "./WikiCard";
import CarouselImgController from "./carousel/CarouselImgController";

// -------------------------------- PAGE STYLING----------------------------------------//
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
    maxWidth: "600px",
    maxHeight: "auto",
    borderRadius: 25
  },
  uploader: {
    marginBottom: "20px",
  },
  clear: {
    backgroundColor: colors.pinkGrey,
  },
}));

// import * from "../../../tfjs-models/model.json"
export default function FileUpload() {
  const [, dispatch] = useStoreContext();
  const CLASSES = {
    0: "Actinic Keratoses (Solar Keratoses) or intraepithelial Carcinoma (Bowenâ€™s disease)",
    1: "Basal Cell Carcinoma",
    2: "Benign Keratosis",
    3: "Dermatofibroma",
    4: "Melanoma",
    5: "Melanocytic Nevi",
    6: "Vascular skin lesion",
  };

  const [image, setImage] = React.useState("");
  const imageRef = React.useRef();

  const [result, setResult] = React.useState("");
  const [showMore, setShowMore] = React.useState("");
  const [showMore1, setShowMore1] = React.useState("");
  const [showMore2, setShowMore2] = React.useState("");
  const [findings, setFindings] = React.useState("");

  const [predicting, setPredicting] = React.useState(false);

  function uploader(e) {
    const imageFile = e.target.files[0];

    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setResult(e.target.result);
    });

    reader.readAsDataURL(imageFile);
    console.log("Image file " + imageFile);
    return imageFile;
  }

  async function predict() {
    let tensor = tf.browser
      .fromPixels(imageRef.current)
      .resizeNearestNeighbor([224, 224])
      .toFloat();
    console.log("Tensor " + tensor);
    let offset = tf.scalar(127.5);

    tensor = tensor.sub(offset).div(offset).expandDims();
    const model = await tf.loadLayersModel(`/tfjs-models/model.json`);
    let predictions = await model.predict(tensor).data();
    console.log(predictions);
    let top3 = Array.from(predictions)
      .map(function (p, i) {
        return {
          probability: p,
          className: CLASSES[i],
        };
      })
      .sort(function (a, b) {
        return b.probability - a.probability;
      })
      .slice(0, 3);

    console.log(top3);
    const preds = await setFindings(top3);
    // return top3[0].probability + ", " +top3[1].probability + ", " + top3[2].probability
    // -----------------------------GLOBALSTATE SAVE -------------------------------------//
    return top3;
  }

  const showResults = async () => setFindings(await predict());

  // dispatch({ type: RETURN_DATA, payload: findings });

  const saveResults = async (event) => {
    event.preventDefault();
    try {
      const savedResults = await API.savePredictions({ findings });
      console.log(savedResults);
      alert("Results saved!")
    } catch (error) {
      console.log(error);
    }
  };

  function refreshPage() {
    window.location.reload();
  }

  const classes = useStyles();

  return (
    <>
      <Container className={classes.searchBar} maxWidth='lg'>
        <Grid container spacing={2}>
          <Grid item xs>
            <h2 className={classes.title}>Upload Skin Image</h2>

            <Input
              className={classes.uploader}
              type='file'
              inputRef={imageRef}
              onChange={(e) => {
                setImage(e.target.files[0]);
                uploader(e);
              }}
              variant='outlined'
              required
              label='Image Upload'
            />
            <Button
              variant='contained'
              className={classes.clear}
              onClick={() => {
                setResult("");
                setPredicting(false);
                setFindings("");
                setShowMore(false);
                setShowMore1(false);
                setShowMore2(false);
              }}
            >
              {" "}
              Clear
            </Button>
            {result && (
              <img
                ref={imageRef}
                src={result}
                alt=''
                className={classes.image}
              />
            )}
            {result && !predicting && (
              <>
                {result && (
                  <h3 className={classes.paragraph}>
                    {" "}
                    Assess your skin conditions
                  </h3>
                )}
                {result && (
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      predict();
                      setPredicting(true);
                    }}
                  >
                    {" "}
                    Assess
                  </Button>
                )}
              </>
            )}
            <br></br>
            {/* {predicting && !findings && <p className = {classes.paragraph}>Please wait </p>}  */}
            {predicting && !findings && <LinearProgress value = {predicting} />}
          </Grid>
          <Grid item xs>
            {findings && <h1 className={classes.title}> Skin Assessment Results: </h1>}
            {findings &&
              findings.map((item, index) => (
                <li className={classes.liEl} key={index}>
                  {" "}
                  {item.className} with a probability of{" "}
                  {(item.probability * 100).toFixed(3) + "%"}
                </li>
              ))}
            {findings && (
              <Button
                variant='contained'
                color='primary'
                onClick={saveResults}
                style={{ margin: "5px" }}
              >
                {" "}
                Save Results
              </Button>
            )}

            {findings && (
              <Button
                variant='contained'
                color='primary'
                onClick={refreshPage}
                style={{ margin: "5px" }}
              >
                {" "}
                Refresh the Page
              </Button>
            )}

            {/* once findings are rendered build out the wikipedia results tab*/}
            {findings && <h1 className={classes.title}> Wikipedia lookup: </h1>}
            {findings && (
              <li className={classes.liEl}>
                Wikipedia description of {findings[0].className}:
                {findings && (
                  <Button
                    color='primary'
                    onClick={() => {
                      setShowMore(true);
                      setShowMore1(false);
                      setShowMore2(false);
                    }}
                  >
                    {" "}
                    Show More{" "}
                  </Button>
                )}
                <Wikipedia diseaseName={findings[0].className} />
              </li>
            )}
            {findings && (
              <li className={classes.liEl}>
                Wikipedia description of {findings[1].className}:
                {findings && (
                  <Button
                    color='primary'
                    onClick={() => {
                      setShowMore(false);
                      setShowMore1(true);
                      setShowMore2(false);
                    }}
                  >
                    {" "}
                    Show More{" "}
                  </Button>
                )}
                <Wikipedia diseaseName={findings[1].className} />
              </li>
            )}
            {findings && (
              <li className={classes.liEl}>
                Wikipedia description of {findings[2].className}:
                {findings && (
                  <Button
                    color='primary'
                    onClick={() => {
                      setShowMore(false);
                      setShowMore1(false);
                      setShowMore2(true);
                    }}
                  >
                    {" "}
                    Show More{" "}
                  </Button>
                )}
                <Wikipedia diseaseName={findings[2].className} />
              </li>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            {findings && showMore && !showMore1 && !showMore2 && (
              <h1 className={classes.title}> Description of {findings[0].className} </h1>
            )}
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginWidth: "10px" }}>
            {findings && showMore && !showMore1 && !showMore2 && (
              <CarouselImgController diseaseImg={findings[0].className} />
            )}
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginWidth: "10px" }}>
            {findings && showMore && !showMore1 && !showMore2 && (
              <WikiCard diseaseNameSearch={findings[0].className} />
            )}
          </Grid>
        </Grid>

        {/* for finding[1] */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {findings && !showMore && showMore1 && !showMore2 && (
              <h1 className={classes.title}> Description of {findings[1].className} </h1>
            )}
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginWidth: "10px" }}>
            {findings && !showMore && showMore1 && !showMore2 && (
              <CarouselImgController diseaseImg={findings[1].className} />
            )}
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginWidth: "10px" }}>
            {findings && !showMore && showMore1 && !showMore2 && (
              <WikiCard diseaseNameSearch={findings[1].className} />
            )}
          </Grid>
        </Grid>

        {/* for finding[2] */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {findings && !showMore && !showMore1 && showMore2 && (
              <h1 className={classes.title}> Description of {findings[2].className} </h1>
            )}
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginWidth: "10px" }}>
            {findings && !showMore && !showMore1 && showMore2 && (
              <CarouselImgController diseaseImg={findings[2].className} />
            )}
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginWidth: "10px" }}>
            {findings && !showMore && !showMore1 && showMore2 && (
              <WikiCard diseaseNameSearch={findings[2].className} />
            )}
          </Grid>
        </Grid>

        <Grid>{/* <LoadResults /> */}</Grid>
      </Container>
    </>
  );
}
