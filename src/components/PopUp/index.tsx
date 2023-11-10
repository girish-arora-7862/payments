import { ReactNode } from "react";
import "./index.css";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
  children?: ReactNode;
  onClose?: () => void;
  hideCloseIcon?: boolean;
}

const PopUp = ({
  children = <></>,
  onClose = () => {},
  hideCloseIcon = false,
}: IProps) => {
  const handleOutsideClick = () => {
    onClose();
  };

  const handleInsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };
  return (
    <div className="pop_up_backdrop" onClick={handleOutsideClick}>
      <div className="pop_up_wrapper" onClick={handleInsideClick}>
        {!hideCloseIcon && (
          <div className="pop_up_close" onClick={onClose}>
            <CloseIcon />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default PopUp;
