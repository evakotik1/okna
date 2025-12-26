"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { X } from "lucide-react";
import MeasurementModalForm from "./forms/measurementModalForm";
import QuestionsModalForm from "./forms/QuestionsModalForm";

const portfolioImages = [
	{
		id: 1,
		data: "08.10.2021",
		address: "г Иваново,  ул Ташкентская, д 4 к 1",
		src: "/portfolio1.svg",
		title: "Монтаж окна и балконного блока",
		whatDidWeDo: "Профильная система Rehau Blitz Фурнитура Roto NT",
		objectCategories: "Окна Балконный блок",
		carouselImages: [
			"/portfolioModal1.svg",
			"/portfolioModal1.svg",
			"/portfolioModal1.svg",
		],
		largeImage: "/portfolioMap.svg",
	},
	{
		id: 2,
		data: "08.10.2021",
		address: "г Иваново,  ул Ташкентская, д 4 к 1",
		src: "/portfolio2.svg",
		title: "Монтаж окна и балконного блока",
		whatDidWeDo: "Профильная система Rehau Blitz Фурнитура Roto NT",
		objectCategories: "Окна Балконный блок",
		carouselImages: [
			"/portfolioModal1.svg",
			"/portfolioModal1.svg",
			"/portfolioModal1.svg",
		],
		largeImage: "/portfolioMap.svg",
	},
	{
		id: 3,
		data: "08.10.2021",
		address: "г Иваново,  ул Ташкентская, д 4 к 1",
		src: "/portfolio3.svg",
		title: "Монтаж окна и балконного блока",
		whatDidWeDo: "Профильная система Rehau Blitz Фурнитура Roto NT",
		objectCategories: "Окна Балконный блок",
		carouselImages: [
			"/portfolioModal1.svg",
			"/portfolioModal1.svg",
			"/portfolioModal1.svg",
		],
		largeImage: "/portfolioMap.svg",
	},
	{
		id: 4,
		data: "08.10.2021",
		address: "г Иваново,  ул Ташкентская, д 4 к 1",
		src: "/portfolio4.svg",
		title: "Монтаж окна и балконного блока",
		whatDidWeDo: "Профильная система Rehau Blitz Фурнитура Roto NT",
		objectCategories: "Окна Балконный блок",
		carouselImages: [
			"/portfolioModal1.svg",
			"/portfolioModal1.svg",
			"/portfolioModal1.svg",
		],
		largeImage: "/portfolioMap.svg",
	},
	{
		id: 5,
		data: "08.10.2021",
		address: "г Иваново,  ул Ташкентская, д 4 к 1",
		src: "/portfolio5.svg",
		title: "Монтаж окна и балконного блока",
		whatDidWeDo: "Профильная система Rehau Blitz Фурнитура Roto NT",
		objectCategories: "Окна Балконный блок",
		carouselImages: [
			"/portfolioModal1.svg",
			"/portfolioModal1.svg",
			"/portfolioModal1.svg",
		],
		largeImage: "/portfolioMap.svg",
	},
];

function Carousel({ images }: { images: string[] }) {
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
		<div className="relative w-full md:w-[307px] mx-auto" ref={containerRef}>
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">
					{images.map((src, index) => (
						<div key={index} className="flex-[0_0_100%] ">
							<div className="relative w-full h-[229.75px]">
								<Image
									src={src}
									alt={`Фото ${index + 1}`}
									fill
									className="object-cover"
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="absolute top-60 left-1/2 -translate-x-1/2 flex gap-1">
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => emblaApi?.scrollTo(index)}
						className="w-7 h-7 flex items-center justify-center"
					>
						<div
							className={`w-2 h-2 rounded-full transition-all border border-[#9494A8] ${
								index === selectedIndex ? "bg-orange-500 " : "bg-white "
							}`}
						/>
					</button>
				))}
			</div>
		</div>
	);
}

