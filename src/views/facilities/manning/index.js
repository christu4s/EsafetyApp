import { Row, Col, Input, Space, Button, Table, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import group from '../../../assets/group@3x.png';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import ajax from '../../../ajax';
import { EditButtons } from '../../../utils';

Array.prototype.sum = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
        total += parseInt(this[i][prop]) || 0;
    }
    return total.toExponential()
}

 

export const FacilityManning = () => {
    const [editMode, setEditMode] = useState(false);
    const toggleMode = () => setEditMode(!editMode);
    const [data, setData] = useState([]);
    const [cols, setCols] = useState([]);
    const [subtitle, setSubtitle] = useState(null);
    var response = {};
    
    useEffect(() => {
        ajax.get('/facility_manning').then(setResponse);
    }, []);

    function setResponse(res){
        if(!res) return;
        response = res
        setSubtitle(res.subtitle);
        setState(res.data, setData);
        setState(res.columns, setCols);
        
    }
    
    function SubTitleEdit( editMode){
       
        return editMode ? <Input value={subtitle} type="text" onChange={(e) => setSubtitle(e.target.value)}/> : subtitle;
      }

    function setState(value, fn){
        try { var res = JSON.parse(value.replace(/\\/g, '')); fn(res); } catch (e) { }
    }
    function addData(){ setData([...data,{}]) }
    function addColumn(){ setCols([...cols,{}]); }
    function editColTitle(i, val){
        var key = val.replace(/\W+/g,'');
        cols[i] = {title: val, dataIndex: key, key}
        setCols([...cols]);
    }
    function editField(i, key, val){
        data[i][key] = val;
        setData([...data]);
    }
    
   

    function renderField(val,key, i){
        return editMode ? <Input value={val} type={key=='hours' ? 'text' : 'number'} onChange={e=>editField(i,key,e.target.value)} /> : val;
    }

    async function save(){
        ajax.post('/facility_manning', {data: JSON.stringify(data), columns: JSON.stringify(cols), subtitle:subtitle}).then(res => { 
            setResponse(res);
            toggleMode();
        });
    }
    function revertMode(){
        setResponse(response);
        toggleMode();
    }

    const {Column, ColumnGroup} = Table;

    return (
        <div className='facility--wrapper'>
            <Row>
                <Col span={1}>
                    <div className='area--img'>
                        <img width='38' src={group} />
                    </div>
                </Col>
                <Col span={23}>
                    <div className='area--header' >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <p>Facilities Overview</p>
                                <h2 >{SubTitleEdit(editMode)}</h2>
                            </div>
                            <div><EditButtons editMode={editMode} toggle={revertMode} save={save} /></div>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className='box--facility area--box--facility manning--box--facility'>
            {editMode &&<Space>
                <Button type="default" onClick={addData} icon={<PlusCircleOutlined />}>Add more row</Button>
                <Button type="ghost" onClick={addColumn} icon={<PlusCircleOutlined />}>Add Work Group</Button>
            </Space>}
            <Table 
                bordered 
                pagination={{pageSize:100, position: ['none','none']}} 
                dataSource={data} 
                summary={()=><>
                    <Table.Summary.Row>
                        <Table.Summary.Cell>Total</Table.Summary.Cell>
                        {cols.map((col, j) => <Table.Summary.Cell key={j}>
                            <Input readOnly type="number" value={data.sum(col.dataIndex)} />
                        </Table.Summary.Cell>)}
                </Table.Summary.Row></>}
            >
                <Column title="Hours Spent Per Day" dataIndex="hours" render={(val,r,i)=> renderField(val,'hours',i)}/>
                <ColumnGroup title="Worker Group">
                    {cols.map((v,i)=> <Column {...v} key={i}
                        title={editMode ? <Input value={v.title} onChange={e=>editColTitle(i, e.target.value)} /> : v.title}
                        render={(val,r,i)=> renderField(val,v.dataIndex, i)} /> )}
                </ColumnGroup>
            </Table>
            </div>
        </div>
    );
}