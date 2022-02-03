import { useEffect, useState } from "react";
import type { NextPage } from "next";
// import styles from "../styles/Home.module.css";
import { Box } from "@welcome-ui/box";

import SearchBarAndFilters from "@components/search-bar-and-filters";
import ResultsList from "@components/results-list";

const Home: NextPage<{ jobs: any }> = ({
  jobs,
  organizationName,
  slug,
}: {
  jobs: any;
}) => {
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // const resetFilteredJobs = () => setFilteredJobs(jobs);

  return (
    <Box
      display="flex"
      flexDirection="column"
      w={1}
      h="100vh"
      alignItems="center"
      backgroundColor="nude.100"
    >
      <SearchBarAndFilters jobs={jobs} setFilteredJobs={setFilteredJobs} />
      <ResultsList
        slug={slug}
        organizationName={organizationName}
        jobs={filteredJobs}
      />
    </Box>
  );
};

export async function getStaticProps(ctx) {
  const slug = parseInt(ctx.params.slug[0]);
  const res = await fetch(
    "https://www.welcomekit.co/api/v1/embed?organization_reference=Pg4eV6k",
  );
  const { jobs, name: organizationName } = await res.json();

  return {
    props: {
      organizationName,
      jobs,
      slug,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: null } }],
    fallback: "blocking",
  };
}

export default Home;
