import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, MapPin, Truck } from "lucide-react";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import {
  checkoutSchema,
  type CheckoutFormData,
} from "@/features/checkout/schemas";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  isPending: boolean;
  onSubmit: (data: CheckoutFormData) => void;
}

const ShippingInformationForm = ({ onSubmit, isPending }: Props) => {
  const { user } = useCurrentUser();

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
    <Card className="rounded-2xl">
      <CardHeader className="space-y-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Truck className="size-5" />
        </div>

        <div>
          <CardTitle className="text-xl">Delivery information</CardTitle>
          <CardDescription className="mt-2 leading-6">
            Enter your contact details and delivery address so your order
            reaches you.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          aria-busy={isPending}
          noValidate
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                autoComplete="name"
                placeholder="Abebe Kebede"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name")}
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="example@gmail.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+251 9XX XXX XXX"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                {...register("phone")}
              />
              {errors.phone && (
                <p id="phone-error" className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Street or area</Label>
              <Input
                id="address"
                autoComplete="street-address"
                placeholder="Street, building, or nearby landmark"
                aria-invalid={!!errors.address}
                aria-describedby={
                  errors.address ? "address-error" : undefined
                }
                {...register("address")}
              />
              {errors.address && (
                <p id="address-error" className="text-sm text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                autoComplete="address-level2"
                placeholder="Addis Ababa"
                aria-invalid={!!errors.city}
                aria-describedby={errors.city ? "city-error" : undefined}
                {...register("city")}
              />
              {errors.city && (
                <p id="city-error" className="text-sm text-destructive">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subcity">Sub-city</Label>
              <Input
                id="subcity"
                placeholder="Bole"
                autoComplete="address-level3"
                aria-invalid={!!errors.subcity}
                aria-describedby={
                  errors.subcity ? "subcity-error" : undefined
                }
                {...register("subcity")}
              />
              {errors.subcity && (
                <p id="subcity-error" className="text-sm text-destructive">
                  {errors.subcity.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">
              Delivery instructions{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <Textarea
              id="notes"
              rows={3}
              placeholder="Nearby landmarks, directions, or other helpful details..."
              aria-invalid={!!errors.notes}
              aria-describedby={errors.notes ? "notes-error" : undefined}
              {...register("notes")}
            />
            {errors.notes && (
              <p id="notes-error" className="text-sm text-destructive">
                {errors.notes.message}
              </p>
            )}
          </div>

          <div className="flex items-start gap-2 rounded-xl bg-muted/50 p-3 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            <p>
              Please provide accurate directions and a reachable phone number
              to help with delivery.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Creating order...
              </>
            ) : (
              "Place order"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ShippingInformationForm;