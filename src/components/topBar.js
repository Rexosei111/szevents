import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

export default function RootTopBar({
  bgcolor = "transparent",
  textColor = "black",
}) {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: bgcolor, color: textColor }}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component={Link}
            href={"/events"}
            sx={{ textDecoration: "none" }}
            letterSpacing={5}
            fontWeight={700}
          >
            SPIRITZONE
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
