import React, { Component } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import styles from "./Form.module.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        agreed: false,
      },
      showPassword: false,
      errors: {},
    };
  }

  handleChange = e => {
    const { name, value, type, checked } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: type === "checkbox" ? checked : value,
      },
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };

  validate = () => {
    const newErrors = {};
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[\d]).{8,32}$/;

    if (!passwordRegex.test(this.state.formData.password)) {
      newErrors.password =
        "Password must be 8-32 characters and include uppercase, lowercase, number, and special character.";
    }

    if (this.state.formData.password !== this.state.formData.passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match.";
    }

    return newErrors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const validationErrors = this.validate();
    if (Object.keys(validationErrors).length > 0) {
      this.setState({ errors: validationErrors });
      return;
    }

    console.log("Form submitted successfully:", this.state.formData);

    this.setState({
      formData: {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        agreed: false,
      },
      errors: {},
    });
  };

  render() {
    const { formData, showPassword, errors } = this.state;

    return (
      <div className={styles.formWrapper}>
        <h2 className={styles.formTitle}>Create Your Account</h2>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <label className={styles.formLabel}>
            <span className={styles.formSpan}>Name:</span>
            <input
              className={styles.formInput}
              type="text"
              name="name"
              placeholder="Anonymous"
              required
              value={formData.name}
              onChange={this.handleChange}
              autoFocus
            />
          </label>
          {errors.name && (
            <div className={styles.errorMessage}>{errors.name}</div>
          )}

          <label className={styles.formLabel}>
            <span className={styles.formSpan}>Email:</span>
            <input
              className={styles.formInput}
              type="email"
              name="email"
              placeholder="yourmail@mail"
              required
              value={formData.email}
              onChange={this.handleChange}
            />
          </label>
          {errors.email && (
            <div className={styles.errorMessage}>{errors.email}</div>
          )}

          <label className={styles.formLabel}>
            <span className={styles.formSpan}>Password:</span>
            <div className={styles.inputWrapper}>
              <input
                className={`${styles.formInput} ${
                  errors.password ? styles.error : ""
                }`}
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={this.handleChange}
              />
              <button
                className={styles.eyeBtn}
                type="button"
                onClick={this.togglePasswordVisibility}
              >
                {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
            </div>
          </label>
          {errors.password && (
            <div className={styles.errorMessage}>{errors.password}</div>
          )}

          <label className={styles.formLabel}>
            <span className={styles.formSpan}>Password Confirm:</span>
            <div className={styles.inputWrapper}>
              <input
                className={`${styles.formInput} ${
                  errors.passwordConfirm ? styles.error : ""
                }`}
                type={showPassword ? "text" : "password"}
                name="passwordConfirm"
                required
                value={formData.passwordConfirm}
                onChange={this.handleChange}
              />
              <button
                className={styles.eyeBtn}
                type="button"
                onClick={this.togglePasswordVisibility}
              >
                {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
            </div>
          </label>
          {errors.passwordConfirm && (
            <div className={styles.errorMessage}>{errors.passwordConfirm}</div>
          )}

          <label className={styles.formCheckBox}>
            <input
              className={styles.inputCheckBox}
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={this.handleChange}
              required
            />
            <span className={styles.formSpan}>
              I agree to the terms and conditions
            </span>
          </label>
          {errors.agreed && (
            <div className={styles.errorMessage}>{errors.agreed}</div>
          )}

          <button type="submit" className={styles.formButton}>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
