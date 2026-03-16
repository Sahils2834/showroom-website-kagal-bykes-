import { useState } from "react";

export default function Bike360Viewer(){

const [angle,setAngle]=useState(1)

return(

<div className="text-center">

<h2 className="text-3xl font-bold mb-6">
360° Bike View
</h2>

<img
src={`/images/bike360/${angle}.png`}
className="mx-auto h-80"
/>

<input
type="range"
min="1"
max="36"
value={angle}
onChange={(e)=>setAngle(e.target.value)}
className="w-full mt-6"
/>

</div>

)

}