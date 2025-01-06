"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";
import Link from "next/link";
import { github } from "@/utils/Icons";

function Header() {
    const {user} = useUserContext();
    const{name} = user;
    const UserId = user._id; 

    return (
        <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9] ">
            <div>
                <h1 className="text-lg font-medium">
                    <span role="img" aria-label="wave">👋</span>
                    {UserId ? `Welcome, ${name}!` : "Welcome to Taha"}
                </h1>
                <p className="text-sm">
                    {UserId?(
                       <>You Have{" "}
                       <span className="font-bold text-[#3aafae]">5</span> active tasks</>) : ("Sign in or register to see your tasks")}
                </p>
            </div>
            <div className="h-[50px] flex items-center gap-[10.4rem]">
                <button className="bg-[#3aafae] text-white px-4 py-2 rounded-lg hover:bg-[#00a1f1] hover:text-white transition-all duration-200 ease-in-out">    
                    Create a new task
                </button>
                <div className="flex gap-4 items-center">
                <Link
                    href="https://github.com/TahaKhelifi1"
                    passHref
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]">{github}
                </Link>
                </div>
                
            </div>
        </header>
    );
}

export default Header;