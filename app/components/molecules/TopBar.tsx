"use client";
import { ChartLine, Cylinder, LogOut, Settings } from "lucide-react";
import IconButton from "../atoms/IconButton";
import { useRouter } from "next/navigation";
import { logout } from "@/app/login/actions";
import { UserContext } from "@/app/context/UserContext";
import { useContext } from "react";

const TopBar = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const pushRoute = (route: string = "/") => {
    router.push(route);
  };
  return (
    <div className=" w-full flex  py-5 px-8 items-center justify-between border-b border-[#E5E8EB]">
      <div className="flex gap-2 cursor-pointer">
        <IconButton
          icon={<Cylinder />}
          onClick={() => pushRoute()}
          className=" cursor-pointer text-black"
        />
        <span className=" text-lg font-bold" onClick={() => pushRoute()}>
          FinTrack
        </span>
      </div>
      {user && (
        <div className="flex gap-2">
          <IconButton
            icon={<ChartLine />}
            onClick={() => pushRoute("/dashboard")}
            className="cursor-pointer text-black"
          />
          <IconButton
            icon={<Settings />}
            onClick={() => pushRoute("/settings")}
            className="cursor-pointer text-black"
          />
          <IconButton
            icon={<LogOut />}
            onClick={logout}
            className="cursor-pointer text-black"
          />
        </div>
      )}
    </div>
  );
};

export default TopBar;
