import { useEffect, useState } from "react"

export const isFalsy = (value)=> value === 0 ?false:!value

export const cleanObject = (object:object) =>{
    const result = {...object}
    Object.keys(result).forEach(key=>{
        const value = result[key]
        if(isFalsy(value)){
            delete result[key]
        }
    })
    return result
}
export const useMount = (callback:()=>void) =>{
    useEffect(()=>{
        callback()
    },[])
}
export const useDebounce = (value,delay?:number)=>{
    const [debounce,setDebounce] = useState(value)
    useEffect(()=>{
        const timeOut = setTimeout(()=>setDebounce(value),delay)
        return ()=> clearTimeout(timeOut)
    },[value,delay])
    return debounce
}