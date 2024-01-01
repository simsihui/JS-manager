import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import {
  useCreateProjectMutation,
  useGetProjectsQuery,
} from "../../features/project/projectApiSlice";
import { Error } from "../../types/Error.types";
import Loading from "../Loading";

export default function ProjectMenu() {
  // menu logic
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // project logic
  const [newProject, setNewProject] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");

  const { data: projects, isLoading } = useGetProjectsQuery();

  const { id } = useParams();

  const [selectedProject, setSelectedProject] = useState<string>("");

  useEffect(() => {
    if (projects && id) {
      setSelectedProject(
        projects?.find((project) => project.id === id)?.name || "",
      );
    }
  }, [projects, id]);

  const navigate = useNavigate();

  const [createProject] = useCreateProjectMutation();

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

  return (
    <Box
      sx={{
        height: {
          xs: "56px",
          sm: "64px",
          position: "relative",
        },
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Button
            id="project-button"
            aria-controls={open ? "project-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            fullWidth
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              textAlign: "left",
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "rgba(255,255,255, 0.7)", marginBottom: -0.5 }}
            >
              Project
            </Typography>
            <Typography
              noWrap
              sx={{
                color: "white",
                marginTop: -0.5,
                maxWidth: "calc(100% - 1rem)",
              }}
            >
              {selectedProject}
            </Typography>
            <UnfoldMoreIcon
              sx={{
                position: "absolute",
                right: 0,
                top: "1rem",
                color: "rgba(255,255,255, 0.7)",
              }}
            />
          </Button>
          <Menu
            id="project-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "project-button",
            }}
            slotProps={{ paper: { sx: { width: { xs: "70%", sm: "30%" } } } }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "0 0.5rem 0 1rem",
              }}
            >
              <Typography variant="overline" sx={{ color: "rgba(0,0,0, 0.7)" }}>
                Projects
              </Typography>
              <Tooltip
                title="Add new project"
                onClick={() => setNewProject(!newProject)}
              >
                <IconButton aria-label="add new project" size="small">
                  <AddIcon
                    sx={{ color: "rgba(0,0,0, 0.7)" }}
                    fontSize="inherit"
                  />
                </IconButton>
              </Tooltip>
            </Box>

            {newProject && (
              <Box sx={{ margin: "0 1rem" }}>
                <form onSubmit={handleCreateProject}>
                  <TextField
                    label="Project Name"
                    size="small"
                    fullWidth
                    value={projectName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setProjectName(e.target.value)
                    }
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                      e.stopPropagation(); // prevent blurring of textfield
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton sx={{ marginRight: -1 }} type="submit">
                            <CheckIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </form>
              </Box>
            )}

            {projects?.length
              ? projects.map((project) => (
                  <MenuItem
                    key={project.id}
                    onClick={() => {
                      setSelectedProject(project.name); // update name in menu
                      handleClose(); // close menu
                      navigate(`${project.id}/overview`); // navigate to project
                    }}
                  >
                    <Typography noWrap>{project.name}</Typography>
                  </MenuItem>
                ))
              : null}
          </Menu>
        </>
      )}
    </Box>
  );
}
