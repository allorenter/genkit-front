import { useEffect, useState, useContext } from "react";
import { getDataSchemas, deleteDataSchema } from '../utils/api';
import Loading from "./Loading";
import GeneratorDataContext from '../context/GeneratorDataContext';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Row, Col } from "antd";
import { theme, iconButton, customLink } from "../styles/styles";
import styled from '@emotion/styled';
import ConnectionErrorContext from '../context/ConectionErrorContext';

function SavedDataSchemasList(props) {
    const [dataSchemasList, setDataSchemasList] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        getDataSchemas()
            .then((response) => {
                setDataSchemasList(response.data.data.dataSchemas);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.updateList,]);

    return (
        <Loading active={loading}>
            {dataSchemasList.map(
                (dataSchema => <DataSchemaElement 
                    setUpdateList={props.setUpdateList} 
                    updateList={props.updateList} 
                    key={dataSchema._id} 
                    {...dataSchema} 
                />))
            }
        </Loading>

    );
}

const DataSchemaElement = (props) => {
    const [, setSelectedProperties] = useContext(GeneratorDataContext);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [, setConnectionError] = useContext(ConnectionErrorContext);

    const IconButton = styled(Button)`
        ${iconButton(theme.primary, theme.secondary)}
    `;

    const StyledRow = styled(Row)`
        padding: .2em 0;
        transition: 0.3s;
        border-bottom: 1px solid #f0f0f0;
        &:hover {
            background: ${theme.hoversGray};        
        }
    `;

    const SchemaLink = styled(Button)`
        ${customLink(theme.primary)}
        &:hover{
            color: ${theme.secondary};
        }
    `;

    const handleDelete = (id) => {
        setDeleteLoading(true);
        deleteDataSchema(id).then((response) => {
            setDeleteLoading(false);
            props.setUpdateList(props.updateList + 1);
        }).catch((err) => {
            console.log(err);
            setConnectionError(true);
            setDeleteLoading(false);
        });
    };

    const loadDataSchema = (dataSchema) => {
        setSelectedProperties(dataSchema);
    };

    return (
        <StyledRow>
            <Col xs={22} sm={22} md={22} lg={22} xl={22}>
                <SchemaLink type='link' onClick={() => loadDataSchema(props.schema)}>
                    {props.name}
                </SchemaLink>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                <IconButton loading={deleteLoading} type='link' onClick={() => handleDelete(props._id)}>
                    <DeleteOutlined />
                </IconButton>
            </Col>
        </StyledRow>
    );
};

export default SavedDataSchemasList;