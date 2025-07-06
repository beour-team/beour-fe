import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmButtonClass?: string;
  cancelButtonClass?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  confirmButtonClass = "bg-cr-primary text-cr-white",
  cancelButtonClass = "bg-cr-500 text-cr-white",
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-cr-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-cr-white rounded-[1.6rem] p-[2.4rem] w-[30.5rem] mx-[1.8rem]">
        <div className="text-left">
          <h2 className="text-18-SemiBold mb-[1.2rem] whitespace-pre-line">
            {title}
          </h2>
          <p className="text-14-Medium text-[#666666] mb-[2.4rem] whitespace-pre-line">
            {message}
          </p>

          <div className="flex gap-[1.2rem]">
            <button
              onClick={handleCancel}
              className={`flex-1 h-[4.8rem] rounded-[0.8rem] text-14-SemiBold ${cancelButtonClass}`}
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 h-[4.8rem] rounded-[0.8rem] text-14-SemiBold ${confirmButtonClass}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
