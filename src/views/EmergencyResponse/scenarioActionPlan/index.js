import { Row, Col, Radio, Card, Button, Modal, Upload, message, Input, Form, Space, Table, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';

import download from '../../../assets/direct-download@3x.png';

import extinguisher from '../../../assets/fire-extinguisher@3x.png';
import { EditOutlined, SaveOutlined, CloudUploadOutlined, ArrowLeftOutlined, DeleteOutlined, DownloadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import computing from '../../../assets/cloud-computing@3x.png';
import ajax from '../../../ajax';
import { Link } from 'react-router-dom';
import { getFormFields, PageTemplate } from '../../template';
import { ButtonUpload } from '../../../utils';
import { TitleEdit } from '../../../utils';

export const ScenarioActionPlan = () => {
    return <PageTemplate
        iconUrl={extinguisher}
        title="Emergency Response"
        updateMenu
        subtitle={(content, editMode) => TitleEdit(content, editMode, "Scenario Specific Action Plan")}
        api="/scenario_action"
        descName="scenario_desc"
        imageName="scenario_image"
        pdfName="scenario_pdf"
        videoName="scenario_video"
        tableName="table_detail"
    >
        {(content, editMode, form) => <TableScenario content={content} editMode={editMode} form={form} />}
    </PageTemplate>
}


function TableScenario({ editMode }) {
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    const [now, setNow] = useState();
    const refresh = () => setNow(new Date());
    const [editingRowId, setEditingRowId] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const perPage = 10 //for pagination & Api


    useEffect(() => {
        ajax.get('/scenario_action_flow', { count: perPage, page })
            .then(res => {
                setTotalPages(res.total)
                res && setData(res.data)
            });
    }, [page, now]);

    const onSave = () => {
        ajax.post('/scenario_action_flow/' + editingRowId, getFormFields(form)).then(refresh);
        setEditingRowId(null)
    }
    const columns = [
        {
            title: 'Action Plan', dataIndex: 'title',
            render: (value, record) => editMode && editingRowId === record.id ?
                <Form.Item
                    name="title"
                    rules={[{
                        required: true,
                        message: "Please add a Title"
                    }]}
                >
                    <Input />
                </Form.Item>
                : value
        },
        { title: 'Document Number', dataIndex: 'desc', },
        {
            title: '', dataIndex: '',
            render: (_, record) => editMode &&
                <>
                    <Button onClick={() => {
                        setEditingRowId(record.id)
                        form.setFieldsValue({
                            title: record.title,
                        })
                    }}>
                        <EditOutlined />
                    </Button>
                    <Button onClick={onSave} >
                        <SaveOutlined />
                    </Button>
                </>
        },
        {
            title: '', dataIndex: 'scenario_file',
            render: (value, row, index) => value && value[0] && <a href={value[0].src} download><img width='20' src={download} /></a>
        },
        {
            title: '', dataIndex: '',
            render: (value, row, index) => editMode && <Popconfirm onConfirm={() => deleteRow(row.id)} title="Are you sure to delete this?" ><DeleteOutlined danger /></Popconfirm>
        },
    ];

    function submit() { ajax.post('/scenario_action_flow', getFormFields(form)).then(refresh); }
    function deleteRow(id) { ajax.delete('/scenario_action_flow/' + id).then(refresh); }

    return <div>
        <div className="divider" style={{ marginBottom: 10 }}></div>
        {editMode && <Form form={form}>
            <ButtonUpload name="scenario_file" onSubmit={submit} >
                <div className='area--form'>
                    <label>Name of the Action Plan</label>
                    <Form.Item name="title">
                        <Input />
                    </Form.Item>
                    <label>Document Number</label>
                    <Form.Item name="desc">
                        <Input />
                    </Form.Item>
                </div>
            </ButtonUpload>
        </Form>}

        <div class="esafty-table">
            <Form form={form}>

                <Table dataSource={data} columns={columns} pagination={{
                    total: totalPages,
                    pageSize: perPage,
                    onChange: (v) => setPage(v)
                }} />
            </Form>
        </div>
    </div>
}


// export const ScenarioActionPlan = () => {
//     const { Dragger } = Upload;
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({ scenario_desc: ' ' });
//     const [form] = Form.useForm();
//     const [now, setNow] = useState();
//     const refresh = () => setNow(new Date());
//     const [tableData, setTableData] = useState([]);
//     useEffect(() => {
//         ajax.get('/scenario_action').then(res => res && setContent(res));
//         ajax.get('/scenario_action_flow').then(res => res && setTableData(res.data));
//     }, [now]);
//     const showModal = () => {
//         setIsModalVisible(true);
//     };

//     const handleOk = () => {
//         setIsModalVisible(false);
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };
//     const props = {
//         beforeUpload: () => false,
//     };

//     const columns = [
//         { title: 'Action Plan', dataIndex: 'title', },
//         { title: 'Document Number', dataIndex: 'desc', },
//         {
//             title: '', dataIndex: 'scenario_file',
//             render: (value, row, index) => value && value[0] && <a href={value[0].src} download><img width='20' src={download} /></a>
//         },
//         {
//             title: '', dataIndex: '',
//             render: (value, row, index) => editMode && <Popconfirm onConfirm={() => deleteRow(row.id)} title="Are you sure to delete this?" ><DeleteOutlined danger /></Popconfirm>
//         },
//     ];

//     function deleteRow(id) {
//         ajax.delete('/scenario_action_flow/' + id).then(refresh);
//     }
//     async function saveData() {
//         var values = form.getFieldsValue();
//         await ajax.post('/scenario_action', values).then(res => res && setContent(res));
//         setEditMode(!editMode);
//     }

//     function submit() {
//         var { title = ' ', desc = ' ', scenario_file } = form.getFieldsValue();
//         ajax.post('/scenario_action_flow', { title, desc, scenario_file: scenario_file ? scenario_file.file : null }).then(res => {
//             res && setTableData(res.data);
//             refresh();
//             setEditMode(!editMode);
//             setIsModalVisible(false);
//         });

//     }
//     const { Meta } = Card;


//     return (
//         <div className='facility--wrapper'>
//             <Link to='/emergency-response' style={{ color: '#282828' }}>
//                 <Row>
//                     <Col span={1}>
//                         <div className=''>
//                             <ArrowLeftOutlined />
//                         </div>
//                     </Col>
//                     <Col span={23}>
//                         <div className=''>
//                             <p>Back
//                             </p>
//                         </div>
//                     </Col>
//                 </Row>
//             </Link>
//             <Row>
//                 <Col span={16}>
//                     <Row>
//                         <Col span={1}>
//                             <div className='area--img' >
//                                 <img width='28' src={extinguisher} />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className='area--header mt-5'>
//                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                     <div>
//                                         <h2 style={{ marginTop: 20 }}>Scenario Specific Action Plan</h2>
//                                     </div>

//                                     <div>
//                                         {!editMode ? <Button type="primary" size="small" onClick={() => setEditMode(!editMode)}>Edit</Button> :
//                                             <Space>
//                                                 <Button type="primary" size="small" danger onClick={() => setEditMode(!editMode)}>Cancel</Button>
//                                                 <Button type="primary" size="small" onClick={saveData}>Save</Button>
//                                             </Space>}
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                     <div className='box--facility area--box--facility'>
//                         <p>
//                             <Form form={form}>
//                                 {editMode ? <Form.Item name="scenario_desc"><Input.TextArea defaultValue={content.scenario_desc} /></Form.Item> : <p>{content.scenario_desc}</p>}
//                             </Form>

//                         </p>
//                     </div>
//                     <hr />
//                     <div>
//                         <h3 style={{ marginTop: 25 }}>Flow Chat - ERP</h3>
//                     </div>
//                     <div class="esafty-table">
//                         <Table dataSource={tableData} columns={columns} />
//                     </div>
//                     {editMode &&
//                         <Row className='addmore--button'>
//                             <Col>
//                                 <Button type="primary" icon={<CloudUploadOutlined />} onClick={showModal}>
//                                     Upload Document
//                                 </Button>

//                                 <Modal title="" className='upload--modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//                                     <h3 className='modal--title text-center'>Upload Files</h3>
//                                     <p className=' text-center'>Recommended Image dimension max 1500px (w) x 1000px (h) File size not more than 2 MB</p>
//                                     <Form form={form}>
//                                         <Form.Item name="scenario_file">
//                                             <Dragger {...props}>
//                                                 <p className="ant-upload-drag-icon">
//                                                     <img width='50' src={computing} />
//                                                 </p>
//                                                 <p className="ant-upload-hint">
//                                                     Drag or drop your files here OR <span> browse </span>
//                                                 </p>
//                                             </Dragger>
//                                         </Form.Item>
//                                         <div className='area--form'>
//                                             <label>Name of the Action Plan</label>
//                                             <Form.Item name="title">
//                                                 <Input />
//                                             </Form.Item>
//                                             <label>Document Number</label>
//                                             <Form.Item name="desc">
//                                                 <Input />
//                                             </Form.Item>
//                                         </div>
//                                     </Form>

//                                     <Button type="primary" onClick={submit}>Create</Button>
//                                 </Modal>
//                             </Col>
//                         </Row>

//                     }

//                 </Col>
//             </Row>
//         </div>
//     );
// }