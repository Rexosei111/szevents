import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import LogoImage from "../../../../public/logo-white-2.svg";
import React from "react";
import Form from "@/components/components/admin/login/form";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container maxWidth="xl" sx={{ minHeight: "100vh" }} disableGutters>
        <Paper
          elevation={0}
          sx={{ width: "100vw", minHeight: "10vh", px: 3, py: 1 }}
          component={Stack}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <Image src={LogoImage} width={120} alt="logo" />
        </Paper>
        <Stack
          flexDirection={"row"}
          alignItems="center"
          justifyContent={"center"}
          width={"100%"}
          minHeight="89vh"
        >
          <Form />
        </Stack>
      </Container>
    </>
  );
}
