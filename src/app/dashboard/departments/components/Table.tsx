"use client";
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { SearchOutlined } from "@mui/icons-material";
import Link from "next/link";
import { editDepartmentStatus } from "@/app/actions";
import { Department } from "@/app/types";
interface Column {
  id: "actions" | "departmenName" | "managerName" | "status";
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: "actions", label: "Actions", minWidth: 50 },
  { id: "departmenName", label: "Name", minWidth: 90 },
  { id: "managerName", label: "Manager", minWidth: 90 },
  { id: "status", label: "Status", minWidth: 100 },
];

const DepartmentsTable = ({ rows, role }: { rows: Department[]; role: string }) => {
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
    editDepartmentStatus(id, status);
  };

  return (
    <Paper sx={{ width: "100%", marginY: "15px" }}>
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
              .map((row: Department) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {role === "admin" ? (
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Link href={`/dashboard/departments/edit/${row.id}`}>Edit</Link>
                        <Button onClick={() => toggleStatus(row.id, row.status!)}>
                          {row.status === "Active" ? "Deactivate" : "Activate"}
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell></TableCell>
                    )}
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.manager}</TableCell>
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

export default DepartmentsTable;
