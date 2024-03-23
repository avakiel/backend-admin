import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const requiredFields = ['itemId', 'name', 'fullPrice', 'price', 'screen', 'capacity', 'color', 'ram', 'year', 'image'];

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    for (const field of requiredFields) {
      if (!body[field]) {
        return new NextResponse(`${field} is required`, { status: 400 });
      }
    }

    const product = await prisma.product.create({
      data: {
        ...body
      },
    });

    return NextResponse.json(product)
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }
}
