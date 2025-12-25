"use client"

import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps"

export default function LocationMap() {
    const demoApiKey = "04e70d21-3ed1-4bd9-a574-c30444dca5c5"

    const shops = [
        { 
            id: 1, 
            coordinates: [55.691221, 37.611872],
            name: "Филиал 1",
        },
        { 
            id: 2, 
            coordinates: [55.717912, 37.669609],
            name: "Филиал 2", 
        },
        { 
            id: 3, 
            coordinates: [55.703877, 37.679694],
            name: "Филиал 3",
        },
    ]

    return (
        <section className="">
            <div className="max-w-[1200px] mx-auto">
                
                <div >
                    <YMaps query={{ apikey: demoApiKey, lang: "ru_RU" }}>
                        <div className="w-full h-[250px] md:h-[310px] mx-auto">
                            <Map
                                defaultState={{
                                    center: [55.75, 37.57],
                                    zoom: 10,
                                }} 
                                width="100%"
                                height="100%">
                                {shops.map((workshop) => (
                                    <Placemark
                                        key={workshop.id}
                                        geometry={workshop.coordinates}
                                        options={{
                                            iconLayout: 'default#image',
                                            iconImageHref: '/geo.svg',
                                            iconImageSize: [30, 35],
                                            iconImageOffset: [-20, -40],
                                        }}
                                    />
                                ))}
                            </Map>
                        </div>
                    </YMaps>
                </div>
                
                
            </div>
        </section>
    )
}