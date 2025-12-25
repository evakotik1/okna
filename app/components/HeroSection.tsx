"use client"

import Image from "next/image"
import MeasurementForm from "./forms/measurementForm"

export default function HeroSection() {
  return (
    <section className="relative w-full">

      <div className="absolute inset-0 flex">
        <div className="relative w-4/6">
          <Image src="/banner1.svg" alt="banner left" fill className="object-cover" />
        </div>
        <div className="relative w-2/6">
          <Image src="/banner2.svg" alt="banner right" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-[#242355]/70"></div>
      </div>


      <div className="relative max-w-[1200px] mx-auto px-8 min-h-[562px] flex items-center">
        <div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div >
              <div className="flex flex-col gap-8">

                <div className="flex flex-col gap-2 md:mt-0 mt-10">
                  <h1 className="font-bold text-orange-500 text-2xl">Окна Хаус -</h1>
                  <h1 className="font-thin text-3xl md:text-4xl max-w-[450px] text-white"> Профессиональный подход к остеклению </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                  <div className="flex flex-col md:items-start items-center gap-5 md:w-[165px]">
                    <Image src="/bannerWindow.svg" alt="bannerWindow" width={93} height={80} className="-ml-4" />
                    <p className="text-sm text-white md:w-auto w-[250px] md:text-left text-center"> Современные окна и балконные конструкции по доступным ценам</p>
                  </div>

                  <div className="flex flex-col md:items-start items-center gap-5 md:w-[165px]">
                    <Image src="/bannerHands.svg" alt="bannerHands" width={70} height={79} />
                    <p className="text-sm text-white md:w-auto w-[250px] md:text-left text-center"> Квалифицированный подход к решению задач любой сложности</p>
                  </div>

                  <div className="flex flex-col md:items-start items-center gap-5 md:w-[165px]">
                    <Image src="/bannerGuarantee.svg" alt="bannerGuarantee" width={73} height={83} />
                    <p className="text-sm text-white md:w-auto w-[250px] md:text-left text-center"> Гарантия высочайшего качества нашей продукции</p>
                  </div>
                </div>

              </div>
            </div>


            <div className="flex justify-center md:justify-end px-4 md:px-0">

              <div className="relative w-full max-w-[428px] md:mb-0 mb-16">
                
                <div className="bg-white w-full h-[450px] md:h-[456px] flex items-center justify-center rounded-xl">
                  {/* <div className="text-center p-4 md:p-8">
                    <p className="text-sm md:text-base">Форма</p>
                  </div> */}
                  <MeasurementForm />
                </div>
                
                <div className="absolute top-[35px] md:top-[340px] left-1/2 transform -translate-x-1/2 ml-2 z-10">
                  <div className="w-[370px] h-[160px] md:w-[470px] md:h-[200px]">
                    <Image src="/rulerNEW.svg" alt="bannerRuler" fill className="w-full h-full object-contain" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}