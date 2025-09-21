import { put, del } from "@vercel/blob";
import { request } from "http";
import { url } from "inspector";
import { NextResponse } from "next/server";

export const PUT =async (request: Request) => {
    const from = await request.formData();
    const file = from.get("file") as File;

    if(file.size === 0 || file.size === undefined) {
        return NextResponse.json({ message: "File size exceeds 10MB limit." }, { status: 400 });
    }

    if(file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ message: "File size exceeds 10MB limit." }, { status: 400 });
    }

    if(!file.type.startsWith("image/")) {
        return NextResponse.json({ message: "Only image files are allowed." }, { status: 400 });
    }

    const blob = await put(file.name, file, {
        access: "public",
        multipart: true,
    });

    return NextResponse.json({ url: blob.url });
}

export const DELETE = async (request:Request) => {
    const { searchParams} = new URL(request.url);
    const imageUrl = searchParams.get("imageUrl") as string;
    await del(imageUrl);
    return NextResponse.json({ status:200 })

}