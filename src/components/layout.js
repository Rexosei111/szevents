import { Box, Container, Stack } from "@mui/material";
import React from "react";
import RootTopBar from "./topBar";

export default function RootLayout({ children }) {
  return (
    <Stack flexDirection={"column"} width={"100vw"} minHeight={"100vh"}>
      <RootTopBar />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Stack>
  );
}
