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
      <p className="text-md font-medium">{title}</p>

      <ul className="text-md list-disc ml-5 mb-2">
        {entries.map(({ name, amount, id }) => (
          <li key={name}>
            <div className="flex items-center justify-between">
              <span>
                {name}:{" "}
                <span className="font-medium">€{amount.toFixed(2)}</span>
              </span>

              {status === CardStatus.editting && (
                <IconButton
                  icon={<Trash2 width={"18px"} />}
                  className="text-[#1C2A3A] cursor-pointer"
                  onClick={() => {
                    onDelete(id);
                  }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntryList;
