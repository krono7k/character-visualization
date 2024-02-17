import Image from "next/image";
import { Character } from "../app/types";
import Link from "next/link";

const CharacterCard = ({ character }: { character: Character }) => {
    return (
        <Link href={`/characterDetails/${character.id}`}>
            <div
                className="flex flex-col h-full w-[200px] cursor-pointer rounded-md bg-slate-200 shadow shadow-slate-400 hover:bg-slate-300 hover:shadow-slate-500 transition duration-300 ease-in-out">
                <Image
                    src={character.image}
                    alt={character.name}
                    width={200}
                    height={200}
                />
                <div className="flex-1 items-center text-center font-bold text-lg p-2 flex justify-center item-center">{character.name}</div>
            </div>
        </Link>
    );
};

export default CharacterCard;