import { Button, Input, Form, Table, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import danger from '../../../assets/danger-sing@3x.png';
import { PlusCircleOutlined, MinusCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import './index.css';
import ajax from '../../../ajax';
import { PageTemplate } from './../../template';
import { TitleEdit } from '../../../utils';

Array.prototype.sum = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
        total += parseFloat(this[i][prop]) || 0;
    }
    return total.toExponential();
}

export const LocationRisk = () => {
    return <PageTemplate
        iconUrl={danger}
        title="Risk Assessment"
        updateMenu
        subtitle={(content,editMode)=> TitleEdit(content,editMode,"Location Risk")}
        api="/location_risk"
        descName="location_desc"
        imageName="location_image"
        pdfName="location_pdf"
    >{(content, editMode, form) => <LocationGraph content={content} editMode={editMode} form={form} />}</PageTemplate>
}

function LocationGraph({ content, editMode, form }) {
    const [data, setData] = useState([]);
    const [cols, setCols] = useState([]);
    
    useEffect(()=> {
        try { 
            var res = JSON.parse(content.table_data.replace(/\\/g, '')); 
            setData(res.data || []);
            setData(res.cols || []);
        } catch (e) { }
    }, [content.table_data, editMode]);
    
    useEffect(()=> { form.setFieldsValue({table_data: {data:JSON.stringify(data),cols:JSON.stringify(cols)}}) }, [data, cols]);

    function remove(index) {
        data.splice(index, 1);
        setData([...data]);
    }
    function removeCol(index) {
        cols.splice(index, 1);
        setCols([...cols]);
    }
    function update(index, key, value) {
        if(!data[index]) data[index] = {};
        data[index][key] = value;
        setData([...data]);
    }
    function addmore() { setData([...data, {}]); }
    function addColumn(){ setCols([...cols,{dataIndex: cols.length}]); }
    function editColTitle(i, val){
        var key = val.replace(/\W+/g,'');
        cols[i] = {title: val, dataIndex: key, key}
        setCols([...cols]);
    }

    return <div className='box--facility form-holder-risk location-risk-box area--box--facility manning--box--facility'>
        <Form.Item hidden name="table_data"><Input /></Form.Item>
        <Table 
            bordered 
            pagination={{pageSize:100, position: ['none','none']}} 
            dataSource={data} 
            summary={()=><>
                {editMode &&<Table.Summary.Row>
                    <Table.Summary.Cell colSpan={cols.length + 1}>
                         <Button type="default" onClick={addmore} icon={<PlusCircleOutlined />}>Add more row</Button>
                    </Table.Summary.Cell>
                </Table.Summary.Row>}
                <Table.Summary.Row>
                    <Table.Summary.Cell>Total</Table.Summary.Cell>
                    {cols.map((col, j) => <Table.Summary.Cell key={j}>
                        <Input readOnly  value={data.sum(col.dataIndex)} />
                    </Table.Summary.Cell>)}
              </Table.Summary.Row></>}
        >
            <Table.Column title='Hazard' dataIndex='name' render={(val,r,i)=> <Input readOnly={!editMode} value={val} onChange={e => update(i, 'name', e.target.value)}/>} />
            <Table.ColumnGroup 
                title={<span>Location Specific Individual Risk (per year)<br/>
                    {editMode && <Button type="link" onClick={addColumn}>Add Column</Button>}
                </span>}
            >
                {cols.map((v,colIndex)=> <Table.Column {...v} key={'col'+ colIndex}
                    title={editMode ? <>
                        <MinusCircleOutlined onClick={()=>removeCol(colIndex)} />
                        <Input value={v.title} onChange={e=> editColTitle(colIndex,e.target.value)} />
                    </> : v.title}
                    render={(val,r,i)=> <Input type="number" readOnly={!editMode} value={val} onChange={e => update(i,v.dataIndex, e.target.value)}/>} 
                />)}
            </Table.ColumnGroup>
            {editMode && <Table.Column render={(val,r,i)=> <MinusCircleOutlined onClick={()=>remove(i)} />} />}
        </Table>
    </div>
}