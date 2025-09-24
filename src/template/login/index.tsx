'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import z from "zod"

export default function Login() {
    const route = useRouter()
    const loginSchema = z.object({
        email : z.email("Please enter email address."),
        password: z.string("Please enter password.")
    })
    const form = useForm< z.infer <typeof loginSchema >>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const login = (values: z.infer < typeof loginSchema >) => {
        console.log(values)
        signIn('credentials', {...values, redirect: false}).then(() => {
            route.push("/dashboard")
        })
    }
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <form>
                <FormField
                control={form.control}
                name="email"
                render={ ( { field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            >
            </FormField>
            <FormField
                control={form.control}
                name="password"
                render={ ( { field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Enter password" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            >
            </FormField>
            </form>
        </Form>

      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={form.handleSubmit(login)} className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}
