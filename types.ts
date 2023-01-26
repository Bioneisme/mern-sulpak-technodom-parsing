import {Request} from "express";

export type UserRequest = Request & { locals: Date };

export type productObject = {
    link: string,
    category: string,
    title: string,
    store: string,
    price: number,
    image: string
}

export enum storeURLs {
    'techno_dom' = "https://www.technodom.kz/astana/catalog",
    'sulpak' = "https://www.sulpak.kz"
}

export enum sulpakCategories {
    'laptops' = "noutbuki?selectedAvailabilitiesTokens=Availability",
    'phones' = "smartfoniy?selectedAvailabilitiesTokens=Availability",
    'gadgets' = "smart_chasiy?selectedAvailabilitiesTokens=Availability",
    'tablets' = "planshetiy?selectedAvailabilitiesTokens=Availability",
    'televisions' = "led_oled_televizoriy?selectedAvailabilitiesTokens=Availability",
    'computers' = "sistemniye_bloki?selectedAvailabilitiesTokens=Availability",
    'audio' = "smart_kolonki_umniye_kolonki?selectedAvailabilitiesTokens=Availability",
    'cameras' = "ekshn_kameriy?selectedAvailabilitiesTokens=Availability"
}

export enum technoDomCategories {
    'laptops' = "noutbuki-i-komp-jutery/noutbuki-i-aksessuary/noutbuki",
    'phones' = "smartfony-i-gadzhety/smartfony-i-telefony/smartfony",
    'gadgets' = "smartfony-i-gadzhety/gadzhety",
    'tablets' = "smartfony-i-gadzhety/planshety-i-jelektronnye-knigi/planshety",
    'televisions' = "tv-audio-foto-video/televizory",
    'computers' = "noutbuki-i-komp-jutery/komp-jutery-i-monitory/stacionarnye-pk",
    'audio' = "tv-audio-foto-video/audio-tehnika/akustika",
    'cameras' = "fototehnika-i-kvadrokoptery/jekshn-kamery-i-aksessuary",
    'digital' = "tv-audio-foto-video/cifrovoe-sputnikovoe-tv"
}