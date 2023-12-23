import {useState} from "react";
import {ArrowLeftIcon, TrophyIcon} from "@heroicons/react/24/solid";
import {ArrowUturnLeftIcon, ArrowUturnRightIcon} from "@heroicons/react/24/solid";

export default function Play10000({players, setPlayers, next, previous}) {
    const [win, setWin] = useState(false);
    const [history, setHistory] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [score, setScore] = useState('');

    const backHistory = () => {};
    const nextHistory = () => {};
    const play = () => {};

    return (
        <div className="flex flex-wrap lg:flex-nowrap py-4 px-3">
            <div className="px-3 mb-3 w-full lg:w-1/3">
                {win === -1 &&
                    <div className="text-center bg-slate-50 p-6 rounded-xl overflow-hidden border w-full">
                        <div className="text-lg">C'est à <b className="text-indigo-600">{currentPlayer?.name}</b> de jouer</div>
                        <input type="number"
                               step="50"
                               min="0"
                               max="10000"
                               className="mt-3 py-4 px-6 block w-full border shadow-sm rounded-l-md text-sm focus:z-10 focus:border-indigo-600 focus:ring-indigo-600"
                               placeholder='Entrez le score'
                               value={score}
                               onChange={event => setScore(event.target.value)}/>
                        {score > 0 ?
                          (<button className="mt-3 py-3 mr-1 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-600 text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm" onClick={() => play(score)}>Jouer</button>)
                          :
                          (<button className="mt-3 ml-1 py-3 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-200 text-dark hover:bg-gray-300 focus:z-10 focus:outline-none focus:ring-2 transition-all text-sm" onClick={() => play(score)}>Rien du tout!</button>)
                        }
                        <button className="block mx-auto text-sm mt-5 text-indigo-700" onClick={backHistory}>
                            <ArrowUturnLeftIcon className="text-white h-6 w-6 inline"/>
                        </button>
                        <button className="block mx-auto text-sm mt-5 text-indigo-700" onClick={nextHistory}>
                            <ArrowUturnLeftIcon className="text-white h-6 w-6 inline"/>
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
            {/*<div className="px-3 w-full">
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
            </div>*/}
        </div>
    );
}