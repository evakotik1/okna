'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import LogoOkna from "@/public/LogoOkna.svg"
import Calculation from "@/public/calculation.svg"
import Ruler from "@/public/ruler.svg"
import ActiveLink from "./ActiveLink"
import MeasurementModal from './forms/measurementModalForm'
import MeasurementModalForm from './forms/measurementModalForm'
import CalculationModalForm from './forms/CalculationModalForm'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="w-full bg-white">
            <div>
                <div className="flex items-center h-24 gap-14 justify-center relative">
                    
                    <button className="md:hidden absolute right-4"  onClick={() => setIsMenuOpen(true)} >
                        <Menu className="w-8 h-8 rounded-sm text-black bg-orange-500 hover:bg-orange-600 p-1" />
                    </button>

                    <Link href="/" className='md:static absolute left-4 md:left-auto top-4 md:top-auto'>
                            <Image src={LogoOkna} alt="Logo" />
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <ActiveLink href="#services">Услуги</ActiveLink>
                        <ActiveLink href="#products">Продукция</ActiveLink>
                        <ActiveLink href="#about">О компании</ActiveLink>
                        <ActiveLink href="#portfolio">Портфолио</ActiveLink>
                        <ActiveLink href="#faq">Вопрос-ответ</ActiveLink>
                        <ActiveLink href="#contact">Контакты</ActiveLink>
                    </nav>

                    <div className="hidden md:flex items-center gap-4">

                    <MeasurementModalForm />

                    <CalculationModalForm 
                        className="max-w-[170px]"
                        buttonText="Заказать расчет"
                    />

                    </div>

                    {isMenuOpen && (
                        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 p-6">

                            <div className="flex justify-end mb-8">
                                <button onClick={() => setIsMenuOpen(false)}>
                                <Image
                        src="/krestik.png"
                        alt="Закрыть"
                        width={7}
                        height={7}
                        className="w-5 h-5 md:w-5 md:h-5"
                    />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-8">

                                <div className='flex flex-col gap-4'>
                                    <ActiveLink href="#services" onClick={() => setIsMenuOpen(false)}>Услуги</ActiveLink>
                                    <ActiveLink href="#products" onClick={() => setIsMenuOpen(false)}>Продукция</ActiveLink>
                                    <ActiveLink href="#about" onClick={() => setIsMenuOpen(false)}>О компании</ActiveLink>
                                    <ActiveLink href="#portfolio" onClick={() => setIsMenuOpen(false)}>Портфолио</ActiveLink>
                                    <ActiveLink href="#faq" onClick={() => setIsMenuOpen(false)}>Вопрос-ответ</ActiveLink>
                                    <ActiveLink href="#contact" onClick={() => setIsMenuOpen(false)}>Контакты</ActiveLink>
                                    
                                    <div className="flex flex-col gap-3 ">
                                    <MeasurementModalForm 
                                        className="max-w-[170px]"
                                        buttonText="Заявка на замер"
                                        textClassName="text-[13px]"
                                    />
                                        
                                        <CalculationModalForm 
                                            className="max-w-[170px]"
                                            buttonText="Заказать расчет"
                                        />
                                    </div>

                                </div>

                            </nav>

                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}