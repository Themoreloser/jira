
import { useState } from "react";

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

export const useAsync =<D>(initialState?:State<D>, initialConfig?: typeof defaultConfig)=>{
    const config = {...defaultConfig, ...initialConfig}
    const [state,setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    // useState直接传入函数的含义是：惰性初始化；所有要用useState保存函数，不能直接传入函数
    const [retry,setRetry] = useState(()=>()=>{

    })

    const setData = (data:D) =>setState({
        data,
        status:'success',
        error:null
    })

    const setError = (error:Error) => setState({
        error,
        status:'error',
        data:null
    })
    // run来触发异步请求
    const run = (promise:Promise<D>,runConfig?:{retry:()=>Promise<D>}) =>{
        if(!promise || !promise.then){
            throw new Error('请传入 Promise 类型数据')
        }
        setRetry(()=>()=>{
            if(runConfig?.retry){
                   run(runConfig?.retry(),runConfig)
            }
         
        })
        setState(prev =>({...prev, status:'loading'}))
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
    }
    

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