import {useEffect, useState} from "react";
import {ArrowUturnLeftIcon, ArrowUturnRightIcon, TrophyIcon} from "@heroicons/react/24/solid";

export default function Play25({players, setPlayers, next, previous}) {
  const rules = [
    {
      key: 'attack-over-next-rivals',
      name: "Dépassement d'attaque",
      description: "Attaquer les adversaires suivants si j'attaque un adversaire et que je lui retire plus que le nombre de points qu'il lui reste.",
    },
    {
      key: 'tu-perds-tu-fais',
      name: "Tu perds tu fais",
      description: "Celui qui perdra en premier coupera les gâteaux (ne fonctionne pas si c'est son anniversaire).",
    },
  ];

  const [rulesChoose, setRulesChoose] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scores, setScores] = useState([players.map(() => 25), players.map(() => '?')])
  const [round, setRound] = useState(1);
  const [displayAttacks, setDisplayAttacks] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const getPlayerCurrentScore = (player) => {
    if (scores[round][player] !== '?' && scores[round][player] !== null) {
      return scores[round][player];
    } else {
      return scores[round - 1][player];
    }
  };

  const getNextPlayer = () => {
    if (currentPlayer === players.length - 1) {
      return {
        round: round + 1,
        currentPlayer: 0,
        currentScore: getPlayerCurrentScore(0),
      }
    } else {
      return {
        round,
        currentPlayer: currentPlayer + 1,
        currentScore: getPlayerCurrentScore(currentPlayer + 1)
      }
    }
  }

  const play = (score) => {
    const oldScore = getPlayerCurrentScore(currentPlayer);

    if (score <= 25) {
      const _score = oldScore - (25 - score);
      scores[round][currentPlayer] = _score >= 0 ? _score : 0;
      setScores(scores);
      nextPlayer();
    } else if (score > 25) {
      scores[round][currentPlayer] = oldScore;
      setScores(scores);
      setDisplayAttacks(score - 25);
    }
  }

  const attack = (score) => {

    setDisplayAttacks(false);
    nextPlayer();
  }

  const nextPlayer = () => {
    const _nextPlayer = getNextPlayer();

    if (round !== _nextPlayer.round) {
      setRound(_nextPlayer.round);
      setScores([
        ...scores,
        players.map((player, index) => getPlayerCurrentScore(index) ? '?' : null)
      ]);
    }

    setCurrentPlayer(_nextPlayer.currentPlayer);
  };

  const checkIfIsWin = () => {
    const winners = [];
    players.forEach((player, index) => {
      if (getPlayerCurrentScore(index)) {
        winners.push(index);
      }
    });
    if (winners.length > 1) {
      return false;
    } else {
      return winners[0];
    }
  };

  useEffect(() => {
    const resultCheckIfWin = checkIfIsWin();
    if (resultCheckIfWin) {
      setIsWin(resultCheckIfWin);
      players[resultCheckIfWin].points += 1;
      setPlayers(players);
    } else {
      if (!getPlayerCurrentScore(currentPlayer)) {
        nextPlayer();
      }
    }
  }, [currentPlayer]);

  if (rulesChoose === false) {
    const rulesToActive = [];
    const setRule = (rule, event) => {
      if (event.target.checked) {
        rulesToActive.push(rule);
      } else {
        rulesToActive.splice(rulesToActive.findIndex(el => el === rule), 1);
      }
    };

    return (
      <div className="mt-16 mx-auto w-auto max-w-2xl">
        <div className="overflow-hidden bg-gray-50 shadow rounded-lg flex-1">
          <div className="px-4 py-5 sm:px-6 text-center">
            <h3 className="text-xl font-bold leading-6 text-gray-800">Choisis tes règles</h3>
            <div className="flex py-10 flex-col">
              {rules.map((rule) =>
                (
                  <div className="py-2.5 flex content-between items-center text-left" key={rule.key}>
                    <div className="w-20">
                      <input
                        style={{zoom: 1.5}}
                        className="mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                        type="checkbox"
                        role="switch"
                        id={rule.key}
                        onChange={(event) => setRule(rule.key, event)}
                      />
                    </div>
                    <div className="w-2/3">
                      <label className="pl-[0.15rem] hover:cursor-pointer" htmlFor={rule.key}>
                        <span className="text-sm font-bold text-gray-800">{rule.name}</span>
                        <br/>
                        <span className="text-xs text-gray-500">{rule.description}</span>
                      </label>
                    </div>
                  </div>
                )
              )}
            </div>
            <button
              onClick={() => setRulesChoose(rulesToActive)}
              className="mt-3 py-3 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-600 text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-lg">
              Jouer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap lg:flex-nowrap py-4 px-3">
      <div style={{position: 'fixed', top: 0, right: 0}} className="flex mr-6 mt-2 justify-center align-middle gap-1">
        <button
          className={`inline-block mx-auto text-sm p-1 rounded-md border border-transparent font-semibold bg-white text-dark hover:bg-gray-300 focus:z-10 focus:outline-none focus:ring-2 ` + (false ? '' : 'opacity-50')}
          onClick={() => {
          }}>
          <ArrowUturnLeftIcon className="h-6 w-6"/>
        </button>
        <button
          className={`inline-block mx-auto text-sm p-1 rounded-md border border-transparent font-semibold bg-white text-dark hover:bg-gray-300 focus:z-10 focus:outline-none focus:ring-2 ` + (false ? '' : 'opacity-50')}
          onClick={() => {
          }}>
          <ArrowUturnRightIcon className="h-6 w-6"/>
        </button>
      </div>
      <div className="px-3 mb-3 w-full lg:w-1/3">
        <div className="text-center bg-slate-50 p-6 rounded-xl overflow-hidden border w-full">
          {!isWin && (
            <>
              <div className="text-lg">C'est à <b className="text-indigo-600">{players[currentPlayer].name}</b> de
                jouer
              </div>
              {!displayAttacks && (
                <div className="flex flex-wrap mt-3 justify-center">
                  {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(score => (
                    <div className="w-1/4 p-1" key={score}>
                      <div onClick={() => play(score)}
                           className={`cursor-pointer relative bg-white text-xl py-4 border-2 rounded-xl font-extrabold ` + (score < 25 ? 'border-red-200' : (score > 25 ? 'border-green-200' : 'border-blue-200'))}>
                        {score} <span
                        className={`text-xs absolute text-gray-700 font-bold w-6 h-5 top-0 right-0 p-0.5 rounded-tr-md rounded-bl-md ` + (score < 25 ? 'bg-red-200' : (score > 25 ? 'bg-green-200' : 'bg-blue-200'))}>{score - 25}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {displayAttacks && (
                <div className="flex flex-wrap mt-3 justify-center">
                  <div onClick={() => attack(0)}
                       className={`cursor-pointer relative bg-white text-xl py-4 border-2 rounded-xl font-extrabold w-full mb-5`}>
                    Rien du tout
                  </div>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(score => (
                    <div className="w-1/4 p-1" key={score}>
                      <div onClick={() => attack(score * displayAttacks)}
                           className={`cursor-pointer relative bg-white text-xl py-4 border-2 rounded-xl font-extrabold`}>
                        -{score * displayAttacks}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {isWin && (
            <div className="text-center bg-slate-50 p-6 rounded-xl overflow-hidden border w-full">
              <TrophyIcon className="text-indigo-600 h-40 w-40 mx-auto opacity-70"/>
              <div className="my-5 text-2xl"><b className="text-indigo-600">{players[isWin].name}</b> a gagné !
              </div>
              <button className="mt-3 py-3 mr-1 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-200 text-dark hover:bg-gray-300 focus:z-10 focus:outline-none focus:ring-2 transition-all text-sm" onClick={previous}>
                Rejouer au 25
              </button>
              <button className="mt-3 ml-1 py-3 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-600 text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm" onClick={next}>
                Suivant
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="px-3 w-full">
        <div className="bg-slate-50 rounded-xl overflow-hidden border">
          <table
            className="relative rounded-xl overflow-auto shadow-sm border-collapse table-auto w-full text-sm">
            <thead>
            <tr>
              <th className="border-b p-4 text-center" width="100">&nbsp;</th>
              {players.map((_player, index) => (
                <th key={index}
                    className={('border-b p-4 text-center ' + (currentPlayer === index ? 'text-indigo-600' : 'text-slate-400'))}>
                  {_player.name}
                </th>
              ))}
            </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
            {scores.map((tour, tourIndex) => (
              <tr key={tourIndex}>
                <td className="border-b border-slate-100 text-center p-4 text-slate-400 font-bold text-xs">
                  {tourIndex > 0 && (
                    <span>Tour n°{tourIndex}</span>
                  )}
                </td>
                {tour && tour.length && (
                  tour.map((score, scoreIndex) => (
                    <td key={scoreIndex}
                        className={"border-b border-slate-100 text-center p-4 " + (currentPlayer === scoreIndex ? 'text-indigo-600' : 'text-slate-500')}>
                      {score}
                    </td>
                  ))
                )}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}