import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import LogoImage from "../../../../public/logo-white-2.svg";
import React from "react";
import Form from "@/components/components/admin/login/form";

export default function Login() {
  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh" }} disableGutters>
      <Stack
        flexDirection={"row"}
        alignItems="center"
        justifyContent={"flex-start"}
        height="inherit%"
        position={"relative"}
      >
        <Paper
          elevation={0}
          sx={{
            minHeight: "100vh",
            maxWidth: "50vw",
            p: 2,
          }}
        >
          <Image src={LogoImage} width={120} alt="logo" />
          <Paper
            elevation={0}
            sx={{
              width: "50vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form />
          </Paper>
        </Paper>
      </Stack>
    </Container>
  );
}
