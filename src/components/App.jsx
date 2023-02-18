import { useEffect, useState } from 'react';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';
import { fetchImages } from './services/imageApi';
import { LoadMoreBtn } from './Button';
import { Loader } from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [loadMoreBtnVisible, setLoadMoreBtnVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imageTags, setImageTags] = useState('');

  useEffect(() => {
    async function getImages() {
      if (!inputValue) return;

      try {
        setLoading(true);
        const images = await fetchImages(inputValue, page);
        const { hits, totalHits } = images;

        if (page === 1) {
          toast.success(`Wow we found ${totalHits} images!`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }

        if (images.length === 0) {
          toast.error(`No picture with name "${inputValue}"`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        }

        if (Math.ceil(totalHits / imagesPerPage) === page) {
          toast.info(`You have seen all the images with name "${inputValue}"`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        }

        setImages(state => [...state, ...hits]);

        setLoadMoreBtnVisible(true);
      } catch (error) {
        setError(error);

        toast.error(`Someting went wrong`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [inputValue, page]);
  // ---------------------------------- form submit
  const handleFormSubmit = value => {
    if (inputValue === value) {
      return toast.warn('Enter another query', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
    setInputValue(value);
    setPage(1);
    setImages([]);
  };
  // ---------------------------------- open modal and upload a large image
  const handleSelectedImage = (largeImageURL, imageTags) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setImageTags(imageTags);
  };
  // ---------------------------------- open-close modal
  const toggleModal = () => {
    setShowModal(state => !state);
  };
  // ---------------------------------- loadMore button
  const handleLoadMore = () => {
    setPage(state => state + 1);
    setTimeout(() => {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }, 300);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} handleSelectedImage={handleSelectedImage} />
      {loading && <Loader />}
      {loadMoreBtnVisible && images.length > 0 && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          imageTags={imageTags}
          onClose={toggleModal}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};
