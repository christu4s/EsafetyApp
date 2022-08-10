import { Row, Col, Form, Space, Carousel, Image, Popconfirm, Select, Input, Button, Modal, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import ajax from '../ajax';
import { ButtonUpload, CardHolder, DescField, EditButtons,VideoInput } from '../utils';
import imagePdf from '../assets/pdf-1@3x.png';
import image from '../assets/image.png';
import { useHistory } from 'react-router-dom';
import { ArrowLeftOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMenuContext } from '../provider';
import { ReactSortable } from "react-sortablejs";
import { useLocation } from 'react-router-dom';

export const PageTemplate = ({
    updateData,
    title, 
    api,
    subtitle, 
    descName ='desc', 
    pdfName, 
    imageName, 
    videoName,
    tableName= "tableDetail",
    iconUrl,
    backButton,
    children, 
    right,
    updateMenu=false,
    canDelete=false,
    titleKey='title',
    outside}) => {
    const location = useLocation();
    const order_storage_key = 'order' + location.pathname;
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({});
    const [order, setOrder] = useState(getOrder());
    const [menu, setMenuTitle] = useMenuContext();
    const [form] = Form.useForm();
    const history = useHistory();

    //get the order
    function getOrder(){
        var stored = window.localStorage.getItem(order_storage_key);
        if(stored) return stored.split(',');
        return [imageName, pdfName, videoName].filter(Boolean);
    }

    //save order to localStorage once changed
    useEffect(()=>{ window.localStorage.setItem(order_storage_key, order.join(',')); },[order])

    
    const desc = content[descName], image = content[imageName], pdf = content[pdfName], video = content[videoName]; 
    var viewers = {};

    if(imageName) viewers[imageName]=<ImageViewer editMode={editMode} form={form} imageName={imageName} images={image} />;
    if(pdfName) viewers[pdfName] = <PdfViewer files={pdf} pdfName={'_' + pdfName} editMode={editMode} form={form} />;
    if(videoName) viewers[videoName] = <VideoViewer  videoName={videoName} form={form} editMode={editMode} videos={video} />;

    const sortView = order.map((item) =>(<div style={{margin: '20px 0', cursor:'move'}} key={item}>{viewers[item]}</div>)); 

    async function saveData() {
       // console.log(getFormFields(form));
        await ajax.post(api, getFormFields(form)).then(res =>{ 
            res && setContent(res);
            updateMenu && res[titleKey] && setMenuTitle(api + titleKey,res[titleKey]);
        });
        setEditMode(!editMode);
    }
    
    function deleteItem(){
        ajax.delete(api).then( ()=> history.goBack() );
    }

    useEffect(() => {
        ajax.get(api).then(res => res && setContent(res));
    }, [updateData]);

    
    
    return (
        <div className='facility--wrapper'>
            {backButton && <a href="#" onClick={()=> history.goBack()} style={{ color: '#282828' }}>
                <Space><ArrowLeftOutlined />Back</Space>
            </a>}
            <Form form={form}>
            <Row>
                <Col span={16}>
                    <Row>
                        {iconUrl && <Col span={1}>
                            <div className='area--img'>
                                 <img width='38' src={iconUrl} />
                            </div>
                        </Col>}
                        <Col span={23}>
                            <div className='area--header mt-5' >
                                <div style={{display:'flex', justifyContent: 'space-between'}}>
                                    <div style={{alignSelf:'center'}}>
                                        <p className='mb-0 '>{title}</p>
                                        <h2 style={{ marginTop: 0 }}>{typeof subtitle=='function' ? subtitle(content, editMode) : subtitle}</h2>
                                    </div>
                                    <div><EditButtons editMode={editMode} toggle={()=> setEditMode(!editMode)} save={saveData} /></div>
                                </div>
                                {canDelete && editMode && <Popconfirm title="Are you sure to delete this?" onConfirm={deleteItem}>
                                        <a style={{color:'red', float: 'right'}}>Delete</a>
                                    </Popconfirm>
                                }
                            </div>

                        </Col>
                    </Row>
                    {descName && <div className='box--facility area--box--facility'>
                        <DescField editMode={editMode} value={desc} name={descName} />
                    </div>}
                    {editMode && <Space>
                        {imageName && <ButtonUpload name={imageName} onSubmit={saveData} buttonText="Upload Images" multiple accept="image/*" />}
                        {pdfName && <ButtonUpload name={pdfName} onSubmit={saveData} buttonText="Upload PDF" accept="application/pdf" />}
                        {videoName && <ButtonUpload name={videoName} onSubmit={saveData} buttonText="Upload Video" accept=".mov,.mp4" />}
                        {tableName && <ButtonTable name={tableName} onSubmit={saveData}/>}
                    </Space>}
                    <div style={{margin: 20}} />
                    <ReactSortable list={order.map(id=> ({id}))} setList={items => setOrder(items.map(item=> item.id))}>
                        {sortView}
                    </ReactSortable>
                    {typeof children=='function' ? children(content, editMode, form, saveData) : children}
                </Col>
                <Col span={8} push={1} style={{ marginTop: 35 }}>
                    {typeof right=='function' ? right({content, editMode, form, setContent, saveData}) : right}
                </Col>
            </Row>
            {typeof outside=='function' ? outside(content, editMode, form) : outside}
            </Form>
        </div>
    );
}

function ButtonTable({data, onSubmit}){
    const [popup, setPopup] = useState(false);
   // var [tableDetail, setTableDetail] = useState(data || {dataSource:[], columns: []});
    const [dataSource, setdataSource] = useState([]);
    const [columns, setColumns] = useState([]);
    const [count, setCount] = useState(0);
    const [dataSet, setDataSet] = useState([{}]);
    const [rowsData, setRowsData] = useState([]);
    const [columnsData, setColumnsData] = useState([]);
    // function addColumn(){
    //     var dataIndex = columns.length;
    //     console.log('dataIndex',dataIndex);
    //      columns.push({title: <Input />,dataIndex});
    //     //setTableDetail({...tableDetail});
    // }
    var dataIndexColumn =columns.length;
    var i = 0;

    function onChangeColumnValues(event){
        console.log('columns',event.target.value);
       // dataSet[{key}] = val;
       // setRowsData([...dataSet]);
    }

    function addColumn() {
        setColumns({});
        // dataSource.push( {name: <Input />, key:dataIndexRow,projectName:'test'})
        setCount(count+1);
        const columnsInput = {
            title:<Input id={count} name={'name'+count} value="" onChange={onChangeColumnValues}/>,
            dataIndex: 'name'+count,
            key:'name'+count,
        }
        setColumns([...columns, columnsInput]);
       
        //console.log('columns',columns);
    }

    function onChangeRowValues(event) {
        console.log('rows',event.target.value);
        //dataSet[{key}] = val;
        //setColumnsData([...dataSet]); 
    }

   

    //console.log('setColumnsData',setColumnsData);
    //console.log('setRowsData',setRowsData);
    function addDataSource() {
        var dataIndexRow =dataIndexColumn.length;
        // dataSource.push( {namconst rowsInput = [];e: <Input />, key:dataIndexRow,projectName:'test'})
        
        // const rowsInput =  {
        //           key: '1',
        //           name0: <Input />,
        //           name1: <Input />,
        //           name2: <Input />,
        //           name3: <Input />,
        //           name4: <Input />,
        //         };
      if(columns.length == 0) {
        alert('Please add the column first');
        return false;
      }
        const rowsInput = {};

        {columns.map(function(column, key){
             var listName = column.dataIndex;
             rowsInput[key] = key;
             rowsInput[column.dataIndex] = <Input name={'value'+key} id={key} value="" onChange={onChangeRowValues}/>
          })}
                   
        //setColumns([...columns, columnsInput]);
       //  console.log('rowsInput',rowsInput);
        setdataSource([...dataSource, rowsInput]);

    }

    function onSave(){
        setPopup(false);
    }
    // const dataSource = [
    //     {
    //       key: 1,
    //       name: <Input />,
    //       projectName: <Input />,
    //     },
    //     {
    //         key: 2,
    //         name: <Input />,
    //         projectName:<Input />,
    //       }
    //   ];
      
    //   const columns = [
    //     {
    //       title: 'Name',
    //       dataIndex: 'name',
    //       key:'name'
    //     },
    //     {
    //         title: 'Project Name',
    //         dataIndex: 'projectName',
    //         key:'projectName'
    //       },

    //   ];

    return <><Button type='primary' onClick={()=> setPopup(true)}>Create Table</Button>
          <Modal title="Create Table" visible={popup} onOk={onSave} >
            <Space>
                <Button onClick={addColumn}>Add Column</Button>
                <Button onClick={addDataSource}>Add Row</Button>
                
            </Space>
            <Table dataSource={dataSource} columns={columns}  ></Table>
        </Modal>
    </>
}

export function VideoViewer({videos = [],videoName='', editMode, form}){
    const [fls, setFls] = useState();
    useEffect(()=>{ setFls((videos && videos[0]) || null); }, [videos, editMode]);
    useEffect(()=>{ fls && form.setFieldsValue({[videoName]: fls.id }) }, [fls]);
    if(!fls) return <Form.Item hidden name={'_'+ videoName} />;

    const {type = '', name, src} = fls;
  
    return <div style={{border:'1px dashed', borderRadius:4, padding:10}} className="img-wrap">
               {editMode && <Button danger style={{float: 'right'}} type="link" onClick={()=> setFls(null)}>Delete</Button>}
               <video
          className="VideoInput_video"
          width="100%"
          height="300"
          controls
          src={src}
        />
    </div>
}
export function ImageViewer({images = [], imageName='', form, editMode}){
    const [imgs, setImgs] = useState([]);
    const [current, setCurrent] = useState(0);
    const name = '_'+imageName;
    useEffect(()=>{ setImgs([... (images || [])]); }, [images, editMode]);
    useEffect(()=>{ form.setFieldsValue({[name]: imgs.map(v=>v.id)}) }, [imgs]);
    if(!imgs || !imgs.length) return null;
    function removeItem(){
        imgs.splice(current, 1);
        setImgs([...imgs]);
        setCurrent(0);
    }
    var item = imgs[current];
    function reorder(position){
        imgs.splice(position, 0, imgs.splice(current, 1)[0]);
        setImgs([...imgs]);
        setCurrent(position);
    }
    function onCaptionChange(e){
        imgs[current].name = e.target.value;
        setImgs([...imgs]);
    }
    function updateCaption(){
        ajax.post('/media/' + item.id, {name: item.name});
    }
    

    return <div style={{border:'1px dashed', borderRadius:4, padding:10}} className="img-wrap">
        <Form.List name={name}>{(fields)=>fields.map(({key,name}) => <Form.Item key={key} hidden name={name} />)}</Form.List>
        <Row justify="space-between">
            <Col span={10} style={{display: 'flex', alignItems:'center'}}>
                    <Form.Item label="Caption" labelCol={{span:23}} labelAlign="left">
                        {editMode ? <Input.TextArea style={{width:300}} value={item.name} onChange={onCaptionChange} /> : <p>{item.name}</p>}
                    </Form.Item>
                    {editMode && <Button  type="ghost" icon={<SaveOutlined />} onClick={updateCaption} />}
            </Col>
            <Col span={8} style={{display: 'flex', alignItems:'center'}}>
                {editMode && <Form.Item label="Order">
                    <Select onChange={reorder} value={current} options={imgs.map((v,i)=> ({label: i+1, value: i}))} />
                </Form.Item>}
                <Form.Item label="Select image">
                    <Select style={{width:150}} onChange={setCurrent} value={current} options={imgs.map((v,i)=> ({label: v.name, value: i}))} />
                </Form.Item>
                {editMode && <Button title="Save" type="ghost" onClick={removeItem} icon={<DeleteOutlined />} />}
            </Col>
        </Row>
        <Image width="100%" height="300" src={item.src} />
    </div>
}

// export function ImageViewer({images = [], imageName='', form, editMode}){
//     const [imgs, setImgs] = useState([]);
//     const [current, setCurrent] = useState(0);
//     const name = '_'+imageName;
//     useEffect(()=>{ setImgs([... (images || [])]); }, [images, editMode]);
//     useEffect(()=>{ form.setFieldsValue({[name]: imgs.map(v=>v.id)}) }, [imgs]);
//     if(!imgs || !imgs.length) return null;
//     function removeItem(index){
//         imgs.splice(index, 1);
//         setImgs([...imgs]);
//     }
    

//     return <div>
//     {editMode && <ReactSortable list={imgs} setList={setImgs}>
//         {imgs.map((v,i)=><div className={"image-preview "+ (current==i ? 'active': '')} key={v.id}>
//             <img src={v.src} />{v.name}
//         </div> )}
//     </ReactSortable>}
//     <Form.List name={name}>{(fields)=>fields.map(({key,name}) => <Form.Item key={key} hidden name={name} />)}</Form.List>
//     <Carousel autoplay afterChange={setCurrent}>
//         {imgs.map((v,i)=> v.type.includes('image') && <div className="img-wrap" key={i}>
//             <Image width="100%" height="300" src={v.src}/>
//             {editMode && <div className="img-delete-icon"><span onClick={()=> removeItem(i)}>x</span></div>}
//         </div>)}
//     </Carousel>
//     </div>
// }

export function PdfViewer({files = [],pdfName='', editMode, form}){
    const [fls, setFls] = useState();
    useEffect(()=>{ setFls((files && files[0]) || null); }, [files, editMode]);
    useEffect(()=>{ fls && form.setFieldsValue({[pdfName]: fls.id }) }, [fls]);
    if(!fls) return null;

    const {type = '', name, src} = fls;
  
    return type.includes('pdf') && <div className='box--facility pdf-view-section area--box--facility'>
      <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2 style={{ marginTop: 15 }}><img width='30' src={imagePdf} /><span> {name}</span> </h2>
        {editMode && <a style={{color:'red'}} onClick={()=> setFls(null)}>Delete</a>}
      </div>
      <Form.Item hidden name={pdfName} />
      <iframe src={src} width="100%" height="700" frameBorder="0" />
    </div> 
}

export function ListItems({api,editMode, list = [], countInRow=3, imageKey = 'image', popupExtra}){
    const [data, setData] = useState(list);
    const [form] = Form.useForm();
    const history = useHistory();
    const {pathname} = history.location;
    useEffect(()=>{ api && ajax.get(api).then(res => res && setData(res.data)) },[]);

    async function saveData(){
        await ajax.post(api,getFormFields(form)).then(res=> res && history.push(`${pathname}/${res.id}`))
    }

    return <div><Row gutter={[16,16]}>
            {data && data.map((v, i) =>{ 
                var src, url;
                if(api){
                    src = v[imageKey] && v[imageKey].length ? v[imageKey][0].src : image;
                    url = `${pathname}/${v.id}`;
                }else{
                    src = v.image;
                    url = v.url;
                }
                return <Col key={i} span={24/countInRow}>
                <CardHolder image={src} title={v.title} url={url} />
            </Col>
        })}
        </Row>
        {api && editMode && <Form style={{marginTop:30}} form={form}>
            <ButtonUpload name={imageKey} onSubmit={saveData} addMore buttonText="Add more" accept="image/*">
                {popupExtra}
            </ButtonUpload>
        </Form>}
    </div>
}

export function getFormFields(form){
    var values = form.getFieldsValue(), ret = {};
    for(var [key,value] of Object.entries(values)){
        ret[key] = value ? (value.fileList ?  value.fileList.map(f=> f.originFileObj) : value) : '';
        // ret[key] = value ? (value.file || value) : '';
    }
    return ret;
}