import React, { useState } from "react";
import {
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";

const eventIcons = {
  All: <EventOutlinedIcon />,
  Live: <TodayOutlinedIcon />,
};

export default function EventMetrics({ metrics }) {
  const router = useRouter();
  //   const [eventType, setEventType] = useState(router.query.q || "All");
  const [value, setValue] = useState(router.query.q || "all");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    router.push(`?q=${newValue}`);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      textColor={"inherit"}
      variant="scrollable"
      scrollButtons="auto"
    >
      {metrics.map((metric, index) => (
        <Tab
          label={metric.name}
          value={metric.name}
          iconPosition={"start"}
          icon={eventIcons[metric.name]}
          size="small"
          key={index}
        />
      ))}
    </Tabs>
  );
}
