import {
Upload
} from "lucide-react";


interface Props{
 title:string;
 preview:string|null;
 onChange:(file:File)=>void;
}


const ImageUpload = ({
 title,
 preview,
 onChange
}:Props)=>{


return (

<div>

<p className="mb-2 font-medium">
{title}
</p>


<label
className="
cursor-pointer
block
rounded-2xl
border-2
border-dashed
border-zinc-300
dark:border-zinc-700
overflow-hidden
"
>


{
preview ?

<img
src={preview}
className="
w-full
h-48
object-cover
"
/>

:

<div className="
h-48
flex
flex-col
items-center
justify-center
text-zinc-500
">

<Upload/>

<span>
Upload image
</span>

</div>

}



<input
type="file"
hidden
accept="image/*"
onChange={
e=>{
const file=e.target.files?.[0];

if(file)
onChange(file);

}
}
/>


</label>


</div>

);

};


export default ImageUpload;