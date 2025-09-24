import { ReactNode } from "react"

type PublicLayoutProps = {
    children: ReactNode
}
export default function PublicLayout ( { children } : PublicLayoutProps) {
    return <div className="h-[100vh] flex justify-center items-center bg-gray-950">
        {children}
    </div>
}   