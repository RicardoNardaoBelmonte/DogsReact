import React from 'react'
import styles from './FeedModal.module.css';
import UseFetch from '../../Hooks/UseFetch.jsx';
import { PHOTO_GET } from '../../api/Api.jsx';
import Error from '../../help/Error.jsx';
import Loading from '../../help/Loading.jsx';
import PhotoContent from '../Photo/PhotoContent.jsx';

const FeedModal = ({photo, setModalPhoto}) => {

    const {data, error, loading, request} = UseFetch();

    React.useEffect(() =>{
        const {url, options} = PHOTO_GET(photo.id);
        request(url, options);
    }, [photo, request]);

    function handleOutsideClick(e){
        if (e.target === e.currentTarget){
            setModalPhoto(null);
        }
    }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
        {error && <Error error={error}/>}
        {loading && <Loading/>}
        {data && <PhotoContent data={data}/>}
    </div>  
  );
}

export default FeedModal
