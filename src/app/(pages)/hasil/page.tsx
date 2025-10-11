"use client";

import GoodThingMd from "@/components/good-things-md";
import NeedImprovementMd from "@/components/need-improvement-md";

export default function ResultPage() {
  return (
    <div className="mx-auto my-12 max-w-4xl">
      <GoodThingMd />
      <NeedImprovementMd />
    </div>
  );
}
