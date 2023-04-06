import React from "react";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { IconButton, Stack, Typography } from "@mui/material";

const eventIcons = {
  event: <EventOutlinedIcon sx={{ color: "#17b978" }} />,
  attendees: <PeopleOutlineIcon sx={{ color: "#0090ad" }} />,
  revenue: <AttachMoneyOutlinedIcon sx={{ color: "#cb464a" }} />,
  testimonies: <MessageOutlinedIcon sx={{ color: "#ffa010" }} />,
};

export default function HomeMetrics({ metrics }) {
  return (
    <Stack direction={"row"} spacing={3} my={3}>
      {metrics.map((metric, index) => (
        <Stack direction={"row"} spacing={2} key={index}>
          <IconButton size="large" sx={{ bgcolor: "#595a5c8a" }}>
            {eventIcons[metric.icon]}
          </IconButton>
          <Stack direction={"column"} spacing={0}>
            <Typography variant="h5" fontWeight={700}>
              {metric.value}
            </Typography>
            <Typography variant="caption" color={"GrayText"}>
              {metric.name}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
