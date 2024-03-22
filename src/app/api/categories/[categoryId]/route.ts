import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Params { params: { categoryId: string } };
 
export async function GET(req: NextRequest, { params }: Params) {
    try {
        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const category = await Prisma.category.findUnique({ where: { id: params.categoryId } })

        if (!category) {
            return new NextResponse("Category not found", { status: 404 })
        }
        return NextResponse.json(category)
    } catch (error) {
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    try {
        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const category = await Prisma.category.findUnique({ where: { id: params.categoryId } })

        if (!category) {
            return new NextResponse("Category not found", { status: 404 })
        }

        await Prisma.category.delete({
            where: {
                id: params.categoryId
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

        const existingCategory = await Prisma.category.findUnique({ where: { id: params.categoryId } })

        if (!existingCategory) {
            return new NextResponse("Category not found", { status: 404 })
        }

        const category = await Prisma.category.update({
            where: {
                id: params.categoryId
            },
            data: { name },
        });

        return NextResponse.json(category);
    } catch (error) {
        return new NextResponse('Internal error', { status: 500 })
    }
}