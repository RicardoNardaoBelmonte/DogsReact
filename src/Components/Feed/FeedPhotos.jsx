import React from 'react'
import FeedPhotoItem from './FeedPhotoItem.jsx';
import UseFetch from '../../Hooks/UseFetch.jsx';
import { PHOTOS_GET } from '../../api/Api.jsx';
import Error from '../../help/Error.jsx';
import Loading from '../../help/Loading.jsx';
import styles from './FeedPhotos.module.css';

const FeedPhotos = ({page, user, setModalPhoto, setInfinite}) => {

    const {data, loading, error , request } = UseFetch();

    React.useEffect(() => {
        async function fetchPhotos(){
            const total = 3;
            const {url, options} = PHOTOS_GET({page, total, user});
            const {response, json} = await request(url, options);
            if(response && response.ok && json.length < total) setInfinite(false);
        }
        fetchPhotos();
    },[request, user, page, setInfinite]);

    if(error) return <Error error={error}/>;
    if (loading) return <Loading/>;
    if (data)
        return (
            <ul className={`${styles.feed} animeLeft`}>
                {data.map((photo) => <FeedPhotoItem key={photo.id} photo={photo} setModalPhoto={setModalPhoto}/>)}
            </ul>
        );

    else return null
}

export default FeedPhotos   
