interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
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
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  confirmButtonClass = "bg-cr-blue text-cr-white",
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
      <div className="bg-cr-white flex flex-col justify-between gap-[2rem] rounded-[1.6rem] p-[1.6rem] w-[30rem] ">
        <div className="flex flex-col gap-[1.6rem]">
          <h2 className="text-16-SemiBold whitespace-pre-line leading-[2.6rem] text-cr-black">
            {title}
          </h2>
        </div>

        <div className="flex gap-[0.4rem]">
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
  );
};

export default Modal;
