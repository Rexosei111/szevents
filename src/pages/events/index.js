import React, { useEffect, useState } from "react";
import RootLayout from "../../components/layout";
import Head from "next/head";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

const EventsLoadingSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {Array.from(Array(4)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Stack flexDirection={"column"} gap={0} height={300}>
            <Skeleton variant="rectangular" width={"100%"} height={"70%"} />
            <Skeleton variant="text" width={"100%"} height={"15%"} />
            <Skeleton variant="text" width={"80%"} height={"15%"} />
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export const EventCard = ({ eventInfo, basePath = null }) => {
  const router = useRouter();
  return (
    <Card sx={{ width: "100%" }} variant="outlined">
      <CardActionArea
        onClick={() =>
          router.push(
            basePath
              ? basePath + "/events/" + eventInfo._id
              : "/events/" + eventInfo._id
          )
        }
      >
        <CardMedia
          component="img"
          image={eventInfo.coverImage}
          height={170}
          alt={`${eventInfo?.name} image`}
        />

        <CardContent>
          <Typography gutterBottom variant="caption" fontSize={18}>
            {eventInfo?.name}
          </Typography>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mt={2}
          >
            <Typography variant="subtitle2">{`${new Date(
              eventInfo?.startDate
            ).toLocaleDateString()}`}</Typography>
            <Typography variant="subtitle2">{`${new Date(
              eventInfo?.startTime
            ).toLocaleTimeString()}`}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const LinkTab = (props) => {
  return (
    <Tab component={Link} {...props} sx={{ textTransform: "capitalize" }} />
  );
};

function EventTabs() {
  const router = useRouter();
  const [value, setValue] = useState(router.query.q || "all");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // router.push(`?q=${newValue}`);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      textColor={"inherit"}
      variant="scrollable"
      scrollButtons="auto"
      sx={{ my: 1 }}
    >
      <LinkTab label="All" value={"all"} size="small" href="/events?q=all" />
      <LinkTab
        href="/events?q=upcoming"
        label="Upcoming"
        value={"upcoming"}
        size="small"
      />
      <LinkTab href="/events?q=live" label="Live" value={"live"} size="small" />
      <LinkTab href="/events?q=past" label="Past" value={"past"} size="small" />
    </Tabs>
  );
}

export default function Events() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function get_events() {
      const { data } = await axios.get("/api/events?q=" + router.query.q);
      console.log(data);
      setEvents(data);
      setLoading(false);
    }
    if (router.isReady) {
      setLoading(true);
      get_events();
    }
  }, [router]);
  return (
    <>
      <Head>
        <title>Events | SPIRITZONE events</title>
      </Head>
      <Container maxWidth={"lg"} sx={{ py: 2 }}>
        <Typography gutterBottom variant="h4">
          Events
        </Typography>
        <EventTabs />
        {loading && <EventsLoadingSkeleton />}
        {!loading && events.length === 0 && (
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
            height={"inherit"}
          >
            <Typography variant="h6" fontSize={19}>
              Events unavailable
            </Typography>
          </Stack>
        )}
        {!loading && events.length > 0 && (
          <Grid container spacing={2}>
            {events.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <EventCard eventInfo={event} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

Events.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};
