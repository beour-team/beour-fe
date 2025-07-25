import { useEffect } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  icon?: string;
}

const Toast: React.FC<ToastProps> = ({
  message,
  isVisible,
  onClose,
  duration = 3000,
  icon = "✓",
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-[2rem] left-0 right-0 z-50 px-[2rem]">
      <div className="bg-cr-800 bg-opacity-90 text-cr-white px-[2rem] py-[1.2rem] rounded-[0.8rem] flex items-center justify-center gap-[0.8rem] w-full shadow-lg">
        <span className="text-16-Medium text-cr-blue">{icon}</span>
        <span className="text-14-Medium">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
