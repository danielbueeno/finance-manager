import { Entry } from "@/app/common/types";

interface EntryListProps {
  title: string;
  entries: Entry[];
}

const EntryList = ({ title, entries }: EntryListProps) => {
  return (
    <div>
      <p className="text-sm font-medium">{title}</p>
      <ul className="text-sm list-disc ml-5">
        {entries.map(({ name, amount }) => (
          <li key={name}>
            {name}: €{amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntryList;
