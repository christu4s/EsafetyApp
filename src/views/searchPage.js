import axios from "axios";
import { useEffect, useState } from "react";
import { base_url } from "../ajax";
import { Table } from 'antd';
export function SearchPage({match}){
    const [data, setData] = useState([]);
    const { key } = match.params;
    const columns = [
        {
          title: 'Name',
          dataIndex: 'title',
        },
        {
            title: 'url',
            dataIndex: 'url',
          },
    ];
    useEffect(()=>{
        axios.get(base_url + '/wp-json/wp/v2/search', {
            params:{
                search: key
            }
        }).then(res=>{   
            setData(res.data);
            console.log(data);
        });
    }, [key]);

   
   

    return <div>
        <Table columns={columns} dataSource={data}/>
    </div>;
}