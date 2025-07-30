import React from 'react'
import svg from '../../Assets/enviar.svg';
import UseFetch from '../../Hooks/UseFetch';
import { COMMENT_POST } from '../../api/Api';
import Error from '../../help/Error.jsx';
import styles from './PhotoCommentsForm.module.css';

const PhotoCommentsForm = ({id, setComments, single}) => {
    const {request, error} = UseFetch();
    const [comment, setComment] = React.useState(''); 

    async function handleSubmit(e){
        e.preventDefault();
        const token = window.localStorage.getItem('token');
        const {url, options} = COMMENT_POST(id, {comment}, token);
        const {response, json} =await request(url, options);
        if (response.ok){
            setComment('');
            setComments((comments) => [...comments, json]);
        }
    }

  return (
    <form className={`${styles.form} ${single ? styles.single : ''}`} onSubmit={handleSubmit}>
        <textarea className={styles.textarea} value={comment} placeholder='Comment...' onChange={({target}) => setComment(target.value)} id='comment' name='comment'></textarea>
        <button onClick={(e) => e.currentTarget.blur()} className={styles.button}><img src={svg}/></button>
        <Error error={error}/>
    </form>
  )
}

export default PhotoCommentsForm
