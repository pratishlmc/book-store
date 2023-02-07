import styled from "styled-components";

export const NavStyles = styled.nav`
  min-height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: #303030;

  a {
    font-size: 1.2rem;
  }
`;

export const SearchBox = styled.div `
  display: flex;
  align-items: center;
  height: 48px;
  width: 100%;
  border: 0.5px solid #000;
  border-radius: 5px;
  margin: 0 30px 0 100px;
  background-color: black;
  
`;
export  const SearchBar = styled.input`
  height: 100%;
  width: 80%;
  outline: none;
  font-size: medium;
  padding: 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;
export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  cursor: pointer;
  width: 20%;
  height: 100%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  h3 {
    font-size: 0.75rem;
    padding: 0.25rem;
  }
  svg {
    font-size: 1.5rem;
  }
  span {
    background: #ff2626;
    color: white;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.75rem;
    position: absolute;
    right: -10%;
    top: -20%;
    font-weight: 700;
    pointer-events: none;
  }
`;
