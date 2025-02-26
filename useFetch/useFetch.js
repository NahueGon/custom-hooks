import { useEffect, useState } from "react"

const localChache = {};

export const useFetch = ( url ) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    });

    useEffect(() => {
      getFetch();

    }, [url]);

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null
        });
    }
    
    const getFetch = async() => {

        if ( localChache[url] ) {
            setState({
                data: localChache[url],
                isLoading: false,
                hasError: false,
                error: null
            });
            return;
        }

        setLoadingState();
        
        const res = await fetch(url);

        // sleep
        await new Promise( res => setTimeout(res, 1000) );
        
        if ( !res.ok ) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: res.status,
                    message: res.statusText
                }
            });
            return;
        }
        const data = await res.json();

        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null
        });

        localChache[url] = data;
    }

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    }
}
