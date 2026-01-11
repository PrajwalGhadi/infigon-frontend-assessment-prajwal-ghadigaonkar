"use client"
import { IoMenu } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";

export default function Navbar() {

    return (
        <>
            <nav className="w-full flex justify-between py-3 px-6 items-center fixed z-11 bg-[#fffdfd] lg:w-[50%] lg:left-[25%]">
                <IoMenu className="text-2xl"/>
                <h1 className="text-2xl font-bold">Shop Collection</h1>
                <FaRegUser className="text-5xl border p-2 rounded-full"/>
            </nav>
        </>
    )
}