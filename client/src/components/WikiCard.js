import React, { useEffect, useState } from "react";
import API from "../utils/API";
import colors from "./colors";
import { makeStyles } from "@material-ui/core";

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
      maxWidth: "400px",
      maxHeight: "auto",
    },
    uploader: {
      marginBottom: "20px",
    },
    clear: {
      backgroundColor: colors.pinkGrey,
    },
  }));

export default function WikiCard( props ) {

    // set state of the wiki element for rendering
    const [wiki1, setWiki1] = useState("");

    // Useeffect to call wikisend to trigger API call to wikipedia
    // Some classNames do not have corresponding wiki articles and require different search terms
    useEffect(() =>   {
        if (props.diseaseNameSearch === "Melanocytic Nevi") {
            wikiSend("Melanocytic nevus");
        } else if (props.diseaseNameSearch === "Benign Keratosis") {
            wikiSend("Seborrheic keratosis");
        } else if (props.diseaseNameSearch === "Actinic Keratoses (Solar Keratoses) or intraepithelial Carcinoma (Bowenâ€™s disease)") {
            wikiSend("Actinic keratosis");
        } else if (props.diseaseNameSearch === "Vascular skin lesion") {
            wikiSend("Nevus");
        }else if (props.diseaseNameSearch === "Basal Cell Carcinoma") {
            wikiSend("Basal-cell carcinoma");
        }else {
            wikiSend( props.diseaseNameSearch )
        }
    }, )

    // Send wiki triggers API call using the utils.API class
    const wikiSend = function( skinDescription ) {
        
        API.getWiki2( skinDescription ).then(( {data} ) => {

            // results come back with multiple pages
            // must be iterated over to build our wiki state
            for (var i in data.query.pages) {

                console.log("wikicard being called" + i);

                setWiki1( data.query.pages[i].extract )
            }

        }).catch(err=>console.log(err));

    };

    const classes = useStyles();

    // return wiki state for rendering in the findings card
    return (
        <div className={classes.paragraph}>
            {wiki1} 
        </div>
    );
    
}