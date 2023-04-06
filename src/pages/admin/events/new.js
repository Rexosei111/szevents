import EventBasicForm from "@/components/components/admin/eventBasicForm";
import EventFormWrapper from "@/components/components/admin/eventForm";
import AdminLayout from "@/components/components/admin/layout";
import React from "react";

export default function NewEvent() {
  return (
    <>
      <EventFormWrapper
        title={"Basic details"}
        subtitle={"This section contains the basic details about the event"}
        sectionForm={<EventBasicForm />}
      />
    </>
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
