import { Container, IconButton, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import ResponsiveAppBar from "./appBar";
import HomeMetrics from "./homeMetrics";
import EventMetrics from "./eventMetrics";

export default function AdminLayout({ children, details }) {
  const router = useRouter;
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/admin/login");
    },
  });
  return (
    <Stack flexDirection={"column"} width={"100vw"}>
      <Paper
        elevation={0}
        sx={{
          background: details?.coverImage ? null : "rgb(23,26,32)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          backgroundImage: details?.coverImage
            ? "linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), " +
              `url('${details.coverImage}')`
            : null,
          width: "100vw",
          minHeight: "35vh",
          // maxHeight: "45vh",
          borderRadius: 0,
        }}
      >
        <ResponsiveAppBar />
        <Container maxWidth="lg" sx={{ color: "#FFFFFF", py: 2 }}>
          <Typography variant="h4">{details?.title || null}</Typography>
          <Typography
            variant="subtitle2"
            my={1}
            // color={(theme) => theme.palette.secondary.main}
            color={"GrayText"}
          >
            {details?.subtitle || null}
          </Typography>
          {details?.metrics && details.metricsComponent === "home" && (
            <HomeMetrics metrics={details.metrics} />
          )}
          {details?.metrics && details.metricsComponent === "events" && (
            <EventMetrics metrics={details.metrics} />
          )}
        </Container>
      </Paper>
      <Container maxWidth="lg" component={"main"} sx={{ flexGrow: 2 }}>
        {children}
      </Container>
    </Stack>
  );
}
