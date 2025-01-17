"use client";

import IconGrid from "@/public/icon/IconGrid";
import IconFileCheck from "@/public/icon/IconFileCheck";
import IconCheck from "@/public/icon/IconCheck";
import IconStopwatch from "@/public/icon/IconStopwatch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React from "react";
import IconDeleteAll from "@/public/icon/IconDeleteAll";




function MiniSidebar() {
    const pathname = usePathname();

    const getStrokeColor = (link: string) => {
        return pathname === link ? "#FF5C00" : "#71717a";
    };


    const navItems = [
        {
            icon : <IconGrid strokeColor={getStrokeColor ("/")} />,
            title : 'All',
            link : '/'
        },
        {
            icon : <IconFileCheck strokeColor={getStrokeColor ("/completed")} />,
            title : 'Completed',
            link : '/completed'
        },
        {
            icon : <IconCheck strokeColor={getStrokeColor ("/pending")} />,
            title : 'Pending',
            link : '/Pending'
        },
        {
            icon : <IconStopwatch strokeColor={getStrokeColor ("/overdue")} />,
            title : 'Overdue',
            link : '/Overdue'
        },

    ]
    return (
        <div className="basis-[5rem] flex flex-col bg-[#f9f9f9]">
            <div className="flex imtes-center justify-center h-[5rem]">
                <Image src="/logo.png" alt="logo" width={28} height={28} />
            </div>

            <div className="mt-8 flex-1 flex flex-col items-center justify-between">
                <ul className=" flex flex-col gap-10">
                    {navItems.map((item, index) => (
                        <li key = {index} className="relative group">
                            <Link href={item.link}>{item.icon}</Link> 

                            {/* Hover Tooltip */}
                            <span className="u-triangle absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white bg-[#3aafae] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {item.title}
                            </span>       
                        </li>
                    ))}
                        
                </ul>
                <div className="mb-p1.5rem">
                    <button className="w-12 h-12 flex justify-center items-center border-2 border-[#EB4E31]  p-2 rounded-full">
                        <IconDeleteAll strokeColor="#EB4E31" />
                    </button>

                </div>
            </div>
        </div>
    );
}

export default MiniSidebar;