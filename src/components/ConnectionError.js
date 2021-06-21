import React from 'react';
import { overlay } from '../styles/styles';
import styled from '@emotion/styled';
import { Alert, Button } from 'antd';

function ConnectionError(props) {
    const OverlayDiv = styled.div(overlay);
    const ContainerMessage = styled.div`
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    return (
        <React.Fragment>
            {props.children}
            {props.active 
                ?   <div>
                        <ContainerMessage>
                            <Alert 
                                style={{marginTop: '-30vh'}}
                                message="Error"
                                description="Ha ocurrido un error."
                                type="error"
                                showIcon
                                action={
                                    <Button size="small" danger onClick={() => props.setActive(false)}>
                                        Volver
                                    </Button>
                                }
                            />
                        </ContainerMessage>
                        <OverlayDiv />
                    </div>
                : ""
            } 
        </React.Fragment>
    );
}

export default ConnectionError;