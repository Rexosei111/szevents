import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Chip, Typography } from "@mui/material";
import { useRouter } from "next/router";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(23,26,32)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const statusInfo = {
  live: {
    text: "ongoing",
    color: "success",
  },
  upcoming: {
    text: "upcoming",
    color: "info",
  },
  past: {
    text: "past",
    color: "warning",
  },
  draft: {
    text: "draft",
    color: "default",
  },
};

export default function EventTable({ events = [] }) {
  const router = useRouter();
  const { q } = router.query;
  const handleClick = (eventId) => {
    router.push("/admin/events/" + eventId);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Start Date</StyledTableCell>
            <StyledTableCell align="right">Start Time</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.length === 0 && (
            <StyledTableCell colSpan={4} align="center">
              <Typography variant="subtitle2">
                There are no {q !== "all" ? q : ""} events at the moment
              </Typography>
            </StyledTableCell>
          )}
          {events &&
            events.map((row) => (
              <StyledTableRow
                key={row._id}
                hover
                onClick={() => handleClick(row._id)}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{`${new Date(
                  row.startDate
                ).toLocaleDateString()}`}</StyledTableCell>
                <StyledTableCell align="right">{`${new Date(
                  row.startTime
                ).toLocaleTimeString()}`}</StyledTableCell>
                <StyledTableCell align="right">
                  <Chip
                    label={statusInfo[row.status].text}
                    color={statusInfo[row.status].color}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
