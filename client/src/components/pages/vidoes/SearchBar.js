import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const SearchBar = ({onFormSubmit}) => {
  const [term, setTerm] = useState('')
  const history = useHistory()

  const onInputChange = event => {
    setTerm(event.target.value)
  };

  const onSubmit = event => {
    event.preventDefault();

    onFormSubmit(term);
    history.push("/")
  };

  
    return (
      <div className="search-bar ui segment">
        <form onSubmit={onSubmit} className="ui form">
          <div className="field">
            <label>Video Search</label>
            <input
              type="text"
              value={term}
              onChange={onInputChange}
            />
          </div>
        </form>
      </div>
    );
  }


export default SearchBar;
