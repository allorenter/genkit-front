import styled from '@emotion/styled';
import { theme } from '../styles/styles';
import UserControl from './UsersControl';

function Header(props){
    const StyledHeader = styled.header`
        background: #2C3E50;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    const StyledBrand = styled.span`

    `;
    // const StyledControlUsersButton 
    return (
        <StyledHeader>
            <StyledBrand>GenKit</StyledBrand>
            <UserControl />
        </StyledHeader>
    );
}

export default Header;