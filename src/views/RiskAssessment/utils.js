import { Row, Col, Card, Button, Input, Form, Space, InputNumber } from 'antd';
import React, { useState, useEffect } from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

export function IndividualGraph({ content, editMode, form }) {
    const [series, setSeries] = useState([]);
    const hasData = series && series.length;
    var chartRef;
    const onFinish = ({ risk = [] }) => { setSeries(risk) };
    const option = {
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'right', top: 'center' },
        xAxis: { type: 'category' },
        yAxis: { type: 'value' },
        series: series.map(v => ({ ...v, type: 'bar', stack: 'total', label: { show: true } }))
    };

    useEffect(() => {
        try {
            var res = JSON.parse(content.data.replace(/\\/g, ''));
            setSeries(res);
        } catch (e) { }
    }, [content.data]);
    useEffect(() => {
        form.setFieldsValue({ data: JSON.stringify(series) });
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
        <Form.Item hidden name="data"><Input /></Form.Item>
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
                {(fields, { add, remove }) => <>
                    {fields.map(({ key, name, fieldKey, ...restField }) =>
                        <Space key={key} align="baseline">
                            <Form.Item label="Name of risk" name={[name, "name"]}><Input /></Form.Item>
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
                            return <div key={key} style={{ border: '1px solid', padding: 10, borderRadius: 4, margin: '15px 0' }}>
                                <div style={{ textAlign: 'right', padding: 10 }}><MinusCircleOutlined onClick={() => remove(name)} /></div>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'name']}
                                    fieldKey={[fieldKey, 'name']}
                                    rules={[{ required: true, message: 'Missing User Name' }]}
                                    label="User"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.List name={[name, "data"]}>
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, fieldKey, ...restField }) => {
                                                return <Space key={key} align="center">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'name']}
                                                        fieldKey={[fieldKey, 'name']}
                                                        // rules={[{ required: true, message: 'Missing Risk' }]}
                                                        label="Name of risk"
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'value']}
                                                        fieldKey={[fieldKey, 'value']}
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