import type React from "react";
import type { IUser } from "../types/types";

export function getFormData(e: React.FormEvent<HTMLFormElement>) : Record<string, string | number> {
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string|number> = {};
    formData.forEach((val,key) => {
        data[key] = val.toString();
    });

    return data;
}

export function getLocalUserData() : IUser | null {
    const localUserData = localStorage.getItem('user');
    if(localUserData) {
        return JSON.parse(localUserData);
    }
    return null;
}