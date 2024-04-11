import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface Product {
  id: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string[];
}

export interface SelectedPhone {
  id: string;
  namespaceId: string;
  name: string;
  capacityAvailable: Prisma.JsonValue;
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: Prisma.JsonValue;
  color: string;
  images: Prisma.JsonValue;
  description: Prisma.JsonValue;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: Prisma.JsonValue;
}

export interface Description {
  title: string;
  text: string[];
}
