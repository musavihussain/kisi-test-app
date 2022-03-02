import React from "react";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import {
    Card,
    CardContent,
    Container,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
  } from "@mui/material";
import Groups from "./Groups";

function Dashboard() {


  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Groups/>
          
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
