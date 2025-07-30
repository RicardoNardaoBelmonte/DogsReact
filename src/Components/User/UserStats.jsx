import React from 'react'
import Head from '../../help/Head.jsx';
import UseFetch from '../../Hooks/UseFetch.jsx';
import Loading from '../../help/Loading.jsx';
import Error from '../../help/Error.jsx';
import {GET_STATS} from '../../api/Api.jsx';
const UserStatsGraphics = React.lazy(() => import('./UserStatsGraphics.jsx'));
 
const UserStats = () => {

  const {data, error, loading, request} = UseFetch();

  React.useEffect(() => {
    async function getData(){
      const token = window.localStorage.getItem('token');
      const {url, options} = GET_STATS(token); 
      await request(url, options);
    }
    getData()
  }, [request])

  if(loading) return <Loading/>
  if(error) return <Error error={error}/>
  if(data)
    return (
      <React.Suspense fallback={<div></div>}>
        <Head title="Stats"/>
        <UserStatsGraphics data={data}/>
      </React.Suspense>
    ) 
  else return null

}

export default UserStats
