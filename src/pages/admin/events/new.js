import EventBasicForm from "@/components/components/admin/eventBasicForm";
import EventFormWrapper from "@/components/components/admin/eventForm";
import EventLocationForm from "@/components/components/admin/eventLocationForm";
import AdminLayout from "@/components/components/admin/layout";
import TicketsForm from "@/components/components/admin/ticketsForm";
import SplitButton from "@/components/components/splitButton";
import { Button, Stack } from "@mui/material";
import Head from "next/head";
import React, { createContext, useState } from "react";

export const newEventContext = createContext("");
const saveOptions = ["Draft", "Live", "Upcoming"];
export default function NewEvent() {
  const [newEventForm, setNewEventForm] = useState({});
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
        <SplitButton options={saveOptions} />
      </Stack>
    </newEventContext.Provider>
  );
}

NewEvent.getInitialProps = async () => {
  return {
    pageDetails: {
      title: "Create New Event",
      subtitle: "Lorem ipsum",
    },
  };
};

NewEvent.getLayout = (page) => {
  return <AdminLayout details={page.props.pageDetails}>{page}</AdminLayout>;
};
