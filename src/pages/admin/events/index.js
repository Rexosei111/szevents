import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/components/admin/layout";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/router";
import EventTable from "@/components/components/admin/eventTable";
import NewAdminLayout from "@/components/components/admin/adminLayout";
import { Add } from "@mui/icons-material";
import ColorTabs from "@/components/components/admin/eventTabs";
import NavTabs from "@/components/components/admin/eventTabs";
import useSWR from "swr";
import { fetcher } from "@/components/config/fetcher";
import { IndexSkeleton } from "..";
import { EventCard } from "../../events";

const steps = [
  {
    label: "Select campaign settings",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: "Create an ad group",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "Create an ad",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

const styles = (theme) => ({
  root: {
    width: "50%", // Adjust the width of the stepper container
  },
  stepLabel: {
    fontSize: "1.2rem", // Adjust the font size of the step labels
  },
});

const AddNewEventCard = () => {
  return (
    <Card
      sx={{
        width: 300,
        position: "absolute",
        top: 100,
        right: 70,
        borderRadius: 5,
      }}
      elevation={24}
    >
      <CardContent>
        <Typography variant="body1">Total events</Typography>
        <Typography variant="h3" textAlign={"center"}>
          4
        </Typography>
        {/* <Stepper orientation="vertical" activeStep={0}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper> */}
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            component={Link}
            href="events/new"
          >
            Add event
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default function Index() {
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [events, setEvents] = useState([]);
  // useEffect(() => {
  //   async function get_events() {
  //     try {
  //       const { data } = await axios.get(
  //         "http://localhost:3000/api/events?q=" + router.query.q
  //           ? router.query.q
  //           : "all"
  //       );
  //       setEvents(data);
  //     } catch (error) {
  //       if (isAxiosError(error)) {
  //         console.log(error);
  //       }
  //     }
  //   }
  //   setStatus(router.query.q ? router.query.q : "all");
  //   if (router.isReady) {
  //     get_events();
  //   }
  const { data, error, isLoading, mutate } = useSWR(
    () => `/events?q=${router.query.q ? router.query.q : "all"}`,
    fetcher
  );
  // }, [router]);
  // useEffect(() => {
  //   // setStatus(router.query.q ? router.query.q : "all");
  //   // mutate();
  // }, [router.isReady]);

  if (isLoading) {
    return <IndexSkeleton />;
  }

  return (
    <>
      {/* <AddNewEventCard /> */}
      <Stack
        flexDirection={"row"}
        width={"100%"}
        justifyContent={"space-between"}
        flexWrap={{ xs: "wrap", lg: "nowrap" }}
      >
        <NavTabs />
        <Button
          startIcon={<Add fontSize="small" />}
          sx={{ ml: { xs: "auto", lg: "none" }, mt: { xs: 1, lg: 0 } }}
          variant="contained"
          component={Link}
          href="/admin/events/new"
          disableElevation
        >
          New
        </Button>
      </Stack>
      {/* <Typography variant="h6" gutterBottom mt={2} textTransform={"capitalize"}>
        {status} Events
      </Typography> */}
      {data?.length === 0 && (
        <Stack
          height={"80vh"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          You have no event in the system.
        </Stack>
      )}
      {data?.length > 0 && (
        <Grid container spacing={2} mt={2} width={"100%"}>
          {data?.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <EventCard eventInfo={event} basePath={"/admin"} />
            </Grid>
          ))}
        </Grid>
      )}
      {/* <EventTable events={events} /> */}
    </>
  );
}

Index.getLayout = (page) => {
  return <NewAdminLayout title={"Your Events"}>{page}</NewAdminLayout>;
};
