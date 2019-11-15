import Component from '../Component.js';
import JokeItem from './JokeItem.js';

class JokeList extends Component {

    onRender(dom) {
        const jokes = this.props.jokes;

        jokes.forEach(joke => {
            const props = {
                joke: joke,
                removeUnFavorites: this.props.removeUnFavorites
            };

            console.log(this.props.removeUnFavorites);
            const jokeItem = new JokeItem(props);
            const jokeItemDOM = jokeItem.renderDOM();
            dom.appendChild(jokeItemDOM);
        });

    }

    renderHTML() {

        return /*html*/`
            <ul class="jokes"></ul>
        `;
    }
}

export default JokeList;
