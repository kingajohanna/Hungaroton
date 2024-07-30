import React from "react";
import Head from "next/head";
import { Paper } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import ErrorCard from "@/components/ErrorCard";
import ResultsTable from "@/components/ResultsTable";
import { SearchParams } from "@/types/SearchParams";

type Props = {
  searchParams: SearchParams;
};

const fetchData = async (
  include_image = "true",
  page = "1",
  per_page = "50",
  search = ""
) => {
  try {
    let searchParams: Partial<SearchParams> = { include_image, page, per_page };
    if (search) {
      searchParams = { ...searchParams, search };
    }

    const params = new URLSearchParams(searchParams);

    const response = await fetch(
      `https://exam.api.fotex.net/api/artists?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch artists");
    }

    return response.json();
  } catch (error) {
    return { error: (error as Error).message };
  }
};

const HomePage: React.FC<Props> = async ({ searchParams }) => {
  const { include_image, page, per_page, search } = searchParams;

  const data = await fetchData(include_image, page, per_page, search);

  return (
    <Paper
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        alignItems: "center",
      }}
    >
      <Head>
        <title>Hungaroton artists</title>
      </Head>

      <SearchBar />
      {data.error && <ErrorCard message={data.error} />}

      {!data.error && (
        <ResultsTable
          results={data.data}
          pageInfo={data.pagination}
          searchTerm={search || ""}
        />
      )}
    </Paper>
  );
};

export default HomePage;
