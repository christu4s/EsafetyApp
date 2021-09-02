import { Row, Col, Card, Button, Modal, Upload, message, Input, Form, Checkbox, Space, InputNumber } from 'antd';
import React, { useState, useEffect } from 'react';
import area from '../../../assets/area.png';
import image from '../../../assets/image.png';
import danger from '../../../assets/danger-sing@3x.png';
import { PlusCircleOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import { FacilitiesButtons } from '../../facilities/components';
import { useHistory } from "react-router-dom";
import ajax from '../../../ajax';
import './index.css';
import { PageTemplate } from './../../template';
import ReactECharts from 'echarts-for-react';
import { TitleEdit } from '../../../utils';

export const IndividualRisk = () => {
    return <PageTemplate
        iconUrl={danger}
        title="Risk Assessment"
        updateMenu
        subtitle={(content,editMode)=> TitleEdit(content,editMode,"Individual Risk")}
        api="/individual_risk"
        descName="individual_desc"
        imageName="individual_image"
        pdfName="individual_pdf"
        outside= {(content, editMode, form) => <IndividualGraph content={content} editMode={editMode} form={form} />}
    />
}

// function IndividualGraph({ content, editMode, form }) {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         try {
//             var res = JSON.parse(content.erp_flow_chat.replace(/\\/g, ''));
//             setData(res);
//         } catch (e) { }
//     }, [content.erp_flow_chat]);

//     useEffect(() => { form.setFieldsValue({ erp_flow_chat: JSON.stringify(data) }) }, [data]);


//     function removeLevel(index) {
//         data.splice(index, 1);
//         setData([...data]);
//     }

//     function addmore() { setData([...data, '']); }
//     function editPlan(index, value) {
//         data[index] = value;
//         setData([...data]);
//     }

//     return <div className='box--facility bg-white-box societal-risk-table remedial-action-plan manning--box--facility'>
//         <h2>Graph</h2>
//         <div className='bg-white-box form-holder-risk'>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
//             <Form>
//                 <Form.Item label="User" name="User" wrapperCol={{ span: 24 }}><Input placeholder="Type User" /></Form.Item>
//                 <Row gutter={[16, 0]}>
//                     <Col span={12}><Form.Item label="Risk" name="Risk" ><Input placeholder="Type Risk" /></Form.Item></Col>
//                     <Col span={12}><Form.Item label="Value" name="Value"><Input type="number" placeholder="Type Value" /></Form.Item></Col>
//                 </Row>
//             </Form>
//             <Row>
//                 <Col span={12}>
//                     <Button type="default" block icon={<PlusCircleOutlined />}>Add more user</Button>
//                 </Col>
//                 <Col span={12} style={{ textAlign: 'right' }}>
//                     <Button type="primary" htmlType="submit">Proceed</Button>
//                 </Col>
//             </Row>
//         </div>
//     </div>
// }

function IndividualGraph({ content, editMode, form }) {
    const [series, setSeries] = useState([]);
    const hasData = series && series.length;
    var chartRef;
    const onFinish = ({ risk = [] }) => { setSeries(risk) };
    const option = {
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'right', top: 'center' },
        xAxis: {type: 'category'},
        yAxis: {type: 'value'},
        series: series.map(v=> ({...v, type: 'bar',stack: 'total',label: {show: true}}))
    };

    useEffect(() => {
        try {
            var res = JSON.parse(content.graph_data.replace(/\\/g, ''));
            setSeries(res);
        } catch (e) { }
    }, [content.graph_data]);
    useEffect(() => {
        form.setFieldsValue({ graph_data: JSON.stringify(series) });
        chartRef && chartRef.getEchartsInstance().setOption(option);
    }, [series]);

    if (!editMode && !hasData) return null;

    function remove(index) {
        series.splice(index, 1);
        setSeries([...series]);
    }

    function update(index, value) {
        series[index] = value;
        setSeries([...series]);
    }
    function add() { setSeries([...series, {}]); }

    return <div>
        <Form.Item hidden name="graph_data"><Input /></Form.Item>
        <h2>Pie Chart</h2>
        <Row>
            <Col span={16}>
                <div className='bg-white-box form-holder-risk'>
                    {!hasData ? <RiskForm onFinish={onFinish} /> : <ReactECharts ref={e => { chartRef = e; }} option={option} />}
                </div>
            </Col>
            <Col span={8} push={1}>
                {editMode && <RiskCard editMode={editMode} data={series} add={add} update={update} remove={remove} />}
            </Col>
        </Row>
    </div>;
}

