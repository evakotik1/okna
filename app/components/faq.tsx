"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqItems = [
    {
      id: 1,
      question: "Сколько по времени занимает изготовление пластиковых окон?",
      answer: "Нет, команда мастеров все сами аккуратно доставят и внесут."
    },
    {
      id: 2,
      question: "Какие существуют способы оплаты?",
      answer: "Нет, команда мастеров все сами аккуратно доставят и внесут."
    },
    {
      id: 3,
      question: "Где я могу посмотреть образцы?",
      answer: "Нет, команда мастеров все сами аккуратно доставят и внесут."
    },
    {
      id: 4,
      question: "Зачем вызывать замерщика? Я могу дать размеры",
      answer: "Нет, команда мастеров все сами аккуратно доставят и внесут."
    },
    {
      id: 5,
      question: "Хотелось бы отделать балкон. Поможете?",
      answer: "Нет, команда мастеров все сами аккуратно доставят и внесут."
    },
    {
      id: 6,
      question: "Мне надо нанимать грузчиков для подъема?",
      answer: "Нет, команда мастеров все сами аккуратно доставят и внесут."
    }
  ]

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-24 py-8 md:py-14 bg-orange-500">
        
        <div className="flex flex-col gap-8 md:gap-10">
          <h2 className="text-2xl font-bold text-center text-white">Вопрос-ответ</h2>
          
          <div className="flex flex-col gap-4 ">
            {faqItems.map((item, index) => (
              <div key={item.id}
                className={`border-2 cursor-pointer group ${
                  openIndex === index 
                    ? "bg-white shadow-lg"
                    : "bg-[#EEEEF3] hover:bg-white"
                }`}
                onClick={() => toggleItem(index)}
              >

                <div className="flex items-center justify-between p-4 md:p-6">
                  <h3 className={`text-base md:text-lg font-medium transition-colors ${
                    openIndex === index 
                      ? "text-black" 
                      : "md:group-hover:text-orange-500"
                  }`}>
                    {item.question}
                  </h3>
                  
                  <div className={` ${
                    openIndex === index 
                      ? "rotate-0"
                      : "md:group-hover:text-orange-500"
                  }`}>
                    {openIndex === index ? (
                      <ChevronUp size={24} className="w-6 h-6 md:w-7 md:h-7" />
                    ) : (
                      <ChevronDown size={24} className="w-6 h-6 md:w-7 md:h-7" />
                    )}
                  </div>
                </div>
                

                {openIndex === index && (
                  <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2 md:pt-4">
                    <p className="text-sm md:text-base">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}