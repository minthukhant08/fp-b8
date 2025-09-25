import { ReactNode } from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

type PublicLayoutProps = {
    children: ReactNode
}
export default async function PublicLayout ( { children } : PublicLayoutProps) {
    const session = await getServerSession(authOptions)
    if (session){
        redirect("/employees")
    }
    return <div className="h-[100vh] flex justify-center items-center bg-gray-950">
        {children}
    </div>
}   