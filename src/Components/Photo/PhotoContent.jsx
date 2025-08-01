import React from 'react'
import styles from './PhotoContent.module.css'
import { Link } from 'react-router-dom';
import PhotoComments from './PhotoComments.jsx';
import { userContext } from '../../UserContext.jsx';
import PhotoDelete from './PhotoDelete.jsx';
import Image from '../../help/Image.jsx';

const PhotoContent = ({data, single}) => {

    const user = React.useContext(userContext)
    const {photo, comments} = data;

  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
        <div className={styles.img}>
            <Image src={photo.src} alt={photo.title}/>
        </div>
        <div className={styles.details}>
            <div>
                <p className={styles.author}>
                    {user.data && user.data.username === photo.author ? 
                    <PhotoDelete id={photo.id}/> : 
                    <Link to={`/profile/${photo.author}`}>@{photo.author}</Link>}
                    <span className={styles.views}>{photo.acessos}</span>
                </p>

                <h1 className='title'><Link to={`/photo/${photo.id}`}>{photo.title}</Link></h1>
                <ul className={styles.attributes}>
                    <li>{photo.peso}kg</li>
                    <li>{photo.idade}years</li>
                </ul>
            </div>
        </div>
      <PhotoComments single={single} id={photo.id} comments={comments}/>
    </div>
  )
}
     
export default PhotoContent
