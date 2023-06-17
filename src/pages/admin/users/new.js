import NewAdminLayout from "@/components/components/admin/adminLayout";
import NewUserForm from "@/components/components/admin/newUserForm";
import { Stack } from "@mui/material";
import React from "react";

export default function NewUser() {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"89vh"}
    >
      <NewUserForm />
    </Stack>
  );
}

NewUser.getLayout = (page) => {
  return <NewAdminLayout title="Add new user">{page}</NewAdminLayout>;
};
