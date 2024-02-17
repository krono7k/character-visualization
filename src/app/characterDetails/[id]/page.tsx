'use client';

import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { Character } from "@/app/types";

import DisplayDetails from "@/components/DisplayDetails";


const CharacterDetails = ({ params }: { params: { id: string } }) => {
    let [character, setCharacter] = useState<Character | null>(null);

    const api = 'https://rickandmortyapi.com/api/character/'+params.id;

    const fetchCharData = async () => {
        const data = await fetch(api);
        if (!data.ok) {
            toast.error("Failed to fetch data from api");
            return;
        }
        const parsedData = await data.json();
        if (!parsedData) {
            toast.error("No results found");
            return;
        }
        setCharacter(parsedData);
    };

    useEffect(() => {
        fetchCharData();
    }, [api]);

    return <>
        {character ?
            <div className="flex flex-row gap-4 p-4 w-full h-full">
                <Image
                    src={character.image}
                    alt={character.name}
                    width={200}
                    height={200}
                    className="rounded-md flex-1"
                />
                <div>
                    <DisplayDetails detailName="Name" detailValue={character.name} />
                    <DisplayDetails detailName="Status" detailValue={character.status} />
                    <DisplayDetails detailName="Species" detailValue={character.species} />
                    <DisplayDetails detailName="Type" detailValue={character.type} />
                    <DisplayDetails detailName="Gender" detailValue={character.gender} />
                    <DisplayDetails
                        detailName="Origin"
                        detailValue={character.origin.name}
                    />
                    <DisplayDetails
                        detailName="Location"
                        detailValue={character.location.name}
                    />
                    <DisplayDetails
                        detailName="Number of Episodes"
                        detailValue={character.episode.length.toString()}
                    />
                    <DisplayDetails
                        detailName="List of Episodes"
                        detailValue={character.episode
                            .map((episode) => episode.split("/")[5])
                            .join(", ")}
                    />
                </div>
            </div>
        : null}
    </>
}
export default CharacterDetails;