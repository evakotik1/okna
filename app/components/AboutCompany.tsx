// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import MeasurementModalForm from "./forms/measurementModalForm"
// import ReviewModalForm from "./forms/reviewModalForm"

// const aboutTabs = [
//   { id: "description", label: "Описание" },
//   { id: "how-we-work", label: "Как мы работаем" },
//   { id: "reviews", label: "Отзывы" },
//   { id: "certificates", label: "Сертификаты" },
// ]

// type AboutTabId = typeof aboutTabs[number]["id"]

// const reviewsData = [
//   {
//     id: 1,
//     text: "Огромное СПАСИБО всей команде Дизайн-Окно! В июне 2021 заказывала переостекление + отделка балкона первый раз и так все удачно - быстро, качественно. Все прошло отлично, в соответствии с условиями договора. Замерщик приехал как оговорено без опозданий, произвел замер лазерным уровнем, все подробно рассказал по профилю и комплектующим. Предоплата составила 20%, остаток - по факту. Соотношение цена/качество в сравнении с конкурентами. Доставка точно в срок, за 3 дня все установили. Итог - красивые окна. Будем зимой проверять на прочность :) \n\nБольшая благодарность за отлично проведённую работу! Замерщик по вызову пришёл быстро, всё хорошо объяснил , окна пришли в соответствии со согласованной датой, поднятие в квартиру прошла очень хорошо ,  монтажники справились со своей работой на отлично!  Все прошло в позитиве, соотношение цены и качества хорошее. Отличная команда! Спасибо!!!",
//     author: "Раиса Михайлова",
//     contract: "24.06.2021     Договор №123456"
//   },
//   {
//     id: 2,
//     text: "Огромное спасибо всей команде Дизайн-Окно! В июне 2021 заказывала переостекление + отделка балкона первый раз и так все удачно - быстро, качественно. Все прошло отлично, в соответствии с условиями договора. Замерщик приехал как оговорено без опозданий, произвел замер лазерным уровнем, все подробно рассказал по профилю и комплектующим. Предоплата составила 20%, остаток - по факту. Соотношение цена/качество в сравнении с конкурентами. Доставка точно в срок, за 3 дня все установили. Итог - красивые окна. Будем зимой проверять на прочность :) \n\nБольшая благодарность за отлично проведённую работу! Замерщик по вызову пришёл быстро, всё хорошо объяснил , окна пришли в соответствии со согласованной датой, поднятие в квартиру прошла очень хорошо ,  монтажники справились со своей работой на отлично!  Все прошло в позитиве, соотношение цены и качества хорошее. Отличная команда! Спасибо!!!",
//     author: "Раиса Михайловааа",
//     contract: "24.06.2021     Договор №11123456"
//   },
//   {
//     id: 3,
//     text: "Огромное СПАСИБО!! всей команде Дизайн-Окно! В июне 2021 заказывала переостекление + отделка балкона первый раз и так все удачно - быстро, качественно. Все прошло отлично, в соответствии с условиями договора. Замерщик приехал как оговорено без опозданий, произвел замер лазерным уровнем, все подробно рассказал по профилю и комплектующим. Предоплата составила 20%, остаток - по факту. Соотношение цена/качество в сравнении с конкурентами. Доставка точно в срок, за 3 дня все установили. Итог - красивые окна. Будем зимой проверять на прочность :) \n\nБольшая благодарность за отлично проведённую работу! Замерщик по вызову пришёл быстро, всё хорошо объяснил , окна пришли в соответствии со согласованной датой, поднятие в квартиру прошла очень хорошо ,  монтажники справились со своей работой на отлично!  Все прошло в позитиве, соотношение цены и качества хорошее. Отличная команда! Спасибо!!!",
//     author: "Раиса Михайловааааа",
//     contract: "24.06.2021     Договор №1123456"
//   }
// ]

// const certificatesData = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }))

// export default function Products() {
//   const [activeAboutTab, setActiveAboutTab] = useState<AboutTabId>("description")
//   const [reviewIndex, setReviewIndex] = useState(0)
//   const [certificateStartIndex, setCertificateStartIndex] = useState(0)
//   const certificatesPerView = 5

