import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { LayoutContext } from "./adminLayout";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import { useRouter } from "next/router";
import Link from "next/link";
// import useToken from "@/hooks/token";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  ChatSharp,
  Event,
  ExpandLess,
  ExpandMore,
  Money,
  PeopleOutline,
  StarBorder,
} from "@mui/icons-material";
import { signOut } from "next-auth/react";

export function ResponsiveDrawer(props) {
  // const [token, setToken] = useToken("token", null);
  const router = useRouter();
  const { mobileOpen, setMobileOpen, handleDrawerToggle, drawerWidth } =
    useContext(LayoutContext);
  const { window } = props;
  const sideNavItems = [
    // const drawerWidth = 240;
    {
      label: "Home",
      icon: (
        <HomeOutlinedIcon
          fontSize="small"
          htmlColor={router.pathname === "/admin" ? "white" : null}
        />
      ),
      url: "/admin",
    },
    {
      label: "Events",
      icon: (
        <Event
          fontSize="small"
          htmlColor={
            router.pathname.startsWith("/admin/events") ? "white" : null
          }
        />
      ),
      url: "/admin/events",
    },
    {
      label: "Testimonies",
      icon: (
        <ChatSharp
          fontSize="small"
          htmlColor={router.pathname.startsWith("/admin#") ? "white" : null}
        />
      ),
      url: "/admin#",
    },
    {
      label: "Expectations",
      icon: (
        <AssignmentTurnedInOutlinedIcon
          fontSize="small"
          htmlColor={router.pathname.startsWith("/admin#") ? "white" : null}
        />
      ),
      url: "/admin#",
    },
    {
      label: "Transactions",
      icon: (
        <Money
          fontSize="small"
          htmlColor={router.pathname.startsWith("/admin#") ? "white" : null}
        />
      ),
      url: "/admin#",
    },
  ];
  //   const [mobileOpen, setMobileOpen] = React.useState(false);

  //   const handleDrawerToggle = () => {
  //     setMobileOpen(!mobileOpen);
  //   };

  const Mydrawer = () => {
    const [open, setOpen] = useState(false);
    // const [token, setToken] = useToken("token", null);
    const router = useRouter();
    const logout = () => {
      signOut({ redirect: false });
      router.push("/admin/login");
    };
    const handleOpen = (e) => {
      setOpen(!open);
    };
    return (
      <Box height={"89%"}>
        <Toolbar />
        <Stack
          flexDirection={"column"}
          alignItems={"space-between"}
          height={"100%"}
          px={1}
        >
          <List disablePadding>
            {sideNavItems.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  bgcolor: (theme) =>
                    router.pathname === "/admin" && item.label === "Home"
                      ? theme.palette.primary.main
                      : router.pathname.startsWith(item.url) &&
                        item.label !== "Home"
                      ? theme.palette.primary.main
                      : null,
                }}
              >
                <ListItemButton component={Link} href={item.url}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      color:
                        router.pathname === "/admin" && item.label === "Home"
                          ? "white"
                          : router.pathname.startsWith(item.url) &&
                            item.label !== "Home"
                          ? "white"
                          : null,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List
            disablePadding
            sx={{
              mt: "auto",
              width: "100%",
              // height: "20%",
              borderRadius: 3,
              bgcolor: (theme) => theme.palette.background.default,
            }}
            elevation={0}
          >
            <ListItem disableGutters disablePadding>
              <ListItemButton component={Link} href="/admin/users">
                <ListItemIcon>
                  <PeopleOutline fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar sx={{ width: 30, height: 30 }}>{"R"}</Avatar>
                </ListItemIcon>
                <ListItemText primary={"Osei Kyei"} />
              </ListItemButton>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Box>
    );
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Mydrawer />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        <Mydrawer />
      </Drawer>
    </Box>
  );
}
