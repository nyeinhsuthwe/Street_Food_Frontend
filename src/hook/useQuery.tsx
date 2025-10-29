import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface queryPayload <T>{
    endpoint : string,
    queryKey : T,
    params ?: T
}

export function useApiQuery<TData = any> ({endpoint, params, queryKey}: queryPayload<any>, options?:any) {
    return useQuery<TData>({
        queryKey : queryKey ?? [endpoint, params],
        queryFn : async ()=>{
            const res = await axios.get(endpoint)
            return res.data
        },
        ...options
    })
}