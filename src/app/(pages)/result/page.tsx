"use client";

import GoodThingMd from "@/components/GoodThingMd";
import NeedImprovementMd from "@/components/NeedImprovementMd";

export default function ResultPage() {


    return (
        <div className="mx-auto my-12 max-w-4xl">
            <GoodThingMd />
            <NeedImprovementMd />
        </div>
    );
}
