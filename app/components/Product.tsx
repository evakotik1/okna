"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import certificate from "@/public/certificate.svg"
import windowFactory from "@/public/windowFactory.svg"
import Cup from "@/public/Cup.svg"
import liftingCrane from "@/public/liftingCrane.svg"
import windows from "@/public/windows.svg"
import Logo from "@/public/LogoSchtandart 1.svg"

interface Product {
  id: number
  title: string
  description: string
  parameter1: string
  parameter2: string
  parameter3: string
  parameter4: string
  value1: string
  width2: string
  chambers3: string
  resistance4: string
  image: string
  category: "standard" | "business" | "premium" | "exclusive"
}

const productsData: Product[] = [
  {
    id: 1,
    title: "Rehau Blitz New",
    description: "Сохраняют тепло в доме, защищают от шума и вписываются в любой интерьер. Практичный выбор",
    parameter1: "Системная глубина",
    value1: "60/60 мм",
    parameter2: "Ширина стеклопакета",
    width2: "24/31 мм",
    parameter3: "Воздушные камеры",
    chambers3: "3",
    parameter4: "Теплосопротивление",
    resistance4: "0,70 м2С/ВТ",
    image: "/product.svg",
    category: "standard",
  },
  {
    id: 2,
    title: "Rehau Blitz New",
    description: "Сохраняют тепло в доме, защищают от шума и вписываются в любой интерьер. Практичный выбор",
    parameter1: "Системная глубина",
    value1: "60/60 мм",
    parameter2: "Ширина стеклопакета",
    width2: "24/31 мм",
    parameter3: "Воздушные камеры",
    chambers3: "3",
    parameter4: "Теплосопротивление",
    resistance4: "0,70 м2С/ВТ",
    image: "/product.svg",
    category: "business",
  },
  {
    id: 3,
    title: "Rehau Blitz New",
    description: "Сохраняют тепло в доме, защищают от шума и вписываются в любой интерьер. Практичный выбор",
    parameter1: "Системная глубина",
    value1: "60/60 мм",
    parameter2: "Ширина стеклопакета",
    width2: "24/31 мм",
    parameter3: "Воздушные камеры",
    chambers3: "3",
    parameter4: "Теплосопротивление",
    resistance4: "0,70 м2С/ВТ",
    image: "/product.svg",
    category: "premium",
  },
  {
    id: 4,
    title: "Rehau Blitz New",
    description: "Сохраняют тепло в доме, защищают от шума и вписываются в любой интерьер. Практичный выбор",
    parameter1: "Системная глубина",
    value1: "60/60 мм",
    parameter2: "Ширина стеклопакета",
    width2: "24/31 мм",
    parameter3: "Воздушные камеры",
    chambers3: "3",
    parameter4: "Теплосопротивление",
    resistance4: "0,70 м2С/ВТ",
    image: "/product.svg",
    category: "exclusive",
  },
]

const tabs = [
  { id: "standard", label: "Стандарт" },
  { id: "business", label: "Бизнес" },
  { id: "premium", label: "Премиум" },
  { id: "exclusive", label: "Эксклюзив" },
]

type TabId = typeof tabs[number]["id"]