//   const handleAboutTabClick = (tabId: AboutTabId) => {
//     setActiveAboutTab(tabId)
//   }

//   const handlePrevReview = () => {
//     setReviewIndex(prev => prev > 0 ? prev - 1 : reviewsData.length - 1)
//   }

//   const handleNextReview = () => {
//     setReviewIndex(prev => prev < reviewsData.length - 1 ? prev + 1 : 0)
//   }

//   const handlePrevCertificates = () => {
//     setCertificateStartIndex(prev => 
//       prev > 0 ? prev - certificatesPerView : certificatesData.length - certificatesPerView
//     )
//   }

//   const handleNextCertificates = () => {
//     setCertificateStartIndex(prev => 
//       prev < certificatesData.length - certificatesPerView ? prev + certificatesPerView : 0
//     )
//   }

//   const handleLeaveReview = () => {
//     console.log("Оставить отзыв")
//   }

//   const visibleCertificates = certificatesData.slice(
//     certificateStartIndex, 
//     certificateStartIndex + certificatesPerView
//   )

//   const canScrollCertificatesPrev = certificateStartIndex > 0
//   const canScrollCertificatesNext = certificateStartIndex < certificatesData.length - certificatesPerView

//   return (
//     <section className="pt-24" id="about">
//       <div className="container mx-auto max-w-[1200px] px-4 md:px-0">
//         <div className="flex flex-col gap-10">

//         <h2 className="text-2xl font-bold text-center">О компании</h2>
        
//         <div className="flex justify-center gap-1 md:gap-4 mb-10 ">
//           {aboutTabs.map((tab) => (
//             <button key={tab.id} onClick={() => handleAboutTabClick(tab.id)}
//               className={` mx-0 px-2 md:px-6 md:py-2 text-[13px] md:text-[16px]  ${
//                 activeAboutTab === tab.id
//                   ? "bg-orange-500 font-semibold text-white rounded-sm"
//                   : "text-gray-700 hover:text-orange-500"
//               }`} >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         </div>
        
//         <div className="bg-white border rounded-xl shadow-xl min-h-[300px] md:min-h-[461px] max-h-[500px] md:max-h-[461px] w-full overflow-hidden">
          
//           {activeAboutTab === "description" && (
//             <div className="flex flex-col md:flex-row">
//               <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col">
//                 <div className="relative w-[100px] h-[70px] md:w-[200px] md:h-[140px]">
//                   <Image src="/LogoBig.svg" alt="logo" fill className="object-contain" />
//                 </div>
//                 <div className="mt-6 md:mt-auto ml-auto md:max-w-[305px]">
//                   <p className="text-black text-base">Мы помогаем клиентам подбирать решения, учитывая пожелания к характеристикам окна и его стоимости. Окно - это объект, которым Вы будете пользоваться много лет, поэтому для нас очень важно, чтобы Вы сделали правильный выбор. </p>
//                 </div>
//               </div>
//               <div className="w-full md:w-1/2 relative h-[200px] md:h-[461px]">
//                 <Image src="/Description.svg" alt="Description" fill className="object-cover" />
//               </div>
//             </div>
//           )}
          
//           {activeAboutTab === "how-we-work" && (
//             <div className="p-8 md:p-16 flex flex-col gap-6 md:gap-16">
//               <h3 className="text-xl md:text-2xl font-bold text-center">Как мы работаем</h3>
              
