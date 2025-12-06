import Title from "../components/Title"
import { z } from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";


type FormData = {
  productName: string;
  price: number;
  category: "men" | "women" | "kids";
  type: "topwear" | "bottomwear";
  description: string;
};


const schema = z.object({
  productName: z.string()
    .min(1, "Product name is required")
    .min(3, "Product name must be at least 3 characters"),  
  price: z.number()
    .positive("Price must be a positive number"),
  category: z.enum(["men", "women", "kids"]),
  type: z.enum(["topwear", "bottomwear"]),
  description: z.string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
});



function AdminProduct() {

    const { register, handleSubmit, reset, formState:{errors} } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            productName: "",
            category: "men",
            type: "topwear",
            description: "",
        }
    })

    const onSubmit = (data: FormData) => {
        console.log('Submitted data:', data);
        reset();
    };

  return (
    <div className="pt-30 bg-linear-to-b from-gray-100 to-white min-h-screen">
        <div className="container bg-white rounded-lg shadow-md p-10 mx-auto max-sm:w-[90%] max-md:w-[70%] max-lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Title text1={"ADMIN"} text2={"PRODUCTS"} />
            <p className="text-gray-600 text-center">Manage your products here.</p>
            <div className="mt-10">
                <form action="/submit" method="post" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <label className="block text-gray-700 mb-2" htmlFor="productName">Product Name</label>
                        <input {...register("productName")} className="w-full p-2 border border-gray-300 rounded" type="text" id="productName" name="productName" placeholder="Product Name" />
                        <p className="text-[12px] text-red-600 font-semibold">{errors.productName?.message}</p>
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
                        <input {...register("price", { valueAsNumber: true })} className="w-full p-2 border border-gray-300 rounded" type="number" id="price" name="price" placeholder="Price" />
                        <p className=" text-[12px] font-semibold text-red-600">{errors.price?.message}</p>
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
                        <select {...register("category")} className="w-full p-2 border border-gray-300 rounded" id="category" name="category">
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="kids">Kids</option>
                        </select>
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-700 mb-2" htmlFor="type">Type</label>
                        <select {...register("type")} className="w-full p-2 border border-gray-300 rounded" id="type" name="type">
                            <option value="topwear">Topwear</option>
                            <option value="bottomwear">Bottomwear</option>
                        </select>
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
                        <textarea {...register("description")} className="w-full p-2 border border-gray-300 rounded" id="description" name="description" rows={4} placeholder="Product Description"/>
                        <p className="text-[12px] text-red-600 font-semibold">{errors.description?.message}</p>
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-700 mb-2" htmlFor="imageUrl">Upload Image</label>
                        <input className="w-full p-2 border border-gray-300 rounded" type="file" id="imageUrl" name="imageUrl" accept="image/*" />
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full" type="submit">Add Product</button>
                </form>
            </div>

        </div>
    </div>
  )
}

export default AdminProduct