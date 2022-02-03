import type { NextPage } from "next";
// import styles from "../styles/Home.module.css";
import { Box } from "@welcome-ui/box";

import SearchBarAndFilters from "@components/search-bar-and-filters";
import ResultsList from "@components/results-list";

const Home: NextPage<{ jobs: any }> = ({ jobs }: { jobs: any }) => {
  return (
    <Box
      display="flex"
      w={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="nude.100"
    >
      <SearchBarAndFilters />
      <ResultsList jobs={jobs} />
    </Box>
  );
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    "https://www.welcomekit.co/api/v1/embed?organization_reference=Pg4eV6k",
  );
  const { jobs } = await res.json();

  return {
    props: {
      jobs,
    },
    revalidate: 60,
  };
}

export default Home;