//               <div className="grid grid-cols-2 md:flex md:flex-row md:justify-between gap-6 md:gap-8">
//                 <div className="flex flex-col items-center text-center gap-4 md:gap-8">
//                   <img src="/howWeWorkCar.svg" alt="howWeWorkCar" className="w-10 h-10 md:w-auto md:h-auto" />
//                   <div className="flex flex-col items-center text-center">
//                     <h4 className="font-bold text-xs md:text-base">БЕСПЛАТНО ПРИЕДЕМ</h4>
//                     <p className="text-black leading-3 md:leading-6 text-xs md:text-sm max-w-[250px]">
//                       Выезжаем бесплатно во все города Московской области
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex flex-col items-center text-center gap-4 md:gap-8">
//                   <img src="/howWeWorkClock.svg" alt="howWeWorkClock" className="w-10 h-10 md:w-auto md:h-auto" />
//                   <div className="flex flex-col items-center text-center">
//                     <h4 className="font-bold text-xs md:text-base">ВЫЕЗЖАЕМ ЕЖЕДНЕВНО</h4>
//                     <p className="text-black leading-3 md:leading-6 text-xs md:text-sm max-w-[250px]">
//                       С 9 до 21 без выходных и праздников
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex flex-col items-center text-center gap-4 md:gap-8">
//                   <img src="/howWeWorkSample.svg" alt="howWeWorkSample" className="w-10 h-10 md:w-auto md:h-auto" />
//                   <div className="flex flex-col items-center text-center">
//                     <h4 className="font-bold text-xs md:text-base">ОБРАЗЦЫ С СОБОЙ</h4>
//                     <p className="text-black leading-3 md:leading-6 text-xs md:text-sm max-w-[250px]">
//                       Покажем образцы профильных систем и материалов отделки
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex flex-col items-center text-center gap-4 md:gap-8">
//                   <img src="/howWeWorkWindow.svg" alt="howWeWorkWindow" className="w-10 h-10 md:w-auto md:h-auto" />
//                   <div className="flex flex-col items-center text-center">
//                     <h4 className="font-bold text-xs md:text-base">СТОИМОСТЬ</h4>
//                     <p className="text-black leading-3 md:leading-6 text-xs md:text-sm max-w-[250px]">
//                       Называем точную стоимость заказа на месте
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {activeAboutTab === "reviews" && (
//             <div className="p-6 md:p-8 relative flex flex-col gap-5 md:gap-10">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-2 md:px-24 pt-4 md:pt-8">
//                 <div className="flex flex-col md:flex-row gap-2 md:gap-16 items-start md:items-center">
//                   <h3 className="text-[18px] font-bold">{reviewsData[reviewIndex].author}</h3>
//                   <p className="text-[#8F8F8F] text-[14px]">{reviewsData[reviewIndex].contract}</p>
//                 </div>
//                 <ReviewModalForm />
//               </div>
              
//               <div className="relative flex">
//                 <div className="max-w-full md:max-w-[790px] mx-2 md:mx-auto">
//                   <p className="text-[#434343] leading-5 text-justify text-sm md:text-base overflow-y-auto max-h-[200px] md:max-h-full"> {reviewsData[reviewIndex].text} </p>
//                 </div>
                
//                 <button onClick={handlePrevReview} disabled={reviewIndex === 0} className="absolute -left-3 md:left-10 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center" >
//                   <img src="/ChevronLeft.svg" alt="ChevronLeft" className={`h-8 w-4 md:h-12 md:w-6 ${reviewIndex > 0 ? "text-black" : "text-[#8F8F8F]"}`} />
//                 </button>
                
//                 <button onClick={handleNextReview} disabled={reviewIndex === reviewsData.length - 1} className="absolute -right-3 md:right-10 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center" >
//                   <img src="/ChevronRight.svg" alt="ChevronRight" className={`h-8 w-4 md:h-12 md:w-6 ${reviewIndex < reviewsData.length - 1 ? "text-black" : "text-[#8F8F8F]"}`} />
//                 </button>
//               </div>
//             </div>
//           )}

//           {activeAboutTab === "certificates" && (
//             <div className="p-7 md:p-16 relative h-full">
//               <div className="relative h-[250px] md:h-[300px] flex items-center justify-center">

//                 <div className="hidden md:flex justify-center items-center gap-8 w-full">
//                   {certificatesData.slice(certificateStartIndex, certificateStartIndex + 5).map((cert) => (
//                     <div key={cert.id} className="w-[191px] flex items-center justify-center">
//                       <div className="relative w-full h-[270px]">
//                         <Image 
//                           src={`/certificate${cert.id}.svg`} 
//                           alt={`Сертификат ${cert.id}`} 
//                           fill 
//                           className="object-contain" 
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
                

//                 <div className="md:hidden flex justify-center items-center w-full">
//                   <div className="w-[350px]">
//                     <div className="relative w-full h-[250px]">
//                       <Image 
//                         src={`/certificate${certificatesData[certificateStartIndex]?.id}.svg`} 
//                         alt={`Сертификат ${certificatesData[certificateStartIndex]?.id}`} 
//                         fill 
//                         className="object-contain" 
//                       />
//                     </div>
//                   </div>
//                 </div>
                

//                 <button 
//                   onClick={handlePrevCertificates} 
//                   disabled={!canScrollCertificatesPrev} 
//                   className="absolute md:-left-7 -left-4 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
//                 >
//                   <img 
//                     src="/ChevronLeft.svg" 
//                     alt="ChevronLeft" 
//                     className={`h-8 w-4 md:h-12 md:w-6 ${canScrollCertificatesPrev ? "" : "opacity-50"}`}
//                   />
//                 </button>
                
//                 <button 
//                   onClick={handleNextCertificates} 
//                   disabled={!canScrollCertificatesNext} 
//                   className="absolute -right-4 md:-right-7 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 flex items-center justify-center"
//                 >
//                   <img 
//                     src="/ChevronRight.svg" 
//                     alt="ChevronRight" 
//                     className={`h-8 w-4 md:h-12 md:w-6 ${canScrollCertificatesNext ? "" : "opacity-50"}`} 
//                   />
//                 </button>
//               </div>
//             </div>
//           )}
          
//         </div>

//         <div className="mt-16 relative max-w-[1200px]">
//           <div className="flex flex-col gap-6 md:gap-24">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-20">
//               <div className="flex gap-4 md:gap-6 items-start">
//                 <Image src="/professionalism.svg" alt="professionalism" width={60} height={55} className="w-12 h-12 md:w-[87px] md:h-[80px]" />
//                 <div>
//                   <h1 className="font-bold text-sm md:text-base">ПРОФЕССИОНАЛИЗМ</h1>
//                   <p className="text-black text-xs md:text-sm"> Бригада профессиональных мастеров по монтажу и обслуживанию </p>
//                 </div>
//               </div>

//               <div className="flex gap-4 md:gap-6 items-start">
//                 <Image src="/pricing.svg" alt="pricing" width={90} height={75} className="w-12 h-12 md:w-[100px] md:h-[80px]"/>
//                 <div>
//                   <h1 className="font-bold text-sm md:text-base">ЦЕНООБРАЗОВАНИЕ</h1>
//                   <p className="text-black text-xs md:text-sm"> Лучшие цены на рынке пластиковых окон </p>
//                 </div>
//               </div>

//               <div className="flex gap-4 md:gap-6 items-start">
//                 <Image src="/mobility.svg" alt="mobility" width={60} height={65} className="w-12 h-12 md:w-[83px] md:h-[94px]"/>
//                 <div>
//                   <h1 className="font-bold text-sm md:text-base">МОБИЛЬНОСТЬ</h1>
//                   <p className="text-black text-xs md:text-sm"> Заключение договора на дому </p>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20">
//               <div className="flex gap-4 md:gap-6 items-start">
//                 <Image src="/loyalty.svg" alt="loyalty" width={60} height={55} className="w-12 h-12 md:w-[87px] md:h-[80px]"/>
//                 <div>
//                   <h1 className="font-bold text-sm md:text-base">ЛОЯЛЬНОСТЬ</h1>
//                   <p className="text-black text-xs md:text-sm"> 99% клиентов рекомендуют нас своим друзьям </p>
//                 </div>
//               </div>

//               <div className="flex gap-4 md:gap-6 items-start">
//                 <Image src="/speed.svg" alt="speed" width={80} height={55} className="w-12 h-12 md:w-[113px] md:h-[80px]"/>
//                 <div>
//                   <h1 className="font-bold text-sm md:text-base">СКОРОСТЬ</h1>
//                   <p className="text-black text-xs md:text-sm"> Короткие сроки установки изделий </p>
//                 </div>
//               </div>

//               <div className="flex gap-4 md:gap-6 items-start">
//                 <Image src="/qualityService.svg" alt="qualityService" width={60} height={65} className="w-12 h-12 md:w-[83px] md:h-[94px]"/>
//                 <div>
//                   <h1 className="font-bold text-sm md:text-base">СЛУЖБА КАЧЕСТВА</h1>
//                   <p className="text-black text-xs md:text-sm"> Безупречное качество и контроль изделий ПВХ </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="text-center items-center flex justify-center py-8">
//         <div className="flex justify-center items-center py-8">
//               <MeasurementModalForm 
//                 className="max-w-[300px]"
//                 buttonText="Оформить заявку на замер"
//                 textClassName="text-sm"
//             />
//         </div>
//         </div>
//       </div>
//     </section>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import MeasurementModalForm from "./forms/measurementModalForm"
import ReviewModalForm from "./forms/reviewModalForm"

const aboutTabs = [
  { id: "description", label: "Описание" },
  { id: "how-we-work", label: "Как мы работаем" },
  { id: "reviews", label: "Отзывы" },
  { id: "certificates", label: "Сертификаты" },
]

type AboutTabId = typeof aboutTabs[number]["id"]

const reviewsData = [
  {
    id: 1,
    text: "Огромное СПАСИБО всей команде Дизайн-Окно! В июне 2021 заказывала переостекление + отделка балкона первый раз и так все удачно - быстро, качественно. Все прошло отлично, в соответствии с условиями договора. Замерщик приехал как оговорено без опозданий, произвел замер лазерным уровнем, все подробно рассказал по профилю и комплектующим. Предоплата составила 20%, остаток - по факту. Соотношение цена/качество в сравнении с конкурентами. Доставка точно в срок, за 3 дня все установили. Итог - красивые окна. Будем зимой проверять на прочность :) \n\nБольшая благодарность за отлично проведённую работу! Замерщик по вызову пришёл быстро, всё хорошо объяснил , окна пришли в соответствии со согласованной датой, поднятие в квартиру прошла очень хорошо ,  монтажники справились со своей работой на отлично!  Все прошло в позитиве, соотношение цены и качества хорошее. Отличная команда! Спасибо!!!",
    author: "Раиса Михайлова",
    contract: "24.06.2021     Договор №123456"
  },
  {
    id: 2,
    text: "Огромное спасибо всей команде Дизайн-Окно! В июне 2021 заказывала переостекление + отделка балкона первый раз и так все удачно - быстро, качественно. Все прошло отлично, в соответствии с условиями договора. Замерщик приехал как оговорено без опозданий, произвел замер лазерным уровнем, все подробно рассказал по профилю и комплектующим. Предоплата составила 20%, остаток - по факту. Соотношение цена/качество в сравнении с конкурентами. Доставка точно в срок, за 3 дня все установили. Итог - красивые окна. Будем зимой проверять на прочность :) \n\nБольшая благодарность за отлично проведённую работу! Замерщик по вызову пришёл быстро, всё хорошо объяснил , окна пришли в соответствии со согласованной датой, поднятие в квартиру прошла очень хорошо ,  монтажники справились со своей работой на отлично!  Все прошло в позитиве, соотношение цены и качества хорошее. Отличная команда! Спасибо!!!",
    author: "Раиса Михайловааа",
    contract: "24.06.2021     Договор №11123456"
  },
  {
    id: 3,
    text: "Огромное СПАСИБО!! всей команде Дизайн-Окно! В июне 2021 заказывала переостекление + отделка балкона первый раз и так все удачно - быстро, качественно. Все прошло отлично, в соответствии с условиями договора. Замерщик приехал как оговорено без опозданий, произвел замер лазерным уровнем, все подробно рассказал по профилю и комплектующим. Предоплата составила 20%, остаток - по факту. Соотношение цена/качество в сравнении с конкурентами. Доставка точно в срок, за 3 дня все установили. Итог - красивые окна. Будем зимой проверять на прочность :) \n\nБольшая благодарность за отлично проведённую работу! Замерщик по вызову пришёл быстро, всё хорошо объяснил , окна пришли в соответствии со согласованной датой, поднятие в квартиру прошла очень хорошо ,  монтажники справились со своей работой на отлично!  Все прошло в позитиве, соотношение цены и качества хорошее. Отличная команда! Спасибо!!!",
    author: "Раиса Михайловааааа",
    contract: "24.06.2021     Договор №1123456"
  }
]

const certificatesData = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }))

