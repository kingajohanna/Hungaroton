"use client";

import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams({
      include_image: "true",
      page: "1",
      per_page: "50",
      search: searchTerm,
    });
    router.push(`/?${params.toString()}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <TextField
      sx={{ maxWidth: "600px", width: "100%" }}
      label="Search for artists"
      onChange={(event) => setSearchTerm(event.target.value)}
      onSubmit={handleSearch}
      onKeyUp={handleKeyPress}
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default SearchBar;
