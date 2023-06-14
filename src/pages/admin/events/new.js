import NewAdminLayout from "@/components/components/admin/adminLayout";
import EventBasicForm from "@/components/components/admin/eventBasicForm";
import EventFormWrapper from "@/components/components/admin/eventForm";
import EventLocationForm from "@/components/components/admin/eventLocationForm";
import AdminLayout from "@/components/components/admin/layout";
import TicketsForm from "@/components/components/admin/ticketsForm";
import SplitButton from "@/components/components/splitButton";
import { Alert, Button, Snackbar, Stack } from "@mui/material";
import Head from "next/head";
import React, { createContext, useState } from "react";

export const newEventContext = createContext("");

const saveOptions = ["Draft", "Live", "Upcoming"];
export default function NewEvent() {
  const [open, setOpen] = React.useState(false);
  const [newEventForm, setNewEventForm] = useState({});

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <newEventContext.Provider value={{ newEventForm, setNewEventForm }}>
      <Head>
        <title>Add New Event</title>
      </Head>
      <EventFormWrapper
        title={"Basic details"}
        subtitle={"This section contains the basic details about the event"}
        sectionForm={<EventBasicForm />}
      />
      <EventFormWrapper
        title={"Location Details"}
        subtitle={"This section is about the location for the event."}
        sectionForm={<EventLocationForm />}
      />
      <EventFormWrapper
        title={"Tickets Info"}
        subtitle={"This section is about the tickets for your event"}
        sectionForm={<TicketsForm />}
      />
      <Stack flexDirection={"row"} justifyContent={"flex-end"} gap={1} my={1}>
        <SplitButton options={saveOptions} handleError={handleClick} />
      </Stack>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        // action={action}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          There might be errors in the provided details
        </Alert>
      </Snackbar>
    </newEventContext.Provider>
  );
}

NewEvent.getLayout = (page) => {
  return <NewAdminLayout title={"Create New Event"}>{page}</NewAdminLayout>;
};
