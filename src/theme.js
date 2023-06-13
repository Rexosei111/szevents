import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    //   primary: {
    //     main: "#171A20",
    //   },
    //   secondary: {
    //     main: "#FFC107",
    //   },
    //   error: {
    //     main: red.A400,
    //   },
    // },
    // text: {
    //   primary: "#171A20",
    //   secondary: "#F8FAFC",
    background: {
      default: "#f5f5f5",
    },
  },

  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
