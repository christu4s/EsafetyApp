import { Row, Col, Radio, Card, Button, Modal, Upload, message, Input } from 'antd';
import React, { useState } from 'react';
import danger from '../../../assets/danger-sing@3x.png';
import pdf from '../../../assets/pdf-1@3x.png';
import { PlusCircleOutlined, CloudUploadOutlined, DownloadOutlined } from '@ant-design/icons';
// Core viewer
// Plugins
import { pdfjs, Document, Page } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const HazardIdentifications = () => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const { Meta } = Card;
    // Create new plugin instance
    return (
        <div className='facility--wrapper'>
            <Row>
                <Col span={17}>
                    <Row>
                        <Col span={1}>
                            <div className='area--img'>
                                <img width='38' src={danger} />
                            </div>
                        </Col>
                        <Col span={23}>
                            <div className='area--header mt-5'>
                                <p className='mb-0 '>Risk Assessment</p>


                                <h2 style={{ marginTop: 0 }}>Hazard Identification Worksheets</h2>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={23}>
                            <div className='box--facility area--box--facility'>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                            </div>
                        </Col>
                    </Row>




                </Col>

                <Col span={23}>
                    <div className='box--facility pdf-view-section area--box--facility'>
                        <Row>
                            <Col span={20}>
                                <h2 style={{ marginTop: 15 }}><img width='30' src={pdf} /> <span> Pdf File Name</span></h2>
                            </Col>
                            <Col span={2} >
                                <Button type="primary" icon={<DownloadOutlined />} >
                                    Download
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div>


                                    <Document
                                        file="https://arxiv.org/pdf/quant-ph/0410100.pdf"
                                        onLoadSuccess={onDocumentLoadSuccess}
                                    >
                                        <Page pageNumber={pageNumber} />
                                    </Document>
                                    <p>Page {pageNumber} of {numPages}</p>

                                </div>

                            </Col>
                        </Row>
                    </div>
                </Col>

            </Row>


        </div>
    );
}