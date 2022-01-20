import search from '../img/search.png';
import './Search.css';

function Search(props){
    return (
        <div className="searchCom">
            <form className="search-container">
            <input type="text" className="search-bar" placeholder="What is your color?"  />
            <a ><img className="search-icon" src={search}/></a>
            </form>
        </div>
    );
}
export default Search;
