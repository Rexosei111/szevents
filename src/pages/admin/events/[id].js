import AdminLayout from "@/components/components/admin/layout";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import Head from "next/head";
import React from "react";
import sanitizeHtml from "sanitize-html";
import NumbersIcon from "@mui/icons-material/Numbers";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const sliderMarks = [
  { value: 0, label: "0" },
  { value: 200, label: "200" },
];
export default function EventDetails({ pageDetails }) {
  const eventDetails = pageDetails.eventDetails;
  return (
    <>
      <Head>
        <title>{eventDetails["name"]}</title>
      </Head>
      <Container maxWidth={"lg"} sx={{ my: 2, minHeight: 460 }}>
        <Stack
          flexDirection={"row"}
          gap={2}
          width={"100%"}
          position={"relative"}
        >
          <Box width={{ xs: "100%", md: "60%" }}>
            <Typography variant="h6" gutterBottom>
              Event Description
            </Typography>
            <Typography
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(eventDetails["description"]),
              }}
              gutterBottom
            />
            <Typography variant="h6" gutterBottom>
              Location Information
            </Typography>
            <Typography variant="subtitle2">
              {eventDetails?.location?.address
                ? eventDetails.location?.address
                : "Not set"}
            </Typography>
          </Box>
          <Divider flexItem orientation="vertical" variant="inset" />
          <Stack
            flexDirection={"column"}
            gap={2}
            width={{ xs: "100%", md: "30%" }}
            my={2}
            sx={{ position: "absolute", right: 0, top: -150 }}
          >
            <Paper sx={{ width: "100%", p: 2, borderRadius: 3 }} elevation={24}>
              <Typography variant="subtitle2" fontSize={18} gutterBottom>
                Date and Time
              </Typography>
              <List dense>
                <ListItem disablePadding disableGutters>
                  <ListItemIcon>
                    <DateRangeOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Scheduled to start at"
                    secondary={
                      eventDetails?.startDate
                        ? eventDetails?.startDate
                        : "Not set"
                    }
                  />
                </ListItem>
                <Divider variant="inset" sx={{ my: 1, bgcolor: "#e8ffe8" }} />
                <ListItem disablePadding disableGutters>
                  <ListItemIcon>
                    <AccessTimeOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Scheduled to start at"
                    secondary={
                      eventDetails?.startTime
                        ? eventDetails?.startTime
                        : "Not set"
                    }
                  />
                </ListItem>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "rgb(23,26,32)",
                    color: "white",
                    borderRadius: 3,
                  }}
                  disableElevation
                >
                  Update Event
                </Button>
              </List>
            </Paper>
            <Paper
              sx={{
                width: "100%",
                p: 2,
                borderRadius: 3,
                bgcolor: "rgb(23,26,32)",
                color: "white",
              }}
              elevation={0}
            >
              <Typography variant="subtitle2" fontSize={18} gutterBottom>
                Tickets Information
              </Typography>
              {eventDetails.ticketInfo && (
                <List dense>
                  <ListItem disablePadding disableGutters>
                    <ListItemIcon>
                      <ConfirmationNumberOutlined
                        fontSize="small"
                        htmlColor="white"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Total number of tickets"
                      secondary={
                        eventDetails.ticketInfo?.total
                          ? eventDetails.ticketInfo?.total
                          : "Not set"
                      }
                      secondaryTypographyProps={{
                        color: "#dee1ec",
                      }}
                    />
                  </ListItem>
                  <Divider variant="inset" sx={{ my: 1, bgcolor: "white" }} />
                  <ListItem disablePadding disableGutters>
                    <ListItemIcon>
                      <Typography
                        variant="subtitle2"
                        fontSize={20}
                        color={"white"}
                      >
                        GH
                      </Typography>
                    </ListItemIcon>
                    <ListItemText
                      primary="Price per ticket"
                      secondary={
                        eventDetails.ticketInfo?.price
                          ? eventDetails.ticketInfo?.price
                          : "Not set"
                      }
                      secondaryTypographyProps={{
                        color: "#dee1ec",
                      }}
                    />
                  </ListItem>
                  <Divider variant="inset" sx={{ my: 1, bgcolor: "white" }} />
                  <ListItem disablePadding disableGutters>
                    <ListItemIcon>
                      <NumbersIcon fontSize="small" htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Number of tickets sold"
                      secondary={
                        eventDetails.ticketInfo?.sold
                          ? eventDetails.ticketInfo?.sold
                          : 0
                      }
                      secondaryTypographyProps={{
                        color: "#dee1ec",
                      }}
                    />
                  </ListItem>
                </List>
              )}
              {!eventDetails.ticketInfo && (
                <Typography textAlign={"center"} my={1} variant="caption">
                  Data unavailable
                </Typography>
              )}
            </Paper>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

EventDetails.getInitialProps = async (context) => {
  const { id } = context.query;
  const metrics = [
    {
      name: "All",
      value: 20,
      icon: "",
    },
    {
      name: "Live",
      value: 1,
      icon: "",
    },
    {
      name: "Upcoming",
      value: 3,
      icon: "revenue",
    },
    {
      name: "Past",
      value: 13,
      icon: "testimonies",
    },
    {
      name: "Draft",
      value: 3,
      icon: "event",
    },
  ];
  const { data } = await axios.get("http://localhost:3000/api/events/" + id);
  return {
    pageDetails: {
      title: data.name,
      coverImage: data?.coverImage,
      subtitle: "Event details page",
      eventDetails: data,
      //   metrics,
      //   metricsComponent: "events",
    },
  };
};
EventDetails.getLayout = (page) => {
  return <AdminLayout details={page.props.pageDetails}>{page}</AdminLayout>;
};
