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

export default function UsersTable({ users = [] }) {
  const router = useRouter();
  const handleClick = (userID) => {
    router.push("/admin/users/" + userID + "/edit");
  };
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Created At</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 && (
            <StyledTableCell colSpan={4} align="center">
              <Typography variant="subtitle2">
                There are nousers at the moment
              </Typography>
            </StyledTableCell>
          )}
          {users &&
            users.map((row) => (
              <StyledTableRow
                key={row._id}
                hover
                onClick={() => handleClick(row._id)}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(`${row?.createdAt}`).toLocaleDateString()}
                  {/* {row?.createdAt} */}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
