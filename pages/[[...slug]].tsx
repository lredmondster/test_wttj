import type { NextPage } from "next";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Box } from "@welcome-ui/box";

import type { JobsEntity } from "@components/[[...slug]]/types";
import SearchBarAndFilters from "@components/[[...slug]]/searchBarAndFilters";
import ResultsList from "@components/[[...slug]]/resultsList";

const Index: NextPage<{
  jobs: JobsEntity[];
  organizationName: string;
}> = ({ jobs, organizationName }) => {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [itemsPerPage, setItemsPerPage] = useState(25);

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
        jobs={jobs}
        itemsPerPage={itemsPerPage}
        setFilteredJobs={setFilteredJobs}
        setItemsPerPage={setItemsPerPage}
      />
      <ResultsList
        filteredJobs={filteredJobs}
        itemsPerPage={itemsPerPage}
        organizationName={organizationName}
      />
    </Box>
  );
};

export async function getStaticProps(ctx: any) {
  const res = await fetch(
    "https://www.welcomekit.co/api/v1/embed?organization_reference=Pg4eV6k",
  );
  const { jobs, name: organizationName }: { jobs: JobsEntity[]; name: string } =
    await res.json();

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

export default Index;
