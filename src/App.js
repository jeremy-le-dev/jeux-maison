import Players from './pages/Players';
import Games from './pages/Games';
import Game from './pages/Game';
import Order from './pages/Order';
import {useState} from "react";

export default function App() {
  const [state, setState] = useState('play');
  const [game, setGame] = useState('25');
  const [players, setPlayers] = useState([
    {
      name: 'toto',
      points: 0,
    },
    {
      name: 'tutu',
      points: 0,
    },
    {
      name: 'tete',
      points: 0,
    },
  ]);

  const next = () => {
    switch (state) {
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
    switch (state) {
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

  const onConfirmRefresh = function (event) {
    event.preventDefault();
    return event.returnValue = "Êtes-vous sur de vouloir quitter tout recommencer ?";
  }

  window.addEventListener("beforeunload", onConfirmRefresh, {capture: true});

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
        <Game game={game} players={players} setPlayers={setPlayers} next={next} previous={previous}/>
      }
    </div>
  );
}