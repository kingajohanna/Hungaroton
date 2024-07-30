import { Artist } from "@/types/Artist";
import { PageInfo } from "@/types/PageInfo";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Pagination from "./Pagination";

type Props = {
  results: Artist[];
  pageInfo: PageInfo;
  searchTerm: string;
};

const ResultsTable: React.FC<Props> = ({ results, pageInfo, searchTerm }) => {
  return (
    <TableContainer sx={{ maxWidth: "600px" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Portrait</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Album count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((artist) => (
            <TableRow key={artist.id}>
              <TableCell align="right">
                <Avatar alt="Remy Sharp" src={artist.portrait} />
              </TableCell>
              <TableCell component="th" scope="row">
                {artist.name}
              </TableCell>
              <TableCell align="right">{artist.albumCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Pagination pageInfo={pageInfo} searchTerm={searchTerm} />
      </Table>
    </TableContainer>
  );
};

export default ResultsTable;
