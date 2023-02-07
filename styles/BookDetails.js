import styled from "styled-components";

export const DetailsStyle = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 3rem;
  margin-bottom: 5rem;
  img {
    width: 35%;
  }
  
`;
export const BookInfo = styled.div`
  width: 40%;
  button {
    font-size: 1rem;
    font-weight: normal;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
`;

export const ContactBtn = styled.button`
  margin-top: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  outline: none;
  height: 40px;
  background: var(--primary);
  color: white;
  font-weight: 500;
`;
