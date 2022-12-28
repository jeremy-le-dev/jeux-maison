import {useState} from "react";
import {TrophyIcon} from "@heroicons/react/24/solid";

export default function Play10000({players, setPlayers, next, previous}) {
    const [game, setGame] = useState(() => {
        let _game = [];
        players.forEach((player, index) => {
            if (!_game[0]) _game[0] = [];
            _game[0][index] = 0;
        });
        return _game;
    });
    const [tour, setTour] = useState(1);
    const [player, setPlayer] = useState(0)
    const [score, setScore] = useState('');
    const [win, setWin] = useState(-1);
    const [classement, setClassement] = useState([]);
    let isWin = -1;

    const newScore = async (_tour, _player, _score) => {
        let tmpGame = [...game];
        if (!tmpGame[_tour]) tmpGame[_tour] = [];
        let _newScore = parseInt(parseInt(tmpGame[_tour - 1][_player]) + parseInt(_score ? _score : 0));
        if (_newScore < 10000) {
            tmpGame[_tour][_player] = _newScore;
            setGame(tmpGame);
        } else if (_newScore > 10000) {
            tmpGame[_tour][_player] = tmpGame[_tour - 1][_player];
            setGame(tmpGame);
        } else if (_newScore === 10000) {
            let tmpPlayers = [...players];
            tmpPlayers[_player].points = (tmpPlayers[_player].points ? tmpPlayers[_player].points : 0) + 1;
            setPlayers(tmpPlayers);
            tmpGame[_tour][_player] = _newScore;
            setClassement(getClassementScore(tmpGame));
            setGame(tmpGame);
            isWin = _player;
            setWin(_player);
        }
    };

    const play = async () => {
        await newScore(tour, player, score);
        setScore('');
        if (isWin === -1) {
            if (player === players.length - 1) {
                setPlayer(0);
                setTour(tour + 1);
            } else {
                setPlayer(player + 1);
            }
        }
    };

    const getClassementScore = (_game) => {
        let tmpGame = [..._game];
        players.forEach((player, _index) => {
            if (!_game[tour][_index]) {
                if (_game[tour - 1]) {
                    tmpGame[tour][_index] = _game[tour - 1][_index];
                } else {
                    tmpGame[tour][_index] = 0
                }
            } else {
                tmpGame[tour][_index] = _game[tour][_index]
            }
        });
        const scoresSorted = [...tmpGame[tour]].sort((a, b) => b - a);
        const _classement = [];
        players.forEach((player, index) => {
            _classement[index] = scoresSorted.findIndex((el) => el === _game[tour][index]) + 1;
        });
        return _classement;
    };

    return (
        <div className="flex py-4 px-3">
            <div className="px-3 w-1/3">
                {win === -1 &&
                    <div className="text-center bg-slate-50 p-6 rounded-xl overflow-hidden border w-full">
                        <div className="text-lg">C'est à <b className="text-indigo-600">{players[player].name}</b> de jouer</div>
                        <input type="number"
                               step="50"
                               min="0"
                               max="10000"
                               className="mt-3 py-4 px-6 block w-full border shadow-sm rounded-l-md text-sm focus:z-10 focus:border-indigo-600 focus:ring-indigo-600"
                               placeholder='Entrez le score' value={score} onChange={event => setScore(event.target.value)}/>
                        <button className="mt-3 py-3 mr-1 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-600 text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm" onClick={() => play(score)}>
                            Jouer
                        </button>
                        <button className="mt-3 ml-1 py-3 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-200 text-dark hover:bg-gray-300 focus:z-10 focus:outline-none focus:ring-2 transition-all text-sm" onClick={() => play(0)}>
                            Rien
                        </button>
                    </div>
                }
                {win > -1 &&
                    <div className="text-center bg-slate-50 p-6 rounded-xl overflow-hidden border w-full">
                        <TrophyIcon className="text-indigo-600 h-40 w-40 mx-auto opacity-70" />
                        <div className="my-5 text-2xl"><b className="text-indigo-600">{players[win].name}</b> a gagné !</div>
                        <button className="mt-3 py-3 mr-1 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-200 text-dark hover:bg-gray-300 focus:z-10 focus:outline-none focus:ring-2 transition-all text-sm" onClick={previous}>
                            Rejouer au 10000
                        </button>
                        <button className="mt-3 ml-1 py-3 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-600 text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm" onClick={next}>
                            Suivant
                        </button>
                    </div>
                }
            </div>
            <div className="px-3 w-full">
                <div className="bg-slate-50 rounded-xl overflow-hidden border">
                    <table
                        className="relative rounded-xl overflow-auto shadow-sm border-collapse table-auto w-full text-sm">
                        <thead>
                        <tr>
                            <th className="border-b p-4 text-center" width="100">&nbsp;</th>
                            {players.map((_player, index) => (
                                <th key={index} className={('border-b p-4 text-center ' + (player === index ? 'text-indigo-600' : 'text-slate-400'))}>
                                    {win > -1 &&
                                        <div className="border border-4 w-11 h-11 rounded-full mx-auto mb-1 pt-1 text-xl">
                                            {classement[index]}
                                        </div>
                                    }
                                    {_player.name}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-800">
                        {game && game.length > 0 && (
                            [...game].reverse().map((_tour, tourIndex) => (
                                <tr key={tourIndex}>
                                    <td className="border-b border-slate-100 text-center p-4 text-slate-400 font-bold text-xs">
                                        {tour - tourIndex > 0 && (
                                            <span>Tour n°{tour - tourIndex}</span>
                                        )}
                                    </td>
                                    {_tour && _tour.length && (
                                        _tour.map((score, scoreIndex) => (
                                            <td key={scoreIndex} className={"border-b border-slate-100 text-center p-4 " + (player === scoreIndex ? 'text-indigo-600' : 'text-slate-500')}>
                                                {score}
                                            </td>
                                        ))
                                    )}
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}