export default function Portfolio() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<number | null>(null);

	const itemsPerView = 4;
	const visibleImages = portfolioImages.slice(
		currentIndex,
		currentIndex + itemsPerView,
	);

	const handlePrev = () => {
		setCurrentIndex((prev) =>
			prev > 0 ? prev - itemsPerView : portfolioImages.length - itemsPerView,
		);
	};

	const handleNext = () => {
		setCurrentIndex((prev) =>
			prev < portfolioImages.length - itemsPerView ? prev + itemsPerView : 0,
		);
	};

	const handleImageClick = (id: number) => {
		setSelectedId(id);
		setIsModalOpen(true);
	};

	const selectedImage = portfolioImages.find((img) => img.id === selectedId);

	return (
		<section className="pt-16" id="portfolio">
			<div className="max-w-[1200px] bg-white mx-auto p-16">
				<h2 className="text-2xl font-bold text-center mb-8">Портфолио</h2>

				<div className="hidden md:relative md:block">
					<div className="flex justify-center items-center gap-8">
						{visibleImages.map((item) => (
							<div
								key={item.id}
								className="cursor-pointer hover:shadow-xl transition-shadow"
								onClick={() => handleImageClick(item.id)}
							>
								<div className="w-[215px] h-[215px] relative">
									<Image
										src={item.src}
										alt={item.title}
										fill
										className="object-cover"
									/>
								</div>
							</div>
						))}
					</div>

					<button
						onClick={handlePrev}
						className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center text-[#2F2F51]"
					>
						<Image
							src="/ChevronLeft.svg"
							alt="ChevronLeft"
							width={24}
							height={48}
						/>
					</button>

					<button
						onClick={handleNext}
						className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 flex items-center justify-center text-[#2F2F51]"
					>
						<Image
							src="/ChevronRight.svg"
							alt="ChevronRight"
							width={24}
							height={48}
						/>
					</button>
				</div>

				<div className="md:hidden flex flex-col items-center gap-8">
					{portfolioImages.map((item) => (
						<div
							key={item.id}
							className="cursor-pointer hover:shadow-xl transition-shadow"
							onClick={() => handleImageClick(item.id)}
						>
							<div className="w-[215px] h-[215px] relative">
								<Image
									src={item.src}
									alt={item.title}
									fill
									className="object-cover"
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			{isModalOpen && selectedImage && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded max-w-4xl w-full max-h-[700px] overflow-y-auto md:max-h-none md:overflow-visible relative">
						<button
							onClick={() => setIsModalOpen(false)}
							className="absolute top-3 right-2 md:top-8 md:right-8text-black hover:text-orange-500 transition-colors z-50"
						>
							<Image
								src="/X.svg"
								alt="Закрыть"
								width={7}
								height={7}
								className="w-4 h-4 md:w-5 md:h-5"
							/>
						</button>

						<div className="md:flex md:flex-col">
							<div className="flex flex-col md:flex-row md:gap-14 p-8 md:pl-16">
								<div className="mb-8 md:mb-0">
									<Carousel images={selectedImage.carouselImages} />
								</div>

								<div className="flex flex-col gap-3">
									<div className="flex flex-col md:flex-row md:gap-6 items-start md:items-center">
										<p className="text-[#9494A8] text-[14px] mb-2 md:mb-0">
											{selectedImage.data}
										</p>
										<div className="flex items-center gap-3">
											<Image
												src="/geolocation.svg"
												alt="geolocation"
												width={30}
												height={40}
											/>
											<p>{selectedImage.address}</p>
										</div>
									</div>
									<h3 className="text-xl md:text-2xl font-bold">
										{selectedImage.title}
									</h3>
									<div>
										<p className="text-black font-bold">Что делали</p>
										<p>{selectedImage.whatDidWeDo}</p>
									</div>
									<div>
										<p className="text-black font-bold">Категории объекта:</p>
										<p>{selectedImage.objectCategories}</p>
									</div>
									<div className="flex gap-4 mt-2">
										<MeasurementModalForm />
										<QuestionsModalForm />
									</div>
								</div>
							</div>

							<div className="relative w-full h-[200px] md:h-[312px] mt-4 md:mt-0">
								<Image
									src={selectedImage.largeImage}
									alt="largeImage"
									fill
									className="object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
