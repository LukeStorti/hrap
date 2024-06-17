"use client";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useSidebar } from "../contexts/SidebarContext";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import { Box } from "@mui/material";
import Link from "next/link";

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <Box
      sx={{ width: isOpen ? "15%" : "6%", height: "93vh", alignItems: "center" }}
      bgcolor="#1976d2"
    >
      <List>
        <ListItem>
          <Link href="/dashboard/employees" style={{ display: "flex", alignItems: "center" }}>
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <GroupIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              sx={{ opacity: isOpen ? 1 : 0, display: { xs: "none", lg: "block" }, color: "white" }}
              primary="Employees"
            />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/dashboard/departments" style={{ display: "flex", alignItems: "center" }}>
            <ListItemIcon
              sx={{
                justifyContent: "center",
              }}
            >
              <WorkIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              sx={{ opacity: isOpen ? 1 : 0, display: { xs: "none", lg: "block" }, color: "white" }}
              primary="Departments"
            />
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
