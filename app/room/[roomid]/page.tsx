import { Metadata } from "next";
import RoomDetail from "@/components/room-detail";
import { Suspense } from "react";


export const metadata:Metadata ={
    title:"Room Detail"
}

const RoomDetailPage = async({
    params
}:{
    params:Promise<{roomId:string}>
}) => {
    const roomId = (await params).roomId;

  return (
    <div>
        <Suspense fallback={<p>Loading.....</p>}>
           <RoomDetail roomId={roomId}/> 
        </Suspense>
        
    </div>
  )
}

export default RoomDetailPage