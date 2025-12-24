"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Carousel({ images }: { images: string[] }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
    ]);

    useEffect(() => {
        if (!emblaApi) return;

        const updateIndex = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", updateIndex);

        return () => {
            emblaApi.off("select", updateIndex);
        };
    }, [emblaApi]);

    useEffect(() => {

        if (!emblaApi) return;

        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();

                if (e.deltaY > 0) {
                    emblaApi.scrollNext();
                } else {
                    emblaApi.scrollPrev();
                }
            }
        };

    const container = containerRef.current;
    if (container) {
        container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
        if (container) {
            container.removeEventListener("wheel", handleWheel);
        }
    };

}, [emblaApi]);

return (
    <div className="relative w-[280px] md:w-[307px] mx-auto" ref={containerRef}>

        <div className="overflow-hidden" ref={emblaRef}>

            <div className="flex">
            {images.map((src, index) => (
                <div key={index} className="min-w-0 flex-[0_0_100%]">

                    <div className="relative w-full h-[229.75px]">

                        <Image src={src} alt={`Фото ${index + 1}`} fill className="object-cover" sizes="307px" />
                    </div>
                    
                </div>
            ))}

            </div>

        </div>


        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">

        {images.map((_, index) => (
            <button key={index} onClick={() => emblaApi?.scrollTo(index)} className="w-6 h-6 flex items-center justify-center" >
            <div className={` w-2 h-2 rounded-full transition-all ${index === selectedIndex ? "bg-orange-500 scale-125" : "bg-white"}`} />
            </button>
        ))}

        </div>
    </div>
    );
}
