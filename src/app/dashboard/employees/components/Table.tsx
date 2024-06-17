"use client";
import { SearchOutlined } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";
import { useState } from "react";

import { editEmployeeStatus } from "@/app/actions";
import { Employee } from "@/app/types";

interface Column {
  id:
    | "actions"
    | "firstName"
    | "lastName"
    | "telephoneNumber"
    | "emailAddress"
    | "manager"
    | "status";
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: "actions", label: "Actions", minWidth: 90 },
  { id: "firstName", label: "First Name", minWidth: 100 },
  { id: "lastName", label: "Last Name", minWidth: 100 },
  { id: "telephoneNumber", label: "Telephone Number", minWidth: 100 },
  { id: "emailAddress", label: "Email Address", minWidth: 100 },
  { id: "manager", label: "Manager", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
];

const EmployeesTable = ({
  rows,
  role,
  currentUserId,
}: {
  rows: Employee[];
  role: string;
  currentUserId: string;
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const requestSearch = (searchedVal: string) => {};

  const toggleStatus = (id: string, status: string) => {
    editEmployeeStatus(id, status);
  };

  return (
    <Paper sx={{ width: "100%", marginY: "15px", height: "100%" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" pb={1}>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100, { value: -1, label: "All" }]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <TextField
          id="search"
          placeholder="search"
          onChange={(e) => requestSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          sx={{ px: 2 }}
        />
      </Box>
      <TableContainer
        sx={{
          maxHeight: {
            lg: 350,
            xl: 600,
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    minWidth: column.minWidth,
                    fontWeight: "bold",
                    backgroundColor: "#474747",
                    color: "#ffffff",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: Employee) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell sx={{ display: "flex", alignItems: "center", minHeight: "53px" }}>
                      {role === "admin" || currentUserId === row.id ? (
                        <Link href={`/dashboard/employees/edit/${row.id}`}>Edit</Link>
                      ) : null}
                      {role === "admin" && (
                        <Button onClick={() => toggleStatus(row.id, row.status!)}>
                          {row.status === "Active" ? "Deactivate" : "Activate"}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.telephoneNumber}</TableCell>
                    <TableCell>{row.emailAddress}</TableCell>
                    <TableCell>{row.employeeManager}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default EmployeesTable;
