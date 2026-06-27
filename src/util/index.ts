import { useEffect, useRef, useState } from "react"

export const isFalsy = (value: unknown): boolean => value === 0 ? false : !value

export const cleanObject = (object: Record<string, unknown>) =>{
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
export const useDebounce = <T>(value: T, delay: number = 0) => {
    const [debounce,setDebounce] = useState(value)
    useEffect(()=>{
        const timeOut = setTimeout(()=>setDebounce(value),delay)
        return ()=> clearTimeout(timeOut)
    },[value,delay])
    return debounce
}
export const useArray = <T>(initailArray:T[])=>{
    const [value,setValue] = useState(initailArray)
    return {
        value,
        setValue,
        add:(item:T)=>setValue([...value,item]),
        clear:()=>setValue([]),
        removeIndex:(index:number)=>{
            const copy = [...value]
            copy.splice(index,1)
            setValue(copy)
        }

    }
}

export const useDocumentTitle = (title:string,keepUnmount:boolean = true)=>{
    const oldtitle = useRef(document.title).current
    useEffect(()=>{
        document.title=title
    },[title])
    useEffect(()=>{
        return ()=>{
            if(!keepUnmount){
                document.title = oldtitle
            }
        } 
    },[keepUnmount,oldtitle])
}

export const resetRoute = () => window.location.href = window.location.origin