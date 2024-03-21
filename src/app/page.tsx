// import * as phonesData from "../../seed_data/products/index.json"
import { useSession } from "next-auth/react";
import Header from "./components/Header";
import Main from "./components/Main";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

const getProducts = () => {
  const products: any[] = [
    {
      "id": "1",
      "category": "phones",
      "phoneId": "apple-iphone-7-32gb-black",
      "itemId": "apple-iphone-7-32gb-black",
      "name": "Apple iPhone 7 32GB Black",
      "fullPrice": 400,
      "price": 375,
      "screen": "4.7' IPS",
      "capacity": "32GB",
      "color": "black",
      "ram": "2GB",
      "year": 2016,
      "image": "img/phones/apple-iphone-7/black/00.png"
    },
    {
      "id": "2",
      "category": "phones",
      "phoneId": "apple-iphone-7-plus-32gb-black",
      "itemId": "apple-iphone-7-plus-32gb-black",
      "name": "Apple iPhone 7 Plus 32GB Black",
      "fullPrice": 540,
      "price": 500,
      "screen": "5.5' IPS",
      "capacity": "32GB",
      "color": "black",
      "ram": "3GB",
      "year": 2016,
      "image": "img/phones/apple-iphone-7-plus/black/00.png"
    },
    {
      "id": "3",
      "category": "phones",
      "phoneId": "apple-iphone-8-64gb-gold",
      "itemId": "apple-iphone-8-64gb-gold",
      "name": "Apple iPhone 8 64GB Gold",
      "fullPrice": 600,
      "price": 550,
      "screen": "4.7' IPS",
      "capacity": "64GB",
      "color": "gold",
      "ram": "2GB",
      "year": 2017,
      "image": "img/phones/apple-iphone-8/gold/00.png"
    },
    {
      "id": "4",
      "category": "phones",
      "phoneId": "apple-iphone-11-64gb-black",
      "itemId": "apple-iphone-11-64gb-black",
      "name": "Apple iPhone 11 64GB Black",
      "fullPrice": 932,
      "price": 880,
      "screen": "6.1' IPS",
      "capacity": "64GB",
      "color": "black",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/black/00.png"
    },
    {
      "id": "5",
      "category": "phones",
      "phoneId": "apple-iphone-11-128gb-yellow",
      "itemId": "apple-iphone-11-128gb-yellow",
      "name": "Apple iPhone 11 128GB Yellow",
      "fullPrice": 1100,
      "price": 1050,
      "screen": "6.1' IPS",
      "capacity": "128GB",
      "color": "yellow",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/yellow/00.png"
    },
    {
      "id": "6",
      "category": "phones",
      "phoneId": "apple-iphone-11-256gb-green",
      "itemId": "apple-iphone-11-256gb-green",
      "name": "Apple iPhone 11 256GB Green",
      "fullPrice": 1172,
      "price": 1115,
      "screen": "6.1' IPS",
      "capacity": "256GB",
      "color": "green",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/green/00.png"
    },
    {
      "id": "7",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-64gb-gold",
      "itemId": "apple-iphone-11-pro-64gb-gold",
      "name": "Apple iPhone 11 Pro 64GB Gold",
      "fullPrice": 1312,
      "price": 1270,
      "screen": "5.8' OLED",
      "capacity": "64GB",
      "color": "gold",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro/gold/00.png"
    },
    {
      "id": "8",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-256gb-midnightgreen",
      "itemId": "apple-iphone-11-pro-256gb-midnightgreen",
      "name": "Apple iPhone 11 Pro 256GB Midnight green",
      "fullPrice": 1640,
      "price": 1570,
      "screen": "5.8' OLED",
      "capacity": "256GB",
      "color": "midnightgreen",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro/midnightgreen/00.png"
    },
    {
      "id": "9",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-512gb-silver",
      "itemId": "apple-iphone-11-pro-512gb-silver",
      "name": "Apple iPhone 11 Pro 512GB Silver",
      "fullPrice": 1880,
      "price": 1780,
      "screen": "5.8' OLED",
      "capacity": "512GB",
      "color": "silver",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro/silver/00.png"
    },
    {
      "id": "10",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-max-64gb-spacegray",
      "itemId": "apple-iphone-11-pro-max-64gb-spacegray",
      "name": "Apple iPhone 11 Pro Max 64GB Spacegray",
      "fullPrice": 1480,
      "price": 1400,
      "screen": "6.5' OLED",
      "capacity": "64GB",
      "color": "spacegray",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro-max/spacegray/00.png"
    },
    {
      "id": "11",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-max-256gb-gold",
      "itemId": "apple-iphone-11-pro-max-256gb-gold",
      "name": "Apple iPhone 11 Pro Max 256GB Gold",
      "fullPrice": 1776,
      "price": 1680,
      "screen": "6.5' OLED",
      "capacity": "256GB",
      "color": "gold",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro-max/gold/00.png"
    },
    {
      "id": "12",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-max-512gb-spacegray",
      "itemId": "apple-iphone-11-pro-max-512gb-spacegray",
      "name": "Apple iPhone 11 Pro Max 512GB Spacegray",
      "fullPrice": 2020,
      "price": 1930,
      "screen": "6.5' OLED",
      "capacity": "512GB",
      "color": "spacegray",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro-max/spacegray/00.png"
    },
    {
      "id": "13",
      "category": "phones",
      "phoneId": "apple-iphone-xr-64gb-red",
      "itemId": "apple-iphone-xr-64gb-red",
      "name": "Apple iPhone XR 64GB Red",
      "fullPrice": 712,
      "price": 670,
      "screen": "6.1' IPS",
      "capacity": "64GB",
      "color": "red",
      "ram": "3GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xr/red/00.png"
    },
    {
      "id": "14",
      "category": "phones",
      "phoneId": "apple-iphone-xr-128gb-white",
      "itemId": "apple-iphone-xr-128gb-white",
      "name": "Apple iPhone XR 128GB White",
      "fullPrice": 880,
      "price": 815,
      "screen": "6.1' IPS",
      "capacity": "128GB",
      "color": "white",
      "ram": "3GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xr/white/00.png"
    },
    {
      "id": "15",
      "category": "phones",
      "phoneId": "apple-iphone-xs-64gb-spacegray",
      "itemId": "apple-iphone-xs-64gb-spacegray",
      "name": "Apple iPhone XS 64GB Spacegray",
      "fullPrice": 760,
      "price": 720,
      "screen": "5.8' OLED",
      "capacity": "64GB",
      "color": "spacegray",
      "ram": "4GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xs/spacegray/00.png"
    },
    {
      "id": "16",
      "category": "phones",
      "phoneId": "apple-iphone-xs-max-64gb-gold",
      "itemId": "apple-iphone-xs-max-64gb-gold",
      "name": "Apple iPhone XS Max 64GB Gold",
      "fullPrice": 960,
      "price": 900,
      "screen": "6.5' OLED",
      "capacity": "64GB",
      "color": "gold",
      "ram": "4GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xs-max/gold/00.png"
    },
    {
      "id": "17",
      "category": "phones",
      "phoneId": "apple-iphone-xs-max-256gb-silver",
      "itemId": "apple-iphone-xs-max-256gb-silver",
      "name": "Apple iPhone XS Max 256GB Silver",
      "fullPrice": 1080,
      "price": 1000,
      "screen": "6.5' OLED",
      "capacity": "256GB",
      "color": "silver",
      "ram": "4GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xs-max/silver/00.png"
    },
    {
      "id": "18",
      "category": "phones",
      "phoneId": "apple-iphone-7-32gb-gold",
      "itemId": "apple-iphone-7-32gb-gold",
      "name": "Apple iPhone 7 32GB Gold",
      "fullPrice": 400,
      "price": 375,
      "screen": "4.7' IPS",
      "capacity": "32GB",
      "color": "gold",
      "ram": "2GB",
      "year": 2016,
      "image": "img/phones/apple-iphone-7/gold/00.png"
    },
    {
      "id": "19",
      "category": "phones",
      "phoneId": "apple-iphone-7-plus-32gb-silver",
      "itemId": "apple-iphone-7-plus-32gb-silver",
      "name": "Apple iPhone 7 Plus 32GB Silver",
      "fullPrice": 540,
      "price": 500,
      "screen": "5.5' IPS",
      "capacity": "32GB",
      "color": "silver",
      "ram": "3GB",
      "year": 2016,
      "image": "img/phones/apple-iphone-7-plus/silver/00.png"
    },
    {
      "id": "20",
      "category": "phones",
      "phoneId": "apple-iphone-8-64gb-spacegray",
      "itemId": "apple-iphone-8-64gb-spacegray",
      "name": "Apple iPhone 8 64GB Space Gray",
      "fullPrice": 600,
      "price": 550,
      "screen": "4.7' IPS",
      "capacity": "64GB",
      "color": "spacegray",
      "ram": "2GB",
      "year": 2017,
      "image": "img/phones/apple-iphone-8/spacegray/00.png"
    },
    {
      "id": "21",
      "category": "phones",
      "phoneId": "apple-iphone-11-64gb-green",
      "itemId": "apple-iphone-11-64gb-green",
      "name": "Apple iPhone 11 64GB Green",
      "fullPrice": 932,
      "price": 880,
      "screen": "6.1' IPS",
      "capacity": "64GB",
      "color": "green",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/green/00.png"
    },
    {
      "id": "22",
      "category": "phones",
      "phoneId": "apple-iphone-11-128gb-purple",
      "itemId": "apple-iphone-11-128gb-purple",
      "name": "Apple iPhone 11 128GB Purple",
      "fullPrice": 1100,
      "price": 1050,
      "screen": "6.1' IPS",
      "capacity": "128GB",
      "color": "purple",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/purple/00.png"
    },
    {
      "id": "23",
      "category": "phones",
      "phoneId": "apple-iphone-11-256gb-yellow",
      "itemId": "apple-iphone-11-256gb-yellow",
      "name": "Apple iPhone 11 256GB Yellow",
      "fullPrice": 1172,
      "price": 1115,
      "screen": "6.1' IPS",
      "capacity": "256GB",
      "color": "yellow",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/yellow/00.png"
    },
    {
      "id": "24",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-256gb-gold",
      "itemId": "apple-iphone-11-pro-256gb-gold",
      "name": "Apple iPhone 11 Pro 256GB Gold",
      "fullPrice": 1640,
      "price": 1570,
      "screen": "5.8' OLED",
      "capacity": "256GB",
      "color": "gold",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro/gold/00.png"
    },
    {
      "id": "25",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-512gb-spacegray",
      "itemId": "apple-iphone-11-pro-512gb-spacegray",
      "name": "Apple iPhone 11 Pro 512GB Spacegray",
      "fullPrice": 1880,
      "price": 1780,
      "screen": "5.8' OLED",
      "capacity": "512GB",
      "color": "spacegray",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro/spacegray/00.png"
    },
    {
      "id": "26",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-max-64gb-silver",
      "itemId": "apple-iphone-11-pro-max-64gb-silver",
      "name": "Apple iPhone 11 Pro Max 64GB Silver",
      "fullPrice": 1480,
      "price": 1400,
      "screen": "6.5' OLED",
      "capacity": "64GB",
      "color": "silver",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro-max/silver/00.png"
    },
    {
      "id": "27",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-max-256gb-midnightgreen",
      "itemId": "apple-iphone-11-pro-max-256gb-midnightgreen",
      "name": "Apple iPhone 11 Pro Max 256GB Midnightgreen",
      "fullPrice": 1776,
      "price": 1680,
      "screen": "6.5' OLED",
      "capacity": "256GB",
      "color": "midnightgreen",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro-max/midnightgreen/00.png"
    },
    {
      "id": "28",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-max-512gb-silver",
      "itemId": "apple-iphone-11-pro-max-512gb-silver",
      "name": "Apple iPhone 11 Pro Max 512GB Silver",
      "fullPrice": 2020,
      "price": 1930,
      "screen": "6.5' OLED",
      "capacity": "512GB",
      "color": "silver",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro-max/silver/00.png"
    },
    {
      "id": "29",
      "category": "phones",
      "phoneId": "apple-iphone-xr-64gb-white",
      "itemId": "apple-iphone-xr-64gb-white",
      "name": "Apple iPhone XR 64GB White",
      "fullPrice": 712,
      "price": 670,
      "screen": "6.1' IPS",
      "capacity": "64GB",
      "color": "white",
      "ram": "3GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xr/white/00.png"
    },
    {
      "id": "30",
      "category": "phones",
      "phoneId": "apple-iphone-xr-128gb-coral",
      "itemId": "apple-iphone-xr-128gb-coral",
      "name": "Apple iPhone XR 128GB Coral",
      "fullPrice": 880,
      "price": 815,
      "screen": "6.1' IPS",
      "capacity": "128GB",
      "color": "coral",
      "ram": "3GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xr/coral/00.png"
    },
    {
      "id": "31",
      "category": "phones",
      "phoneId": "apple-iphone-xs-64gb-gold",
      "itemId": "apple-iphone-xs-64gb-gold",
      "name": "Apple iPhone XS 64GB Gold",
      "fullPrice": 760,
      "price": 720,
      "screen": "5.8' OLED",
      "capacity": "64GB",
      "color": "gold",
      "ram": "4GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xs/gold/00.png"
    },
    {
      "id": "32",
      "category": "phones",
      "phoneId": "apple-iphone-xs-256gb-spacegray",
      "itemId": "apple-iphone-xs-256gb-spacegray",
      "name": "Apple iPhone XS 256GB Spacegray",
      "fullPrice": 960,
      "price": 900,
      "screen": "5.8' OLED",
      "capacity": "256GB",
      "color": "spacegray",
      "ram": "4GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xs/spacegray/00.png"
    },
    {
      "id": "33",
      "category": "phones",
      "phoneId": "apple-iphone-xs-max-64gb-silver",
      "itemId": "apple-iphone-xs-max-64gb-silver",
      "name": "Apple iPhone XS Max 64GB Silver",
      "fullPrice": 960,
      "price": 900,
      "screen": "6.5' OLED",
      "capacity": "64GB",
      "color": "silver",
      "ram": "4GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xs-max/silver/00.png"
    },
    {
      "id": "34",
      "category": "phones",
      "phoneId": "apple-iphone-xs-max-256gb-gold",
      "itemId": "apple-iphone-xs-max-256gb-gold",
      "name": "Apple iPhone XS Max 256GB Gold",
      "fullPrice": 1080,
      "price": 1000,
      "screen": "6.5' OLED",
      "capacity": "256GB",
      "color": "gold",
      "ram": "4GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xs-max/gold/00.png"
    },
    {
      "id": "35",
      "category": "phones",
      "phoneId": "apple-iphone-7-32gb-rosegold",
      "itemId": "apple-iphone-7-32gb-rosegold",
      "name": "Apple iPhone 7 32GB Rosegold",
      "fullPrice": 400,
      "price": 375,
      "screen": "4.7' IPS",
      "capacity": "32GB",
      "color": "rosegold",
      "ram": "2GB",
      "year": 2016,
      "image": "img/phones/apple-iphone-7/rosegold/00.png"
    },
    {
      "id": "36",
      "category": "phones",
      "phoneId": "apple-iphone-11-64gb-purple",
      "itemId": "apple-iphone-11-64gb-purple",
      "name": "Apple iPhone 11 64GB Purple",
      "fullPrice": 932,
      "price": 880,
      "screen": "6.1' IPS",
      "capacity": "64GB",
      "color": "purple",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/purple/00.png"
    },
    {
      "id": "37",
      "category": "phones",
      "phoneId": "apple-iphone-11-64gb-red",
      "itemId": "apple-iphone-11-64gb-red",
      "name": "Apple iPhone 11 64GB Red",
      "fullPrice": 932,
      "price": 880,
      "screen": "6.1' IPS",
      "capacity": "64GB",
      "color": "red",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/red/00.png"
    },
    {
      "id": "38",
      "category": "phones",
      "phoneId": "apple-iphone-11-128gb-black",
      "itemId": "apple-iphone-11-128gb-black",
      "name": "Apple iPhone 11 128GB Black",
      "fullPrice": 1100,
      "price": 1050,
      "screen": "6.1' IPS",
      "capacity": "128GB",
      "color": "black",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/black/00.png"
    },
    {
      "id": "39",
      "category": "phones",
      "phoneId": "apple-iphone-11-256gb-red",
      "itemId": "apple-iphone-11-256gb-red",
      "name": "Apple iPhone 11 256GB Red",
      "fullPrice": 1172,
      "price": 1115,
      "screen": "6.1' IPS",
      "capacity": "256GB",
      "color": "red",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/red/00.png"
    },
    {
      "id": "40",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-64gb-midnightgreen",
      "itemId": "apple-iphone-11-pro-64gb-midnightgreen",
      "name": "Apple iPhone 11 Pro 64GB Midnight green",
      "fullPrice": 1312,
      "price": 1270,
      "screen": "5.8' OLED",
      "capacity": "64GB",
      "color": "midnightgreen",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro/midnightgreen/00.png"
    },
    {
      "id": "41",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-256gb-silver",
      "itemId": "apple-iphone-11-pro-256gb-silver",
      "name": "Apple iPhone 11 Pro 256GB Silver",
      "fullPrice": 1640,
      "price": 1570,
      "screen": "5.8' OLED",
      "capacity": "256GB",
      "color": "silver",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro/silver/00.png"
    },
    {
      "id": "42",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-512gb-gold",
      "itemId": "apple-iphone-11-pro-512gb-gold",
      "name": "Apple iPhone 11 Pro 512GB Gold",
      "fullPrice": 1880,
      "price": 1780,
      "screen": "5.8' OLED",
      "capacity": "512GB",
      "color": "gold",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro/gold/00.png"
    },
    {
      "id": "43",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-max-64gb-midnightgreen",
      "itemId": "apple-iphone-11-pro-max-64gb-midnightgreen",
      "name": "Apple iPhone 11 Pro Max 64GB Midnightgreen",
      "fullPrice": 1480,
      "price": 1400,
      "screen": "6.5' OLED",
      "capacity": "64GB",
      "color": "midnightgreen",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro-max/midnightgreen/00.png"
    },
    {
      "id": "44",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-max-256gb-spacegray",
      "itemId": "apple-iphone-11-pro-max-256gb-spacegray",
      "name": "Apple iPhone 11 Pro Max 256GB Spacegray",
      "fullPrice": 1776,
      "price": 1680,
      "screen": "6.5' OLED",
      "capacity": "256GB",
      "color": "spacegray",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro-max/spacegray/00.png"
    },
    {
      "id": "45",
      "category": "phones",
      "phoneId": "apple-iphone-xr-64gb-coral",
      "itemId": "apple-iphone-xr-64gb-coral",
      "name": "Apple iPhone XR 64GB Coral",
      "fullPrice": 712,
      "price": 670,
      "screen": "6.1' IPS",
      "capacity": "64GB",
      "color": "coral",
      "ram": "3GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xr/coral/00.png"
    },
    {
      "id": "46",
      "category": "phones",
      "phoneId": "apple-iphone-xr-128gb-red",
      "itemId": "apple-iphone-xr-128gb-red",
      "name": "Apple iPhone XR 128GB Red",
      "fullPrice": 880,
      "price": 815,
      "screen": "6.1' IPS",
      "capacity": "128GB",
      "color": "red",
      "ram": "3GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xr/red/00.png"
    },
    {
      "id": "47",
      "category": "phones",
      "phoneId": "apple-iphone-xs-256gb-gold",
      "itemId": "apple-iphone-xs-256gb-gold",
      "name": "Apple iPhone XS 256GB Gold",
      "fullPrice": 960,
      "price": 900,
      "screen": "5.8' OLED",
      "capacity": "256GB",
      "color": "gold",
      "ram": "4GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xs/gold/00.png"
    },
    {
      "id": "48",
      "category": "phones",
      "phoneId": "apple-iphone-xs-max-64gb-spacegray",
      "itemId": "apple-iphone-xs-max-64gb-spacegray",
      "name": "Apple iPhone XS Max 64GB Spacegray",
      "fullPrice": 960,
      "price": 900,
      "screen": "6.5' OLED",
      "capacity": "64GB",
      "color": "spacegray",
      "ram": "4GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xs-max/spacegray/00.png"
    },
    {
      "id": "49",
      "category": "phones",
      "phoneId": "apple-iphone-7-plus-32gb-rosegold",
      "itemId": "apple-iphone-7-plus-32gb-rosegold",
      "name": "Apple iPhone 7 Plus 32GB Rosegold",
      "fullPrice": 540,
      "price": 500,
      "screen": "5.5' IPS",
      "capacity": "32GB",
      "color": "rosegold",
      "ram": "3GB",
      "year": 2016,
      "image": "img/phones/apple-iphone-7-plus/rosegold/00.png"
    },
    {
      "id": "50",
      "category": "phones",
      "phoneId": "apple-iphone-11-64gb-white",
      "itemId": "apple-iphone-11-64gb-white",
      "name": "Apple iPhone 11 64GB White",
      "fullPrice": 932,
      "price": 880,
      "screen": "6.1' IPS",
      "capacity": "64GB",
      "color": "white",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/white/00.png"
    },
    {
      "id": "51",
      "category": "phones",
      "phoneId": "apple-iphone-11-128gb-green",
      "itemId": "apple-iphone-11-128gb-green",
      "name": "Apple iPhone 11 128GB Green",
      "fullPrice": 1100,
      "price": 1050,
      "screen": "6.1' IPS",
      "capacity": "128GB",
      "color": "green",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/green/00.png"
    },
    {
      "id": "52",
      "category": "phones",
      "phoneId": "apple-iphone-11-128gb-white",
      "itemId": "apple-iphone-11-128gb-white",
      "name": "Apple iPhone 11 128GB White",
      "fullPrice": 1100,
      "price": 1050,
      "screen": "6.1' IPS",
      "capacity": "128GB",
      "color": "white",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/white/00.png"
    },
    {
      "id": "53",
      "category": "phones",
      "phoneId": "apple-iphone-11-256gb-black",
      "itemId": "apple-iphone-11-256gb-black",
      "name": "Apple iPhone 11 256GB Black",
      "fullPrice": 1172,
      "price": 1115,
      "screen": "6.1' IPS",
      "capacity": "256GB",
      "color": "black",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/black/00.png"
    },
    {
      "id": "54",
      "category": "phones",
      "phoneId": "apple-iphone-11-256gb-white",
      "itemId": "apple-iphone-11-256gb-white",
      "name": "Apple iPhone 11 256GB White",
      "fullPrice": 1172,
      "price": 1115,
      "screen": "6.1' IPS",
      "capacity": "256GB",
      "color": "white",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/white/00.png"
    },
    {
      "id": "55",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-64gb-spacegray",
      "itemId": "apple-iphone-11-pro-64gb-spacegray",
      "name": "Apple iPhone 11 Pro 64GB Spacegray",
      "fullPrice": 1312,
      "price": 1270,
      "screen": "5.8' OLED",
      "capacity": "64GB",
      "color": "spacegray",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro/spacegray/00.png"
    },
    {
      "id": "56",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-512gb-midnightgreen",
      "itemId": "apple-iphone-11-pro-512gb-midnightgreen",
      "name": "Apple iPhone 11 Pro 512GB Midnight green",
      "fullPrice": 1880,
      "price": 1780,
      "screen": "5.8' OLED",
      "capacity": "512GB",
      "color": "midnightgreen",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro/midnightgreen/00.png"
    },
    {
      "id": "57",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-max-64gb-gold",
      "itemId": "apple-iphone-11-pro-max-64gb-gold",
      "name": "Apple iPhone 11 Pro Max 64GB Gold",
      "fullPrice": 1480,
      "price": 1400,
      "screen": "6.5' OLED",
      "capacity": "64GB",
      "color": "gold",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro-max/gold/00.png"
    },
    {
      "id": "58",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-max-256gb-silver",
      "itemId": "apple-iphone-11-pro-max-256gb-silver",
      "name": "Apple iPhone 11 Pro Max 256GB Silver",
      "fullPrice": 1776,
      "price": 1680,
      "screen": "6.5' OLED",
      "capacity": "256GB",
      "color": "silver",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro-max/silver/00.png"
    },
    {
      "id": "59",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-max-512gb-midnightgreen",
      "itemId": "apple-iphone-11-pro-max-512gb-midnightgreen",
      "name": "Apple iPhone 11 Pro Max 512GB Midnightgreen",
      "fullPrice": 2020,
      "price": 1930,
      "screen": "6.5' OLED",
      "capacity": "512GB",
      "color": "midnightgreen",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro-max/midnightgreen/00.png"
    },
    {
      "id": "60",
      "category": "phones",
      "phoneId": "apple-iphone-xr-128gb-yellow",
      "itemId": "apple-iphone-xr-128gb-yellow",
      "name": "Apple iPhone XR 128GB Yellow",
      "fullPrice": 880,
      "price": 815,
      "screen": "6.1' IPS",
      "capacity": "128GB",
      "color": "yellow",
      "ram": "3GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xr/yellow/00.png"
    },
    {
      "id": "61",
      "category": "phones",
      "phoneId": "apple-iphone-7-32gb-silver",
      "itemId": "apple-iphone-7-32gb-silver",
      "name": "Apple iPhone 7 32GB Silver",
      "fullPrice": 400,
      "price": 375,
      "screen": "4.7' IPS",
      "capacity": "32GB",
      "color": "silver",
      "ram": "2GB",
      "year": 2016,
      "image": "img/phones/apple-iphone-7/silver/00.png"
    },
    {
      "id": "62",
      "category": "phones",
      "phoneId": "apple-iphone-11-256gb-purple",
      "itemId": "apple-iphone-11-256gb-purple",
      "name": "Apple iPhone 11 256GB Purple",
      "fullPrice": 1172,
      "price": 1115,
      "screen": "6.1' IPS",
      "capacity": "256GB",
      "color": "purple",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/purple/00.png"
    },
    {
      "id": "63",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-max-512gb-gold",
      "itemId": "apple-iphone-11-pro-max-512gb-gold",
      "name": "Apple iPhone 11 Pro Max 512GB Gold",
      "fullPrice": 2020,
      "price": 1930,
      "screen": "6.5' OLED",
      "capacity": "512GB",
      "color": "gold",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro-max/gold/00.png"
    },
    {
      "id": "64",
      "category": "phones",
      "phoneId": "apple-iphone-11-64gb-yellow",
      "itemId": "apple-iphone-11-64gb-yellow",
      "name": "Apple iPhone 11 64GB Yellow",
      "fullPrice": 932,
      "price": 880,
      "screen": "6.1' IPS",
      "capacity": "64GB",
      "color": "yellow",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/yellow/00.png"
    },
    {
      "id": "65",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-256gb-spacegray",
      "itemId": "apple-iphone-11-pro-256gb-spacegray",
      "name": "Apple iPhone 11 Pro 256GB Spacegray",
      "fullPrice": 1640,
      "price": 1570,
      "screen": "5.8' OLED",
      "capacity": "256GB",
      "color": "spacegray",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro/spacegray/00.png"
    },
    {
      "id": "66",
      "category": "phones",
      "phoneId": "apple-iphone-8-64gb-silver",
      "itemId": "apple-iphone-8-64gb-silver",
      "name": "Apple iPhone 8 64GB Silver",
      "fullPrice": 600,
      "price": 550,
      "screen": "4.7' IPS",
      "capacity": "64GB",
      "color": "silver",
      "ram": "2GB",
      "year": 2017,
      "image": "img/phones/apple-iphone-8/silver/00.png"
    },
    {
      "id": "67",
      "category": "phones",
      "phoneId": "apple-iphone-11-128gb-red",
      "itemId": "apple-iphone-11-128gb-red",
      "name": "Apple iPhone 11 128GB Red",
      "fullPrice": 1100,
      "price": 1050,
      "screen": "6.1' IPS",
      "capacity": "128GB",
      "color": "red",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11/red/00.png"
    },
    {
      "id": "68",
      "category": "phones",
      "phoneId": "apple-iphone-xs-max-256gb-spacegray",
      "itemId": "apple-iphone-xs-max-256gb-spacegray",
      "name": "Apple iPhone XS Max 256GB Spacegray",
      "fullPrice": 1080,
      "price": 1000,
      "screen": "6.5' OLED",
      "capacity": "256GB",
      "color": "spacegray",
      "ram": "4GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xs-max/spacegray/00.png"
    },
    {
      "id": "69",
      "category": "phones",
      "phoneId": "apple-iphone-7-plus-32gb-gold",
      "itemId": "apple-iphone-7-plus-32gb-gold",
      "name": "Apple iPhone 7 Plus 32GB Gold",
      "fullPrice": 540,
      "price": 500,
      "screen": "5.5' IPS",
      "capacity": "32GB",
      "color": "gold",
      "ram": "3GB",
      "year": 2016,
      "image": "img/phones/apple-iphone-7-plus/gold/00.png"
    },
    {
      "id": "70",
      "category": "phones",
      "phoneId": "apple-iphone-11-pro-64gb-silver",
      "itemId": "apple-iphone-11-pro-64gb-silver",
      "name": "Apple iPhone 11 Pro 64GB Silver",
      "fullPrice": 1312,
      "price": 1270,
      "screen": "5.8' OLED",
      "capacity": "64GB",
      "color": "silver",
      "ram": "4GB",
      "year": 2019,
      "image": "img/phones/apple-iphone-11-pro/silver/00.png"
    },
    {
      "id": "71",
      "category": "phones",
      "phoneId": "apple-iphone-xr-64gb-yellow",
      "itemId": "apple-iphone-xr-64gb-yellow",
      "name": "Apple iPhone XR 64GB Yellow",
      "fullPrice": 712,
      "price": 670,
      "screen": "6.1' IPS",
      "capacity": "64GB",
      "color": "yellow",
      "ram": "3GB",
      "year": 2018,
      "image": "img/phones/apple-iphone-xr/yellow/00.png"
    }
  ]
  

  return products;
}; /// TODO remove this mock up and use API

export default async function Home() {
  const products = getProducts();
  const session = await getServerSession();

  if(!session || !session.user) {
    redirect('api/auth/signin')
  }

  return (
    <div>
      <Header />
      <Main products={products} />    
    </div>
  );
}
