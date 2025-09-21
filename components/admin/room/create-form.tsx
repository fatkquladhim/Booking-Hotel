"use client"

import { useRef,useState,useTransition } from "react";
import { useActionState } from "react";
import { SaveRoom } from "@/lib/actions";
import {type PutBlobResult } from "@vercel/blob";
import {IoCloudUploadOutline,IoTrashOutline} from "react-icons/io5";
import Image from "next/image";
import {BarLoader} from "react-spinners";
import { Amenities } from "@prisma/client";
import clsx from "clsx";

const CreateForm = ({amenities}: {amenities: Amenities[]}) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");
    const [pending,starTransition] = useTransition();

    const handleUpload = () => {
        if(!inputFileRef.current?.files) return null; 
            const file = inputFileRef.current.files[0];
            const formData = new FormData();
            formData.append("file",file);

            starTransition(async()=> {
            try {
                const response = await fetch("/api/upload", {
                    method: "PUT",
                    body: formData,
                });
                const data = await response.json();
                if(response.status === 200) {
                    setImage(data.url);
                    setMessage("File uploaded successfully");
                }
                const img: PutBlobResult = data;
                setImage(img.url);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
            });
        };

const deleteimage = (image: string)=> {
    starTransition(async()=> {
        try{
            await fetch(`/api/upload/?imageUrl=${image}`,{
                method: "DELETE"
            });
            setImage("")
        } catch (error){
            console.log(error);
        }
    })
}

    const [state, fromAction, isPending] = useActionState(SaveRoom.bind(null,image), null)

    return (
    <form action={fromAction}>
        <div className="grid md:grid-cols-12 gap-5 ">
            <div className="col-span-8 bg-white p-4 rounded-md shadow">
                <div className="mb-4">
                    <input type="text" name="name" className="py-2 px-4 border border-gray-400 rounded-sm w-full" placeholder="Room Name..."/>
                    <div aria-live="polite"  aria-atomic="true">
                        <span className="text-sm text-red-500 mt-2">{state?.error?.name}</span>
                    </div>
                </div>
                <div className="mb-4">
                    <textarea name="description" className="py-2 px-4 border border-gray-400 rounded-sm w-full " placeholder="Description" rows={8}></textarea>
                    <div aria-live="polite"  aria-atomic="true">
                        <span className="text-sm text-red-500 mt-2">{state?.error?.description}</span>
                    </div>
                </div>
                <div className="mb-4 grid md:grid-cols-3">
                    {amenities.map((item)=>
                        <div className="flex items-center mb-4" key={item.id}>
                        <input type="checkbox" name="amenities" defaultValue={item.id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                        <label className="ms-2 text-sm font-medium capitalize text-gray-900">{item.name}</label>
                    </div>
                    )}
                    <div aria-live="polite"  aria-atomic="true">
                        <span className="text-sm text-red-500 mt-2">{state?.error?.amenities}</span>
                    </div>
                </div>
            </div>
            <div className="col-span-4 bg-white p-4 rounded-md shadow">
                <label htmlFor="input-file" className="flex flex-col  mb-4 items-center justify-center aspect-video border-2 border-dashed rounded-md cursor-pointer border-gray-300 bg-gray-50 relative">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500 z-10">
                            {pending ? <BarLoader /> : null}
                            {image ? (
                                <button type="button" onClick={()=> deleteimage(image)} className="flex items-center justify-center bg-transparent size-6 rounded-sm absolute right-1 top-1 text-white hover:bg-red-400">
                                <IoTrashOutline className="size-4 text-transparent hover:text-white"/>
                            </button>
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                 <IoCloudUploadOutline className="size-8" />
                                <p className="mb:1 text-sm font-bold">Select Image</p>
                                {message ? (
                                    <p className="text-red-500 text-xs">{message}</p>
                                ) : (
                                    <p className="text-xs">SVG, PNG, JPG,GIF, or Others (Max: 4MB)</p>
                                )} 
                        </div>
                            )}
                    </div>
                    {!image ?(
                        <input type="file" ref={inputFileRef} onChange={handleUpload} id="input-file" className="hidden" />
                    ):(
                        <Image src={image} alt="image" width={640} height={360} className="rounded-md absolute aspect-video object-cover"/>
                    )}
                    
                </label>
                <div className="mb-4">
                    <input type="text" name="capacity" className="py-2 px-4 border border-gray-400 rounded-sm w-full" placeholder="Capacity..."/>
                    <div aria-live="polite"  aria-atomic="true">
                        <span className="text-sm text-red-500 mt-2">{state?.error?.capacity}</span>
                    </div>
                </div>
                <div className="mb-4">
                    <input type="text" name="price" className="py-2 px-4 border border-gray-400 rounded-sm w-full" placeholder="Price..."/>
                    <div aria-live="polite"  aria-atomic="true">
                        <span className="text-sm text-red-500 mt-2">{state?.error?.price}</span>
                    </div>
                </div>
                {/* general message */}
                {state?.message ?(
                    <div className="mb-4 bg-red-200 p-2">
                        <span className="text-sm text-gray-600 mt-2">{state.message}</span>
                    </div>
                ) :null}
                <button type="submit" disabled={isPending}
                className={clsx("py-2.5 px-6 md:px-10 text-lg bg-orange-400 hover:bg-amber-500 text-white w-full font-semibold cursor-pointer",{
                    "opacity-50 cursor-progress" : isPending,
                }
                    
                )}>{isPending? "saving..." : "save"}</button>
            </div>
        </div>
    </form>
  )
};

export default CreateForm