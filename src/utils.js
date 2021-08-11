import { Card, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajax from "./ajax";

export function MainTable({columns = [], api = '', params, form, numbered=true, pageSize=10,  ...props}){
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({current: 1, pageSize})
  const [loading, setLoading] = useState(false);

  const onChange = async (pagination, filters, sorter = {}) => {
    setLoading(true);
    const {pageSize, current} = pagination;
    ajax.get(api, {page: current, count:pageSize,...params, sorter}, form).then(res => { 
      setData(res.data);
      setPagination({...pagination, total: res.total});
      setLoading(false);
    })
  }

  useEffect(()=>{ onChange(pagination); },[api, params]);

  useEffect(()=>{ 
    if(!numbered || !columns.length) return; 
    if(columns[0].dataIndex!='no') columns.unshift({title: 'No', dataIndex: 'no' });
    columns[0].render = (v,r,i)=> pagination.pageSize*(pagination.current-1)+i+1; 
  },[pagination]);
 
  return <Table dataSource={data} rowKey={r=> 'test' + r.id } columns={columns} loading={loading} pagination={pagination} onChange={onChange} {...props}/>;
}



export const BoxHolder = ({title, img , active, url })=>{
  return (<Link to={url}>
              <div className='box--holder' style={{display: 'flex'}}>
                  <div className='box--icon box--holder--active'>
                      <img src={img} width="50" height="50" />
                  </div>
                  <h4>{title}</h4>
           </div>
      </Link>
  )
}

export const CardHolder = ({url, image, title}) => <Link to={url}>
  <Card className='custom--card' hoverable style={{ width: 200 }} cover={<img alt="example" src={image} />}>
      <Card.Meta title={title} />
  </Card>
</Link>
