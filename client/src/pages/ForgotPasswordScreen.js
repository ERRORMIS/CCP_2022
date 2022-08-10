import { useState } from "react";
import axios from "axios";
import Wrapper from "../assets/wrappers/ForgotPassword";
import { Row, Col } from "react-bootstrap";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(
      "/api/v1/auth/reset-password",
      { email },
      config
    ).then(({data}) => {
      if (data.success) {
        setSuccess(data.msg);
      } else {
        setError(data.msg);
      }

    }).catch((err) => {
      console.log(err);
    })

    setTimeout(() => {
      setError("");
      setSuccess("");
      setEmail("");
    }, 5000);
  };

  const handleOnBack = () => {
    window.history.back();
  };

  return (
    <Wrapper>
      <div className="forgot-password-screen">
        <form
          onSubmit={forgotPasswordHandler}
          className="forgotpassword-screen__form"
        >
          <header></header>
          <h3 className="forgotpassword-screen__title">Forgot Password</h3>
          {error && <Row className="error-message">{error}</Row>}
          {success && <Row className="success-message">{success}</Row>}

          <div className="form-group">
            <p className="forgotpassword-screen__subtext">
              Please enter the email address you register your account with. We
              will send you reset password to this email.
            </p>
            <Row className="my-3 justify-content-center">
              <Col xs={2}>
                <label htmlFor="email">Email:</label>
              </Col>
              <Col xs={10}>
                <input
                  type="email"
                  required
                  id="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </Col>
            </Row>
          </div>
          <Row>
            <button type="submit" className="btn btn-primary">
              Send Email
            </button>
            <button className="btn back-btn mt-3" onClick={handleOnBack}>
              back
            </button>
          </Row>
        </form>
      </div>
    </Wrapper>
  );
};

export default ForgotPasswordScreen;
