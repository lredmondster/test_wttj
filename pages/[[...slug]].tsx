import { useEffect, useState } from "react";
import type { NextPage } from "next";
// import styles from "../styles/Home.module.css";
import { Box } from "@welcome-ui/box";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SearchBarAndFilters from "@components/search-bar-and-filters";
import ResultsList from "@components/results-list";
import { useTranslation } from "next-i18next";

const Home: NextPage<{ jobs: any }> = ({
  jobs,
  organizationName,
}: {
  jobs: any;
  organizationName: any;
}) => {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [pagination, setPagination] = useState(25);

  const { t } = useTranslation("common");

  console.log(t("test"));

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
      <SearchBarAndFilters
        pagination={pagination}
        setPagination={setPagination}
        jobs={jobs}
        filteredJobs={filteredJobs}
        setFilteredJobs={setFilteredJobs}
      />
      <ResultsList
        pagination={pagination}
        organizationName={organizationName}
        jobs={filteredJobs}
      />
    </Box>
  );
};

export async function getStaticProps(ctx: any) {
  const res = await fetch(
    "https://www.welcomekit.co/api/v1/embed?organization_reference=Pg4eV6k",
  );
  const { jobs, name: organizationName } = await res.json();

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common"])),
      organizationName,
      jobs,
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
