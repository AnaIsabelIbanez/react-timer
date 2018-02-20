import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
    text-align: center;
    font-size: 1.5em;
    padding: 1em;
    margin-bottom: 1.5em;
    background: black;
    color: white;
    border-bottom: 3px solid red;
`;

const Header = () => (
    <StyledHeader>
        React timer
    </StyledHeader>
);

export default Header;
