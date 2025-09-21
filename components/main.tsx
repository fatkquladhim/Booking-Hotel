import Card from "@/components/card";
import { getRooms } from "@/lib/data";
import { notFound } from "next/navigation";

const Main = async () => {
  const rooms = await getRooms();
  if(!rooms) return notFound;
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
      {rooms.map((room)=> (
        <Card room={room} key={room.id}/>
      ))}
      </div>
    </div>
  )
}

export default Main