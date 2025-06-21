"use client";
import { ChartLine, Cylinder, LogOut, Settings } from "lucide-react";
import IconButton from "../atoms/IconButton";
import { redirect, useRouter } from "next/navigation";
import { logout } from "@/app/login/actions";

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
          onClick={() => redirect("/settings")}
          className="cursor-pointer text-black"
        />
        <IconButton
          icon={<LogOut />}
          onClick={logout}
          className="cursor-pointer text-black"
        />
      </div>
    </div>
  );
};

export default TopBar;
