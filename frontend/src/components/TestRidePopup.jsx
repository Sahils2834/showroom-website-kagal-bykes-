import { useState } from "react";

export default function TestRidePopup(){

const [open,setOpen]=useState(false)

return(

<div>

<button
onClick={()=>setOpen(true)}
className="bg-red-500 text-white px-6 py-3 rounded-lg"
>
Book Test Ride
</button>

{open && (

<div className="fixed inset-0 bg-black/60 flex items-center justify-center">

<div className="bg-white p-8 rounded-xl">

<h2 className="text-2xl font-bold mb-4">
Book Test Ride
</h2>

<input
placeholder="Your Name"
className="border p-3 w-full mb-3"
/>

<input
placeholder="Phone"
className="border p-3 w-full mb-3"
/>

<button className="bg-red-500 text-white px-4 py-2 rounded">
Submit
</button>

</div>

</div>

)}

</div>

)

}