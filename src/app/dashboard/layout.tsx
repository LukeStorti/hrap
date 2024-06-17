import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { SidebarProvider } from "../contexts/SidebarContext";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <main>
        <Navbar />
        <Box display="flex">
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {children}
          </Box>
        </Box>
      </main>
    </SidebarProvider>
  );
};

export default layout;
