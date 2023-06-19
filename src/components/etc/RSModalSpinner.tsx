import React, { useState, useImperativeHandle, forwardRef } from "react";

import { Modal as RSModal } from "reactstrap";

interface typeRef {
  setStatusModal(value: boolean): void;
}

const RSModalSpinner = React.forwardRef<typeRef, {}>((props, ref) => {
  const [status, setStatus] = useState(false);

  useImperativeHandle(ref, () => ({
    setStatusModal(value: boolean) {
      console.log(value);
      setStatus(value);
    },
  }));

  return (
    <RSModal centered isOpen={status} className="rs-modalLoader">
      <div className="loader"></div>
    </RSModal>
  );
});

export default RSModalSpinner;
