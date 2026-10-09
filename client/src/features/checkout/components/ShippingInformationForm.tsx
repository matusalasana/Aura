import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import {
  checkoutSchema,
  type CheckoutFormData,
} from "@/features/checkout/schemas";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Props {
  isPending: boolean;
  onSubmit: (data: CheckoutFormData) => void;
}

const ShippingInformationForm = ({onSubmit, isPending}: Props) => {
  const { data: user } = useCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: "",
      address: "",
      city: "Addis Ababa",
      subcity: "",
      notes: "",
    },
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border p-6 bg-foreground">
      
      <div>
        <h2 className="text-xl font-semibold subheading">
          Delivery Information
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Enter contact information and the address where your order should be delivered.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="label">Name</Label>
        <Input
          id="name"
          {... register("name")}
          className="input"
          placeholder="Abebe Kebede"
          type="text"
        />
        {errors.name && (
          <p className="text-destructive mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="label">Email</Label>
        <Input
          id="email"
          {... register("email")}
          className="input"
          placeholder="example@gmail.com"
          type="email"
        />
        {errors.email && (
          <p className="text-destructive mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="label">Phone Number</Label>
        <Input
          id="phone"
          {... register("phone")}
          className="input"
          placeholder="+2519xxx or 09xxx"
          type="text"
        />
        {errors.phone && (
          <p className="text-destructive mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="label">Address</Label>
        <Input
          id="address"
          {... register("address")}
          className="input"
          placeholder="Street or Area"
          type="text"
        />
        {errors.address && (
          <p className="text-destructive mt-1">
            {errors.address.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city" className="label">City</Label>
        <Input
          id="city"
          {... register("city")}
          className="input"
          placeholder="Addis Ababa"
        />
        {errors.city && (
          <p className="text-destructive mt-1">
            {errors.city.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subcity" className="label">Sub-city</Label>
        <Input
          id="subcity"
          {... register("subcity")}
          className="input"
          placeholder="Bole"
        />
        {errors.subcity && (
          <p className="text-destructive mt-1">
            {errors.subcity.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="label">Additional Notes about the address</Label>
        <textarea
          id="notes"
          {... register("notes")}
          className="input"
          placeholder="Anything that can help"
        />
        {errors.notes && (
          <p className="text-destructive mt-1">
            {errors.notes.message}
          </p>
        )}
      </div>

      <Button className="w-full" type="submit">{isPending ? "Creating order..." : "Place Order"}</Button>
      
    </form>
  );
};

export default ShippingInformationForm;