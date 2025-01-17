"use client"
import { useUserContext } from "@/context/userContext";
import React from "react";


interface MainContentLayoutProps { 
    children: React.ReactNode;
}

function MainContentLayout({children}: MainContentLayoutProps) {
    const UserId= useUserContext().user._id;
    return (
        <main className={`${UserId ? "pr-[20rem]" : ""} pb-[1.5rem] flex h-full`}>
             {children}
        </main>
    );
}

export default MainContentLayout;