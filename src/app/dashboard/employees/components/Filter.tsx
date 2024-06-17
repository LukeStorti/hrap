"use client";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Department, Manager } from "@/app/types";

const Filter = ({
  managersList,
  departmentList,
}: {
  managersList: Manager[];
  departmentList: Department[];
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("all");
  const [manager, setManager] = useState<string>("All");
  const [department, setDepartment] = useState<string>("All");
  const searchParams = useSearchParams();

  const pathName = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Box mt={2} boxShadow={2} borderRadius={1} p={1}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Filters</Typography>
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
      </Box>
      {isOpen && (
        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            mt={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="500px"
          >
            <Typography>Status</Typography>

            <Select
              value={status}
              label="Status"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              sx={{ width: "50%" }}
              id="status"
              labelId="status"
            >
              <MenuItem value={"all"}>
                <Link
                  href={pathName + "?" + createQueryString("status", "all")}
                  style={{ width: "100%" }}
                >
                  All
                </Link>
              </MenuItem>
              <MenuItem value={"Active"}>
                <Link
                  href={pathName + "?" + createQueryString("status", "Active")}
                  style={{ width: "100%" }}
                >
                  Active
                </Link>
              </MenuItem>
              <MenuItem value={"Inactive"}>
                <Link
                  href={pathName + "?" + createQueryString("status", "Inactive")}
                  style={{ width: "100%" }}
                >
                  Inactive
                </Link>
              </MenuItem>
            </Select>
          </Box>
          <Box
            mt={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="500px"
          >
            <Typography>Department</Typography>

            <Select
              value={department}
              label="Department"
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              sx={{ width: "50%" }}
              id="department"
              labelId="department"
              placeholder="-Select-"
            >
              <MenuItem value="All">
                <Link
                  href={pathName + "?" + createQueryString("department", "all")}
                  style={{ width: "100%" }}
                >
                  All
                </Link>
              </MenuItem>
              {departmentList.map((department: Department) => (
                <MenuItem key={department.id} value={department.id}>
                  <Link
                    href={pathName + "?" + createQueryString("department", department.id)}
                    style={{ width: "100%" }}
                  >
                    {department.name}
                  </Link>
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box
            mt={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="500px"
          >
            <Typography>Manager</Typography>

            <Select
              value={manager}
              label="Manager"
              onChange={(e) => {
                setManager(e.target.value);
              }}
              sx={{ width: "50%" }}
              id="manager"
              labelId="manager"
            >
              <MenuItem value="All">
                <Link
                  href={pathName + "?" + createQueryString("manager", "all")}
                  style={{ width: "100%" }}
                >
                  All
                </Link>
              </MenuItem>
              {managersList.map((manager: Manager) => (
                <MenuItem key={manager.id} value={`${manager.firstName} ${manager.lastName}`}>
                  <Link
                    href={
                      pathName +
                      "?" +
                      createQueryString("manager", `${manager.firstName} ${manager.lastName}`)
                    }
                    style={{ width: "100%" }}
                  >
                    {manager.firstName} {manager.lastName}
                  </Link>
                </MenuItem>
              ))}
            </Select>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default Filter;
