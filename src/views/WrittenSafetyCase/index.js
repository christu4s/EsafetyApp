import { Form, Table, Popconfirm, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import extinguisher from '../../assets/fire-extinguisher@3x.png';
import download from '../../assets/direct-download@3x.png';
import { getFormFields, PageTemplate } from './../template';
import ajax from '../../ajax';
import { ButtonUpload, TitleEdit } from '../../utils';
import { DeleteOutlined } from '@ant-design/icons';

export const WrittenSafetyCase = () => {
    return <PageTemplate
        iconUrl={extinguisher} 
        updateMenu
        subtitle={(content,editMode)=> TitleEdit(content,editMode,"Written Safety Case")}
        api="/written_safety_case" 
        descName="safety_desc"
        imageName="safety_image"
        pdfName="safety_pdf"
        videoName="safety_video"
        tableName="table_detail"
        >
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
