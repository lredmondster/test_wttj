import { useState } from "react";
import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Modal, useModalState } from "@welcome-ui/modal";
import { useRouter } from "next/router";
import { Text } from "@welcome-ui/text";
import { Pagination } from "@welcome-ui/pagination";
import { Link } from "@welcome-ui/link";

const AModal = ({ job, slug }: { job: any; slug: any }) => {
  const modal = useModalState({ visible: slug === job.slug });

  return (
    <>
      <Modal.Trigger as={Button} {...modal}>
        See More
      </Modal.Trigger>
      <Modal {...modal} ariaLabel="example">
        <Modal.Title>Nullam non lacinia</Modal.Title>
        <Modal.Content p="xxl">
          <div>{job.profile}</div>
        </Modal.Content>
      </Modal>
    </>
  );
};

// in miliseconds
const units: { [unit: string]: number } = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const rtf = new Intl.RelativeTimeFormat("fr", { numeric: "always" });

const getRelativeTime = (d1: Date, d2 = new Date()) => {
  const elapsed = d1.getTime() - d2.getTime();

  for (var u in units)
    if (Math.abs(elapsed) > units[u] || u == "second")
      return rtf.format(Math.round(elapsed / units[u]), u);
};

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
  const router = useRouter();
  console.log("locale", router.locale);

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
              <Text>{job.contract_type.en}</Text>
              <Text>{job.office.name}</Text>
              <Text>{calculateNbrOfDays}</Text>
              <AModal slug={slug} job={job} />
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
