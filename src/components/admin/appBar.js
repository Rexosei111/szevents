import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import Link from "@/components/Link";
import { Paper, Stack, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";

const pages = [
  { name: "Home", url: "/admin" },
  { name: "all", url: "/admin/events?q=all" },
  { name: "live", url: "/admin/events?q=live" },
  { name: "upcoming", url: "/admin/events?q=upcoming" },
  { name: "past", url: "/admin/events?q=past" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const LinkTab = (props) => {
  return (
    <Tab
      component={Link}
      {...props}
      sx={{ textTransform: "capitalize", fontWeight: 700, letterSpacing: 0.5 }}
    />
  );
};
function ResponsiveAppBar() {
  const router = useRouter();
  const [value, setValue] = React.useState("Home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "transparent", zIndex: 2 }}
    >
      <Container maxWidth="lg" disableGutters>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 0,
            bgcolor: "transparent",
            // background: "rgb(23,26,32)",
            // background:
            //   "radial-gradient(circle, rgba(23,26,32,1) 0%, rgba(42,44,47,1) 60%, rgba(23,26,32,1) 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack flexDirection={"row"}>
            {/* <Image src={LogoImage} alt="logo" height={40} /> */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/admin"
              sx={{
                mr: "auto",
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "white",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              SPIRITZONE
            </Typography>
          </Stack>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              textColor="inherit"
              indicatorColor={"primary"}
              centered
              sx={{
                bgcolor: "transparent",
              }}
            >
              {pages.map((page) => (
                <LinkTab
                  label={page.name}
                  key={page.name}
                  href={page.url}
                  value={page.name}
                />
              ))}
            </Tabs>
          </Box>
          <Stack>
            <Typography>settings</Typography>
          </Stack>
        </Paper>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
