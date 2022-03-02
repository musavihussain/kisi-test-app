import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGroupLocks } from "../store/slices/getGroupLockSlice";
import { createGroupLocks } from "../store/slices/createGroupLockSlice";
import { getLocks } from "../store/slices/lockSlice";
import {
  Button,
  Modal,
  Box,
  Typography,
  Container,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { Link } from "react-router-dom";
import { deleteGroupLock } from "../store/slices/removeGroupLockSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
};

function Lock() {
  const dispatch = useDispatch();
  const groupLocks = useSelector((state) => state.grouplocks.list);
  const locks = useSelector((state) => state.locks.list);
  const location = useLocation();
  const group = location.state.item;
  const [open, setOpen] = useState(false);
  const [lockId, setLockId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event) => {
    setLockId(event.target.value);
  };

  const handleAssignLock = async () => {
    setIsLoading(true);

    // close the modal
    setOpen(false);

    // assign the lock
    await dispatch(
      createGroupLocks({
        group_lock: {
          group_id: group.id,
          lock_id: lockId,
        },
      })
    );

    // refresh the list
    dispatch(getGroupLocks({ limit: 10, offset: 0, group_id: group.id })).then(
      () => {
        setIsLoading(false);
      }
    );
  };

  const handleDeAssignLock = async (id) => {
    setIsLoading(true);

    // assign the lock
    await dispatch(deleteGroupLock(id));

    // refresh the list
    dispatch(getGroupLocks({ limit: 10, offset: 0, group_id: group.id })).then(
      () => {
        setIsLoading(false);
      }
    );
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getLocks({ limit: 10, offset: 0 }));
      await dispatch(
        getGroupLocks({ limit: 10, offset: 0, group_id: group.id })
      );
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Container sx={{ py: 5 }}>
        <Button
          variant="contained"
          color="success"
          sx={{ my: 5 }}
          onClick={handleOpen}
        >
          <Link to={`/`} style={linkStyle}>
            Home
          </Link>
        </Button>
        <Button variant="contained" sx={{ m: 3 }} onClick={handleOpen}>
          Assign Lock
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a lock
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              component="h5"
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Locks</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={lockId}
                  label="lockId"
                  onChange={handleChange}
                >
                  {locks.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Button
                  variant="contained"
                  sx={{ my: 2 }}
                  onClick={handleAssignLock}
                >
                  Assign
                </Button>
              </FormControl>
            </Typography>
          </Box>
        </Modal>

        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
              color="text.secondary"
              gutterBottom
            >
              Locks
            </Typography>

            {isLoading ? (
              <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <List>
                {groupLocks &&
                  groupLocks.map((item) => {
                    return (
                      <ListItem key={item.id}>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar>
                              <GroupOutlinedIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.lock.name}
                            secondary={item.group.name}
                          />
                          <Box
                            sx={{ display: "flex", justifyContent: "right" }}
                          >
                            <Button onClick={() => handleDeAssignLock(item.id)}>
                              Remove
                            </Button>
                          </Box>
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
              </List>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Lock;
