import React from "react";
import AdminLayout from "@/components/components/admin/layout";
import {
  Button,
  Card,
  CardActions,
  CardContent,
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
      elevation={0}
    >
      <CardContent>
        <Typography variant="body1">Total events</Typography>
        <Typography variant="h3" textAlign={"center"}>
          4
        </Typography>
        <Stepper orientation="vertical" activeStep={0}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
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
export default function NewEvent({ title }) {
  return (
    <>
      <AddNewEventCard />
    </>
  );
}

NewEvent.getInitialProps = async () => {
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
  return {
    pageDetails: {
      title: "Good morning, Rex",
      subtitle: "Add new events to your list",
      metrics,
      metricsComponent: "events",
    },
  };
};

NewEvent.getLayout = (page) => {
  return <AdminLayout details={page.props.pageDetails}>{page}</AdminLayout>;
};
