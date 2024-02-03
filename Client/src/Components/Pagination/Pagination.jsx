import React, {useState} from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationComponent = ({totalPages, onPageChange }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  return (
    <div className="container-pagination">
      <Stack spacing={2} marginTop={1} marginBottom={1}>
        <Pagination
          className="pagination"
          variant="outlined"
          shape="rounded"
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
};

export default PaginationComponent;
