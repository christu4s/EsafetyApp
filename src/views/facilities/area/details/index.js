import { Form, Input } from 'antd';
import React from 'react';
import area from '../../../../assets/area.png';
import { TitleEdit } from '../../../../utils';
import { PageTemplate } from '../../../template';
import {  FacilitiesButtons } from '../../components';

export const FacilityAreaDetails = ({match}) => {
    const {id}= match.params;
    return <PageTemplate 
        iconUrl={area} 
        title="Facilities Overview" 
        subtitle={TitleEdit} 
        api={'/facility-overview/area/'+ id} 
        descName="desc"
        imageName="image"
        pdfName="pdf"
        right={<FacilitiesButtons />}>
    </PageTemplate>
}

// export const FacilityAreaDetails = ({history, match}) => {
//     const [editMode, setEditMode] = useState(false);
//     const [data, setData] = useState({title:'', desc:'', image: ''});
//     const [form] = Form.useForm();
//     const {id}= match.params;

//     useEffect(()=> { ajax.get('/facility-overview/area/'+ id ).then(res => res && setData(res) ); },[]);
    
//     function deleteArea(){
//         ajax.delete('/facility-overview/area/'+ id ).then( ()=> history.goBack() );
//     }

//     function updateArea(){
//         const {desc, image} = form.getFieldsValue();
//         ajax.post('/facility-overview/area/'+ match.params.id, {desc, image: image ? image.file : null } )
//         .then( res=>{ 
//             res && setData(res); 
//             setEditMode(false);  
//         });
//     }

//     return (
//         <div className='facility--wrapper'>
//             <Row>
//                 <Col span={16}>
//                     <Row>
//                         <Col span={1}>
//                             <div className='area--img'>
//                                 <img width='38' src={area} />
//                             </div>
//                         </Col>
//                         <Col span={22}>
//                             <div className='area--header' >
//                                 <div style={{display:'flex', justifyContent: 'space-between'}}>
//                                     <div>
//                                         <p>Facilities Area</p>
//                                         <h2 >{data.title}</h2>
//                                     </div>
//                                     <div>
//                                     <div><EditButtons editMode={editMode} toggle={()=> setEditMode(!editMode)} save={updateArea} /></div>
//                                     </div>
//                                 </div>
//                                {editMode && <Popconfirm title="Are you sure to delete this?" onConfirm={deleteArea}>
//                                    <a style={{color:'red', float: 'right'}}>Delete</a>
//                                    </Popconfirm>
//                                    }
//                             </div>
//                         </Col>
//                     </Row>
//                     <Form form={form}>
//                         <div className='box--facility area--box--facility' style={{marginBottom: 40}}>
//                             <DescField editMode={editMode} value={data.desc} name="desc" />
//                         </div>
//                         {editMode && <ButtonUpload name='image' onSubmit={updateArea} />}
//                     </Form>
//                     <h2>File uploaded</h2>
//                     <FileViewer images={data.image} />
//                 </Col>
//                 <Col span={8} push={2}  style={{marginTop:35}} ><FacilitiesButtons /></Col>
//             </Row>
//         </div>
//     );
// }