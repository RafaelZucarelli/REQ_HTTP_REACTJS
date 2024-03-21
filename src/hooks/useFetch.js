import { useState, useEffect } from "react";


//CUSTOM HOOK
export const useFetch = (url) => {
    const [data, setData] = useState(null);

    //refatorando o POST
    //vai configurar os methods que vão ser utilizados, os cabeçalhos/header
    const [config, setConfig] = useState(null);
    //qual metódo irei utilizar na minha função - GET or POST
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);

    const httpConfig = (data, method) => {
        if(method === "POST"){
            setConfig({
                method:"POST",
                headers: {
                    "Content-type": "aplication/json"
                },
                body: JSON.stringify(data)
            });

            setMethod(method);
        }
    }


    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(url)

            const json = await res.json()

            setData(json)
        }

        fetchData();
        // callFetch - trazer os dados atualizados
    }, [url, callFetch]);

    // refatorando POST
    useEffect (() => {

        const httpConfig = async () => {
            if(method === "POST") {

                let fetchOptions = [url, config]
    
                const res = await fetch(...fetchOptions)
    
                const json = await res.json()
    
                setCallFetch(json);
            }
        }

        httpConfig();
    }, [config, method, url]);
    return {data, httpConfig};
};