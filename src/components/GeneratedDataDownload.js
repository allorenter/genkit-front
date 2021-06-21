import React, { useState, useContext } from 'react';
import { Button, Modal, InputNumber, Input } from 'antd';
import { generateCSV, generateJSON } from '../utils/api';
import GeneratorDataContext from '../context/GeneratorDataContext';
import fileDownload from 'js-file-download';
import styled from '@emotion/styled';
import { theme, customButton, customFormLabel } from '../styles/styles';
import LoadingContext from '../context/LoadingContext';
import ConnectionErrorContext from '../context/ConectionErrorContext';

function GeneratedDataDownload(props){    
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState(50);
    const [filename, setFilename] = useState('filename');
    const [selectedProperties, ] = useContext(GeneratorDataContext);
    const [filenameError, setFilenameError] = useState(false);
    const [, setLoading] = useContext(LoadingContext);
    const [, setConnectionError] = useContext(ConnectionErrorContext);

    const StyledLabel = styled.label`
        ${customFormLabel()}
    `;

    const StyledBtn = styled(Button)`
        ${customButton('white', theme.primary)}    
    `;

    const StyledErrorMsg = styled.label`
        ${customFormLabel()}
        color: ${theme.error};
    `;

    const handleDownloadCSV = async () => {
        try{
            setLoading(true);
            const response = await generateCSV(selectedProperties, amount, filename);
            const csv = response.data;
            fileDownload(csv, `${filename}.csv`, response.headers['content-type'])
            setLoading(false);
        }catch(err){
            setConnectionError(true);
        }        
    };

    const handleDownloadJSON = async () => {
        try{
            setLoading(true);
            const response = await generateJSON(selectedProperties, amount, filename);
            const json = JSON.stringify(response.data);
            fileDownload(json, `${filename}.json`, response.headers['content-type']);
            setLoading(false);
        }catch(err) {
            setConnectionError(true);
        }
    };

    const handleChangeFilename = (value) => {
        if(!value){
            setFilenameError(true);
            return ;
        }
        setFilenameError(false);
        setFilename(value);
    };

    return (
        <React.Fragment>
            <StyledBtn style={{}} onClick={() => setModalVisible(true)}>
                Descargar
            </StyledBtn>
            {modalVisible && <Modal
                title='Descarga'
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={720}
            >
                <div>
                    <StyledLabel>Cantidad de objetos a generar: </StyledLabel>
                    <InputNumber
                        autoFocus={true}
                        min={1}
                        max={1000}
                        defaultValue={amount}
                        onChange={(value) => setAmount(value)}
                    />    
                </div>
                <div style={{marginTop: '1EM'}}>
                    <StyledLabel>Nombre del archivo: </StyledLabel>
                    <Input defaultValue={filename} onChange={(e) => handleChangeFilename(e.target.value)} />
                    {filenameError && <StyledErrorMsg>Debes escribir un nombre para el archivo</StyledErrorMsg>}
                </div>
                <div style={{marginTop: '1em'}}>
                    <StyledBtn onClick={handleDownloadCSV}>
                        CSV
                    </StyledBtn>
                    <StyledBtn style={{marginLeft: '1em'}} onClick={handleDownloadJSON}>
                        JSON
                    </StyledBtn>
                </div>
            </Modal>}
        </React.Fragment>
    );
}

export default GeneratedDataDownload;