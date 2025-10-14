"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  description?: string; // ✅ tambahkan field baru
  avatar?: string;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();
    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 4000);
  };

  return (
    <div className="relative h-20 w-[22rem] md:w-[26rem]">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute bg-white dark:bg-neutral-900 h-32 md:h-28 w-full rounded-2xl shadow-md border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.05] dark:shadow-white/[0.05] flex items-start gap-4 px-5 py-3"
          style={{
            transformOrigin: "top center",
          }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: cards.length - index,
          }}
        >
          {card.avatar && (
            <div className="w-18 h-18  overflow-hidden mt-1">
              <Image
                src={card.avatar}
                alt={card.name}
                width={48}
                height={48}
                className="object-cover rounded-full"
              />
            </div>
          )}
          <div className="text-left">
            <p className="font-semibold text-neutral-900 dark:text-white text-sm">
              {card.name}
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs mb-1">
              {card.designation}
            </p>
            {card.description && (
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
                {card.description}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
