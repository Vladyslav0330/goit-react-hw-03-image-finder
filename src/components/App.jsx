import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Searchbar} from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from '../services/fetch';
import {Button} from './Button/Button';
import {Loader} from './Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    searchResult: [],
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.fetchHandler();
    }
    if (
      prevState.page !== page &&
      prevState.searchQuery === this.state.searchQuery
    ) {
      this.fetchHandler();
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, searchResult: [] });
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
          this.setState({ searchResult: [], page: 1 });
          return toast(
            `There are no images by search request "${searchQuery}"`,
            { theme: 'dark' }
          );
        }
        this.setState(prevState => ({
          searchResult: [...prevState.searchResult, ...result.hits],
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.toggleLoader();
      });
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { isLoading, searchResult } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {searchResult.length > 0 && (
          <ImageGallery searchResult={searchResult} />
        )}
        {isLoading && <Loader />}
        {searchResult.length > 0 && !isLoading && (
          <Button onClick={this.onLoadMoreClick} />
        )}
        <ToastContainer theme="dark" />
      </div>
    );
  }
}
