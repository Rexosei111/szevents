import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Paper } from "@mui/material";
import Link from "next/link";

function LinkTab(props) {
  return (
    <Tab
      component={Link}
      href={props.href}
      // onClick={(event) => {
      //   event.preventDefault();
      // }}
      {...props}
    />
  );
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: { xs: "100%", md: "40%" } }} component={Paper}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        <LinkTab label="All" href="/admin/events?q=all" />
        <LinkTab label="Live" href="/admin/events?q=live" />
        <LinkTab label="Upcoming" href="/admin/events?q=upcoming" />
        <LinkTab label="Past" href="/admin/events?q=past" />
      </Tabs>
    </Box>
  );
}
