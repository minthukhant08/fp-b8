'use client'
import { signOut } from "next-auth/react";

export default function Dashbaord(){

    return <div>
        dashboard
        <button onClick={ () => signOut()}>Logout</button>
    </div>
}