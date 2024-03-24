import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Params { params: { categoryId: string } };
 
export async function GET(req: NextRequest, { params }: Params) {
    try {
        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const category = await prisma.category.findUnique({ where: { id: +params.categoryId } })

        if (!category) {
            return new NextResponse("Category not found", { status: 404 })
        }

        const products = await prisma.product.findMany({
          where: {
            categoryId: category.id
          },
          orderBy: {
            id: 'asc'
          }
        });

        return NextResponse.json(products)
    } catch (error) {
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    try {
        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const category = await prisma.category.findUnique({ where: { id: +params.categoryId } })

        if (!category) {
            return new NextResponse("Category not found", { status: 404 })
        }

        await prisma.category.delete({
            where: {
                id: +params.categoryId
            },
        });

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        return new NextResponse('Internal error', { status: 500 })
    }
}


export async function PATCH(req: NextRequest, { params }: Params) {
    try {
        const body = await req.json();

        const { name } = body;

        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const existingCategory = await prisma.category.findUnique({ where: { id: +params.categoryId } })

        if (!existingCategory) {
            return new NextResponse("Category not found", { status: 404 })
        }

        const category = await prisma.category.update({
            where: {
                id: +params.categoryId
            },
            data: { name },
        });

        return NextResponse.json(category);
    } catch (error) {
        return new NextResponse('Internal error', { status: 500 })
    }
}