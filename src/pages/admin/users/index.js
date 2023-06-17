import NewAdminLayout from "@/components/components/admin/adminLayout";
import UsersTable from "@/components/components/admin/usersTable";
import { fetcher } from "@/components/config/fetcher";
import { Add } from "@mui/icons-material";
import { Button, Paper, Skeleton, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

const UsersLoadingSkeleton = () => {
  return (
    <Stack width={"100%"} flexDirection={"column"} height={"80vh"} gap={1}>
      <Skeleton variant="text" width={"60%"} height={20} />
      <Skeleton variant="text" width={"80%"} height={20} />
      <Skeleton variant="rectangular" width={"100%"} height={200} />
    </Stack>
  );
};
export default function UsersListingPage() {
  const { data, error, isLoading, mutate } = useSWR(() => `/users`, fetcher);
  console.log(data);

  if (isLoading) {
    return <UsersLoadingSkeleton />;
  }
  return (
    <Stack flexDirection={"column"} gap={2}>
      <Stack flexDirection={"row"} alignItems={"center"}>
        <Button
          variant="contained"
          startIcon={<Add fontSize="small" />}
          sx={{ ml: "auto" }}
          component={Link}
          href="/admin/users/new"
          disableElevation
        >
          New
        </Button>
      </Stack>
      <Paper>
        <UsersTable users={data} />
      </Paper>
    </Stack>
  );
}

UsersListingPage.getLayout = (page) => {
  return <NewAdminLayout title="Users">{page}</NewAdminLayout>;
};
