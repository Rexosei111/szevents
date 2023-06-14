import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import AdminLayout from "@/components/components/admin/layout";
import axios, { isAxiosError } from "axios";
import { EventCard } from "../events";
import { Grid, Paper, Skeleton, Stack } from "@mui/material";
import NewAdminLayout from "@/components/components/admin/adminLayout";
import { fetcher } from "@/components/config/fetcher";
import useSWR from "swr";

export const IndexSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {Array.from(Array(4)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Stack flexDirection={"column"} gap={0} height={250}>
            <Skeleton variant="rectangular" width={"100%"} height={"70%"} />
            <Skeleton variant="text" width={"100%"} height={"15%"} />
            <Skeleton variant="text" width={"80%"} height={"15%"} />
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};
export default function Index() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/admin/login");
    },
  });

  const { data, error, isLoading } = useSWR("/events/summary", fetcher);
  if (isLoading) {
    return <IndexSkeleton />;
  }
  if (error) {
    return (
      <Stack
        height={"89vh"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        Unable to fetch data
      </Stack>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard | Events Dashboard</title>
      </Head>
      {data?.events?.length === 0 && (
        <Stack
          height={"89vh"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          You have no event in the system.
        </Stack>
      )}
      {data?.events?.length > 0 && (
        <Grid container spacing={2}>
          {data?.events?.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <EventCard eventInfo={event} basePath={"/admin"} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

// Index.getInitialProps = async () => {
//   return {
//     title: "Good morning, Rex",
//     subtitle: "Add new events to your list",
//   };
// };

Index.getLayout = function (page) {
  return <NewAdminLayout title={"Welcome"}>{page}</NewAdminLayout>;
};
