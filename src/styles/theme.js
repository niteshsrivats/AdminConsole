import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

export const theme = responsiveFontSizes(
  createMuiTheme(
    {
      palette: {
        primary: {
          main: "#fb8c00",
          dark: "#4fc3f7",
          light: "#fb8c00",
          contrastText: "#FFF"
        },
        secondary: {
          main: "#4fc3f7",
          light: "#4fc3f7",
          dark: "#fb8c00",
          contrastText: "#FFF"
        },
        text: {
          // primary: "#3A3A3a",
          // secondary: "#676767"
          primary: "#3A3A3a",
          secondary: "#676767"
        }
      }
    }
  )
);
