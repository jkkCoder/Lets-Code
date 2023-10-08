import {useEffect , useState} from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../redux/storeHook"

const useAdmin = () => {
    const user = useAppSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if(!user.isAdmin){
            navigate('/')
        }
    },[])

    const [tabIndex, setTabIndex] = useState(1)

    const toggleTab = (name:string) => {
        if(name === 'QUESTION'){
            setTabIndex(1)
            return;
        }
        setTabIndex(2)
    }

    return {
        tabIndex, toggleTab
    }
}   


export default useAdmin;