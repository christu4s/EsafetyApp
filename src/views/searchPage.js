import axios from "axios";
import { useEffect, useState } from "react";
import { base_url } from "../ajax";

export function SearchPage({match}){
    const [data, setData] = useState([]);
    const { key } = match.params;

    useEffect(()=>{
        axios.get(base_url + '/wp-json/wp/v2/search').then(res=>{
            console.log(res);
        });
    }, [key]);
    
    return <div>
        Search Page
    </div>;
}