import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Modal, useModalState } from "@welcome-ui/modal";

const AModal = ({ job }: { job: any }) => {
  const modal = useModalState();

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

const ResultsList = ({ jobs }: { jobs: any }) => (
  <Box
    display="flex"
    w={1}
    justifyContent="center"
    alignItems="center"
    backgroundColor="nude.100"
  >
    <ul>
      {jobs.map((job: any) => {
        return (
          <li key={job.name}>
            {job.name}
            {job.contract_type.en}
            {job.office.name}
            <AModal job={job} />
            <Button>Apply</Button>
          </li>
        );
      })}
    </ul>
  </Box>
);

export default ResultsList;
