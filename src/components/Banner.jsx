"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";


const Banner = () => {
  return (
    <div className="relative container mx-auto mt-3.5 mb-3.5 h-[60vh]  md:h-[60vh] overflow-hidden">
      <Image
        src='/banner.jpg'
        alt="banner"
        fill
        className="object-cover rounded-lg"
        priority
      />
      <div className="absolute inset-0 bg-black/50 rounded-lg"></div>

      <div className="absolute inset-0 flex items-center justify-center text-center text-white">
        <div className="max-w-md hover:scale-105 transition duration-300">
          <h1 className="mb-5  text-3xl md:text-5xl  font-bold justify-center items-center cursor-pointer">
            pet of <br/> your choice
          </h1>
          <p className="mb-5">
          pet  is  your partner 
          </p>
          <Link href="/all-pets">
           <Button
              variant="bordered"
              radius="full"
              size="lg"
              className="text-white bg-black  hover:bg-white hover:text-black transition-all duration-300"
            >
            Browse Now
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;