function RiskCard({ data, add, remove, update }) {
    const [index, setIndex] = useState();
    const [form] = Form.useForm();
    const current = data ? data[index] : null;
    useEffect(() => {
        form && form.setFieldsValue({ name: '', data: [], ...current });
    }, [current])

    if (!data || !data.length) return null;

    function edit() {
        update(index, form.getFieldsValue());
        setIndex(null);
    }
    function deleteI() {
        remove(index);
        setIndex(null);
    }
    function addNew() {
        setIndex(data.length);
        add();
    }

    return <Card type="inner" title="Risk Data" extra={<Button type="link" onClick={addNew} icon={<PlusOutlined />}>Add new user</Button>}>
        {current && <Form form={form} layout="vertical">
            <Form.Item label="User" name="name"><Input /></Form.Item>
            <Form.List name="data">
                {(fields, { add, remove }) =><> 
                    {fields.map(({key, name, fieldKey, ...restField })=>
                        <Space key={key} align="baseline">
                            <Form.Item label="Name of risk" name={[ name, "name"]}><Input /></Form.Item>
                            <Form.Item label="Value" name={[name, "value"]}><Input type="number" /></Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>)}
                    <div><Button type="link" onClick={() => add()} icon={<PlusOutlined />}>Add field</Button></div>
                </>}
            </Form.List>
            <div style={{ textAlign: 'right' }}>
                <Button type="link" danger onClick={deleteI}>Delete</Button>
                <Button type="primary" onClick={edit}>Save</Button>
            </div>
        </Form>}
        {data.map((v, i) => i !== index && <div style={{ display: 'flex', justifyContent: 'space-between' }} key={i}>
            <div>{v.name}</div>
            <div>{<Button type="link" onClick={() => setIndex(i)}>Edit</Button>}</div>
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
                            return <div key={key} style={{border: '1px solid', padding: 10, borderRadius:4, margin: '15px 0'}}>
                                <div style={{textAlign:'right', padding:10}}><MinusCircleOutlined onClick={() => remove(name)} /></div>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'name']}
                                    fieldKey={[fieldKey, 'name']}
                                    rules={[{ required: true, message: 'Missing User Name' }]}
                                    label="User"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.List name={[name,"data"]}>
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, fieldKey, ...restField }) => {
                                                return <Space key={key} align="center">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'name']}
                                                        fieldKey={[ fieldKey, 'name']}
                                                        // rules={[{ required: true, message: 'Missing Risk' }]}
                                                        label="Name of risk"
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'value']}
                                                        fieldKey={[ fieldKey, 'value']}
                                                        // rules={[{ required: true, message: 'Missing Value' }]}
                                                        label="Value"
                                                    >
                                                        <InputNumber type="number" />
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Space>
                                            })}
                                            <div><Button type="link" onClick={() => add()} icon={<PlusOutlined />}>Add field</Button></div>
                                        </>
                                    )}
                                </Form.List>
                            </div>
                        })}
                        <Row justify="space-between">
                            <Col span={12}><Button type="link" onClick={() => add()} icon={<PlusOutlined />}>Add User</Button></Col>
                            <Col span={12}><div style={{ textAlign: 'right' }}><Button onClick={() => form.submit()} size="small" type="primary">Proceed</Button></div></Col>
                        </Row>
                    </>
                )}
            </Form.List>
        </Form></>

}
