import { darken, lighten } from 'polished';

export const theme = {
    fontColor: '#565757',
    primary: '#2C3E50',
    secondary: '#1ABC9C',
    gray: '#F5F8FA',
    error: '#ff4d4f'
};

export const customButton = (color, backgroundColor) => `
    color: ${color};
    background: ${backgroundColor};
    font-weight: 600;
    border: 0;
    &:hover {
        background: ${darken(0.07, backgroundColor)};
        color: ${color};
    }
    &:focus {
        background: ${backgroundColor};
        border: none;
        color: ${color};
    }
`;

export const iconButton = (color) => `
    color: ${darken(0.4, color)};
    &:hover, &:focus {
        color: ${color}
    }
`;

export const optionsSpan = () => `
    display: block;
    color: ${theme.fontColor};
    font-size: 1.1em;
    margin-bottom: 15px;
    width: 100%;
`;

export const custonAntdInput = () => `
    border: 1px solid ${darken(0.1, theme.gray)};
    &:hover{
        border-color: ${darken(0.3, theme.gray)};
        .ant-input-number-handler:hover i {
            color: ${theme.fontColor};
        }
    }
    &:focus, &.ant-input-number-focused, ant-input-focused{
        border-color: ${darken(0.3, theme.gray)};
        box-shadow: 0 0 0 2px ${lighten(0.2, theme.gray)};
        -webkit-box-shadow: 0 0 0 2px ${lighten(0.4, theme.gray)};
    }
`;

export const customScrollbar = () => `
    &::-webkit-scrollbar{
        padding: 10px 0;
        width: 10px;
        height: 10px;
        background-color: ${theme.gray};
    }
    &::-webkit-scrollbar-thumb{
        background-color: ${lighten(0.5, theme.fontColor)};
    } 
`;

export const overlay = () => `
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background: white;
    opacity: .7;
`;

export const customFormLabel = () => `
    font-weight: 600;
`;

export const customLink = (color) => `
    font-weight: 600;
    color: ${color};
    &:hover {
        color: ${darken(0.1, color)};
    }
`;

export const scrollbar = () => `
    &::-webkit-scrollbar{
        padding: 10px 0;
        width: 6px;
    }
    &::-webkit-scrollbar-thumb{
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: ${theme.gray};
    } 
`;