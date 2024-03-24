import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const requiredFields = ['itemId', 'name', 'fullPrice', 'price', 'screen', 'capacity', 'color', 'ram', 'year', 'image'];

interface Params { params: { productId: string } };

export async function GET(req: NextRequest, { params }: Params) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: +params.productId
      }
    });

    if (!existingProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: +params.productId
      }
    });

    return NextResponse.json(product);

  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: +params.productId
      }
    });

    if (!existingProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }
    await prisma.product.delete({
      where: {
        id: +params.productId
      },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const body = await req.json();

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: +params.productId
      }
    });

    if (!existingProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    for (const field of requiredFields) {
      if (!body[field]) {
        return new NextResponse(`${field} is required`, { status: 400 });
      }
    }

    const product = await prisma.product.update({
      where: {
        id: +params.productId
      },
      data: {
        ...body,
      },
    })

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}