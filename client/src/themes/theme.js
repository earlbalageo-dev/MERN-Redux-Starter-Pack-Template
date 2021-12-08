import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {},
  typography: {
    fontFamily: ["'Oswald'", "sans-serif"].join(","),
  },

  components: {},
});

theme = responsiveFontSizes(theme);

export default theme;
