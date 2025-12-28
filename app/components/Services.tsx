"use client"

import Image from "next/image"
import service1 from "@/public/service1.svg"
import service2 from "@/public/service2.svg"
import service3 from "@/public/service3.svg"
import service4 from "@/public/service4.svg"
import okna from "@/public/okna.svg"
import balkon from "@/public/balkon.svg"
import cottage from "@/public/cottage.svg"
import corporative from "@/public/corporative.svg"
import { X } from "lucide-react"
import { useState } from "react"
import pic1 from "@/public/pic1.svg"
import pic2 from "@/public/pic2.svg"
import pic3 from "@/public/pic3.svg"
import pic4 from "@/public/pic4.svg"
import pic5 from "@/public/pic5.svg"
import pic6 from "@/public/pic6.svg"
import Carousel from "@/app/components/ui/Carousel"
import MeasurementModalForm from "./forms/measurementModalForm"
import CalculationModalForm from "./forms/CalculationModalForm"

const servicesData = [
{
    id: 1,
    image: service1,
    icon: okna,
    title: "Установка пластиковых окон",
    description: "Устанавливаем пластиковые окна Rehau от проверенного производителя с гарантией качества",
    pic1Title: "Пластиковые окна",
    pic1Description: "Использование ламинационных окон, ламинации в массе, 3д-ламинации, а также покраска окон.",
    pic2Title: "Подоконники",
    pic2Description: "Качественный подоконник не царапается, выдерживает большие нагрузки и будет служить вам долгие годы",
    pic3Title: "Проветриватели",
    pic3Description: "Постоянное обновление воздуха в комнате снижает риск аллергии, улучшает сон и благоприятно влияет на самочувствие.",
    pic4Title: "Ламинация",
    pic4Description: "Пластиковые окна могут быть любого нужного вам цвета. Внутри и снаружи.",
    pic5Title: "Цветные ручки",
    pic5Description: "Оригинальные оконные ручки подчеркнут дизайн окна. Подберем оптимальный цвет ручек в зависимости от цвета всей конструкции",
    pic6Title: "Москитные сетки",
    pic6Description: "Нежеланные насекомые останутся на улице, а ваша кошка - в квартире. Устанавливаем сетки для пластиковых окон любых форм и размеров",
    carouselImages: [
        "/service1Carousel.svg",
        "/service1Carousel.svg",
        "/service1Carousel.svg", 
        "/service1Carousel.svg",
        "/service1Carousel.svg",
    ],
    background: "/rightCornerService1.svg"
},
{
    id: 2,
    image: service2,
    icon: balkon,
    title: "Остекление балконов и лоджий",
    description: "Занимаемся остеклением и отделкой балконов и лоджий. Теплое и холодное остекление, изготовление выносов и крыш. Беремся за сложные объекты",
    pic1Title: "Тёплое остекление",
    pic1Description: "Теплое остекление — возможность сделать из балкона или лоджии полноценное жилое помещение.",
    pic2Title: "Панорамное остекление",
    pic2Description: "Остекление от пола до потолка, дающее максимальное естественное освещение и прекрасный обзор окрестностей.",
    pic3Title: "Остекление с крышей",
    pic3Description: "Строительство крыши для домов с высоким потолком и квартир, расположенных на последних этажах.",
    pic4Title: "Холодное остекление",
    pic4Description: "Холодное остекление рекомендовано в случаях, когда балкон или лоджия используются для хранения вещей",
    pic5Title: "Остекление с выносом",
    pic5Description: "Способ увеличения площади и объема балкона или лоджии.",
    pic6Title: "Объединение с комнатой",
    pic6Description: "Перепланировка квартиры, дающая дополнительные метры полезной площади и улучшающая жилищные условия",
    carouselImages: [
        "/service2Carousel.svg",
        "/service2Carousel.svg",
        "/service2Carousel.svg", 
        "/service2Carousel.svg",
        "/service2Carousel.svg",
    ],
    background: "/rightCornerService2.svg"
},
{
    id: 3,
    image: service3,
    icon: cottage,
    title: "Остекление коттеджей и дач",
    description: "Остекление и отделка под ключ: от коттеджей и дач до террас и беседок. Выделяем личного технолога под каждый объект." ,
    pic1Title: "Многоквартирные дома",
    pic1Description: "Изготовление и монтаж окон ПВХ под ключ. Приглашаем к партнерству застройщиков",
    pic2Title: "Социальные объекты",
    pic2Description: "Остекляем детские сады, школы, медицинские учреждения",
    pic3Title: "Спортивные объекты",
    pic3Description: "Остекляем спортивные залы, бассейны, крытые спорткомплексы",
    pic4Title: "Офисные помещения",
    pic4Description: "Установка пластиковых окон, офисных перегородок и дверей и входных групп.",
    pic5Title: "Объекты торговли",
    pic5Description: "Способ увеличения площади и объема балкона или лоджии.",
    pic6Title: "Производственные помещения",
    pic6Description: "Устанавливаем окна для складских и промышленных зданий в соответствии с требованиями бизнеса",
    carouselImages: [
        "/service3Carousel.svg",
        "/service3Carousel.svg",
        "/service3Carousel.svg", 
        "/service3Carousel.svg",
        "/service3Carousel.svg",
    ],
    background: "/rightCornerService3.svg"
},
{
    id: 4,
    image: service4,
    icon: corporative,
    title: "Остекление корпоративных объектов",
    description: "Реализуем сложные проекты по остеклению торговых центров, ресторанов, производственных помещений и офисов",
    pic1Title: "Многоквартирные дома",
    pic1Description: "Изготовление и монтаж окон ПВХ под ключ. Приглашаем к партнерству застройщиков",
    pic2Title: "Социальные объекты",
    pic2Description: "Остекляем детские сады, школы, медицинские учреждения",
    pic3Title: "Спортивные объекты",
    pic3Description: "Остекляем спортивные залы, бассейны, крытые спорткомплексы",
    pic4Title: "Офисные помещения",
    pic4Description: "Установка пластиковых окон, офисных перегородок и дверей и входных групп",
    pic5Title: "Объекты торговли",
    pic5Description: "Способ увеличения площади и объема балкона или лоджии",
    pic6Title: "Производственные помещения",
    pic6Description: "Устанавливаем окна для складских и промышленных зданий в соответствии с требованиями бизнеса",
    carouselImages: [
        "/service4Carousel.svg",
        "/service4Carousel.svg",
        "/service4Carousel.svg", 
        "/service4Carousel.svg",
        "/service4Carousel.svg",
    ],
    background: "/rightCornerService4.svg"
}
]

