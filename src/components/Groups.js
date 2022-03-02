import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../store/slices/groupSlice";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Pagination,
  TablePagination,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

function Groups() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.list);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(10);
  const [totalPage, setTotalPage] = useState(1);

  const rowsPerPage = 10;

  const nextPageHandler = () => {
    console.log(page + 1);
    setPage(page + 1);
    dispatch(getGroups({ limit: rowsPerPage, offset: page + 1 }));
  };

  const slugCreator = (Text) => {
    return Text.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getGroups({ limit: rowsPerPage, offset: page }));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Card>
        <CardContent>
          <Typography
            sx={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            Groups
          </Typography>

          {isLoading ? (
            <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {groups &&
                groups.map((item) => {
                  return (
                    <Link
                      to={`locks/${slugCreator(item.name)}`}
                      state={{ item }}
                      key={item.id}
                      style={linkStyle}
                    >
                      <ListItem>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar>
                              <GroupOutlinedIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.name}
                            secondary={item.description}
                          />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  );
                })}
            </List>
          )}
          {/* {groups && (
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={3}>
                  <Button variant="text">Previous Page</Button>
                </Grid>
                <Grid item xs={3} textAlign="center">
                  <div variant="text">
                    Page {page + 1} of {Math.ceil(totalPage)}
                  </div>
                </Grid>
                <Grid item xs={3} textAlign="right">
                  <Button variant="text" onClick={nextPageHandler}>
                    Next Page
                  </Button>
                </Grid>
              </Grid>
            )} */}
        </CardContent>
      </Card>
    </>
  );
}

export default Groups;
