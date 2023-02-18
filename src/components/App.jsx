import { Component } from 'react';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';
import { fetchImages } from './services/imageApi';
import { LoadMoreBtn } from './Button';
import { Loader } from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    inputValue: '',
    images: [],
    page: 1,
    imagesPerPage: 12,
    showModal: false,
    loadMoreBtnVisible: false,
    loading: false,
    error: null,
    largeImageURL: '',
    imageTags: '',
  };

  async componentDidUpdate(_, prevState) {
    const { inputValue, page, imagesPerPage } = this.state;

    if (prevState.inputValue !== inputValue || prevState.page !== page) {
      try {
        this.setState({ loading: true });
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

        this.setState({ images: [...this.state.images, ...hits] });
        this.setState({ loadMoreBtnVisible: true });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
        alert('Something went wrong');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleFormSubmit = inputValue => {
    if (this.state.inputValue === inputValue) {
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
    this.setState({ inputValue, page: 1, images: [] });
  };

  handleSelectedImage = (largeImageURL, imageTags) => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
      imageTags,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    setTimeout(() => {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }, 300);
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={this.state.images}
          handleSelectedImage={this.handleSelectedImage}
        />
        {this.state.loading && <Loader />}
        {this.state.loadMoreBtnVisible && this.state.images.length > 0 && (
          <LoadMoreBtn handleLoadMore={this.handleLoadMore} />
        )}
        {this.state.showModal && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            imageTags={this.state.imageTags}
            onClose={this.toggleModal}
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
  }
}
