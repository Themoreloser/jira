
import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from ".";

interface State<D>{
    error: Error | null;
    data: D | null;
    status: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null>={
    status:'idle',
    data:null,
    error:null
}

const defaultConfig = {
    throwOnError:false
}

const useSafeDispatch = <T>(dispatch:(...args:T[]) =>void)=>{
    const mountedRef = useMountedRef()
    return useCallback((...args:T[])=>(mountedRef.current ? dispatch(...args) : void 0),[dispatch,mountedRef])
}

export const useAsync =<D>(initialState?:State<D>, initialConfig?: typeof defaultConfig)=>{
    const config = {...defaultConfig, ...initialConfig}
    const [state,dispatch] = useReducer((state:State<D>,action:Partial<D>)=>({...state,...action}),{
        ...defaultInitialState,
        ...initialState
    })
    const safeDispatch = useSafeDispatch(dispatch)
    // useState直接传入函数的含义是：惰性初始化；所有要用useState保存函数，不能直接传入函数
    const [retry,setRetry] = useState(()=>()=>{

    })

    const setData = useCallback((data:D) =>safeDispatch({
        data,
        status:'success',
        error:null
    }),[safeDispatch])

    const setError = useCallback((error:Error) => safeDispatch({
        error,
        status:'error',
        data:null
    }),[safeDispatch])
    // run来触发异步请求
    const run = useCallback((promise:Promise<D>,runConfig?:{retry:()=>Promise<D>}) =>{
        if(!promise || !promise.then){
            throw new Error('请传入 Promise 类型数据')
        }
        setRetry(()=>()=>{
            if(runConfig?.retry){
                   run(runConfig?.retry(),runConfig)
            }
         
        })
        safeDispatch({stat:'loading'})
        return promise.then(data=>{
            setData(data)
            return data
            // catch会消化异常，如果不主动抛出，外面是接受不到异常的
        }).catch(error=>{
            setError(error)
            if(config.throwOnError)
            return Promise.reject(error)
        return error
        })
    },[config.throwOnError, setData,setError,safeDispatch])
    

    return{
        isIdle:state.status === 'idle',
        isLoading: state.status === 'loading',
        isError:state.status === 'error',
        isSuccess:state.status === 'success',
        run,
        setData,
        setError,
        // retry被调用重新跑一遍run，让state刷新一遍
        retry,
        ...state
    }
}