'use client';

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { Character } from "@/app/types";
import DisplayDetails from "@/components/DisplayDetails";
import { CircularProgress } from "@mui/material";


const CharacterDetails = ({ params }: { params: { id: string } }) => {
    let [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState(false);

    const api = 'https://rickandmortyapi.com/api/character/'+params.id;

    const fetchCharData = async () => {
        setLoading(true);
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
        setLoading(false);
    };

    useEffect(() => {
        fetchCharData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api]);

    return <>
        {loading ?
            <div className="w-full h-[100vh] flex justify-center items-center">
                <CircularProgress />
            </div>
        : character ?
            <div className="md:mx-[20vw] md:my-[15vh] p-4 shadow shadow-slate-400">
                <h1 className="text-center font-semibold text-[32px] pb-4">{character.name}</h1>
                <div className="flex flex-col gap-5 md:flex-row  items-center md:items-start">
                    <Image
                        src={character.image}
                        alt={character.name}
                        width={250}
                        height={250}
                        className="rounded-md h-[250px] w-[250px]"
                    />
                    <div className=" flex-1">
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
            </div>
        : null}
        <ToastContainer />
    </>
}
export default CharacterDetails;