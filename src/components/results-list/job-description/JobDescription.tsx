import usePrevious from "@hooks/usePrevious";
import { useEffect } from "react";

import { Button } from "@welcome-ui/button";
import { Modal, useModalState } from "@welcome-ui/modal";
import { useRouter } from "next/router";

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
        ariaLabel="example"
        onClose={() => {
          router.push("", undefined, {
            shallow: true,
          });
        }}
      >
        <Modal.Title>Nullam non lacinia</Modal.Title>
        <Modal.Content p="xxl">
          <div>{job.profile}</div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default JobDescription;
