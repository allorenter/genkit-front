import React, { useState, useEffect, useContext } from 'react';
import { dataPreview } from '../utils/api';
import ConnectionErrorContext from '../context/ConectionErrorContext';
import GeneratorDataContext from '../context/GeneratorDataContext';
import LoadingContext from '../context/LoadingContext';
import { Table, Button } from "antd";
import { theme, customLink, scrollbar } from '../styles/styles';
import styled from '@emotion/styled';

function DataPreview(props){
    const [data, setData] = useState([]);
    const [, setLoading] = useContext(LoadingContext);  
    const [ , setConnectionError] = useContext(ConnectionErrorContext);
    const [selectedProperties, ] = useContext(GeneratorDataContext);
    const [beautify, setBeautify] = useState(false);

    const StyledLink = styled(Button)`
        ${customLink(theme.secondary)}
        position: absolute;
        right: 3em;
    `;

    const FormatedJson = styled.pre`
        ${scrollbar()}
        height: calc(100vh - 165px);
        color: ${theme.primary};
        .key{
            color: ${theme.fontColor};
            font-weight: bold;
            font-size: 1.1em;
        }
    `;

    useEffect(() => {
        async function fetchData(){
            try{
                setLoading(true);
                const response = await dataPreview(selectedProperties, 10);
                setData(response.data.data.previewData || [])
                setLoading(false);
            }catch(err){
                if(err?.response || !err?.status) {
                    setConnectionError(true);
                    setLoading(false);
                    return false;
                }
            }
        }
        fetchData();
    }, [selectedProperties, setConnectionError, setLoading]);

    const formatJson = (json) => {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
            let cls = 'value';
            if (/^"/.test(match) && /:$/.test(match)) {
                cls = 'key';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    };

    return (
        <React.Fragment>
            {props.type === 'csv'
                ? <Table 
                    pagination={false} 
                    columns={selectedProperties.map(({name}) => ({title: name, dataIndex: name, key: name}))} 
                    dataSource={data.map((generatedObject, index) => {
                        if(typeof generatedObject.boolean !== 'undefined'){
                            generatedObject.boolean = generatedObject.boolean.toString();
                        }
                        return {key: index, ...generatedObject};
                    })} 
                  />
                : <React.Fragment>
                    <StyledLink onClick={() => setBeautify(!beautify)} type='link'>Formatear</StyledLink>
                    {beautify 
                        ? <FormatedJson dangerouslySetInnerHTML={{__html: formatJson(JSON.stringify(data, undefined, 2))}} /> 
                        : <pre style={{whiteSpace: 'pre-wrap', width: '85%'}} dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />
                    }                    
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default DataPreview;