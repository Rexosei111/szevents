import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../../ProTIp";
import Link from "../../Link";
import Copyright from "../../Copyright";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import AdminLayout from "@/components/components/admin/layout";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";

export default function Index() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/admin/login");
    },
  });
  return (
    <>
      <Head>
        <title>Dashboard | Events Dashboard</title>
      </Head>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Material UI - Next.js example
          </Typography>
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

Index.getInitialProps = async () => {
  const metrics = [
    {
      name: "Events",
      value: 3,
      icon: "event",
    },
    {
      name: "Average Attendees",
      value: 300,
      icon: "attendees",
    },
    {
      name: "Revenue",
      value: 1500,
      icon: "revenue",
    },
    {
      name: "Testimonies",
      value: 100,
      icon: "testimonies",
    },
  ];
  return {
    pageDetails: {
      title: "Good morning, Rex",
      subtitle: "Add new events to your list",
      metrics,
      metricsComponent: "home",
    },
  };
};

Index.getLayout = function (page) {
  return <AdminLayout details={page.props.pageDetails}>{page}</AdminLayout>;
};
