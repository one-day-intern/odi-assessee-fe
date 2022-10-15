import { Dispatch, SetStateAction, useEffect, useState } from "react"

const useLocalStorage = (key: string): [string | null, Dispatch<SetStateAction<string | null>>] => {

    
    const [value, setValue] = useState<string | null>("");
    
    useEffect(() => {
        const valueFromLocalStorage = localStorage.getItem(key);
        setValue(valueFromLocalStorage);
    }, [key]);
    
    useEffect(() => {
        if (value === "") return;

        if (value == null) {
            localStorage.removeItem(key);
            return;
        }
        
        localStorage.setItem(key, value);
        console.log("item saved", key)
        console.warn(localStorage.getItem(key));
    }, [key, value]);

    return [value, setValue]
    
}

export { useLocalStorage }