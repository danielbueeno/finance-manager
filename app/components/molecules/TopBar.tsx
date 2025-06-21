"use client";
import { ChartLine, Cylinder, Settings } from "lucide-react";
import IconButton from "../atoms/IconButton";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const router = useRouter();
  return (
    <div className=" w-full flex  py-5 px-8 items-center justify-between border-b border-[#E5E8EB]">
      <div className="flex gap-2 cursor-pointer">
        <IconButton
          icon={<Cylinder />}
          onClick={() => router.push("/")}
          className=" cursor-pointer text-black"
        />
        <span className=" text-lg font-bold" onClick={() => router.push("/")}>
          FinTrack
        </span>
      </div>
      <div className="flex gap-2">
        <IconButton
          icon={<ChartLine />}
          onClick={() => router.push("/dashboard")}
          className="cursor-pointer text-black"
        />
        <IconButton
          icon={<Settings />}
          onClick={() => router.push("/settings")}
          className="cursor-pointer text-black"
        />
      </div>
    </div>
  );
};

export default TopBar;
