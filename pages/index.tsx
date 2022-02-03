import type { NextPage } from "next";
// import styles from "../styles/Home.module.css";
import { Box } from "@welcome-ui/box";

import SearchBarAndFilters from "@components/search-bar-and-filters";
import ResultsList from "@components/results-list";

const Home: NextPage = () => {
  return (
    <Box
      display="flex"
      w={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="nude.100"
    >
      <SearchBarAndFilters />
      <ResultsList />
    </Box>
  );
};

export default Home;
