import React, { useState, useImperativeHandle, forwardRef } from "react";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

interface typeRef {
  setStatusModal(value : boolean ): void;
}

const ModalSpinner = React.forwardRef<typeRef ,{} >((props, ref) => {
  const [status, setStatus] = useState(false);

  useImperativeHandle(ref, () => ({
    setStatusModal(value: boolean) {
      console.log(value);
      setStatus(value);
    },
  }));

  return (
    <Modal
      open={status}
      center
      onClose={() => setStatus(false)}
      blockScroll={false}
      showCloseIcon={false}
      closeOnOverlayClick={false}
      classNames={{
        overlay: "customOverlay",
        modal: "modalLoader",
      }}
    >
      <div className="loader"></div>
    </Modal>
  );
})

export default ModalSpinner;