import React from 'react'
import FeedModal from './FeedModal.jsx';
import FeedPhotos from './FeedPhotos.jsx';
import PropTypes from 'prop-types';

const Feed = ({user}) => {

  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true); 

  React.useEffect(() => {
    let wait = false;

    function infinityScroll(){
      if (infinite){
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * .75 && !wait){
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          setTimeout(() =>{
            wait = false;
          }, 500);
        }
      }
    }

    window.addEventListener('wheel', infinityScroll);
    window.addEventListener('scroll', infinityScroll);

    return () => {
      window.removeEventListener('wheel', infinityScroll);
      window.removeEventListener('scroll', infinityScroll);
    }
  }, [infinite])

  return (
    <div>
      {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto}/>}
      {pages.map((page) => <FeedPhotos key={page} page={page} user={user} setModalPhoto={setModalPhoto} setInfinite={setInfinite}/>)}
    </div>
  )
}

Feed.defaultProps = {
  user: 0,
}

Feed.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
}

export default Feed
