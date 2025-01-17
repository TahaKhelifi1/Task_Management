"use client";
import { useUserContext } from "@/context/userContext";
import Sidebar from "@/app/Components/Sidebar/Sidebar";
import React from "react";
 
function SidebarProvider(){
    const UserId = useUserContext().user._id;
    return (
        <>
            {UserId && <Sidebar />} 
        </>
    )
}

export default SidebarProvider;