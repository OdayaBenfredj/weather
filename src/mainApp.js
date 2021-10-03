import Search from './search'
import History from './history'
import * as React from 'react'
import { useSelector } from 'react-redux'
import Login from './login';

export default function MainApp() {
    const loginUser = useSelector(state => state.weathers.loginUser);
    const [compToRender, setCompToRender] = React.useState();

    React.useEffect(() => {
        console.log(loginUser, 'loginUser')
        if (loginUser) {
            setCompToRender(
            <>
                <Search />
                <History />
            </>
            );
        }
        else {
            setCompToRender(<Login />)
        }
    }, [loginUser])
    return <>
        { compToRender}
    </>
}