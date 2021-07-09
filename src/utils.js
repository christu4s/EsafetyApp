import { Button, Card, Form, Input, Modal, Popconfirm, Select, Spin, Table, Typography, Upload } from "antd";
import { PlusCircleOutlined, DeleteFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import ajax from "./ajax";
import JSZip from "jszip";
import moment from "moment";
import { requiredRule } from "./constants";

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

export function StatusBox({title, count, icon}){
    return <Card>
      <div style={{display:'flex',justifyContent: 'space-between'}} >
        <div>
          <Typography.Title level={3}>{count}</Typography.Title>
          <Typography.Text>{title}</Typography.Text>
        </div>
        <div>{icon}</div>
      </div>
    </Card>
}

export function PageTitle({children}){
  return <Typography.Title>{children}</Typography.Title>
}

export function ButtonModal({onSubmit, buttonText, fields = [], children, ...props}){
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const togglModal = () => setVisible(!visible);

  const submit = async (values)=>{
    setLoading(true);
    form.resetFields();
    if(typeof onSubmit=='function'){
      await onSubmit(values);
    } 
    setLoading(false);
    setVisible(false);
    form.resetFields();
  }

  return (
    <>
      <Button onClick={togglModal} type="danger" >{children || <>{buttonText} <PlusCircleOutlined /></>}</Button>
      <Modal width={610} className='custom--model custom--model--label'  visible={visible} onOk={()=> form.validateFields().then(submit)} okText='Create' confirmLoading={loading} okType='danger' onCancel={togglModal} {...props}>
        <Form labelCol={{span: 8}} wrapperCol={{span: 16}} form={form}>
          {fields.map((({item, input})=>  <Form.Item key={item.name} hasFeedback {...item}>{input || <Input />}</Form.Item>))}
        </Form>
      </Modal>
    </>
  );
};

ButtonModal.defaultSubmit = async (values) => {
  var res = await ajax.post(null, values);
  res && window.location.reload(false);
}

export function GroupSelect(props){
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  async function fetch(search){
    setLoading(true);
    var groups = await ajax.get('/group', {search});
    if(groups) setOptions(groups.data.map(v=>({label: v.title,value: v.id})));
    setLoading(false);
  }

  useEffect(()=>{ fetch() },[]);

  return <Select showSearch {...props} filterOption={false} loading={loading} onSearch={fetch} options={options} />
}

export function UploadCard({icon, title, inputs, type, formProps = {}}){
  const [files, setFile] = useState([]);
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(false);
  const closeModal = () => setFile([]);
  const [form] = Form.useForm();

  const columns = [
    {title: 'ID', render: (v,r,i)=> i+1 },
    {title: 'Title', dataIndex: 'name'},
    // {title: 'Duration', dataIndex: 'duration'},
  ]

  function onUpload(file){
    var loaded_files = [];
    setSelected(file);
    JSZip.loadAsync(file).then(function(zip) {
      zip.forEach((relativePath, zipEntry) =>{  
          if(!zipEntry || zipEntry.dir) return;
          loaded_files.push(zipEntry);
      });
      setFile(loaded_files);
    });

    return false;
  }

  function save(){
    form.validateFields().then(async v=>{
      setLoading(true)
      var params = {}; 
      for(var [k,v] of Object.entries(v)){
        if(v instanceof moment){
          var field = form.getFieldInstance(k);
          v = v.format(field.props.format || 'YYYY-MM-DD');
        }
        params[k]=v;
      }
      await ajax.post(null,{audio_type:type,file: selected, ...params});
      setLoading(false); 
      setSelected(null);
      setFile([]);
    });
  }

  return <div className='card--box'>
    <div className='card--icon--holder'><img src ={icon} height='50' /></div>
    <h4>Upload to {title}</h4>
    <p>Browse folder or files to upload</p>
    <Upload accept=".zip" beforeUpload={onUpload}  showUploadList={false}><Button type="primary">Choose file</Button></Upload>
    {<Modal width={610} className='custom--model custom--model--label' visible={!!files.length} confirmLoading={loading}  okType='danger' okText='Save' cancelText='Cancel' onOk={save} onCancel={closeModal} title="File Upload">
        <Table dataSource={files} columns={columns} size="small" />
        <Form form={form} rowKey={r=> r.name} layout="inline" {...formProps}>
          {inputs && Array.isArray(inputs) && inputs.map(({input, ...v}, i) =><Form.Item key={i} style={{minWidth: 230}} rules={[requiredRule]} {...v}>
            {input || <Input />}
        </Form.Item> ) }
        </Form>
      </Modal>}
  </div>
}

export const deleteCol = (api, col = 'id') =>({ title: '', dataIndex: 'del', 
    render: (v,r)=> <Popconfirm 
        title="Are you sure" 
        onConfirm={async ()=>{ 
          await ajax.delete(api + '/' + (r[col] || '') );
          window.location.reload(false);
        }} 
        okText="Yes" cancelText="No">
            <DeleteFilled style={{color:"red"}} />
  </Popconfirm>
})