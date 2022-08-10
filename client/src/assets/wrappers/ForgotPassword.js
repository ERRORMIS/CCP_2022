import styled from "styled-components";

const Wrapper = styled.main`
  .forgot-password-screen {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .forgotpassword-screen__form {
    width: 600px;
    padding: 1.5rem;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    background: rgb(237, 236, 241);
  }

  .forgotpassword-screen__title {
    text-align: center;
    margin-bottom: 1rem;
  }

  .forgotpassword-screen__subtext {
    font-size: 0.9rem;
    display: block;
    margin: 0.5rem 0;
  }

  .back-btn {
    background: gray;
  }
  .error-message {
    background: #ff9999;
    color: black;
    padding: 5px;
  }

  .success-message {
    background: #addfad;
    color: black;
    padding: 5px;
  }
`;

export default Wrapper;
