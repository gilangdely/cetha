"use client"

import { ReactNode } from "react";
import Navbar from "@/components/ui/Navbar";

export default function Layout(props: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            {props.children}
        </>
    )
}