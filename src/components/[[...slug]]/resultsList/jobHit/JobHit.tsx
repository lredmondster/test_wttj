import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { Link } from "@welcome-ui/link";
import { WriteIcon } from "@welcome-ui/icons.write";
import { LocationIcon } from "@welcome-ui/icons.location";
import { DateIcon } from "@welcome-ui/icons.date";

import type { JobsEntity } from "@components/[[...slug]]/types";
import getRelativeTime from "@utils/getRelativeTime";

import JobDescription from "./jobDescription/JobDescription";

const JobHit = ({
  organizationName,
  job,
}: {
  organizationName: string;
  job: JobsEntity;
}) => {
  const calculateNbrOfDays = getRelativeTime(new Date(job.published_at));

  const outSite = job.websites_urls.find(
    site => site.website_reference === "wttj_fr",
  );
  return (
    <Box backgroundColor="light.900" margin="md">
      <Text>{organizationName}</Text>
      <Text>{job.name}</Text>
      <WriteIcon />
      <Text>{job.contract_type.en}</Text>
      <LocationIcon />
      <Text>{job.office.name}</Text>
      <DateIcon />
      <Text>{calculateNbrOfDays}</Text>
      <JobDescription job={job} />
      {outSite?.url && (
        <Link href={outSite.url} target="_blank">
          Apply
        </Link>
      )}
    </Box>
  );
};

export default JobHit;
