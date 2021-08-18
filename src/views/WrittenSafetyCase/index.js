import { Form, Table, Popconfirm, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import extinguisher from '../../assets/fire-extinguisher@3x.png';
import download from '../../assets/direct-download@3x.png';
import { getFormFields, PageTemplate } from './../template';
import ajax from '../../ajax';
import { ButtonUpload } from '../../utils';
import { DeleteOutlined } from '@ant-design/icons';

export const WrittenSafetyCase = () => {
    return <PageTemplate
        iconUrl={extinguisher} 
        subtitle="Written Safety Case"
        api="/written_safety_case" 
        descName="safety_desc"
        imageName="safety_image"
        pdfName="safety_pdf">
        {(content, editMode) => <TableWritten editMode={editMode} />}    
    </PageTemplate>
}

function TableWritten({editMode}){
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    const [now, setNow] = useState();
    const refresh = () => setNow(new Date());
    useEffect(() => { ajax.get('/writen-safety').then(res => res && setData(res.data)); },[now]);
    
    const columns = [
        { title: 'File Name', dataIndex: 'title', },
        {
            title: '', dataIndex: 'safety_case',
            render: (value, row, index) => value && value[0] && <a href={value[0].src} download><img width='20' src={download} /></a>
        },
        {
            title: '', dataIndex: '',
            render: (value, row, index) => editMode && <Popconfirm onConfirm={() => deleteRow(row.id)} title="Are you sure to delete this?" ><DeleteOutlined danger /></Popconfirm>
        },
    ];                                  
    function submit() { ajax.post('/writen-safety', getFormFields(form)).then(refresh); }
    function deleteRow(id) {ajax.delete('/writen-safety/' + id).then(refresh); }

    return <div>
        <div className="divider" style={{ marginBottom: 10 }}></div>
        {editMode && <Form form={form}>
            <ButtonUpload name="safety_case" onSubmit={submit} >
                <div>
                    <label>Name of File</label>
                        <Form.Item name="title"><Input /></Form.Item>
                    </div>
                </ButtonUpload>
            </Form>}
        <div class="esafty-table">
            <Table dataSource={data} columns={columns} />
        </div>
    </div>
}


// export const WrittenSafetyCase = () => {
//     const { Dragger } = Upload;
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [content, setContent] = useState({ safety_desc: '', safety_file: '' });
//     const [form] = Form.useForm();
//     const [now, setNow] = useState();
//     const refresh = () => setNow(new Date());
//     const [tableData, setTableData] = useState([]);

//     useEffect(() => {
//         ajax.get('/written_safety_case').then(res => res && setContent(res));
//         ajax.get('/writen-safety').then(res => res && setTableData(res.data));
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
//         { title: 'File Name', dataIndex: 'title', },
//         {
//             title: '', dataIndex: 'safety_case',
//             render: (value, row, index) => value && value[0] && <a href={value[0].src} download><img width='20' src={download} /></a>
//         },
//         {
//             title: '', dataIndex: '',
//             render: (value, row, index) => editMode && <Popconfirm onConfirm={() => deleteRow(row.id)} title="Are you sure to delete this?" ><DeleteOutlined danger /></Popconfirm>
//         },
//     ];

//     function deleteRow(id) {
//         ajax.delete('/writen-safety/' + id).then(refresh);
//     }

//     async function saveData() {
//         var values = form.getFieldsValue();
//         await ajax.post('/written_safety_case', values).then(res => res && setContent(res));
//         setEditMode(!editMode);
//     }
//     function submit() {
//         var { title, safety_case } = form.getFieldsValue();
//         ajax.post('/writen-safety', { title, safety_case: safety_case ? safety_case.file : null }).then(res => {
//             res && setTableData(res.data);
//             refresh();
//             setEditMode(!editMode);
//             setIsModalVisible(false);
//         });
//     }

//     const { Meta } = Card;


//     return (
//         <div className='facility--wrapper'>
//             <Row>
//                 <Col span={16}>
//                     <Row>
//                         <Col span={1}>
//                             <div className='area--img'>
//                                 <img width='28' src={extinguisher} />
//                             </div>
//                         </Col>
//                         <Col span={23}>
//                             <div className='area--header mt-5'>
//                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                     <div>
//                                         <h2 style={{ marginTop: 25 }}>Written Safety Case</h2>
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

//                     <Row>
//                         <Col span={23}>
//                             <div className='box--facility area--box--facility'>
//                                 <p>
//                                     <Form form={form}>
//                                         {editMode ? <Form.Item name="safety_desc"><Input.TextArea defaultValue={content.safety_desc} /></Form.Item> : <p>{content.safety_desc}</p>}
//                                     </Form>
//                                 </p>
//                             </div>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col span={24}>
//                             <div className="divider" style={{ marginBottom: 10 }}></div>
//                         </Col>
//                     </Row>


//                     {editMode &&
//                         <Row className='addmore--button'>
//                             <Col>
//                                 <Button type="secondary" icon={<PlusCircleOutlined />} onClick={showModal}>
//                                     Add More
//                                 </Button>

//                                 <Modal title="" className='upload--modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//                                     <h3 className='modal--title text-center'>Upload Files</h3>
//                                     <p className=' text-center'>Recommended Image dimension max 1500px (w) x 1000px (h) File size not more than 2 MB</p>
//                                     <Form form={form}>
//                                         <Form.Item name="safety_case">
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
//                                             <label>Name of File</label>
//                                             <Form.Item name="title">
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

//             <div class="esafty-table">
//                 <Table dataSource={tableData} columns={columns} />
//             </div>
//         </div>
//     );
// }