import {ArrowLeftIcon, ArrowRightIcon, PuzzlePieceIcon} from "@heroicons/react/24/solid";
import {useRef} from "react";

export default function Order({players, setPlayers, next, previous}) {
    const dragItem = useRef();
    const dragOverItem = useRef();

    const dragStart = (e, position) => {
        dragItem.current = position;
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const drop = (e) => {
        const copyListItems = [...players];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setPlayers(copyListItems);
    };

    return (
        <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8">
            <button className="text-indigo-600 mt-3 ml-3 fixed top-0 left-0" onClick={previous}>
                <ArrowLeftIcon className="text-indigo-600 h-6 w-6 inline"/>
                &nbsp;
                Retour
            </button>
            <div className="text-center">
                <PuzzlePieceIcon className="text-indigo-600 h-12 w-12 m-auto"></PuzzlePieceIcon>
                <h2 className="text-lg font-semibold leading-8 text-indigo-600">Jeux maisons</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Choisissez l'ordre des joueurs</p>
                <button className="mt-6 py-4 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-600 text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-lg" onClick={next}>
                    Suivant
                    <ArrowRightIcon className="text-white h-6 w-6"/>
                </button>
            </div>
            <div className="mt-6 mx-auto max-w-sm">
                {players.map((player, index) => (
                    <div className="rounded relative cursor-move w-full text-center bg-gray-200 text-grey-900 hover:bg-indigo-600 focus:bg-indigo-600 m-3 p-3 focus:text-white hover:text-white"
                         onDragStart={(e) => dragStart(e, index)}
                         onDragEnter={(e) => dragEnter(e, index)}
                         onDragEnd={drop}
                         key={index}
                         draggable>
                        <span className='absolute top-50 left-0 ml-3 mt-1 text-xs font-light'>N°{index+1}&nbsp;</span>
                       {player.name}
                    </div>
                ))}
            </div>
        </div>
    );
}