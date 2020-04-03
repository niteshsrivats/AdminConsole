import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

export const theme = responsiveFontSizes(
  createMuiTheme(
    {
      palette: {
        primary: {
          main: "#fb8c00",
          dark: "#4fc3f7",
          light: "#fb8c00",
          contrastText: "#FFF",
        },
        secondary: {
          main: "#4fc3f7"
          // contrastText: '#FFFFFF'
        },
        text: {
          // primary: "#3A3A3a",
          // secondary: "#676767"
          primary: "#3A3A3a",
          secondary: "#676767"
        },
      },
      typography: {
        h1: {
          fontSize: "2rem"
        },
        h2: {
          fontSize: "1.75rem"
        },
        h3: {
          fontSize: "1.5rem"
        },
        p: {
          fontSize: "1rem"
        },
        body1: {
          fontSize: "1rem"
        }
        // fontFamily: "ProximaNova, ProximaNovaT, signatureFont"
      }
    }
  )
);
