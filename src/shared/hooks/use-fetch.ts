import { useState, useEffect } from "react";
import { API_DOMAIN } from "shared/get-env";

const useFetch = <T = any>(url: string, baseUrl = API_DOMAIN) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/${url}`)
            .then((r) => {
                if (r.status >= 200 && r.status < 300) return r.json();
                throw new Error("Not Found");
            })
            .then((r: T) => {
                setData(r);
                setLoading(false);
                setError(null);
            })
            .catch((err) => {
                setData(null);
                setLoading(false);
                setError(err);
            })
    }, [baseUrl, url]);

    return { loading, data, error };
}
export default useFetch;