export default function Products() {
  const [activeAboutTab, setActiveAboutTab] = useState<AboutTabId>("description")
  const [reviewIndex, setReviewIndex] = useState(0)
  const [certificateStartIndex, setCertificateStartIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const certificatesPerView = isMobile ? 1 : 5

  const handleAboutTabClick = (tabId: AboutTabId) => {
    setActiveAboutTab(tabId)
  }

  const handlePrevReview = () => {
    setReviewIndex(prev => prev > 0 ? prev - 1 : reviewsData.length - 1)
  }

  const handleNextReview = () => {
    setReviewIndex(prev => prev < reviewsData.length - 1 ? prev + 1 : 0)
  }

  const handlePrevCertificates = () => {
    setCertificateStartIndex(prev => 
      prev > 0 ? prev - certificatesPerView : certificatesData.length - certificatesPerView
    )
  }

  const handleNextCertificates = () => {
    setCertificateStartIndex(prev => 
      prev < certificatesData.length - certificatesPerView ? prev + certificatesPerView : 0
    )
  }

  const visibleCertificates = certificatesData.slice(
    certificateStartIndex, 
    certificateStartIndex + certificatesPerView
  )

  const canScrollCertificatesPrev = certificateStartIndex > 0
  const canScrollCertificatesNext = certificateStartIndex < certificatesData.length - certificatesPerView

  return (
    <section className="pt-24" id="about">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-0">
        <div className="flex flex-col gap-10">

        <h2 className="text-2xl font-bold text-center">О компании</h2>
        
        <div className="flex justify-center gap-1 md:gap-4 mb-10 ">
          {aboutTabs.map((tab) => (
            <button key={tab.id} onClick={() => handleAboutTabClick(tab.id)}
              className={` mx-0 px-2 md:px-6 md:py-2 text-[13px] md:text-[16px]  ${
                activeAboutTab === tab.id
                  ? "bg-orange-500 font-semibold text-white rounded-sm"
                  : "text-gray-700 hover:text-orange-500"
              }`} >
              {tab.label}
            </button>
          ))}
        </div>

        </div>
        
        <div className="bg-white border rounded-xl shadow-xl min-h-[300px] md:min-h-[461px] max-h-[500px] md:max-h-[461px] w-full overflow-hidden">
          
          {activeAboutTab === "description" && (
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col">
                <div className="relative w-[100px] h-[70px] md:w-[200px] md:h-[140px]">
                  <Image src="/LogoBig.svg" alt="logo" fill className="object-contain" />
                </div>
                <div className="mt-6 md:mt-auto ml-auto md:max-w-[305px]">
                  <p className="text-black text-base">Мы помогаем клиентам подбирать решения, учитывая пожелания к характеристикам окна и его стоимости. Окно - это объект, которым Вы будете пользоваться много лет, поэтому для нас очень важно, чтобы Вы сделали правильный выбор. </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative h-[200px] md:h-[461px]">
                <Image src="/Description.svg" alt="Description" fill className="object-cover" />
              </div>
            </div>
          )}
          
          {activeAboutTab === "how-we-work" && (
            <div className="p-8 md:p-16 flex flex-col gap-6 md:gap-16">
              <h3 className="text-xl md:text-2xl font-bold text-center">Как мы работаем</h3>
              
              <div className="grid grid-cols-2 md:flex md:flex-row md:justify-between gap-6 md:gap-8">
                <div className="flex flex-col items-center text-center gap-4 md:gap-8">
                  <img src="/howWeWorkCar.svg" alt="howWeWorkCar" className="w-10 h-10 md:w-auto md:h-auto" />
                  <div className="flex flex-col items-center text-center">
                    <h4 className="font-bold text-xs md:text-base">БЕСПЛАТНО ПРИЕДЕМ</h4>
                    <p className="text-black leading-3 md:leading-6 text-xs md:text-sm max-w-[250px]">
                      Выезжаем бесплатно во все города Московской области
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center text-center gap-4 md:gap-8">
                  <img src="/howWeWorkClock.svg" alt="howWeWorkClock" className="w-10 h-10 md:w-auto md:h-auto" />
                  <div className="flex flex-col items-center text-center">
                    <h4 className="font-bold text-xs md:text-base">ВЫЕЗЖАЕМ ЕЖЕДНЕВНО</h4>
                    <p className="text-black leading-3 md:leading-6 text-xs md:text-sm max-w-[250px]">
                      С 9 до 21 без выходных и праздников
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center text-center gap-4 md:gap-8">
                  <img src="/howWeWorkSample.svg" alt="howWeWorkSample" className="w-10 h-10 md:w-auto md:h-auto" />
                  <div className="flex flex-col items-center text-center">
                    <h4 className="font-bold text-xs md:text-base">ОБРАЗЦЫ С СОБОЙ</h4>
                    <p className="text-black leading-3 md:leading-6 text-xs md:text-sm max-w-[250px]">
                      Покажем образцы профильных систем и материалов отделки
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center text-center gap-4 md:gap-8">
                  <img src="/howWeWorkWindow.svg" alt="howWeWorkWindow" className="w-10 h-10 md:w-auto md:h-auto" />
                  <div className="flex flex-col items-center text-center">
                    <h4 className="font-bold text-xs md:text-base">СТОИМОСТЬ</h4>
                    <p className="text-black leading-3 md:leading-6 text-xs md:text-sm max-w-[250px]">
                      Называем точную стоимость заказа на месте
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeAboutTab === "reviews" && (
            <div className="p-6 md:p-8 relative flex flex-col gap-5 md:gap-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-2 md:px-24 pt-4 md:pt-8">
                <div className="flex flex-col md:flex-row gap-2 md:gap-16 items-start md:items-center">
                  <h3 className="text-[18px] font-bold">{reviewsData[reviewIndex].author}</h3>
                  <p className="text-[#8F8F8F] text-[14px]">{reviewsData[reviewIndex].contract}</p>
                </div>
                <ReviewModalForm />
              </div>
              
              <div className="relative flex">
                <div className="max-w-full md:max-w-[790px] mx-2 md:mx-auto">
                  <p className="text-[#434343] leading-5 text-justify text-sm md:text-base overflow-y-auto max-h-[200px] md:max-h-full"> {reviewsData[reviewIndex].text} </p>
                </div>
                
                <button onClick={handlePrevReview} disabled={reviewIndex === 0} className="absolute -left-3 md:left-10 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center" >
                  <img src="/ChevronLeft.svg" alt="ChevronLeft" className={`h-8 w-4 md:h-12 md:w-6 ${reviewIndex > 0 ? "text-black" : "text-[#8F8F8F]"}`} />
                </button>
                
                <button onClick={handleNextReview} disabled={reviewIndex === reviewsData.length - 1} className="absolute -right-3 md:right-10 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center" >
                  <img src="/ChevronRight.svg" alt="ChevronRight" className={`h-8 w-4 md:h-12 md:w-6 ${reviewIndex < reviewsData.length - 1 ? "text-black" : "text-[#8F8F8F]"}`} />
                </button>
              </div>
            </div>
          )}

          {activeAboutTab === "certificates" && (
            <div className="p-7 md:p-16 relative h-full">
              <div className="relative h-[250px] md:h-[300px] flex items-center justify-center">
                <div className="flex justify-center items-center gap-2 md:gap-8 w-full">
                  {visibleCertificates.map((cert) => (
                    <div key={cert.id} className="w-[200px] md:w-[191px] flex items-center justify-center">
                      <div className="relative w-full h-[200px] md:h-[270px]">
                        <Image 
                          src={`/certificate${cert.id}.svg`} 
                          alt={`Сертификат ${cert.id}`} 
                          fill 
                          className="object-contain" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={handlePrevCertificates} 
                  disabled={!canScrollCertificatesPrev} 
                  className="absolute md:-left-7 -left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
                >
                  <img 
                    src="/ChevronLeft.svg" 
                    alt="ChevronLeft" 
                    className={`h-8 w-4 md:h-12 md:w-6 ${canScrollCertificatesPrev ? "" : "opacity-50"}`}
                  />
                </button>
                
                <button 
                  onClick={handleNextCertificates} 
                  disabled={!canScrollCertificatesNext} 
                  className="absolute -right-0 md:-right-7 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 flex items-center justify-center"
                >
                  <img 
                    src="/ChevronRight.svg" 
                    alt="ChevronRight" 
                    className={`h-8 w-4 md:h-12 md:w-6 ${canScrollCertificatesNext ? "" : "opacity-50"}`} 
                  />
                </button>
              </div>
            </div>
          )}
          
        </div>

        <div className="mt-16 relative max-w-[1200px]">
          <div className="flex flex-col gap-6 md:gap-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-20">
              <div className="flex gap-4 md:gap-6 items-start">
                <Image src="/professionalism.svg" alt="professionalism" width={60} height={55} className="w-12 h-12 md:w-[87px] md:h-[80px]" />
                <div>
                  <h1 className="font-bold text-sm md:text-base">ПРОФЕССИОНАЛИЗМ</h1>
                  <p className="text-black text-xs md:text-sm"> Бригада профессиональных мастеров по монтажу и обслуживанию </p>
                </div>
              </div>

              <div className="flex gap-4 md:gap-6 items-start">
                <Image src="/pricing.svg" alt="pricing" width={90} height={75} className="w-12 h-12 md:w-[100px] md:h-[80px]"/>
                <div>
                  <h1 className="font-bold text-sm md:text-base">ЦЕНООБРАЗОВАНИЕ</h1>
                  <p className="text-black text-xs md:text-sm"> Лучшие цены на рынке пластиковых окон </p>
                </div>
              </div>

              <div className="flex gap-4 md:gap-6 items-start">
                <Image src="/mobility.svg" alt="mobility" width={60} height={65} className="w-12 h-12 md:w-[83px] md:h-[94px]"/>
                <div>
                  <h1 className="font-bold text-sm md:text-base">МОБИЛЬНОСТЬ</h1>
                  <p className="text-black text-xs md:text-sm"> Заключение договора на дому </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20">
              <div className="flex gap-4 md:gap-6 items-start">
                <Image src="/loyalty.svg" alt="loyalty" width={60} height={55} className="w-12 h-12 md:w-[87px] md:h-[80px]"/>
                <div>
                  <h1 className="font-bold text-sm md:text-base">ЛОЯЛЬНОСТЬ</h1>
                  <p className="text-black text-xs md:text-sm"> 99% клиентов рекомендуют нас своим друзьям </p>
                </div>
              </div>

              <div className="flex gap-4 md:gap-6 items-start">
                <Image src="/speed.svg" alt="speed" width={80} height={55} className="w-12 h-12 md:w-[113px] md:h-[80px]"/>
                <div>
                  <h1 className="font-bold text-sm md:text-base">СКОРОСТЬ</h1>
                  <p className="text-black text-xs md:text-sm"> Короткие сроки установки изделий </p>
                </div>
              </div>

              <div className="flex gap-4 md:gap-6 items-start">
                <Image src="/qualityService.svg" alt="qualityService" width={60} height={65} className="w-12 h-12 md:w-[83px] md:h-[94px]"/>
                <div>
                  <h1 className="font-bold text-sm md:text-base">СЛУЖБА КАЧЕСТВА</h1>
                  <p className="text-black text-xs md:text-sm"> Безупречное качество и контроль изделий ПВХ </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center items-center flex justify-center py-8">
          <div className="flex justify-center items-center py-8">
            <MeasurementModalForm 
              className="max-w-[300px]"
              buttonText="Оформить заявку на замер"
              textClassName="text-sm"
            />
          </div>
        </div>
      </div>
    </section>
  )
}