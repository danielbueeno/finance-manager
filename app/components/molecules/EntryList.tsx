import { CardStatus, Entry, EntryVariant } from "@/app/common/types";
import IconButton from "../atoms/IconButton";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface EntryListProps {
  title: string;
  entries: Entry[];
  status: CardStatus;
  onDelete: (id: string) => void;
  variant?: EntryVariant;
}

const EntryList = ({ title, entries, status, onDelete }: EntryListProps) => {
  return (
    <div>
      <p className="text-sm font-medium">{title}</p>
      <ul className="text-sm list-disc ml-5">
        {entries.map(({ name, amount, id }) => (
          <li key={name}>
            {name}: €{amount.toFixed(2)}
            {status === CardStatus.editting && (
              <IconButton
                icon={<Trash2 />}
                onClick={() => {
                  onDelete(id);
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntryList;
