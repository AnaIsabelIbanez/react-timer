import styled from 'styled-components';

const TimerButton = styled.button`
  width: 48px;
  height: 48px;
  border:0;
  cursor: pointer;
  
  background: ${props => props.pause ?
        'url("/img/pause.png") no-repeat center center;' :
        'url("/img/play.png") no-repeat center center;'};
`;

export default TimerButton;
