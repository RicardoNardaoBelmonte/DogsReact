import React from 'react'
import styles from './UserPhoto.module.css';
import Input from '../Forms/Input.jsx'; 
import Button from '../Forms/Button.jsx'; 
import UseForm from '../../Hooks/UseForm.jsx';
import UseFetch from '../../Hooks/UseFetch.jsx';
import { PHOTO_POST } from '../../api/Api.jsx';
import Error from '../../help/Error.jsx';
import { useNavigate } from 'react-router-dom';
import Head from '../../help/Head.jsx';

const UserPhotoPost = () => {

  const nome = UseForm();
  const peso = UseForm('number');
  const idade = UseForm('number');
  const [img, setImg] = React.useState({});
  const {data, error, loading, request } = UseFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);


  function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token');
    const {url, options} = PHOTO_POST(formData, token);
    request(url, options);
  }

  function handleImgChange({target}){
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title = "PostPhotos"/>
      <form onSubmit={handleSubmit}>
        <Input label="Name" type="text" name="nome" {...nome}/>
        <Input label="weight" type="number" name="peso" {...peso}/>
        <Input label="Age" type="number" name="idade" {...idade}/>
        <input className={styles.file} type="file" name="img" id="img" onChange={handleImgChange}/>
        {loading ? <Button disabled>Loading...</Button> : <Button>Submit</Button>}
        <Error error={error}/>
      </form>
      <div>
        {img.preview && <div className={styles.preview} style={{backgroundImage : `url('${img.preview}')`}}></div>}
      </div>
    </section>
  )
}

export default UserPhotoPost
