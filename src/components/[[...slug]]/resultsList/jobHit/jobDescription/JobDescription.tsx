import { useEffect } from "react";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { Modal, useModalState } from "@welcome-ui/modal";
import { Button } from "@welcome-ui/button";

import usePrevious from "@hooks/usePrevious";

const JobDescription = ({ job }: { job: any }) => {
  const router = useRouter();
  const { slug } = router.query;
  const prevSlug = usePrevious(slug);

  const modal = useModalState({ visible: slug && slug[0] === job.slug });

  useEffect(() => {
    if (prevSlug && prevSlug[0] === job.slug) {
      modal.hide();
    }
    if (slug && slug[0] === job.slug) {
      modal.show();
    }
  }, [slug]);

  return (
    <>
      <Modal.Trigger
        as={Button}
        onClick={() => {
          router.push(job.slug, undefined, { shallow: true });
        }}
        {...modal}
      >
        See More
      </Modal.Trigger>
      <Modal
        {...modal}
        ariaLabel="job-description"
        onClose={() => {
          router.push("", undefined, {
            shallow: true,
          });
        }}
      >
        <Modal.Title>{job.name}</Modal.Title>
        <Modal.Content p="md">
          <Text>Description</Text>
          <Box>{parse(job.profile)}</Box>
          <Text>Recruitment Process</Text>
          <Box>{parse(job.recruitment_process)}</Box>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default JobDescription;
