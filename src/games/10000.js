import {useCallback, useEffect, useState} from "react";
import {ArrowUturnLeftIcon, ArrowUturnRightIcon, TrophyIcon} from "@heroicons/react/24/solid";

export default function Play10000({players, setPlayers, next, previous}) {
    const [canBackHistory, setCanBackHistory] = useState(false);
    const [canNextHistory, setCanNextHistory] = useState(false);
    const [histories, setHistories] = useState([]);
    const [actionNumber, setActionNumber] = useState(-1);
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

    const setGameWithHistory = (history) => {
        setGame(history.game);
        setTour(history.tour);
        setPlayer(history.player);
        setScore(history.score);
        setWin(history.win);
        setClassement(getClassementScore(history.game));
        // setClassement(history.classement);
        isWin = history.isWin;
    }

    useEffect(() => {
        setCanBackHistory(actionNumber > 0);
    }, [actionNumber]);

    useEffect(() => {
        setCanNextHistory(actionNumber < (histories.length - 1));
    }, [actionNumber, histories]);

    const backHistory = () => {
        if (!canBackHistory) {
            return;
        }
        const newActionNumber = actionNumber - 1;
        setGameWithHistory(histories[newActionNumber]);
        setActionNumber(newActionNumber);
    };
    const nextHistory = () => {
        if (!canNextHistory) {
            return;
        }
        const newActionNumber = actionNumber + 1;
        setGameWithHistory(histories[newActionNumber]);
        setActionNumber(newActionNumber);
    };

    const newScore = async (_tour, _player, _score) => {
        let tmpGame = [...game];
        if (!tmpGame[_tour]) tmpGame[_tour] = [];
        let _newScore = _score === '?' ? _score : parseInt(parseInt(tmpGame[_tour - 1][_player]) + parseInt(_score ? _score : 0));
        if (_newScore < 10000 || _newScore === '?') {
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
        let tmpHistories = histories;
        if (actionNumber < (tmpHistories.length - 1)) {
            tmpHistories = tmpHistories.slice(0, actionNumber);
        }
        await newScore(tour, player, score);
        setScore('');
        setHistories([...tmpHistories, {
            game,
            tour,
            player,
            score,
            win,
            classement,
            isWin,
        }]);
        setActionNumber(actionNumber + 1);
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
        <div className="flex flex-wrap lg:flex-nowrap py-4 px-3">
            <div style={{ position: 'fixed', top: 0, right: 0 }} className="flex mr-6 mt-2 justify-center align-middle gap-1">
                <button className={`inline-block mx-auto text-sm p-1 rounded-md border border-transparent font-semibold bg-white text-dark hover:bg-gray-300 focus:z-10 focus:outline-none focus:ring-2 ` + (canBackHistory ? '' : 'opacity-50')} onClick={backHistory}>
                    <ArrowUturnLeftIcon className="h-6 w-6"/>
                </button>
                <button className={`inline-block mx-auto text-sm p-1 rounded-md border border-transparent font-semibold bg-white text-dark hover:bg-gray-300 focus:z-10 focus:outline-none focus:ring-2 ` + (canNextHistory ? '' : 'opacity-50')} onClick={nextHistory}>
                    <ArrowUturnRightIcon className="h-6 w-6"/>
                </button>
            </div>
            <div className="px-3 mb-3 w-full lg:w-1/3">
                {win === -1 &&
                  <div className="text-center bg-slate-50 p-6 rounded-xl overflow-hidden border w-full">
                      <div className="text-lg">C'est à <b className="text-indigo-600">{players[player].name}</b> de
                          jouer
                      </div>
                      <input type="number"
                             step="50"
                             min="0"
                             max="10000"
                             className="mt-3 py-4 px-6 block w-full border shadow-sm rounded-md text-sm focus:z-10 focus:border-indigo-600 focus:ring-indigo-600"
                               placeholder='Entrez le score'
                               value={score}
                               onChange={event => setScore(event.target.value)}/>
                        {score > 0 ?
                          (<button className="mt-3 py-3 mr-1 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-600 text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm" onClick={() => play(score)}>Jouer</button>)
                          :
                          (<button className="mt-3 ml-1 py-3 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-200 text-dark hover:bg-gray-300 focus:z-10 focus:outline-none focus:ring-2 transition-all text-sm" onClick={() => play(score)}>Rien du tout!</button>)
                        }
                    </div>
                }
                {win > -1 &&
                  <div className="text-center bg-slate-50 p-6 rounded-xl overflow-hidden border w-full">
                      <TrophyIcon className="text-indigo-600 h-40 w-40 mx-auto opacity-70"/>
                      <div className="my-5 text-2xl"><b className="text-indigo-600">{players[win].name}</b> a gagné !
                      </div>
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