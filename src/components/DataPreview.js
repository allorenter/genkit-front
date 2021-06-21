import React, { useState, useEffect, useContext } from 'react';
import { dataPreview } from '../utils/api';
import ConnectionErrorContext from '../context/ConectionErrorContext';
import GeneratorDataContext from '../context/GeneratorDataContext';
import LoadingContext from '../context/LoadingContext';
import { Table } from "antd";

function DataPreview(props){
    const [data, setData] = useState([]);
    const [, setLoading] = useContext(LoadingContext);  
    const [ , setConnectionError] = useContext(ConnectionErrorContext);
    const [selectedProperties, ] = useContext(GeneratorDataContext);
    
    useEffect(() => {
        async function fetchData(){
            try{
                setLoading(true);
                const response = await dataPreview(selectedProperties, 10);
                setData(response.data.data.previewData || [])
                setLoading(false);
            }catch(err){
                if(err?.response || !err?.status){
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
                    dataSource={data.map((generatedObject) => {
                        if(typeof generatedObject.boolean !== 'undefined'){
                            generatedObject.boolean = generatedObject.boolean.toString();
                        }
                        return generatedObject;
                    })} 
                  />
                : <pre dangerouslySetInnerHTML={{__html: formatJson(JSON.stringify(data, undefined, 2))}} />
            }
        </React.Fragment>
    );
}

export default DataPreview;