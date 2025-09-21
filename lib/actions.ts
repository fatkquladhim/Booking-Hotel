"use server"

import { prisma } from '@/lib/prisma';
import {ContactSchema, RoomSchema} from "@/lib/zod";
import { redirect } from 'next/navigation';
import { del } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

export const SaveRoom = async(image:string,prevState:unknown,formData:FormData)=>{
    if(!image) return {message: "Image is required"}

    const rawData ={
        name:formData.get("name"),
        description:formData.get("description"),
        capacity:formData.get("capacity"),
        price:formData.get("price"),
        amenities:formData.getAll("amenities"),
    }

    const ValidateFields = RoomSchema.safeParse(rawData);
    if(!ValidateFields.success){
        return {error:ValidateFields.error.flatten().fieldErrors}
    }

    const {name,description,capacity,price,amenities} = ValidateFields.data;

    try {
        await prisma.room.create({
            data: {
                name,
                description,
                capacity,
                price,
                image,
                RoomAmenities: {
                    createMany: {
                        data: amenities.map((item) => ({
                            amenitiesId: item,
                        })),
                    },
                },
            },
        });
    } catch (error) {
        console.log(error);
    }

    redirect("/admin/room");
};

export const ContactMessage = async (data: FormData) => {

    
    const ValidateFields = ContactSchema.safeParse({
        ...Object.fromEntries(data.entries())
    });
    if (!ValidateFields.success) {
        return{ error: ValidateFields.error.flatten().fieldErrors,}
    }

    const { name, email, subject, message } = ValidateFields.data;

    try {
        await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });
        return { message: "Contact message saved successfully." };
    } catch (error) {
        console.log("Error saving contact message:", error);
        return { error: "Failed to save contact message." };
    }
};

// UPDATE ROOM

export const UdateRoom = async(image:string,roomId:string,prevState:unknown,formData:FormData)=>{
    if(!image) return {message: "Image is required"}

    const rawData ={
        name:formData.get("name"),
        description:formData.get("description"),
        capacity:formData.get("capacity"),
        price:formData.get("price"),
        amenities:formData.getAll("amenities"),
    }

    const ValidateFields = RoomSchema.safeParse(rawData);
    if(!ValidateFields.success){
        return {error:ValidateFields.error.flatten().fieldErrors}
    }

    const {name,description,capacity,price,amenities} = ValidateFields.data;

    try {
        await prisma.$transaction([
            prisma.room.update({
                where: {id:roomId},
                data:{
                    name,
                    description,
                    image,
                    price,
                    capacity,
                    RoomAmenities:{
                        deleteMany:{}
                    }
                }
            }),
            prisma.roomAmenities.createMany({
                data:amenities.map((item)=> ({
                    roomId,
                    amenitiesId: item
                }))
            })
        ])
    } catch (error) {
        console.log(error);
    }
    revalidatePath("/admin/room")
    redirect("/admin/room");
};

// DELETE ROOM

export const deleteRoom = async (id:string, image:string) => {
    try{
        await del(image);
        await prisma.room.delete({
            where:{id},
        });
    } catch(error) {
        console.log(error);
    }
    revalidatePath("/admin/room");
}