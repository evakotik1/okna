"use client";

import { authClient } from "@/app/lib/client/auth-client";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SignOut() {
    useEffect(() => {
        const logout = async () => {
            try {
                await authClient.signOut();
                toast("Вы вышли из аккаунта!");
                window.location.href = "/";
            } catch {
                toast("Ошибка выхода!");
                window.location.href = "/";
            }
        };
        
        logout();
    }, []);

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-white">
            <div className="w-sm aspect-square bg-black/30 rounded-sm p-4">
                <h1 className="text-xl font-bold text-center mb-4">Выход</h1>
                <p className="text-center">Выход из аккаунта...</p>
            </div>
        </div>
    );
}