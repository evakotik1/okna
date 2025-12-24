// import Image from "next/image"

// export default function Footer() {
//     return (
//       <footer className="bg-[#2F2F51] text-white py-8">
//         <div className="max-w-[1200px] mx-auto flex gap-96 items-center">

//           <div className="flex gap-4 items-center">
//             <Image src="/LogoFooter.svg" alt="LogoFooter" width={55} height={40}/>
//             <p>© ООО “Окна Хаус”, 2011 - 2022</p>
//           </div>

//           <div className="flex gap-4">
//             <p className="text-[14px]">Политика кофиденциальности</p>
//             <p className="text-[14px]">Пользовательское соглашение</p>
//           </div>

//         </div>
//       </footer>
//     )
//   }

import Image from "next/image"

export default function Footer() {
    return (
      <footer className="bg-[#2F2F51] text-white py-6 md:py-8">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col md:flex-row md:gap-24 lg:gap-96 items-center gap-6">
          
          <div className="flex gap-3 md:gap-4 items-center justify-center md:justify-start">
            <Image 
              src="/LogoFooter.svg" 
              alt="LogoFooter" 
              width={55} 
              height={40}
              className="w-10 h-8 md:w-[55px] md:h-[40px]"
            />
            <p className="text-sm md:text-base text-center md:text-left">
              © ООО “Окна Хаус”, 2011 - 2022
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-6 lg:gap-8 items-center">
            <p className="text-xs md:text-[14px] text-center hover:text-orange-300 transition-colors cursor-pointer">
              Политика конфиденциальности
            </p>
            <p className="text-xs md:text-[14px] text-center hover:text-orange-300 transition-colors cursor-pointer">
              Пользовательское соглашение
            </p>
          </div>

        </div>
      </footer>
    )
  } 