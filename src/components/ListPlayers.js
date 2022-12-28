import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/solid";
import {useState} from "react";

export default function ListPlayers({ players, deletePlayer, activeEditMode, editPlayer }) {
    const [newName, setNewName] = useState();

    return (
        <table
            className="relative rounded-xl overflow-auto shadow-sm border-collapse table-auto w-full text-sm">
            <thead>
            <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 dark:text-slate-200 text-left">Joueurs</th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 dark:text-slate-200 text-left" width="150">Victoires</th>
                <th className="border-b dark:border-slate-600 font-medium py-4 text-slate-400 dark:text-slate-200 text-left" width="45">&nbsp;</th>
                <th className="border-b dark:border-slate-600 font-medium py-4 text-slate-400 dark:text-slate-200 text-left" width="45">&nbsp;</th>
            </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
            {[...players].sort((a, b) => b.points - a.points).map((player, index) => (
                <tr key={index}>
                    <td className="border-b border-slate-100 text-left dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        {player.edit ? <form className="flex rounded-xl shadow-border" onSubmit={(evt) => {evt.preventDefault(); editPlayer(index, newName)}}>
                            <input type="text"
                                   className="py-2 px-4 block w-full border shadow-sm rounded-l-md text-sm focus:z-10 focus:border-indigo-600 focus:ring-indigo-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                   placeholder='Nom du joueur' defaultValue={player.name} onChange={event => setNewName(event.target.value)}/>
                            <button type="submit"
                                    className="py-2 px-4 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-r-md border border-transparent font-semibold bg-indigo-600 text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm">
                                Modifier
                            </button>
                        </form> : player.name}
                    </td>
                    <td className="border-b border-slate-100 text-left dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                        {player.points}
                    </td>
                    <td className="border-b border-slate-100 text-center dark:border-slate-700 p-0 text-slate-500 dark:text-slate-400">
                        <button className='text-indigo-600 h-7 w-7 cursor-pointer hover:bg-indigo-600 hover:text-white focus:bg-indigo-600 focus:text-white rounded-full p-1' onClick={() => activeEditMode(index)}>
                            <PencilSquareIcon/>
                        </button>
                    </td>
                    <td className="border-b border-slate-100 text-center dark:border-slate-700 p-0 text-slate-500 dark:text-slate-400">
                        <button className='text-red-600 h-7 w-7 cursor-pointer hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white rounded-full p-1' onClick={() => deletePlayer(index)}>
                            <TrashIcon/>
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}