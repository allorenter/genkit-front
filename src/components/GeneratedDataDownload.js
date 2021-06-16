import React, { useState, useContext } from 'react';
import { Button, Modal, InputNumber, Input } from 'antd';
import { generateCSV, generateJSON } from '../utils/api';
import GeneratorDataContext from '../context/GeneratorDataContext';
import fileDownload from 'js-file-download';
import styled from '@emotion/styled';
import { theme, customButton } from '../styles/styles';

function GeneratedDataDownload(props){    
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState(50);
    const [filename, setFilename] = useState('filename');
    const [selectedProperties, ] = useContext(GeneratorDataContext);

    const handleDownloadCSV = async () => {
        const response = await generateCSV(selectedProperties, amount, filename);
        const csv = response.data;
        fileDownload(csv, `${filename}.csv`, response.headers['content-type'])
    };

    const handleDownloadJSON = async () => {
        const response = await generateJSON(selectedProperties, amount, filename);
        const json = JSON.stringify(response.data);
        fileDownload(json, `${filename}.json`, response.headers['content-type']);
    };

    const OpenModalButton = styled(Button)`
        ${customButton('white', theme.secondary)}    
        margin-right: 1em;
    `;

    return (
        <React.Fragment>
            <OpenModalButton onClick={() => setModalVisible(true)}>
                Descargar
            </OpenModalButton>
            <Modal
                title='Descarga'
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={720}
            >
                <div>
                    <span>Cantidad de objetos a generar: </span>
                    <InputNumber
                        autoFocus={true}
                        min={1}
                        max={1000}
                        defaultValue={amount}
                        onChange={(value) => setAmount(value)}
                    />    
                </div>
                <div>
                    <span>Nombre del archivo: </span>
                    <Input defaultValue={filename} onChange={(e) => setFilename(e.target.value)} />
                </div>
                <div>
                    <Button onClick={handleDownloadCSV}>
                        CSV
                    </Button>
                    <Button onClick={handleDownloadJSON}>
                        JSON
                    </Button>
                </div>
            </Modal>
        </React.Fragment>
    );
}

export default GeneratedDataDownload;