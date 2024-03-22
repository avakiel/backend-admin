
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const requiredFields = ['id', 'category', 'phoneId', 'itemId', 'name', 'fullPrice', 'price', 'screen', 'capacity', 'color', 'ram', 'year', 'image'];

export async function GET() {
  try {
    const products = await Prisma.product.findMany()
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

    const product = await Prisma.product.create({
      data: {
        ...body
      },
    });

    return NextResponse.json(product)
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }
}
