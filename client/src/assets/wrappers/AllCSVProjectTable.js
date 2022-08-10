import styled from "styled-components";

const Wrapper = styled.section`
  .table {
    margin-top: 20px;
    max-height: 300px;
    overflow-y: scroll;
  }
  .table-topic {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
  }
  .delete-icon {
    cursor: pointer;
    font-size: 1.2rem;
  }
  .save-btn {
    margin-top: 2rem;
    background-color: #00bcd4;
  }
  .cancel-btn {
    margin-top: 2rem;
    background-color: gray;
  }
`;

export default Wrapper;
