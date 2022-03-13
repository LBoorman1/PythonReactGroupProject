import React from 'react';
import { Button, Modal } from 'reactstrap';

const RulesOfMentoringWarning = () => {
  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Warning! Proceeding with this change will result in a violation of the rules of mentoring.
        Are you sure you wish to proceed?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">
          Cancel
        </Button>
        <Button variant="danger">
          Proceed
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RulesOfMentoringWarning;