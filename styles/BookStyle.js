import styled from "styled-components";

export const BookStyles = styled.div`
  background: #f5f5f7;
  border-radius: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  cursor: pointer;
  img {
    width: 100%;
    border-radius: 7.5px;
    object-fit: cover;
  }
  h2 {
    padding: 0.5rem 0rem;
  }
`;
