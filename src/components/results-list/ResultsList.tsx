import { useEffect, useState, useRef } from "react";
import { Box } from "@welcome-ui/box";
import JobDescription from "./job-description/JobDescription";

import { Text } from "@welcome-ui/text";
import { Pagination } from "@welcome-ui/pagination";
import { Link } from "@welcome-ui/link";
import { WriteIcon } from "@welcome-ui/icons.write";
import { DateIcon } from "@welcome-ui/icons.date";
import { LocationIcon } from "@welcome-ui/icons.location";
import getRelativeTime from "@utils/getRelativeTime";

const ResultsList = ({
  jobs,
  organizationName,
  pagination,
  slug,
}: {
  jobs: any;
  organizationName: any;
  slug: any;
}) => {
  const [page, setPage] = useState(0);

  const amtOfPages = Math.ceil(jobs.length / pagination);

  const currentJobArray = jobs.slice(
    page * pagination,
    (page + 1) * pagination < jobs.length
      ? (page + 1) * pagination
      : jobs.length,
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      w={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="nude.100"
      overflow="hidden"
    >
      <Box w={"70%"} display="flex" flexDirection="column" overflow="auto">
        {currentJobArray.map((job: any) => {
          const calculateNbrOfDays = getRelativeTime(
            new Date(job.published_at),
          );

          const site = job.websites_urls.find(
            site => site.website_reference === "wttj_fr",
          );

          return (
            <Box backgroundColor="light.900" margin="md" key={job.id}>
              <Text>{organizationName}</Text>
              <Text>{job.name}</Text>
              <WriteIcon />
              <Text>{job.contract_type.en}</Text>
              <LocationIcon />
              <Text>{job.office.name}</Text>
              <DateIcon />
              <Text>{calculateNbrOfDays}</Text>
              <JobDescription slug={slug} job={job} />
              {site?.url && (
                <Link href={site.url} target="_blank">
                  Apply
                </Link>
              )}
            </Box>
          );
        })}
        <Pagination
          aria-label="Pagination"
          page={page + 1}
          onChange={val => setPage(val - 1)}
          pageCount={amtOfPages}
        />
      </Box>
    </Box>
  );
};

export default ResultsList;
