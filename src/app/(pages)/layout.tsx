"use client"

import { ReactNode } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function Layout(props: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            {props.children}
            <Toaster />
            <Footer />
        </>
    )
}