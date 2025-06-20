import { CardStatus } from "@/app/common/types";
import IconButton from "../atoms/IconButton";
import { Pencil, Save, Trash2, X } from "lucide-react";

interface CardHeaderProps {
  id: string;
  color: string;
  name: string;
  status: CardStatus;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onSave: (id: string) => void;
  onCancel: (id: string) => void;
}
const CardHeader = ({
  color,
  name,
  status,
  onDelete,
  onEdit,
  onSave,
  onCancel,
  id,
}: CardHeaderProps) => {
  const headerButtons = () => {
    const buttons = [];
    if (status === CardStatus.reading) {
      return (
        <>
          <IconButton
            icon={<Pencil />}
            onClick={() => onEdit(id)}
            className="bg-transparent"
          />
          <IconButton
            icon={<Trash2 />}
            className="bg-transparent"
            onClick={() => {
              onDelete(id);
            }}
          />
        </>
      );
    }
    return (
      <>
        <IconButton
          icon={<Save />}
          onClick={() => onSave(id)}
          className="bg-transparent"
        />
        <IconButton
          icon={<X />}
          className="bg-transparent"
          onClick={() => {
            onCancel(id);
          }}
        />
      </>
    );
  };

  return (
    <div className={`${color} w-full rounded-t-2xl p-4 flex justify-between`}>
      <span className="text-xl font-semibold">{name}</span>
      <div className="flex">{headerButtons()}</div>
    </div>
  );
};

export default CardHeader;
