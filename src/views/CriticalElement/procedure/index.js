import { Row, Col, Card, Button, Modal, Upload, message, Input, Table, Tag, Space, Form, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';
import alert from '../../../assets/alert@3x.png';
import download from '../../../assets/direct-download@3x.png';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import ajax from '../../../ajax';
import { getFormFields, PageTemplate } from './../../template';
import { ButtonUpload } from '../../../utils';
import { TitleEdit } from '../../../utils';

export const CriticalProcedure = () => {
    return <PageTemplate
        iconUrl={alert}
        title="Safty Critical Element"
        updateMenu
        subtitle={(content, editMode) => TitleEdit(content, editMode, "Safty Critical Procedure")}
        api="/critical_procedure"
        descName="procedure_desc"
        imageName="procedure_image"
        pdfName="procedure_pdf"
        videoName="procedure_video"
        tableName="table_detail"
        clickableName="clickable_image"
    >{(content, editMode) => <ProcedureTable editMode={editMode} />}
    </PageTemplate>
}

function ProcedureTable({ editMode }) {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const perPage = 10 //for pagination & Api



    const [form] = Form.useForm();
    const [now, setNow] = useState();
    const refresh = () => setNow(new Date());
    const [editingRowId, setEditingRowId] = useState(null);

    useEffect(() => {
        ajax.get('/safety_critical_procedure', { count: perPage, page }).then(res => {
            res && setTotalPages(res.total)
            res && setData(res.data)
        });
    }, [now, page]);

    function submit() {
        ajax.post('/safety_critical_procedure', getFormFields(form)).then(refresh);
    }
    function deleteRow(id) {
        ajax.delete('/safety_critical_procedure/' + id).then(refresh);
    }
    const onSave = () => {
        ajax.post('/safety_critical_procedure/' + editingRowId, getFormFields(form)).then(refresh);
        setEditingRowId(null)
    }


    const columns = [
        {
            title: 'Safety Critical Procedure', dataIndex: 'title',
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
        { title: 'Document Number', dataIndex: 'desc' },
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
            title: '', dataIndex: 'procedure_file',
            render: (value, row, index) => value && value[0] && <a href={value[0].src} download><img width='20' src={download} /></a>
        },
        {
            title: '', dataIndex: '',
            render: (value, row, index) => editMode && <Popconfirm onConfirm={() => deleteRow(row.id)} title="Are you sure to delete this?" ><DeleteOutlined danger /></Popconfirm>
        },
    ];

    return <div className="management--wrapper">
        <div className='divider' style={{ marginBottom: 20 }}></div>
        {data.length > 0 &&
            <Form form={form}>
                <Table dataSource={data} columns={columns} pagination={{
                    total: totalPages,
                    pageSize: perPage,
                    onChange: (v) => setPage(v)
                }} />
            </Form>
        }
        {editMode && <Form form={form}><ButtonUpload name="procedure_file" onSubmit={submit}>
            <div className='area--form'>
                <label>Safety Critical Procedure</label>
                <Form.Item name="title"><Input /></Form.Item>
                <label>Document Number</label>
                <Form.Item name="desc"><Input.TextArea /></Form.Item>
            </div>
        </ButtonUpload></Form>}
    </div>
}

// export const CriticalProcedure = () => {

//     const { Dragger } = Upload;
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [now, setNow] = useState();
//     const [content, setContent] = useState({ procedure_desc: ' ' });
//     const [form] = Form.useForm();
//     const [tableData, setTableData] = useState([]);
//     const refresh = () => setNow(new Date());

//     useEffect(() => {
//         ajax.get('/critical_procedure').then(res => res && setContent(res));
//         ajax.get('/safety_critical_procedure').then(res => res && setTableData(res.data));
//     }, [now]);

//     async function saveData() {
//         var values = form.getFieldsValue();
//         await ajax.post('/critical_procedure', values).then(res => res && setContent(res));
//         setEditMode(!editMode);
//     }
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

//     const { Meta } = Card;
//     const columns = [
//         { title: 'Safety Critical Procedure', dataIndex: 'title' },
//         { title: 'Document Number', dataIndex: 'desc' },
//         {
//             title: '', dataIndex: 'procedure_file',
//             render: (value, row, index) => value && value[0] && <a href={value[0].src} download><img width='20' src={download} /></a>
//         },
//         {
//             title: '', dataIndex: '',
//             render: (value, row, index) => editMode && <Popconfirm onConfirm={() => deleteRow(row.id)} title="Are you sure to delete this?" ><DeleteOutlined danger /></Popconfirm>
//         },
//     ];
//     function deleteRow(id) {
//         ajax.delete('/safety_critical_procedure/' + id).then(refresh);
//     }
//     function submit() {
//         var { title = ' ', desc = ' ', procedure_file } = form.getFieldsValue();
//         ajax.post('/safety_critical_procedure', { title, desc, procedure_file: procedure_file ? procedure_file.file : null }).then(res => {
//             res && setTableData(res.data);
//             refresh();
//             setEditMode(!editMode);
//             setIsModalVisible(false);
//         });
//     }
//     const [contacts, setContacts] = useState(test);
//     return (
//         <div className='facility--wrapper'>
//             <a href="/#/safety-critical" style={{ color: '#282828' }}>
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
//             </a>
//             <Row>
//                 <Col span={16}>
//                     <Row>
//                         <Col span={1}>
//                             <div className='area--img'>
//                                 <img width='38' src={alert} />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className='area--header mt-5'>
//                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                     <div>
//                                         <h2 style={{ marginTop: 25 }}>Safety Critical Procedure</h2>
//                                     </div>

//                                     <div>
//                                         {!editMode ? <Button type="primary" size="small" onClick={() => setEditMode(!editMode)}>Edit</Button> :
//                                             <Space>
//                                                 <Button type="primary" size="small" danger onClick={() => setEditMode(!editMode)}>Cancel</Button>
//                                                 <Button type="primary" size="small" success onClick={saveData}>Save</Button>
//                                             </Space>}
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col span={23}>
//                             <div className='box--facility area--box--facility'>
//                                 <p>
//                                     <Form form={form}>
//                                         {editMode ? <Form.Item name="procedure_desc"><Input.TextArea defaultValue={content.procedure_desc} /></Form.Item> : <p>{content.procedure_desc}</p>}
//                                     </Form>
//                                 </p>
//                             </div>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col span={24}>
//                             <div className='divider'></div>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col span={24}>
//                             <Table dataSource={tableData} columns={columns} />
//                         </Col>
//                     </Row>

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
//                                         <Form.Item name="procedure_file">
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
//                                             <label>Name of the Safety Critical Procedure</label>
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


//         </div >
//     );
// }