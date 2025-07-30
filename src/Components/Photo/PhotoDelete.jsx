import React from 'react'
import styles from './PhotoDelete.module.css'
import { PHOTO_DELETE } from '../../api/Api';
import UseFetch from '../../Hooks/UseFetch';

const PhotoDelete = ({id}) => {

    const {loading, request} = UseFetch();

    async function handleClick(){
        const confirm = window.confirm('Are you sure you want delete this post?')
        const token = window.localStorage.getItem('token');
        const {url, options} = PHOTO_DELETE(id, token);
        const {response, json} =  await request(url, options);
        console.log(response);
        console.log(json);
        if (response.ok) window.location.reload();
    }

  return (
    <>
        {loading ? <button disabled className={styles.delete}>Delete</button> : 
        <button onClick={handleClick} className={styles.delete}>Delete</button>}
    </>
  )
}

export default PhotoDelete
