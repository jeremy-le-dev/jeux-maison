import Players from './pages/Players';
import Games from './pages/Games';
import Game from './pages/Game';
import Order from './pages/Order';
import {useState} from "react";

export default function App() {
    const [players, setPlayers] = useState([]);
    const [state, setState] = useState('players');
    const [game, setGame] = useState(false);

    const next = () => {
        switch(state) {
            default:
            case 'players':
                setState('games');
                break;
            case 'games':
                setState('order');
                break;
            case 'order':
                setState('play')
                break;
            case 'play':
                setState('players')
                break;
        }
    }

    const previous = () => {
        switch(state) {
            default:
            case 'players':
                break;
            case 'games':
                setState('players');
                break;
            case 'order':
                setState('games')
                break;
            case 'play':
                setState('order');
                break;
        }
    }

    return (
        <div className="bg-white">

            {state === 'players' &&
                <Players players={players} setPlayers={setPlayers} next={next}/>
            }

            {state === 'games' &&
                <Games setGame={setGame} next={next} previous={previous}/>
            }

            {state === 'order' &&
                <Order players={players} setPlayers={setPlayers} next={next} previous={previous}/>
            }

            {state === 'play' &&
                <Game game={game} players={players} setPlayers={setPlayers} next={next} previous={previous} />
            }

        </div>
    );
}