import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';

export const Searchbar = ({ onSubmit }) => {
  const handleFormSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.input.value.toLowerCase().trim();
    if (!query) return;
    onSubmit(query);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleFormSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <AiOutlineSearch className={css.searchFormIcon} />
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          name="input"
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
