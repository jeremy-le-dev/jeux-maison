import {PuzzlePieceIcon, ArrowRightIcon} from '@heroicons/react/24/solid'
import {useState} from "react";
import ListPlayers from "../components/ListPlayers";

export default function Players({players, setPlayers, next}) {
    const [name, setName] = useState('');
    const addPlayer = (evt) => {
        evt.preventDefault();
        const tmp = {
            name: name,
            points: 0,
        };
        setPlayers(current => [...current, tmp]);
        setName('');
    };

    const deletePlayer = (index) => {
        setPlayers(players.filter((item, _index) => _index !== index));
    };

    const activeEditMode = (index) => {
        const tmpPlayers = [...players];
        tmpPlayers[index].edit = true;
        setPlayers(tmpPlayers);
    };

    const editPlayer = (index, name) => {
        const tmpPlayers = [...players];
        tmpPlayers[index].name = name;
        tmpPlayers[index].edit = false;
        setPlayers(tmpPlayers);
    }

    return (
        <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8">
            <div className="text-center">
                <PuzzlePieceIcon className="text-indigo-600 h-12 w-12 m-auto"></PuzzlePieceIcon>
                <h2 className="text-lg font-semibold leading-8 text-indigo-600">Jeux maisons</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ajoutez des
                    joueurs</p>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">Créez autant de joueurs
                    que vous voulez en entrant le nom, prénom ou pseudonyme de chaque joueur dans le champ
                    ci-dessous.</p>
                <div className="mt-12 mx-auto max-w-2xl">
                    <form className="flex rounded-xl shadow-border" onSubmit={addPlayer}>
                        <input type="text"
                               className="py-4 px-6 block w-full border shadow-sm rounded-l-md text-sm focus:z-10 focus:border-indigo-600 focus:ring-indigo-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                               placeholder='Nom du joueur' value={name} onChange={event => setName(event.target.value)}/>
                        <button type="submit"
                                className="py-4 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-r-md border border-transparent font-semibold bg-indigo-600 text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm">
                            Ajouter
                        </button>
                    </form>
                    {players.length > 1 &&
                        <button className="mt-6 py-4 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-600 text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-lg" onClick={next}>
                            Suivant
                            <ArrowRightIcon className="text-white h-6 w-6"/>
                        </button>
                    }
                </div>
                <div
                    className="mx-auto max-w-3xl mt-12 not-prose border relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
                    {(players.length > 0) ? <ListPlayers players={players} deletePlayer={deletePlayer} activeEditMode={activeEditMode} editPlayer={editPlayer} /> :
                        <p className="text-sm py-8 font-light text-gray-400">Pas encore de joueurs...</p>}
                </div>
            </div>
        </div>
    )
        ;
}