import NewAdminLayout from "@/components/components/admin/adminLayout";
import EventBasicForm, {
  EventBasicEditForm,
} from "@/components/components/admin/eventBasicForm";
import EventFormWrapper from "@/components/components/admin/eventForm";
import EventLocationForm from "@/components/components/admin/eventLocationForm";
import AdminLayout from "@/components/components/admin/layout";
import TicketsForm from "@/components/components/admin/ticketsForm";
import SplitButton from "@/components/components/splitButton";
import { Button, Stack } from "@mui/material";
import axios, { isAxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";

export const editEventContext = createContext("");
const saveOptions = ["Draft", "Live", "Upcoming"];
export default function EditEvent() {
  const router = useRouter();
  const [newEventForm, setNewEventForm] = useState({});
  useEffect(() => {
    async function getEvent() {
      try {
        const { data } = await axios.get("/api/events/" + router.query.id);
        setNewEventForm(data);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error);
        }
      }
    }
    getEvent();
  }, []);
  return (
    <editEventContext.Provider value={{ newEventForm, setNewEventForm }}>
      <Head>
        <title>{newEventForm && newEventForm.name}</title>
      </Head>
      <EventFormWrapper
        title={"Basic details"}
        subtitle={"This section contains the basic details about the event"}
        sectionForm={<EventBasicEditForm info={newEventForm} />}
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
    </editEventContext.Provider>
  );
}

EditEvent.getInitialProps = async () => {
  return {
    title: "Create New Event",
    subtitle: "Lorem ipsum",
  };
};

EditEvent.getLayout = (page) => {
  return <NewAdminLayout title={page.props.title}>{page}</NewAdminLayout>;
};
