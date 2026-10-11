import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  KeyRound,
  LoaderCircle,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SignoutButton from "@/components/common/SignoutButton";

const accountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(254, "Email address is too long"),
});

type AccountFormValues = z.infer<typeof accountSchema>;

const AccountPage = () => {
  const { user, isLoading } = useCurrentUser();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // Populate the form when the authenticated user becomes available.
  useEffect(() => {
    if (!isLoading && user) {
      reset({
        name: user.name ?? "",
        email: user.email ?? "",
      });
    }
  }, [user, isLoading, reset]);

  const onSubmit = async (values: AccountFormValues) => {
    try {
      // TODO: Replace with your actual profile update mutation/API.
      // Example:
      // await updateProfile(values);

      console.log("Validated account details:", values);

      setError("root.server", {
        type: "manual",
        message:
          "Profile updates are not connected yet. No changes have been saved.",
      });
    } catch {
      setError("root.server", {
        type: "server",
        message: "Unable to update your account. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-background text-foreground">
        <div className="flex items-center gap-3 text-muted-foreground">
          <LoaderCircle className="size-5 animate-spin" />
          <span className="text-sm">Loading account...</span>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-background px-4 text-foreground">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Account unavailable</CardTitle>
            <CardDescription>
              Sign in to view and manage your account details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/sign-in">Go to Signin</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="-ml-2 mb-4 text-muted-foreground"
          >
            <Link to="/">
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <UserRound className="size-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Account settings
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your personal information and account preferences.
              </p>
            </div>
          </div>
        </div>

        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Personal information</CardTitle>
            <CardDescription>
              Review and update your account details.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="account-name">Full name</Label>
                  <Input
                    id="account-name"
                    autoComplete="name"
                    placeholder="Your full name"
                    aria-invalid={!!errors.name}
                    aria-describedby={
                      errors.name ? "account-name-error" : undefined
                    }
                    {...register("name")}
                  />
                  {errors.name && (
                    <p
                      id="account-name-error"
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account-email">Email address</Label>
                  <Input
                    id="account-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "account-email-error" : undefined
                    }
                    {...register("email")}
                  />
                  {errors.email && (
                    <p
                      id="account-email-error"
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {errors.root?.server && (
                <p className="rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive" role="alert">
                  {errors.root.server.message}
                </p>
              )}

              <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  disabled={!isDirty || isSubmitting}
                >
                  Discard changes
                </Button>

                <Button type="submit" disabled={!isDirty || isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Save changes
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Account details */}
        <Card>
          <CardHeader>
            <CardTitle>Account overview</CardTitle>
            <CardDescription>
              Information and security options for your Aura account.
            </CardDescription>
          </CardHeader>

          <CardContent className="divide-y divide-border">
            <div className="flex items-start gap-4 py-4 first:pt-0">
              <div className="rounded-xl bg-muted p-2.5 text-muted-foreground">
                <Mail className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium">Email address</p>
                <p className="mt-1 break-words text-sm leading-6 text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 py-4">
              <div className="rounded-xl bg-muted p-2.5 text-muted-foreground">
                <ShieldCheck className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium">Account security</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Keep your login credentials private and secure.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 py-4 last:pb-0 sm:flex-row sm:items-center">
              <div className="rounded-xl bg-muted p-2.5 text-muted-foreground">
                <KeyRound className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium">Password and sign-in</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Manage your password using the authentication options
                  available for your account.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                asChild
                className="shrink-0"
              >
                <Link to="/forgot-password">Reset password</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sign out */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle>Sign out</CardTitle>
            <CardDescription>
              Sign out of your Aura account on this device.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              You can sign in again whenever you need access.
            </p>

            <div className="w-full sm:w-44">
              <SignoutButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AccountPage;