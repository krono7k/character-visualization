"use client";

import { useState, useEffect } from "react";
import { ApiData, Character } from "../types";
import { Pagination } from "@mui/material";
import CharacterCard from "../../components/CharacterCard";
import { toast } from "react-toastify";

const initialApiData: ApiData = {
    info: { pages: 0, count: 0, next: "", prev: "" },
    results: [],
};

const CharacterList = () => {
    let [pageNo, setPageNo] = useState(1);
    let [apiData, setApiData] = useState<ApiData>({ ...initialApiData });
    let { info, results } = apiData;

    const api = 'https://rickandmortyapi.com/api/character/?page=${pageNo}';

    const fetchData = async () => {
        const data = await fetch(api);
        if (!data.ok) {
            toast.error("Failed to fetch data from api");
            return;
        }
        const parsedData = await data.json();
        if (!parsedData?.results) {
            toast.error("No results found");
            return;
        }
        setApiData(parsedData);
    };

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPageNo(value);
    };

    useEffect(() => {
        fetchData();
    }, [api]);

    return (
        <div className="flex flex-row flex-wrap gap-4 p-4">
            {results.map((character: Character) => (
                <CharacterCard key={character.id} character={character} />
            ))}
            {info?.pages > 1 && (
                <Pagination
                    count={info?.pages}
                    page={pageNo}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="primary"
                    className="mx-auto mt-4"
                />
            )}
        </div>
    );
};

export default CharacterList;

