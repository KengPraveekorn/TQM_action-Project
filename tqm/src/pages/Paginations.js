import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box, Grid } from "@mui/material";
import { Pgnt } from "../Testss/Pgnt";

const style_css = {
  color: "blue",
  justifyContent: "center",
  alignItems: "center",
};

// const pageSize = 3;

export const Paginations = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination count={pageNumbers.push(Math.ceil(totalPosts / postsPerPage))} 
      color="primary"
    />


  );
};
