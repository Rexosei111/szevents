import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../ProTIp";
import Link from "../Link";
import Copyright from "../Copyright";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    router.push("/events?q=all");
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h6">redirecting...</Typography>
      </Box>
    </Container>
  );
}
