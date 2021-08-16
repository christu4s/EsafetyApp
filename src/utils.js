import { Card, Button, Table, Modal, Upload, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CloudUploadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ajax from "./ajax";
import computing from './assets/cloud-computing@3x.png';
import pdf from './assets/pdf-1@3x.png';

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


export function ButtonUpload({children, name, onSubmit, addMore = false, buttonText = 'Upload Files', ...props}){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () =>  setIsModalVisible(!isModalVisible); 

  async function onSave(){
    if(typeof onSubmit == 'function') await onSubmit();
    toggleModal();
  }
  
  return <div className={addMore ? 'addmore--button' : null}>
    <Button type={addMore? 'default' : "primary"} icon={addMore ? <PlusCircleOutlined /> : <CloudUploadOutlined />} onClick={toggleModal}>{buttonText}</Button>
      <Modal title="" className='upload--modal' visible={isModalVisible} onOk={toggleModal} onCancel={toggleModal}>
        <h3 className='modal--title text-center'>Upload Files</h3>
        <p className=' text-center'>File size not more than 2 MB</p>
        <Form.Item name={name}>
          <Upload.Dragger beforeUpload={() => false} {...props}>
              <p className="ant-upload-drag-icon">
                  <img width='50' src={computing} />
              </p>
              <p className="ant-upload-hint">
                  Drag or drop your files here OR <span> browse </span>
              </p>
          </Upload.Dragger>
        </Form.Item>
        {children}
        <Button type="primary" onClick={onSave} icon={addMore ? null : <CloudUploadOutlined />}>{addMore ? 'Create' : 'Upload'}</Button>
      </Modal>
    </div>
}

export function FileViewer({images = [], index = 0}){
  if(!images[index]) return null;

  const {type = '', name, src} = images[index];

  return type.includes('image') ? <img width='100%' src={src} /> : <div className='box--facility pdf-view-section area--box--facility'>
    <h2 style={{ marginTop: 15 }}><img width='30' src={pdf} /> <span> Pdf File Name</span></h2>
    <iframe src={src} width="100%" height="700" frameBorder="0" />
  </div> 
}
export function DescField({name = '', value='', editMode=false}){
  return editMode ? <Form.Item name={name} initialValue={value}><Input.TextArea /></Form.Item> : <p>{value}</p>;
}

export function EditButtons({editMode, toggle, save}){
  return !editMode ? <Button type="primary" size="small" onClick={toggle}>Edit</Button> : 
  <Space>
      <Button type="primary" size="small" danger onClick={toggle}>Cancel</Button>
      <Button type="primary" size="small" success onClick={save}>Save</Button>
  </Space>
}
