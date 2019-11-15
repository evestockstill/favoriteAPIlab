import Component from '../Component.js';
import Header from '../common/Header.js';
import JokeList from './JokeList.js';
import Search from './Search.js';
import Paging from './Paging.js';
import { getJokes } from '../services/joke-api.js';

class JokesApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const optionsSection = dom.querySelector('.options-section');
        const search = new Search();
        optionsSection.appendChild(search.renderDOM());
        const paging = new Paging();
        optionsSection.appendChild(paging.renderDOM());

        const listSection = dom.querySelector('.list-section');


        const jokeList = new JokeList({ jokes: [] });
        listSection.appendChild(jokeList.renderDOM());

        const loadJokes = async () => {
            try {
                const jokes = await getJokes();

                jokeList.update({ jokes: jokes });

                paging.update({
                    // This API does not give total results :(
                    // totalResult: ?
                });
            }
            catch (err) {
                console.log(err);
            }
        }

        loadJokes();
        window.addEventListener('hashchange', () => {
            loadJokes();
        });
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                
                    <section class="options-section">
                        <!-- options go here -->
                    </section>
                        
                    <section class="list-section">
                        <!-- paging goes here -->
                        <!-- quote list goes here -->        
                    </section>
                </main>
            </div>
        `;
    }
}

export default JokesApp;