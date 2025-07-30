import React from 'react'
import { useParams } from 'react-router-dom'
import UseFetch from '../../Hooks/UseFetch';
import { PHOTO_BYID_GET } from '../../api/Api';
import Error from '../../help/Error';
import Loading from '../../help/Loading';
import PhotoContent from './PhotoContent';
import Head from '../../help/Head.jsx';

const Photo = () => {

    const {id} = useParams();

    const {data, loading, error, request} = UseFetch();

    React.useEffect(() => {

        const {url, options} = PHOTO_BYID_GET(id);
        request(url, options);
    }, [request, id]);

    if(error) return <Error error={error}/>
    if(loading) return <Loading/>
    if(data) return <section className="container mainContainer">
        <Head title={data.photo.title}/>
        <PhotoContent single={true} data={data}/>
    </section>
}

export default Photo