function ServiceCard({ service }: { service: typeof servicesData[0] }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    
return (
    <div className={`relative w-full max-w-[595px] h-[268px] rounded-sm overflow-hidden ${isHovered ? 'shadow-xl ' : ''}`} >

        <div className="absolute inset-0">
            <Image src={service.image} alt="service" fill className="object-cover" />
        </div>

        <div className="absolute left-0 top-0 w-[45%] h-full bg-white z-10"/>
        <div className="absolute left-[45%] top-0 w-3/5 h-full z-10" style={{ background: 'linear-gradient(to right, white 0%, transparent 100%)' }} />

        <div className="relative z-20 h-full flex items-center pl-12">
            <div className="max-w-[330px] flex gap-8 flex-col">
                <div className="flex items-center gap-5">
                    <Image src={service.icon} alt={service.title}  />
                    <h1 className="text-2xl font-bold leading-tight">{service.title}</h1>
                </div>
                <p className="leading-tight">{service.description}</p>
            </div>
        </div>

        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsModalOpen(true)} 
            className="absolute bottom-5 right-5 z-20 hover:shadow-xl">
            {isHovered ? (
                <Image src="/ctrelochka-orange.svg" alt="ctrelochka" width={40} height={20} />
            ) : (
                <Image src="/ctrelochka.svg" alt="ctrelochka" width={40} height={20} />
            )}
        </button>


        {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                
                <div className="bg-white px-6 py-10 md:pl-28 md:pr-20 md:py-12 rounded-sm max-w-[400px] md:max-w-[1050px] w-full max-h-[700px] overflow-y-auto  relative">
                    
                    <div className="absolute bottom-0 right-0 w-[448.82px] h-[468px] hidden md:block">
                        <div className="relative w-full h-full">
                            <Image src={service.background} alt="background"fill className="object-cover"/>
                        </div>
                        
                        <div className="absolute left-0 top-0 w-[40%] h-full bg-white/70 z-10"/>
                        <div className="absolute left-[40%] top-0 w-3/5 h-full z-10" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.7) 0%, transparent 100%)' }} />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, white 0%, white 48%, transparent 65%)' }} />
                    </div>
                    
                    <button onClick={() => setIsModalOpen(false)} className="absolute top-4 md:top-8 right-4 md:right-8 text-black hover:text-orange-500 z-50">
                    <Image
                        src="/krestik.png"
                        alt="Закрыть"
                        width={7}
                        height={7}
                        className="w-4 h-4 md:w- md:h-"
                    />
                    </button>
                    
                    <div className="flex flex-col gap-12 relative z-10">
                        
                        <div className="flex flex-col md:flex-row gap-6 md:gap-[104px] items-center">
                            <div className="w-auto">
                                <Carousel images={service.carouselImages || []} />
                            </div>
                            <div className="flex flex-col gap-3 md:gap-6">
                                <h2 className="text-xl md:text-2xl font-bold">{service.title}</h2>
                                <p className="text-sm md:text-base max-w-[350px]">{service.description}</p>
                                <div className="flex gap-3">
                                    <MeasurementModalForm />
                                    <CalculationModalForm 
                                        className="max-w-[170px]"
                                        buttonText="Заказать расчет"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                            <div className="flex flex-col items-start gap-4 md:gap-10">
                                
                                <div className="flex items-start gap-3 md:gap-4">
                                    <Image src={pic1} alt="pic" className="w-10 h-10 md:w-auto md:h-auto"/>
                                    <div>
                                        <h1 className="text-xs md:text-[14px] font-bold">{service.pic1Title}</h1>
                                        <p className="text-xs md:text-[13px]">{service.pic1Description}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 md:gap-8">
                                    <Image src={pic2} alt="pic" className="w-10 h-10 md:w-auto md:h-auto"/>
                                    <div>
                                        <h1 className="text-xs md:text-[14px] font-bold">{service.pic2Title}</h1>
                                        <p className="text-xs md:text-[13px]">{service.pic2Description}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 md:gap-8">
                                    <Image src={pic3} alt="pic" className="w-10 h-10 md:w-auto md:h-auto"/>
                                    <div>
                                        <h1 className="text-xs md:text-[14px] font-bold">{service.pic3Title}</h1>
                                        <p className="text-xs md:text-[13px]">{service.pic3Description}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-start gap-4 md:gap-10">
                                <div className="flex items-start gap-3 md:gap-4">
                                    <Image src={pic4} alt="pic" className="w-10 h-10 md:w-auto md:h-auto"/>
                                    <div>
                                        <h1 className="text-xs md:text-[14px] font-bold">{service.pic4Title}</h1>
                                        <p className="text-xs md:text-[13px]">{service.pic4Description}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 md:gap-8">
                                    <Image src={pic5} alt="pic" className="w-10 h-10 md:w-auto md:h-auto"/>
                                    <div>
                                        <h1 className="text-xs md:text-[14px] font-bold">{service.pic5Title}</h1>
                                        <p className="text-xs md:text-[13px]">{service.pic5Description}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 md:gap-8">
                                    <Image src={pic6} alt="pic" className="w-10 h-10 md:w-auto md:h-auto"/>
                                    <div>
                                        <h1 className="text-xs md:text-[14px] font-bold">{service.pic6Title}</h1>
                                        <p className="text-xs md:text-[13px]">{service.pic6Description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        )}


        </div> 
    )
} 

export default function Services() {
    return (
        <section className="pt-8 md:pt-16 px-4 md:px-0" id="services">
            <div>
                <div className="max-w-[1200px] mx-auto">
                    <h1 className="text-2xl font-bold text-center mb-12">Наши услуги</h1>

                    <div className="grid grid-cols-1 gap-3">
            
                        <div className="flex flex-col md:flex-row items-center gap-3">
                            <ServiceCard service={servicesData[0]} />
                            <ServiceCard service={servicesData[1]} />
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-3">
                            <ServiceCard service={servicesData[2]} />
                            <ServiceCard service={servicesData[3]} />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}