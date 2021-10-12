import { useState, useEffect } from 'react';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Main from 'components/Markup/Footer copy/Main';
import Button from 'components/Button/Button';
import {Modal} from 'components/Modal/Modal';
import Footer from 'components/Markup/Footer/Footer';

import {ToastContainer} from 'react-toastify';
import { toast } from 'react-toastify';

import fetchGallery from '../../services/imagesApi';
import Preloader from 'components/Loader/Loader';


const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState(null);
  

  // Если при обновлении запрос не равен между стейтами => делаем фетч
  useEffect(() => {
    if (!searchQuery) return;
    getGallery();
    // eslint-disable-next-line
  }, [searchQuery]);
  
  // Обрабатываем запрос с формы и пишем в стейт + обновляем
  const onChangeQuery = query => {
    setImages([]);
    setCurrentPage(1);
    setSearchQuery(query);
    setError(null);
  };

  // Делаем фетч и получаем коллекцию
  const getGallery = async () => {
    setIsLoading(true);
    
    try {
      const { hits } = await fetchGallery(searchQuery, currentPage);

      setImages(prev => [...prev, ...hits]);
      setCurrentPage(prevPage => prevPage + 1);

      if (currentPage !== 1) {
        scrollButton();
      }
    } catch (error) {
      console.log('Something went wrong with fetch', error);
      setError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  // Получаем ссылку на полное изображение и пишем в стейт

  const onGalleryItem = fullImageUrl => {
    setLargeImage(fullImageUrl);
    setShowModal(true);
  };

  // Тогглим модалку

 const toggleModal = () => {
   setShowModal(prevShowModal => !prevShowModal);
  };

  // При клике на кнопку проскролливаем страницу

 const scrollButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
 };
  
  const needToShowLoadMore = images.length > 0 && images.length >= 12;

    return (
      <>
        <Searchbar onSubmit={onChangeQuery} />

        {images.length < 1 && (
          <Main />
        )}

        <ImageGallery images={images} onImageClick={onGalleryItem} />

        {needToShowLoadMore && <Button onClick={getGallery} />}

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImage} alt="" className="Modal-image" />
          </Modal>
        )}

        {isLoading && <Preloader/>}

        {error && (
          toast("Sorry, something went wrong. Please try again")
        )}

        <Footer />

        <ToastContainer autoClose={3000} />
      </>
    );
}
  

export default App;