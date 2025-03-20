import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export const cn = (...args: any) => {
    return twMerge(clsx(args))
}