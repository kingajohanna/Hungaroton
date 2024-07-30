"use client";

import { PageInfo } from "@/types/PageInfo";
import { TableFooter, TablePagination, TableRow } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  pageInfo: PageInfo;
  searchTerm: string;
};

const Pagination: React.FC<Props> = ({ pageInfo, searchTerm }) => {
  const router = useRouter();

  const updateURL = (perPage = 50, page = 1) => {
    const params = new URLSearchParams({
      include_image: "true",
      page: page.toString(),
      per_page: perPage.toString(),
      search: searchTerm,
    });
    router.push(`/?${params.toString()}`);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    updateURL(pageInfo.per_page, newPage + 1);
  };

  const handleChangePerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateURL(parseInt(event.target.value), 1);
  };

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          sx={{ overflow: "hidden" }}
          rowsPerPageOptions={[5, 10, 25, 50]}
          count={pageInfo.total_items}
          rowsPerPage={pageInfo.per_page}
          page={pageInfo.current_page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangePerPage}
          labelRowsPerPage="Rows per page:"
          labelDisplayedRows={() =>
            `${(pageInfo.current_page - 1) * pageInfo.per_page + 1}-${
              pageInfo.current_page * pageInfo.per_page
            } of ${pageInfo.total_items}`
          }
        />
      </TableRow>
    </TableFooter>
  );
};

export default Pagination;
