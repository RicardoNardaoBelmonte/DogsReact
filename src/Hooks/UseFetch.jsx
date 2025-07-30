import React from 'react'

const UseFetch = () => {
    const [data, setData] = React.useState();
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState();

    const TranslateMessage = (message) => {
        if (!message) return 'An unknown error occurred';
      
        const firstChar = message.trim().charAt(0).toUpperCase();
      
        if (firstChar === 'U') return 'User already exists';
        if (firstChar === 'D') return 'Incomplete data';
      
        return 'An unknown error occurred';
      };

    const request = React.useCallback( async (url, options) => {
        let response;
        let json;
        try{
            setError(null);
            setLoading(true);
            response = await fetch(url, options);
            json = await response.json();
            if (response.ok === false){
                const translated = TranslateMessage(json.message);
                throw new Error(translated);
            } 
        }catch (error){
            json = null;
            setError(error.message);
        }finally{
            setLoading(false);
            setData(json);
            return {response, json};
        }
    }, []);
    
  return ({
      data, loading, error, request
    }
  ); 
}

export default UseFetch