export default function Products() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: "center",
    startIndex: 0
  })
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<TabId>("standard")
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const updateState = useCallback(() => {
    if (!emblaApi) return
    
    const newIndex = emblaApi.selectedScrollSnap()
    const product = productsData[newIndex]
    
    setSelectedIndex(newIndex)
    if (product) {
      setActiveTab(product.category)
    }
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  const onSelect = useCallback(() => {
    updateState()
  }, [updateState])

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on("select", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  const handleTabClick = useCallback((tabId: TabId) => {
    const tabIndex = tabs.findIndex(tab => tab.id === tabId)
    if (tabIndex !== -1 && emblaApi) {
      emblaApi.scrollTo(tabIndex)
    }
  }, [emblaApi])

  const currentProduct = productsData[selectedIndex]

  return (
    <section className="pt-24" id="products">
      <div className="container mx-auto max-w-[1200px] px-14 md:px-0">

        <div className="flex flex-col gap-10">

          <h1 className="text-2xl font-bold text-center"> Продукция </h1>
          <div className="flex justify-center gap-1 md:gap-4 mb-10 ">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => handleTabClick(tab.id)}
                className={`px-4 py-2 text-[14px] md:text-[16px] md:px-6  ${ 
                  activeTab === tab.id
                    ? "bg-orange-500 font-semibold text-white rounded-sm"
                    : "text-gray-700 hover:text-orange-500"
                }`} >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        <div className="relative">


          <button  onClick={() => emblaApi?.scrollPrev()}  disabled={!canScrollPrev} className={`absolute  -left-6 md:-left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center ${ 
              canScrollPrev
                ? "hover:text-orange-500"
                : "text-[#8F8F8F]"
            }`} >
            <img src="/ChevronLeft.svg" alt="ChevronLeft" className={`h-12 w-6 ${canScrollPrev ? "text-black" : "text-[#8F8F8F]"}`} style={{ 
              filter: canScrollPrev 
                  ? "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)"
                  : "invert(56%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)"
              }} />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {productsData.map((product) => (
                <div key={product.id} className="flex-[0_0_100%] flex justify-center">
                  <div className="bg-white flex flex-col md:flex-row h-auto md:h-[461px] w-full max-w-[1080px] ">
                    
                    <div className="relative w-full md:w-1/2 h-[250px] md:h-auto">
                      <Image src={product.image} alt="product" fill className="object-cover" />
                    </div>

                    <div className="w-full md:w-1/2 p-10 pt-6 md:pt-16">
                      <div className="flex gap-4 flex-col justify-center">

                        <div className="flex flex-col gap-5">

                        <div className="flex flex-col gap-4 md:gap-7">
                          <h3 className="text-xl md:text-[36px] font-bold text-orange-500"> {product.title} </h3>
                          <p className="text-black text-sm md:text-[18px] font-light"> {product.description} </p>
                        </div>

                        <div className="space-y-3 py-5">

                          <div className="flex items-center">
                            <p className="text-blacktext-base flex-shrink-0"> {product.parameter1} </p>
                            <div className="flex-grow border-b border-dotted border-[#CFCFCF] h-[1px]"></div>
                            <p className="font-medium text-left text-sm md:text-base min-w-[80px] md:min-w-[100px]"> {product.value1}
                            </p>
                          </div>
                          
                          <div className="flex items-center">
                            <p className="text-black text-sm md:text-base flex-shrink-0"> {product.parameter2} </p>
                            <div className="flex-grow border-b border-dotted border-[#CFCFCF] h-[1px]"></div>
                            <p className="font-medium text-left text-sm md:text-base min-w-[80px] md:min-w-[100px]"> {product.width2} </p>
                          </div>
                          
                          <div className="flex items-center">
                            <p className="text-black text-sm md:text-base flex-shrink-0"> {product.parameter3} </p>
                            <div className="flex-grow border-b border-dotted border-[#CFCFCF] h-[1px]"></div>
                            <p className="font-medium text-left text-sm md:text-base min-w-[80px] md:min-w-[100px]"> {product.chambers3} </p>
                          </div>
                          
                          <div className="flex items-center">
                            <p className="text-black text-sm md:text-base flex-shrink-0"> {product.parameter4} </p>
                            <div className="flex-grow border-b border-dotted border-[#CFCFCF] h-[1px]"></div>
                            <p className="font-medium text-left text-sm md:text-base min-w-[80px] md:min-w-[100px]"> {product.resistance4} </p>
                          </div>
                        </div>

                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className={`absolute  md:-right-0 -right-6 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 flex items-center justify-center transition-all duration-300 ${
              canScrollNext
                ? "hover:text-orange-500"
                : "text-[#8F8F8F]"
            }`} >
            <img src="/ChevronRight.svg" alt="ChevronRight" className={`h-12 w-6 ${canScrollNext ? "text-black" : "text-[#8F8F8F]"}`} style={{ 
                filter: canScrollNext 
                  ? "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)" 
                  : "invert(56%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)"
              }} />
          </button>

      </div>
    </div>
      
      <div className="mt-16 relative">
        <div className="relative h-auto md:h-[370px] max-w-[1200px] mx-auto rounded-sm">
          
          <div className="absolute inset-0 bg-[#2F2F51]"></div>
          
          <Image src="/schtandart.svg" alt="schtandart" fill className="object-cover opacity-35" />
          
          <div className="relative z-10 py-10 md:py-0">
            <div className="text-center text-white text-sm leading-tight w-full py-4 px-24 ">
              
              <div className=" flex justify-center mb-10">
                <Image src={Logo} alt="logo" className="flex justify-center"/>
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16">
                
                <div className="flex flex-col items-center max-w-[180px] text-center gap-4 md:gap-7">
                    <Image src={certificate} alt="certificate" />
                  <p className="text-sm"> Сертифицированный производитель Rehau </p>
                </div>
                
                <div className="flex flex-col items-center max-w-[180px] text-center gap-4 md:gap-7">
                    <Image src={windowFactory} alt="windowFactory" />
                  <p className="text-sm"> Инновационный оконный завод </p>
                </div>
                
                <div className="flex flex-col items-center max-w-[180px] text-center gap-4 md:gap-7">
                    <Image src={Cup} alt="Cup" />
                  <p className="text-sm"> Лидер по переработке профилей Rehau в России </p>
                </div>
                
                <div className="flex flex-col items-center max-w-[180px] text-center gap-4 md:gap-7">
                    <Image src={liftingCrane} alt="liftingCrane" />
                  <p className="text-sm"> Высокотехнологичное автоматизированное оборудование </p>
                </div>
                
                <div className="flex flex-col items-center max-w-[180px] text-center gap-4 md:gap-7">
                    <Image src={windows} alt="windows" />
                  <p className="text-sm"> Широкий ассортимент продукции </p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  )
}