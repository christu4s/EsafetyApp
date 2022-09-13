import { Row, Col, Form, Space,  Image, Popconfirm, Select, Input, Button, Modal, Table, Pagination } from 'antd';
import React, { useState, useEffect } from 'react';
import ajax from '../ajax';
import { ButtonUpload, CardHolder, DescField, EditButtons, VideoInput } from '../utils';
import imagePdf from '../assets/pdf-1@3x.png';
import image from '../assets/image.png';
import { useHistory } from 'react-router-dom';
import { ArrowLeftOutlined, SaveOutlined, DeleteOutlined, TableOutlined } from '@ant-design/icons';
import { useMenuContext } from '../provider';
import { ReactSortable, Options, Sortable } from "react-sortablejs";
import { useLocation } from 'react-router-dom';



export const PageTemplate = ({
    updateData,
    title,
    api,
    subtitle,
    descName = 'desc',
    pdfName,
    imageName,
    videoName,
    tableName,
    iconUrl,
    backButton,
    children,
    right,
    updateMenu = false,
    canDelete = false,
    titleKey = 'title',
    outside }) => {
    const location = useLocation();
    const order_storage_key = 'order' + location.pathname;
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState({});
    const [order, setOrder] = useState(getOrder());
    const [_, setMenuTitle] = useMenuContext();
    const [form] = Form.useForm();
    const history = useHistory();

    //get the order
    function getOrder() {
        var stored = window.localStorage.getItem(order_storage_key);
        if (stored) return stored.split(',');
        return [imageName, pdfName, videoName, tableName].filter(Boolean);
    }

    //save order to localStorage once changed
    useEffect(() => { window.localStorage.setItem(order_storage_key, order.join(',')); }, [order])


    const desc = content[descName], image = content[imageName], pdf = content[pdfName], video = content[videoName], tableData = content[tableName];
    var viewers = {};

    if(imageName) viewers[imageName]=<ImageViewer editMode={editMode} form={form} imageName={imageName} images={image} />;
    if(pdfName) viewers[pdfName] = <PdfViewer files={pdf} pdfName={'_' + pdfName} editMode={editMode} form={form} />;
    if(tableName) viewers[tableName] = <TableViewer  tableName={tableName} data={tableData} editMode={editMode} form={form} />;
    if(videoName) viewers[videoName] = <VideoViewer  videoName={videoName} form={form} editMode={editMode} videos={video} />;
   
   
    const sortView = order.map((item) =>(<div style={{margin: '20px 0', cursor:'move'}} key={item}>{viewers[item]}</div>)); 

    async function saveData() {
        await ajax.post(api, getFormFields(form)).then(res => {
            res && setContent(res);
            updateMenu && res[titleKey] && setMenuTitle(api + titleKey, res[titleKey]);
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
            {backButton && <a href="#" onClick={() => history.goBack()} style={{ color: '#282828' }}>
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
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ alignSelf: 'center' }}>
                                            <p className='mb-0 '>{title}</p>
                                            <h2 style={{ marginTop: 0 }}>{typeof subtitle == 'function' ? subtitle(content, editMode) : subtitle}</h2>
                                        </div>
                                        <div><EditButtons editMode={editMode} toggle={() => setEditMode(!editMode)} save={saveData} /></div>
                                    </div>
                                    {canDelete && editMode && <Popconfirm title="Are you sure to delete this?" onConfirm={deleteItem}>
                                        <a style={{ color: 'red', float: 'right' }}>Delete</a>
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
                        {tableName && <ButtonTable name={tableName} onSubmit={saveData} form={form} data={tableData} />}
                    </Space>}
                    <div style={{margin: 20}} />

                    {
                        !editMode ? sortView : <ReactSortable group="groupName"  list={order.map(id=> ({id}))} setList={items => setOrder(items.map(item=> item.id))}>
                           {sortView} 
                    </ReactSortable>
                    }
                    
                    
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

function ButtonTable({ data, name, onSubmit, form }) {
    var jsonData;
    try {
        jsonData = JSON.parse(data);
    } catch (e) { }
    const [popup, setPopup] = useState(false);
    const [dataSource, setdataSource] = useState(jsonData ? jsonData.dataSource : []);
    const [columns, setColumns] = useState(jsonData ? jsonData.columns : []);


    function onChangeColumnValues(value, index) {
        columns[index].title = value;
        setColumns([...columns]);
    }

    

    function addColumn() {
        const columnsInput = {
            title: "",
            dataIndex: 'col' + columns.length,
        }
        setColumns([...columns, columnsInput]);
    }

    function removeColumn(index) {
        let newColumns = columns;
        newColumns.splice(index, 1);
        setColumns([...newColumns])
    }

    function onChangeRowValues(value, index, key) {
        dataSource[index][key] = value;
        setdataSource([...dataSource]);
    }

    function removeRow(index) {
        const newDataSource = dataSource;
        newDataSource.splice(index, 1);
        setdataSource([...newDataSource])
    }

    

    function addDataSource() {
        const rowsInput = {};
        for (var column of columns) rowsInput[column.dataIndex] = "";
        setdataSource([...dataSource, rowsInput]);
    }

    function onSave() {
        form.setFieldsValue({ [name]: JSON.stringify({ dataSource, columns }) });
        console.log('stringify', JSON.stringify({ dataSource, columns }));
        console.log('not stringify', { dataSource, columns });
        typeof onSubmit == 'function' && onSubmit();
        setPopup(false);
    }

    const dataSourceEditable = dataSource.map((data, index) => {
        var editableData = {};
        for(let column of columns){
            
            let key = column.dataIndex; 
            let value = data[key] || '';
            editableData[key] = 
             <Row  justify="center" align="middle">
            <Col span={ columns.indexOf(column) === (columns.length -1) ? 23 :24}>
                <Input value={value}  onChange={(e)=> onChangeRowValues(e.target.value, index, key)}   />
            </Col>
            <Col  span={ columns.indexOf(column) === (columns.length -1) ? 1 : 0}>
                {columns.indexOf(column) === (columns.length -1) &&
                    <DeleteOutlined className='delete_icon delete_icon_row' onClick={() => removeRow(index)}
                />} 
            </Col>
            
            
        </Row>

        }
        return editableData;
    });
    const columnsEditable = columns.map((column, index)=>{
        var editableCol = {...column};
        editableCol.title = 
        <Row justify="center" align="middle">
            <Col span={1}  >
                <DeleteOutlined className='delete_icon' onClick={() => removeColumn(index)} />
            </Col>
            <Col span={24}>
                <Input value={column.title} onChange={(e)=> onChangeColumnValues(e.target.value, index)}  />

            </Col>
        </Row> ;
        
        return editableCol;
    });

    return <>
        <Form.Item hidden name={name} initialValue="" />
        <Button type='primary' icon={<TableOutlined />} onClick={()=> setPopup(true)}>Dynamic Table</Button>
          <Modal title="Dynamic Table" okText="Save" visible={popup} onOk={onSave} onCancel={()=> {setColumns([]); setdataSource([]) ;setPopup(false)}} >
            <Space>
                <Button onClick={addColumn}>Add Column</Button>
                <Button onClick={addDataSource}>Add Row</Button>
            </Space>
            <Table dataSource={dataSourceEditable} columns={columnsEditable}  pagination={false}  />
        </Modal>
    </>
}

export function VideoViewer({ videos = [], videoName = '', editMode, form }) {
    const [fls, setFls] = useState();
    useEffect(() => { setFls((videos && videos[0]) || null); }, [videos, editMode]);
    useEffect(() => { fls && form.setFieldsValue({ [videoName]: fls.id }) }, [fls]);
    if (!fls) return <Form.Item hidden name={'_' + videoName} />;

    const { type = '', name, src } = fls;

    return <div style={{ border: '1px dashed', borderRadius: 4, padding: 10 }} className="img-wrap">
        {editMode && <Button danger style={{ float: 'right' }} type="link" onClick={() => setFls(null)}>Delete</Button>}
        <video
            className="VideoInput_video"
            width="100%"
            height="300"
            controls
            src={src}
        />
    </div>
}

export function TableViewer({ tableName, data, editMode, form}){
    const [table, setTable] = useState();
    const handleDelete = () => {
        setTable(null);
        form.setFieldsValue({[tableName]: table ? table : null });
    }
    useEffect(() =>{
        try{
        jsonData = JSON.parse(data);
        const {dataSource, columns} = jsonData || null;
        setTable({dataSource, columns})
    }catch(e){
        return null;
    }
    }, [data, editMode]);
    // useEffect(() => form.setFieldsValue({["table_detail"]: table ? table : null }), [table])
    var jsonData;
    try {
        jsonData = JSON.parse(data);
    } catch (e) {
        return null;
    }
   // console.log('typeof',typeof(jsonData));
    
    return (table != null)? 
    <div className='table_wrapper'>
        {editMode && <a style={{color:'red'}} onClick={handleDelete} >Delete</a>}
        <Table dataSource={table?.dataSource} columns={table?.columns} pagination={false}  />
    </div> : null;
}
export function ImageViewer({ images = [], imageName = '', form, editMode }) {
    const [imgs, setImgs] = useState([]);
    const [current, setCurrent] = useState(0);
    const name = '_' + imageName;
    useEffect(() => { setImgs([... (images || [])]); }, [images, editMode]);
    useEffect(() => { form.setFieldsValue({ [name]: imgs.map(v => v.id) }) }, [imgs]);
    if (!imgs || !imgs.length) return null;
    function removeItem() {
        imgs.splice(current, 1);
        setImgs([...imgs]);
        setCurrent(0);
    }
    var item = imgs[current];
    function reorder(position) {
        imgs.splice(position, 0, imgs.splice(current, 1)[0]);
        setImgs([...imgs]);
        setCurrent(position);
    }
    function onCaptionChange(e) {
        imgs[current].name = e.target.value;
        setImgs([...imgs]);
    }
    function updateCaption() {
        ajax.post('/media/' + item.id, { name: item.name });
    }


    return <div style={{ border: '1px dashed', borderRadius: 4, padding: 10 }} className="img-wrap">
        <Form.List name={name}>{(fields) => fields.map(({ key, name }) => <Form.Item key={key} hidden name={name} />)}</Form.List>
        <Row justify="space-between">
            <Col span={10} style={{ display: 'flex', alignItems: 'center' }}>
                <Form.Item label="Caption" labelCol={{ span: 23 }} labelAlign="left">
                    {editMode ? <Input.TextArea style={{ width: 300 }} value={item.name} onChange={onCaptionChange} /> : <p>{item.name}</p>}
                </Form.Item>
                {editMode && <Button type="ghost" icon={<SaveOutlined />} onClick={updateCaption} />}
            </Col>
            <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                {editMode && <Form.Item label="Order">
                    <Select onChange={reorder} value={current} options={imgs.map((v, i) => ({ label: i + 1, value: i }))} />
                </Form.Item>}
                <Form.Item label="Select image">
                    <Select style={{ width: 150 }} onChange={setCurrent} value={current} options={imgs.map((v, i) => ({ label: v.name, value: i }))} />
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

export function PdfViewer({ files = [], pdfName = '', editMode, form }) {
    const [fls, setFls] = useState();
    useEffect(() => { setFls((files && files[0]) || null); }, [files, editMode]);
    useEffect(() => { form.setFieldsValue({ [pdfName]: fls ? fls.id : null }) }, [fls]);
    if (!fls) return <Form.Item hidden name={pdfName} />;

    const { type = '', name, src } = fls;

    return type.includes('pdf') && <div className='box--facility pdf-view-section area--box--facility'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ marginTop: 15 }}><img width='30' src={imagePdf} /><span> {name}</span> </h2>
            {editMode && <a style={{ color: 'red' }} onClick={() => setFls(null)}>Delete</a>}
        </div>
        <Form.Item hidden name={pdfName} />
        <iframe src={src} width="100%" height="700" frameBorder="0" />
    </div>
}

export function ListItems({ api, editMode, list = [], countInRow = 3, imageKey = 'image', popupExtra }) {
    const [data, setData] = useState(list);
    const [form] = Form.useForm();
    const history = useHistory();
    const { pathname } = history.location;
    useEffect(() => { api && ajax.get(api, { count: 12 }).then(res => res && setData(res.data)) }, []);

    async function saveData() {
        await ajax.post(api, getFormFields(form)).then(res => res && history.push(`${pathname}/${res.id}`))
    }

    return <div><Row gutter={[16, 16]}>
        {data && data.map((v, i) => {
            var src, url;
            if (api) {
                src = v[imageKey] && v[imageKey].length ? v[imageKey][0].src : image;
                url = `${pathname}/${v.id}`;
            } else {
                src = v.image;
                url = v.url;
            }
            return <Col key={i} span={24 / countInRow}>
                <CardHolder image={src} title={v.title} url={url} />
            </Col>
        })}
    </Row>
        <Pagination />
        {api && editMode && <Form style={{ marginTop: 30 }} form={form}>
            <ButtonUpload name={imageKey} onSubmit={saveData} addMore buttonText="Add more" accept="image/*">
                {popupExtra}
            </ButtonUpload>
        </Form>}
    </div>
}

export function getFormFields(form) {
    var values = form.getFieldsValue(), ret = {};
    for (var [key, value] of Object.entries(values)) {
        ret[key] = value ? (value.fileList ? value.fileList.map(f => f.originFileObj) : value) : '';
        // ret[key] = value ? (value.file || value) : '';
    }
    return ret;
}