import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { Link } from "@welcome-ui/link";
import { OfficeIcon } from "@welcome-ui/icons.office";
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
    <Box
      backgroundColor="light.900"
      border="solid"
      borderColor="primary.100"
      borderWidth={2}
      boxShadow="sm"
      margin="md"
      data-testid="JobHit"
    >
      <Box padding={15}>
        <Text marginTop={0} marginBottom={10} variant="h4">
          {job.name}
        </Text>
        <hr />
        <Box
          paddingRight={10}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Text paddingRight={10}>{organizationName}</Text>
          <OfficeIcon />
        </Box>
        <Box display="flex">
          <Box display="flex" alignItems="center" paddingRight={10}>
            <WriteIcon />
            <Text margin="10px 0" paddingLeft={10}>
              {job.contract_type.en}
            </Text>
          </Box>
          <Box display="flex" alignItems="center" paddingRight={10}>
            <LocationIcon />
            <Text margin="10px 0" paddingLeft={10}>
              {job.office.name}
            </Text>
          </Box>
          <Box display="flex" alignItems="center" paddingRight={10}>
            <DateIcon />
            <Text margin="10px 0" paddingLeft={10}>
              {calculateNbrOfDays}
            </Text>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-evenly">
          <JobDescription job={job} />
          {outSite?.url && (
            <Link href={outSite.url} target="_blank">
              Apply
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default JobHit;
