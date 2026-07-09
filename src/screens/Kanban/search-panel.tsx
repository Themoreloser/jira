import { Button, Input } from "antd"
import { Row } from "../../components/lib"
import { useSetUrlSearchParam} from "../../util/url"
import { useTasksSearchParams } from "./util"
import { Userselect } from "../../components/user-select"
import { TaskTypeSelect } from "../../components/task-type-select"

export const SearchPanel = ()=>{
    const searchParams = useTasksSearchParams()
    const setSearchParams = useSetUrlSearchParam()
    const reset = ()=>{
        setSearchParams({
        typeId: undefined,
        processorId: undefined,
        tagId:undefined,
        name:undefined
        })
    }
    return <Row marginBottom={4} gap={true}>
        <Input style={{width:'20rem'}} placeholder={'任务名'} value={searchParams.name}
         onChange={evt =>setSearchParams({name:evt.target.value})}/>
         <Userselect defaultOptionName={'经办人'} value={searchParams.processorId} 
         onChange={value =>setSearchParams({processorId:value})}/>
        <TaskTypeSelect defaultOptionName={'类型'} value={searchParams.typeId}
                        onChange={value=>setSearchParams({typeId:value})}/>
        <Button onClick={reset}>清除筛选器</Button>
    </Row>
}