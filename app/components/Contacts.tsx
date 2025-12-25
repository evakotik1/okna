"use client"

import Image from "next/image"
import QuestionsForm from "./forms/questionsForm"

export default function Contacts() {
  return (
    <section className="md:pt-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2 className="text-2xl font-bold text-center mb-8 md:mb-12">Контакты</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
          
          <div className="flex flex-col gap-8 md:gap-14">

            <div>
              <div className="flex flex-col gap-6 md:gap-8">
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-lg md:text-xl">Бесплатная консультация</h3>
                  <div className="flex flex-col md:flex-row md:gap-8 gap-4">
                    <div className="flex items-center gap-3 md:gap-4">
                      <Image src="/phone.svg" alt="phone" width={25} height={25} className="hidden md:block " />
                      <p className="text-lg md:text-[22px] font-bold text-black">8 (4932) 34 - 31 - 40</p>
                    </div>
                      <p className="text-lg md:text-[22px] font-bold text-black">8 (905) 109 - 31 - 40</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-4 md:gap-8">
                    <Image src="/map.svg" alt="map" width={20} height={20} />
                    <p className="text-sm md:text-base text-black">г. Иваново, ул. Генерала Хлебникова, д.54, оф.303</p>
                  </div>
                  <div className="flex items-center gap-4 md:gap-8">
                    <Image src="/mail.svg" alt="mail" width={20} height={25} />
                    <p className="text-sm md:text-base text-black">okna@haus.ru</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-9">
              <div className="flex flex-col gap-4">
                <p className="text-sm md:text-base"> Установку должны выполнять только эксперты. Нам доверяют сотни семей. Узнайте подробнее, какие решения вам подходят. Вы можете приобрести недорогие товары при гарантированно высоком качестве. </p>
                <div className="flex gap-4">
                  <a href="#" aria-label="ВКонтакте"><Image src="/VK.svg" alt="VK" width={20} height={20}  /></a>
                  <a href="#" aria-label="Instagram"><Image src="/Inst.svg" alt="Instagram" width={20} height={20}  /></a>
                  <a href="#" aria-label="Telegram"><Image src="/Tg.svg" alt="Telegram" width={20} height={20}  /></a>
                  <a href="#" aria-label="YouTube"><Image src="/YT.svg" alt="YouTube" width={20} height={20}  /></a>
                </div>
              </div>
              
              <div className="hidden md:flex relative flex-shrink-0 justify-center md:justify-start">
                <Image src="/builders.svg" alt="builders" width={327} height={365} className="relative md:left-3.5 z-10" />
              </div>
            </div>

          </div>
          
          <div className="bg-gray-100 border border-gray-300 flex items-center justify-center min-h- max-w-[500px] [300px] md:min-h-[400px] rounded-lg mb-8 md:mb-0">
            <QuestionsForm/>
          </div>
        </div>
      </div>
    </section>
  )
}