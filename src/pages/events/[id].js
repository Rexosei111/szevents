import RootLayout from "@/components/components/layout";
import RootTopBar from "@/components/components/topBar";
import { formatDate } from "@/components/utils/dateFormating";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import sanitizeHtml from "sanitize-html";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationMap from "@/components/components/locationMap";
import GetTicket from "@/components/components/getTicket";

export default function DetailPage({ eventDetails }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  if (eventDetails === null) {
    return <Typography variant="h4">Event details not found</Typography>;
  }
  const startDateObj = new Date(eventDetails.startDate);
  return (
    <>
      <Head>
        <title>{eventDetails.name}</title>
      </Head>
      <Stack flexDirection={"column"} gap={2}>
        <Box
          height={"50vh"}
          width={"100vw"}
          sx={{
            backgroundImage: `url(${eventDetails.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundAttachment: "fixed",
          }}
        >
          <RootTopBar bgcolor="transparent" textColor="white" />
        </Box>
        <Container maxWidth={"lg"} sx={{ pb: 1 }}>
          <Stack
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent={"space-between"}
            mb={2}
          >
            <Box width={{ xs: "100%", md: "70%" }}>
              <Typography
                variant="h1"
                fontSize={38}
                gutterBottom
                fontWeight={400}
              >
                {eventDetails.name}
              </Typography>
              <Typography variant="h4" fontSize={18} gutterBottom>
                {formatDate(new Date(eventDetails?.startDate))}
              </Typography>
              <Typography variant="h4" fontSize={18} gutterBottom>
                {new Date(eventDetails?.startTime).toLocaleTimeString()}
              </Typography>
            </Box>
            <Paper
              sx={{
                minWidth: { xs: "100%", md: "25%" },
                p: 2,
                minHeight: 150,
                // position: "absolute",
                bgcolor: "black",
                color: "white",
                right: 120,
                top: 320,
                borderRadius: 3,
              }}
              elevation={5}
            >
              <Typography variant="caption" fontSize={14} gutterBottom>
                Price per ticket
              </Typography>
              <Divider variant="fullWidth" />
              <Typography variant="subtitle2" fontSize={15} component={"span"}>
                GH
              </Typography>
              <Typography variant="subtitle2" fontSize={40} component={"span"}>
                {eventDetails?.ticketInfo?.price}
              </Typography>
              <Typography
                variant="caption"
                fontSize={15}
                component={"div"}
                gutterBottom
              >
                Available tickets:{" "}
                {`${
                  eventDetails?.ticketInfo?.total -
                  (eventDetails?.ticketInfo?.sold
                    ? eventDetails?.ticketInfo?.sold
                    : 0)
                }`}
              </Typography>
              <Button
                disableElevation
                fullWidth
                variant="contained"
                onClick={handleClickOpen}
                sx={{
                  bgcolor: (theme) => theme.palette.common.white,
                  color: (theme) => theme.palette.common.black,
                }}
              >
                Get a ticket
              </Button>
            </Paper>
          </Stack>
          <Stack flexDirection={{ xs: "column", md: "row" }} gap={2}>
            <Box width={{ xs: "100%", md: "50%" }}>
              <Typography
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(eventDetails["description"]),
                }}
                gutterBottom
              />
            </Box>
            <Paper
              // variant="outlined"
              elevation={0}
              sx={{ width: { xs: "100%", md: "50%" }, p: 2 }}
            >
              <List disablePadding>
                <ListItem disablePadding disableGutters>
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Location Information"}
                    secondary={eventDetails?.location?.address}
                  />
                </ListItem>
              </List>
              <LocationMap
                lng={eventDetails.location?.longitude}
                lat={eventDetails.location?.latitude}
              />
            </Paper>
          </Stack>
        </Container>
      </Stack>
      <GetTicket open={open} handleClose={handleClose} />
    </>
  );
}

DetailPage.getInitialProps = async (context) => {
  const { id } = context.query;
  let eventDetails = null;
  try {
    const { data } = await axios.get("/api/events/" + id);
    eventDetails = data;
  } catch (error) {
    console.log("Unable to fetch event details");
    eventDetails = null;
  }

  return {
    eventDetails,
  };
};

DetailPage.getLayout = function (page) {
  if (page.props.eventDetails === null) {
    return <RootLayout>{page}</RootLayout>;
  }
  if (page.props.eventDetails) {
    return <main>{page}</main>;
  }
};
