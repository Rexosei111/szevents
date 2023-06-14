import RootLayout from "@/components/components/layout";
import RootTopBar from "@/components/components/topBar";
import { formatDate } from "@/components/utils/dateFormating";
import {
  Alert,
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
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import sanitizeHtml from "sanitize-html";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationMap from "@/components/components/locationMap";
import GetTicket from "@/components/components/getTicket";
import useSWR from "swr";
import { fetcher } from "@/components/config/fetcher";
import Image from "next/image";

const LoadingSkeleton = () => {
  return (
    <Stack flexDirection={"column"} gap={2} width={"100%"}>
      <Skeleton variant="rectangular" width={"100%"} height={200} />
      <Skeleton variant="text" width={"45%"} height={20} />
      <Skeleton variant="text" width={"70%"} height={20} />
      <Skeleton variant="text" width={"40%"} height={20} />
      <Skeleton variant="text" width={"40%"} height={20} />
      <Skeleton variant="rectangular" width={"100%"} height={200} />
    </Stack>
  );
};
export default function DetailPage() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const { data, error, isLoading } = useSWR(
    "/events/" + router.query.id,
    fetcher
  );
  const handleClose = (value) => {
    setOpen(false);
  };

  const startDateObj = new Date(data?.startDate);

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <>
      <Head>
        <title>{data?.name}</title>
      </Head>
      <Stack flexDirection={"column"} gap={2} width={"100%"}>
        <Box width={{ xs: "100%" }} height={{ xs: 350 }} position="relative">
          <Image
            src={data?.coverImage}
            alt="cover image"
            priority
            fill
            style={{ objectFit: "cover" }}
          />
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
                {data?.name}
              </Typography>
              <Typography variant="h4" fontSize={18} gutterBottom>
                {formatDate(new Date(data?.startDate))}
              </Typography>
              <Typography variant="h4" fontSize={18} gutterBottom>
                {new Date(data?.startTime).toLocaleTimeString()}
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
                {data?.ticketInfo?.price}
              </Typography>
              <Typography
                variant="caption"
                fontSize={15}
                component={"div"}
                gutterBottom
              >
                Available tickets:{" "}
                {`${
                  data?.ticketInfo?.total -
                  (data?.ticketInfo?.sold ? data?.ticketInfo?.sold : 0)
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
                Grab a ticket
              </Button>
            </Paper>
          </Stack>
          <Stack flexDirection={{ xs: "column", md: "row" }} gap={2}>
            <Box width={{ xs: "100%", md: "50%" }}>
              <Typography
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(data?.description),
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
                    secondary={data?.location?.address}
                  />
                </ListItem>
              </List>
              <LocationMap
                lng={data?.location?.longitude}
                lat={data?.location?.latitude}
              />
            </Paper>
          </Stack>
        </Container>
      </Stack>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          variant="filled"
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <GetTicket
        open={open}
        setAlertOpen={setAlertOpen}
        setSeverity={setSeverity}
        handleAlertClose={handleAlertClose}
        setMessage={setMessage}
        handleClose={handleClose}
        amount={data?.ticketInfo?.price}
        eventName={data?.name}
      />
    </>
  );
}

// DetailPage.getInitialProps = async (context) => {
//   const { id } = context.query;
//   let eventDetails = null;
//   try {
//     const { data } = await axios.get("/api/events/" + id);
//     eventDetails = data;
//   } catch (error) {
//     console.log("Unable to fetch event details");
//     eventDetails = null;
//   }

//   return {
//     eventDetails,
//   };
// };

DetailPage.getLayout = function (page) {
  return <RootLayout>{page}</RootLayout>;
};
