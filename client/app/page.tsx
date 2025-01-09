"use client";
import { useUserContext } from "@/context/userContext";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import { useState } from "react";
import ChangePasswordForm from "./Components/auth/ChangePasswordForm/ChangePasswordForm";
import Filters from "./Components/Filters/Filters";

export default function Home() {
  useRedirect("/login");
  const {tasks} = useTasks();


  

  return <main className="m-6 h-full">
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold">All Tasks</h1>
      <Filters/>
    </div>

  </main>

}
