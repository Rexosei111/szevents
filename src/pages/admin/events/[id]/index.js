import AdminLayout from "@/components/components/admin/layout";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import axios, { isAxiosError } from "axios";
import Head from "next/head";
import React from "react";
import sanitizeHtml from "sanitize-html";
import NumbersIcon from "@mui/icons-material/Numbers";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useRouter } from "next/router";
import Link from "next/link";
import NewAdminLayout from "@/components/components/admin/adminLayout";
import useSWR from "swr";
import { fetcher } from "@/components/config/fetcher";
import Image from "next/image";
import { APIClient } from "@/components/config/axios";

const sliderMarks = [
  { value: 0, label: "0" },
  { value: 200, label: "200" },
];

const DetailsLoadingSkeleton = () => {
  return (
    <Stack flexDirection={"column"} gap={2} width={"100%"} height={"89vh"}>
      <Skeleton variant="rectangular" width={"100%"} height={"30%"} />
      <Skeleton variant="text" width={"70%"} height={"8%"} />
      <Box width={"100%"}>
        {Array.from(Array(10)).map((_, index) => (
          <Skeleton variant="text" width={"80%"} height={"8%"} key={index} />
        ))}
      </Box>
    </Stack>
  );
};
export default function EventDetails() {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    "/events/" + router.query.id,
    fetcher
  );
  const handleDelete = async () => {
    try {
      await APIClient.delete("/events/" + router.query.id);
      router.push("/admin");
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  if (error) {
    return (
      <Stack
        height={"89vh"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        Event not found
      </Stack>
    );
  }
  if (isLoading) {
    return <DetailsLoadingSkeleton />;
  }
  return (
    <>
      <Head>
        <title>{data?.name}</title>
      </Head>
      <Box height={"inherit"}>
        <Typography variant="h4" gutterBottom mb={2}>
          {data?.name}
        </Typography>
        <Box width={{ xs: "100%" }} height={{ xs: 350 }} position="relative">
          <Image
            src={data?.coverImage}
            alt="cover image"
            priority
            fill
            style={{ objectFit: "cover", borderRadius: 13 }}
          />
        </Box>
        <Box maxWidth={"xl"} sx={{ my: 2 }}>
          <Stack
            flexDirection={"row"}
            gap={5}
            width={"100%"}
            flexWrap={{ xs: "wrap-reverse", lg: "nowrap" }}
          >
            <Box
              width={{ xs: "100%", md: "60%" }}
              component={Paper}
              p={2}
              elevation={0}
            >
              <Typography
                variant="h5"
                fontSize={18}
                fontWeight={700}
                gutterBottom
              >
                About Event
              </Typography>
              <Typography
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(data?.description),
                }}
                gutterBottom
              />
              <Typography
                variant="h5"
                fontSize={18}
                fontWeight={700}
                gutterBottom
              >
                Location
              </Typography>
              <Typography variant="subtitle2">
                {data?.location?.address ? data.location?.address : "Not set"}
              </Typography>
            </Box>
            <Stack
              flexDirection={"column"}
              gap={2}
              width={{ xs: "100%", md: "30%" }}
              my={1}
            >
              <Paper
                sx={{ width: "100%", p: 2, borderRadius: 3 }}
                elevation={24}
              >
                <Typography variant="subtitle2" fontSize={18} gutterBottom>
                  Date and Time
                </Typography>
                <List dense>
                  <ListItem disablePadding disableGutters>
                    <ListItemIcon>
                      <DateRangeOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Scheduled to start at"
                      secondary={
                        data?.startDate
                          ? `${new Date(data?.startDate).toLocaleDateString()}`
                          : "Not set"
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" sx={{ my: 1, bgcolor: "#e8ffe8" }} />
                  <ListItem disablePadding disableGutters>
                    <ListItemIcon>
                      <AccessTimeOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Scheduled to start at"
                      secondary={
                        data?.startTime
                          ? `${new Date(data?.startTime).toLocaleTimeString()}`
                          : "Not set"
                      }
                    />
                  </ListItem>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: 3,
                      textTransform: "capitalize",
                    }}
                    disableElevation
                    LinkComponent={Link}
                    href={"/admin/events/" + router.query.id + "/edit"}
                  >
                    Update Event
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleDelete}
                    sx={{
                      borderRadius: 3,
                      textTransform: "capitalize",
                      mt: 1,
                    }}
                    disableElevation
                  >
                    delete Event
                  </Button>
                </List>
              </Paper>
              <Paper
                sx={{
                  width: "100%",
                  p: 2,
                  borderRadius: 3,
                  bgcolor: "rgb(23,26,32)",
                  color: "white",
                }}
                elevation={0}
              >
                <Typography variant="subtitle2" fontSize={18} gutterBottom>
                  Tickets Information
                </Typography>
                {data?.ticketInfo && (
                  <List dense>
                    <ListItem disablePadding disableGutters>
                      <ListItemIcon>
                        <ConfirmationNumberOutlined
                          fontSize="small"
                          htmlColor="white"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Total number of tickets"
                        secondary={
                          data?.ticketInfo?.total
                            ? data?.ticketInfo?.total
                            : "Not set"
                        }
                        secondaryTypographyProps={{
                          color: "#dee1ec",
                        }}
                      />
                    </ListItem>
                    <Divider variant="inset" sx={{ my: 1, bgcolor: "white" }} />
                    <ListItem disablePadding disableGutters>
                      <ListItemIcon>
                        <Typography
                          variant="subtitle2"
                          fontSize={20}
                          color={"white"}
                        >
                          GH
                        </Typography>
                      </ListItemIcon>
                      <ListItemText
                        primary="Price per ticket"
                        secondary={
                          data.ticketInfo?.price
                            ? data.ticketInfo?.price
                            : "Not set"
                        }
                        secondaryTypographyProps={{
                          color: "#dee1ec",
                        }}
                      />
                    </ListItem>
                    <Divider variant="inset" sx={{ my: 1, bgcolor: "white" }} />
                    <ListItem disablePadding disableGutters>
                      <ListItemIcon>
                        <NumbersIcon fontSize="small" htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Number of tickets sold"
                        secondary={
                          data.ticketInfo?.sold ? data.ticketInfo?.sold : 0
                        }
                        secondaryTypographyProps={{
                          color: "#dee1ec",
                        }}
                      />
                    </ListItem>
                  </List>
                )}
                {!data?.ticketInfo && (
                  <Typography textAlign={"center"} my={1} variant="caption">
                    Data unavailable
                  </Typography>
                )}
              </Paper>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

EventDetails.getLayout = (page) => {
  return <NewAdminLayout title={"Event Details"}>{page}</NewAdminLayout>;
};
