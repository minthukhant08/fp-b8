import { ReactNode } from "react";
import { getServerSession } from "next-auth"

export default async function PrivateLayout( { children } : { children: ReactNode}) {
    const session = await getServerSession()
    console.log(session, 'session')
    return <>{children}</>
}