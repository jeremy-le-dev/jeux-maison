import {PuzzlePieceIcon, PresentationChartLineIcon, ReceiptPercentIcon, ArrowPathRoundedSquareIcon, ArrowLeftIcon} from "@heroicons/react/24/solid";

export default function Games({setGame, next, previous}) {
    const play = (game) => {
        setGame(game);
        next();
    };

    const playRandom = () => {
        const games = ['25', '10000'];
        const random = Math.floor(Math.random() * games.length);
        play(games[random]);
    };

    return (
        <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8">
            <button className="text-indigo-600 mt-3 ml-3 fixed top-0 left-0" onClick={previous}>
                <ArrowLeftIcon className="text-indigo-600 h-6 w-6 inline"/>
                &nbsp;
                Retour aux joueurs
            </button>
            <div className="text-center">
                <PuzzlePieceIcon className="text-indigo-600 h-12 w-12 m-auto"></PuzzlePieceIcon>
                <h2 className="text-lg font-semibold leading-8 text-indigo-600">Jeux maisons</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Choisissez votre jeu</p>
                <div className="mt-12 mx-auto max-w-2xl flex gap-4">
                    <div className="overflow-hidden bg-gray-50 shadow rounded-lg flex-1">
                        <div className="px-4 py-5 sm:px-6">
                            <PresentationChartLineIcon className="text-indigo-600 h-12 w-12 m-auto"/>
                            <h3 className="text-lg font-bold leading-6 text-gray-900">10 000</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Un jeu de prise de risques avec des dés pour deux personnes et plus.</p>
                            <button className="mt-3 py-3 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-600 text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm" onClick={() => play('10000')}>
                                Jouer
                            </button>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-gray-50 shadow rounded-lg flex-1">
                        <div className="px-4 py-5 sm:px-6">
                            <ReceiptPercentIcon className="text-indigo-600 h-12 w-12 m-auto"/>
                            <h3 className="text-lg font-bold leading-6 text-gray-900">25</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Eliminez vos adversaires en leur faisant perdre leurs points grâce à des attaques.</p>
                            <button className="mt-3 py-3 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-600 text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm" onClick={() => play('25')}>
                                Jouer
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-4 mx-auto max-w-xs">
                    <div className="overflow-hidden bg-gray-50 shadow rounded-lg flex-1">
                        <div className="px-4 py-5 sm:px-6">
                            <ArrowPathRoundedSquareIcon className="text-indigo-600 h-12 w-12 m-auto"/>
                            <h3 className="text-lg font-bold leading-6 text-gray-900">Aléatoire</h3>
                            <button className="mt-3 py-3 px-6 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-600 text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm" onClick={() => playRandom()}>
                                Choisissez pour moi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}