import { Button } from "@mui/material"; // Import Material-UI Button
import { Edit, Delete, DeleteForever, Restore, Save, Add } from "@mui/icons-material";
import "../styles/shared-button.scss";

// Reusable SharedButton Component using Material-UI Button
type ButtonProps = {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  type: "edit" | "delete" | "hard-delete" | "restore" | "save" | "create";
  className?: string;
  variant?: "contained" | "outlined" | "text"; // Material-UI button variant
  children?: React.ReactNode; // Allow children for text or other content inside the button
};

const SharedButton = ({
  label,
  icon,
  onClick = () => {}, // Default no-op function for onClick
  type,
  className,
  children,
}: ButtonProps) => (
  <Button
    className={`shared-button ${type} ${className}`}
    onClick={onClick}
    sx={{ color: "#fff" }} // Explicitly setting the text color to white
  >
    {icon} {children || label}
  </Button>
);

// Predefined Buttons (Refactored)

export const EditButton = ({
  onClick,
  className,
  children,
}: ButtonProps) => (
  <SharedButton label="Edit" icon={<Edit />} type="edit" onClick={onClick} className={className}>
    {children}
  </SharedButton>
);

export const DeleteButton = ({
  onClick,
  className,
  children,
}: ButtonProps) => (
  <SharedButton label="Delete" icon={<Delete />} type="delete" onClick={onClick} className={className}>
    {children}
  </SharedButton>
);

export const HardDeleteButton = ({
  onClick,
  className,
  children,
}: ButtonProps) => (
  <SharedButton label="Hard Delete" icon={<DeleteForever />} type="hard-delete" onClick={onClick} className={className}>
    {children}
  </SharedButton>
);

export const RestoreButton = ({
  onClick,
  className,
  children,
}: ButtonProps) => (
  <SharedButton label="Restore" icon={<Restore />} type="restore" onClick={onClick} className={className}>
    {children}
  </SharedButton>
);

export const SaveButton = ({
  onClick,
  className,
  children,
}: ButtonProps) => (
  <SharedButton label="Save" icon={<Save />} type="save" onClick={onClick} className={className}>
    {children}
  </SharedButton>
);

// CreateButton (unchanged)
export const CreateButton = ({
  onClick,
  className,
  children,
}: ButtonProps) => (
  <SharedButton
    label="Create"
    icon={<Add />}
    type="create"
    onClick={onClick}
    className={className}
  >
    {children}
  </SharedButton>
);

export default SharedButton;
