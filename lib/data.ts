import { auth } from "@/auth";
import { prisma } from "./prisma";
import { error } from "console";

export const getAmenities = async()=> {
    const session = await auth();
    if(!session || !session.user){
        throw new Error ("Unauthorized Access");
    }
    try {
        const result = await prisma.amenities.findMany();
        return result;
    } catch {
        console.log(error);
    }
}

export const getRooms = async()=> {
    try {
        const result = await prisma.room.findMany({
            orderBy: {createdAt: "desc"}
        });
        return result;
    } catch {
        console.log(error);
    }
}

export const getRoomsById  = async(roomId: string) => {
    try {
        const result = await prisma.room.findUnique({
           where: {id: roomId},
           include: {RoomAmenities: {select: {amenitiesId: true}}}
        });
        return result;
    } catch {
        console.log(error);
    }
}

export const getRoomsDetailById  = async(roomId: string) => {
    try {
        const result = await prisma.room.findUnique({
           where: {id: roomId},
           include: {
            RoomAmenities:{
                include: {
                    Amenities:{
                        select:{
                            name:true,
                        },
                    },
                },
            },
           },
        });
        return result;
    } catch {
        console.log(error);
    }
}