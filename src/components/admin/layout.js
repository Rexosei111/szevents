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
    <>
      <Paper
        elevation={0}
        sx={{
          background: "rgb(23,26,32)",
          background:
            "radial-gradient(circle, rgba(23,26,32,1) 0%, rgba(42,44,47,1) 60%, rgba(23,26,32,1) 100%)",
          width: "100vw",
          minHeight: "30vh",
          maxHeight: "45vh",
          borderRadius: 0,
        }}
      >
        <ResponsiveAppBar />
        <Container
          maxWidth="lg"
          sx={{ color: "#F8FAFC", py: 2 }}
          disableGutters
        >
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
      <Container maxWidth="md" component={"main"}>
        {children}
      </Container>
    </>
  );
}
