import Component from '../Component.js';
import { makeFavorite, unFavorite } from '../../services/joke-api.js';

class JokeItem extends Component {

    onRender(li) {
        const joke = this.props.joke;
        const removeUnFavorites = this.props.removeUnFavorites;
        const favoriteButton = li.querySelector('.favorite-star');
        favoriteButton.addEventListener('click', () => {
            joke.isFavorite = !joke.isFavorite;
            if (joke.isFavorite) {
                makeFavorite(joke);
            }
            else {
                unFavorite(joke.id);
                setTimeout(() => {
                    if (removeUnFavorites) {
                        li.classList.add('fade');
                        this.rootElement.remove();
                    }
                }, 300);
            }
            favoriteButton.classList.toggle('is-favorite');
        });
    }

    renderHTML() {
        const joke = this.props.joke;
        const starClass = joke.isFavorite ? 'is-favorite' : '';

        return /*html*/`
            <li class="joke-item">
                <h2>
                    
                    <button class="favorite-star ${starClass}">★</button>
                </h2>
                
                <joke>
                    ${joke.joke}
                </joke>

            </li>
        `;
    }
}

export default JokeItem;