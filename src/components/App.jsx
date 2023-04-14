import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from '../services/fetch';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    searchResult: [],
    isLoading: false,
    error: null,
    total: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page, error } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchHandler();
    }

    if (prevState.error !== error && error) {
      toast(error, {
        theme: 'dark',
      });
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, searchResult: [], total: 0 });
  };

  toggleLoader = () => {
    this.setState(prevState => ({ isLoading: !prevState.isLoading }));
  };

  fetchHandler = () => {
    const { searchQuery, page } = this.state;
    this.toggleLoader();
    fetchImages(searchQuery, page)
      .then(result => {
        if (result.hits.length === 0) {
          return toast(
            `There are no images by search request "${searchQuery}"`,
            { theme: 'dark' }
          );
        }

        // const images = result.hits.map(({ id, tags }) => ({
        //   id,
        //   tags,
        // }));

        this.setState(prevState => ({
          searchResult: [...prevState.searchResult, ...result.hits],
          total: result.totalHits,
          error: '',
        }));
      })
      .catch(error => this.setState({ error: 'Not found' }))
      .finally(() => {
        this.toggleLoader();
      });
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { isLoading, searchResult, total } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {searchResult.length > 0 && (
          <ImageGallery searchResult={searchResult} />
        )}
        {isLoading && <Loader />}
        {total !== searchResult.length && !isLoading && (
          <Button onClick={this.onLoadMoreClick} />
        )}
        <ToastContainer theme="dark" />
      </div>
    );
  }
}
