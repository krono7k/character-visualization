import Image from "next/image";
import { Character } from "../app/types";

const CharacterCard = ({ character }: { character: Character }) => {
    return (
        <div className="w-[200px] cursor-pointer rounded-md bg-slate-200 shadow shadow-slate-400 hover:bg-slate-300 hover:shadow-slate-500 transition duration-300 ease-in-out">
            <Image
                src={character.image}
                alt={character.name}
                width={200}
                height={200}
            />
            <div className="text-center font-bold text-xl p-2">{character.name}</div>
        </div>
    );
};

export default CharacterCard;