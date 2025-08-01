import React from 'react'
import { USER_GET, TOKEN_POST, TOKEN_VALIDATE_POST } from './api/Api';
import { useNavigate } from 'react-router-dom';

export const userContext = React.createContext();

export const UserStorage = ({children}) => {

    const [data, setData] = React.useState(null);
    const [login, setLogin] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    const userLogout = React.useCallback(async function (){
        setData(null);
        setError(null);
        setLogin(false);
        setLoading(false);
        window.localStorage.removeItem('token');
    }, [])

    async function getUser(token){
        const {url, options} = USER_GET(token);
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
        setLogin(true);
    }

    async function userLogin(username, password){
        try{
            setError(null);
            setLoading(true);
            const {url, options} = TOKEN_POST({username, password});
            const response = await fetch(url, options);
            if(!response.ok) throw new Error(`Error: Usuário inválido`)
            const {token} = await response.json();
            window.localStorage.setItem('token', token);
            await getUser(token); 
            navigate('/conta');
        } catch (error){
            setError(error.message);
            setLogin(false);
        }finally{
            setLoading(false);
        }
    }
    
    React.useEffect(() => {
        async function autoLogin(){
            const token = window.localStorage.getItem('token');
            if (token) {
                try{
                    setError(null);
                    setLoading(true);
                    const {url, options} = TOKEN_VALIDATE_POST(token);
                    const response = await fetch(url, options);
                    if (!response.ok) throw new Error('Token inv�lido')
                    await getUser(token);
                }catch (error){
                    userLogout();
                }finally{
                    setLoading(false);
                }
            }else{
                setLogin(false);
            }
        }
        autoLogin();
    }, [userLogout]);

  return (
    <userContext.Provider value={{userLogin, userLogout,data, error, loading, login}}>{children}</userContext.Provider>)
}


