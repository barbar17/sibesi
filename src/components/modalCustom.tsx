"use client";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function ModalCustom({
  isOpen,
  onClose,
  children,
  widthCustom = "90%",
}: {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  widthCustom?: string;
}) {
  return (
    <Modal open={isOpen} onClose={onClose} center showCloseIcon={false} focusTrapped={false} styles={{ modal: { width: widthCustom, maxWidth: "400px" } }}>
      <div>{children}</div>
    </Modal>
  );
}
