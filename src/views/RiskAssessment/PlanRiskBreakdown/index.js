import { Row, Col, Card, Button, Modal, Upload, message, Input, Form, Checkbox, Space, InputNumber } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import area from '../../../assets/area.png';
import image from '../../../assets/image.png';
import danger from '../../../assets/danger-sing@3x.png';
import { PlusCircleOutlined, CloudUploadOutlined, ArrowLeftOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import { FacilitiesButtons } from '../../facilities/components';
import { useHistory } from "react-router-dom";
import ajax from '../../../ajax';
import { PageTemplate } from '../../template';
import ReactECharts from 'echarts-for-react';
import { TitleEdit } from '../../../utils';

export const PlanRiskBreakDown = () => {
    return <PageTemplate
        iconUrl={danger}
        title="Risk Assessment"
        updateMenu
        subtitle={(content,editMode)=> TitleEdit(content,editMode,"Plant Risk Breakdown")}
        api="/plant_risk"
        descName="plant_desc"
        imageName="plant_image"
        pdfName="plant_pdf"
        clickableName="clickable_image"
        outside={(content, editMode, form) => <PlantGraph content={content} editMode={editMode} form={form} />}
    >
    </PageTemplate>
}

function PlantGraph({ content, editMode, form }) {
    const [data, setData] = useState([]);
    const hasData = data && data.length;
    var chartRef;
    const onFinish = ({ risk = [] }) => { setData(risk) };
    const option = {
        tooltip:{trigger:'item'},
        legend: {orient: 'vertical',left: 'right', top: 'center'},
        series: [{ name: 'Plant', type: 'pie', radius: '90%', data}]
    };

    useEffect(()=> {
        try { 
            var res = JSON.parse(content.graph_data.replace(/\\/g, '')); 
            setData(res);
        } catch (e) { }
    }, [content.graph_data]);
    useEffect(()=> { 
        form.setFieldsValue({graph_data: JSON.stringify(data)});
        chartRef && chartRef.getEchartsInstance().setOption(option); 
    }, [data]);

    if(!editMode && !hasData) return null;

    function remove(index) {
        data.splice(index, 1);
        setData([...data]);
    }

    function update(index, value) {
        data[index] = value;
        setData([...data]);
    }
    function add() { setData([...data, {}]); }

    return <div>
        <Form.Item hidden name="graph_data"><Input /></Form.Item>
        <h2>Pie Chart</h2>
        <Row>
            <Col span={16}>
                <div className='bg-white-box form-holder-risk'>
                    {!hasData ? <RiskForm onFinish={onFinish} /> : <ReactECharts ref={e=> {chartRef=e;}} option={option} />}
                </div>
            </Col>
            <Col span={8} push={1}>
                {editMode && <RiskCard editMode={editMode} data={data} add={add} update={update} remove={remove}/>}
            </Col>
        </Row>
    </div>;
}

function RiskCard({data, add, remove, update}){
    const [index, setIndex] = useState();
    const [form] = Form.useForm();
    const current = data ? data[index] : null;
    useEffect(()=>{
        form && form.setFieldsValue({name:'', value:'', ...current});
    }, [current])

    if(!data || !data.length) return null;

    function edit(){
        update(index, form.getFieldsValue());
        setIndex(null);
    }
    function deleteI(){
        remove(index);
        setIndex(null);
    }
    function addNew(){
        setIndex(data.length);
        add();
    }

    return <Card type="inner" title="Risk Data" extra={<Button type="link" onClick={addNew} icon={<PlusOutlined />}>Add new data</Button>}>
            {current && <Form form={form} layout="vertical">
                <Form.Item label="Name of risk" name="name"><Input onChange={e => console.log(e)} /></Form.Item>
                <Form.Item label="Value" name="value"><Input type="number" /></Form.Item>
                <div style={{textAlign:'right'}}>
                    <Button type="link" danger onClick={deleteI}>Delete</Button>
                    <Button type="primary" onClick={edit}>Save</Button>
                </div>
            </Form>}
            {data.map((v,i)=> i!==index && <div style={{display:'flex',justifyContent:'space-between'}} key={i}>
                <div>{v.name}</div>
                <div>{<Button type="link" onClick={()=> setIndex(i)}>Edit</Button>}</div>
            </div>)}
    </Card>
}


function RiskForm({ onFinish }) {
    const [form] = Form.useForm();
    return <><p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
    </p>
        <Form name="form" form={form} onFinish={onFinish}>
            <Form.List name="risk">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => {
                            return <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'name']}
                                    fieldKey={[fieldKey, 'name']}
                                    rules={[{ required: true, message: 'Missing Risk' }]}
                                    label="Name of risk"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'value']}
                                    fieldKey={[fieldKey, 'value']}
                                    rules={[{ required: true, message: 'Missing Value' }]}
                                    label="Value"
                                >
                                    <InputNumber type="number" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        })}
                        <Row justify="space-between">
                            <Col span={12}><Button type="link" onClick={() => add()} icon={<PlusOutlined />}>Add field</Button></Col>
                            <Col span={12}><div style={{ textAlign: 'right' }}><Button onClick={() => form.submit()} size="small" type="primary">Proceed</Button></div></Col>
                        </Row>
                    </>
                )}
            </Form.List>
        </Form></>

}