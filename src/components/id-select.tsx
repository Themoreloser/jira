import { Select } from "antd";
import React from "react";

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps,'value' | 'onChange' | 'options'>{
    value :string | number | null | undefined,
    onChange:(value?: number)=>void,
    defaultOptionName?:string,
    options?: {name:string,id:number}[]
}

/**
 *
 * value可以传入多种类型的值
 * onChange只会回调number|undefined类型
 * 当isNaN(Number(value))为ture
 */
export const Idselect = (props:IdSelectProps) =>{
    const {value,onChange,defaultOptionName,options,...restProps} = props
    return <Select
    value={options?.length ? toNumber(value) : 0}
    onChange={value => onChange(toNumber(value) || undefined)}
    {...restProps}
    >
        {
            defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
        }
        {
            options?.map(option => <Select.Option key={option.id} value={toNumber(option.id)}>{option.name}</Select.Option>)
        }
    </Select>
}

const toNumber = (value:unknown) => isNaN(Number(value)) ? 0 : Number(value)