import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import LogoImage from "../../../public/logo-white-2.svg";
import Image from "next/image";
import Link from "@/components/Link";
import { Paper, Stack, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";

const pages = [
  { name: "Home", url: "/admin" },
  { name: "Events", url: "/admin/events" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const LinkTab = (props) => {
  return <Tab component={Link} {...props} />;
};
function ResponsiveAppBar() {
  const router = useRouter();
  const [value, setValue] = React.useState("Home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent" }}>
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
              }}
            >
              logo
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
              textColor="secondary"
              indicatorColor={"secondary"}
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
            <Typography>Profile</Typography>
          </Stack>
        </Paper>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
