"use client";

import { useState, useEffect } from "react";
import { ApiData, Character } from "../types";
import { CircularProgress, Pagination } from "@mui/material";
import CharacterCard from "../../components/CharacterCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialApiData: ApiData = {
    info: { pages: 0, count: 0, next: "", prev: "" },
    results: [],
};

const CharacterList = () => {
    let [pageNo, setPageNo] = useState(1);
    let [apiData, setApiData] = useState<ApiData>({ ...initialApiData });
    let { info, results } = apiData;
    const [loading, setLoading] = useState(false);

    const api = `https://rickandmortyapi.com/api/character/?page=${pageNo}`;

    const fetchData = async () => {
        setLoading(true);
        const data = await fetch(api);
        if (!data.ok) {
            toast.error("Failed to fetch data from api");
            setLoading(false);
            return;
        }
        const parsedData = await data.json();
        if (!parsedData?.results) {
            toast.error("No results found");
            setLoading(false);
            return;
        }
        setApiData(parsedData);
        setLoading(false);
    };

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPageNo(value);
    };

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api]);

    return (
        <>
            <h2 className="text-center text-xl font-bold">Rick and Morty Characters</h2>
            {loading ?
                <div className="w-full h-[100vh] flex justify-center items-center">
                    <CircularProgress />
                </div>
                : <>
                    <div className="flex flex-row flex-wrap gap-4 p-4 justify-center">
                        {results.map((character: Character) => (
                            <CharacterCard key={character.id} character={character} />
                        ))}
                        
                    </div>
                    {
                        info?.pages > 1 && 
                            <Pagination
                                count={info?.pages}
                                page={pageNo}
                                siblingCount={1}
                                boundaryCount={1}
                                onChange={handlePageChange}
                                variant="outlined"
                                color="primary"
                                className="mx-auto mt-4 flex justify-center"
                            />
                    }
                </>
            }
            <ToastContainer />
        </>
    );
};

export default CharacterList;

