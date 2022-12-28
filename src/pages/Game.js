import Play25 from "../games/25";
import Play10000 from "../games/10000";
import {ArrowLeftIcon} from "@heroicons/react/24/solid";

export default function Game({ game, players, setPlayers, next, previous }) {
    return (
        <div className="bg-indigo-600 min-h-screen">
            <div>
                <button className="text-white mt-3 ml-3 z-10 relative" onClick={previous}>
                    <ArrowLeftIcon className="text-white h-6 w-6 inline"/>
                    &nbsp;
                    Retour
                </button>
                <div className="absolute top-2 left-0 w-full text-2xl font-bold text-white text-center z-0">{game}</div>
            </div>
            <div>
                {game === '25' &&
                    <Play25 players={players} setPlayers={setPlayers} next={next} previous={previous}/>
                }
                {game === '10000' &&
                    <Play10000 players={players} setPlayers={setPlayers} next={next} previous={previous}/>
                }
            </div>
        </div>
    );
}