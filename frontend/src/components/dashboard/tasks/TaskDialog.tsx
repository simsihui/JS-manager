import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { useCreateTaskMutation } from '../../../features/task/taskApiSlice';
import { Error } from '../../../types/Error.types';

interface ProjectTags {
  id: string;
  label: string;
  options: string[];
  multiple: boolean;
  required: boolean;
}

interface TaskDialogProps {
  projectTags: ProjectTags[];
}

interface TaskTags {
  [key: string]: string[] | string | null;
}

export default function TaskDialog({ projectTags }: TaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({
    title: "",
    content: "",
  });
  const [taskTags, setTaskTags] = useState<TaskTags>(
    projectTags?.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: curr.multiple ? [] : null,
      }),
      {},
    ),
  );

  const [createTask] = useCreateTaskMutation();
  const { id: projectId } = useParams();

  const handleSubmit = async () => {
    try {
      await createTask({ ...task, projectId, tags: { ...taskTags } }).unwrap();
      setOpen(false);
      toast.success("Task created");
      handleReset();
    } catch (err) {
      toast.error((err as Error).data.message || "Something went wrong");
    }
  };

  const handleReset = () => {
    setTask({
      title: "",
      content: "",
    });
    setTaskTags(
      projectTags?.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.id]: curr.multiple ? [] : null,
        }),
        {},
      ),
    );
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        New Task
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details for your new task below. Click "Create" to add the
            task to your project.
          </DialogContentText>
          <FormControl fullWidth>
            <Stack spacing={2} margin={"1rem 0"}>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                required
                variant="standard"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
              {projectTags?.length
                ? projectTags.map((tag) => (
                    <Autocomplete
                      id={tag.id}
                      key={tag.id}
                      options={tag.options}
                      getOptionLabel={(option) => option.toString()}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required={tag.required}
                          label={tag.label}
                        />
                      )}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <Chip label={option} />
                        </li>
                      )}
                      forcePopupIcon={false}
                      fullWidth
                      multiple={tag.multiple}
                      value={taskTags[tag.id]}
                      onChange={(_, value) => {
                        setTaskTags((prevState) => ({
                          ...prevState,
                          [tag.id]: value,
                        }));
                      }}
                    />
                  ))
                : null}
            </Stack>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleReset}>Reset</Button>
          <Button type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
