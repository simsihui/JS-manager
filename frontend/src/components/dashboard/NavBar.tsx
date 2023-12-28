import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import MenuIcon from '@mui/icons-material/Menu';
import {
    Avatar, Button, IconButton, Stack, TextField, useMediaQuery, useTheme
} from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import {
    useCreateProjectMutation, useGetProjectsQuery
} from '../../features/project/projectApiSlice';
import { Error } from '../../types/Error.types';

export default function NavBar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newProject, setNewProject] = useState(false);
  const [projectName, setProjectName] = useState("");

  const tabs = [{ label: "Overview", icon: <LeaderboardIcon /> }];

  const { data: projects } = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const navigate = useNavigate();

  const handleCreateProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!projectName) return;
      await createProject({ name: projectName }).unwrap();
      setProjectName("");
      setNewProject(false);
      toast.success("Project created");
    } catch (err) {
      toast.error((err as Error).data.message || "Something went wrong");
    }
  };

  const list = () => (
    <List
      subheader={
        <Box sx={{ padding: "4px 12px", color: "white" }}>
          <label className="text-xs uppercase">PROJECTS</label>
        </Box>
      }
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 1rem",
        }}
      >
        <Button
          sx={{
            color: "primary.contrastText",
          }}
          color="secondary"
          variant="contained"
          fullWidth
          size="small"
          onClick={() => setNewProject(!newProject)}
        >
          + New Project
        </Button>
      </Box>

      {newProject && (
        <form onSubmit={handleCreateProject}>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0.5rem 1rem",
            }}
          >
            <TextField
              size="small"
              label="Project Name"
              sx={{
                "& .MuiInputBase-input": {
                  height: "0.75rem", // Adjust the height as needed
                },
              }}
              fullWidth
              value={projectName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setProjectName(e.target.value)
              }
            />

            <IconButton aria-label="new project" size="small" type="submit">
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </form>
      )}

      {projects
        ? projects.map((project) => (
            <ListItemButton
              key={project.id}
              onClick={() => {
                navigate(project.id);
                setDrawerOpen(!drawerOpen);
              }}
              sx={{ height: "30px" }}
            >
              <ListItemIcon>
                <Avatar variant="rounded" sx={{ width: 20, height: 20 }}>
                  {project.name[0].toUpperCase()}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                sx={{ marginLeft: "-28px" }}
                primary={project.name}
              />
            </ListItemButton>
          ))
        : null}
    </List>
  );

  return (
    <Box>
      {isSmallScreen && (
        <IconButton
          aria-label="delete"
          className="fixed top-2"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )}

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(!drawerOpen)}
        variant={isSmallScreen ? "temporary" : "permanent"}
      >
        <Box
          sx={{
            width: { xs: "100vw", sm: "240px" },
            marginTop: "56px",
            bgcolor: "primary.main",
            height: "100vh",
            overflow: "auto",
          }}
          role="presentation"
        >
          <List>
            {tabs.map((tab) => (
              <ListItemButton key={tab.label}>
                <ListItemIcon>{tab.icon}</ListItemIcon>
                <ListItemText primary={tab.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          {list()}
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}
