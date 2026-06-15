import { SearchPanel } from './search-list'
import { List } from './list'
import { useState,useEffect } from 'react'
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
export  const ProjectListScreen = () => {
    const [users,setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [listData, setListData] = useState([])
    useEffect(() => {
        fetch(`${apiUrl}/projects`).then(async response => {
            if (response.ok) {
                setListData(await response.json())
            }
        }).catch(error => console.error('获取项目列表失败:', error))
    },[])
    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        }).catch(error => console.error('获取用户列表失败:', error))
    },[])
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List projects={listData} users={users} />
    </div>
}
