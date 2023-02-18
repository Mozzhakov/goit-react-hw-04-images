import { Component } from 'react';
import css from '../styles/styles.module.css';
import { ImSearch } from 'react-icons/im';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };
  handleQueryChange = event => {
    this.setState({ inputValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.inputValue.trim() === '') {
      alert('Enter search query');
      return;
    }
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <ImSearch className={css.SearchFormButtonLabel} />
            {/* <span>Search</span> */}
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}

// export const Searchbar = ({ onSearch }) => {
//   return (
//     <header className={css.Searchbar}>
//       <form className={css.SearchForm}>
//         <button type="submit" class="button">
//           <span class="button-label">Search</span>
//         </button>

//         <input
//           class="input"
//           type="text"
//           autocomplete="off"
//           autofocus
//           placeholder="Search images and photos"
//         />
//       </form>
//     </header>
//   );
// };
