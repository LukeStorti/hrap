"use client";
import { Box, Button, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const Filter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("all");
  const handleStateChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

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
              onChange={handleStateChange}
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
        </form>
      )}
    </Box>
  );
};

export default Filter;
