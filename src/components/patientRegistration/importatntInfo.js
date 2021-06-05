import React from "react";
// import Form.Control from "@material-ui/core/Form.Control";
// import Col from "@material-ui/core/Col";
import { Form, Col, Row } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const useStyles = makeStyles((theme) => ({
  marginTopp: {
    marginTop: theme.spacing(11),
    backgroundColor: "yellow",
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#e7f0f4",
    border: "1px solid #fff",
    boxShadow: "4px 3px 16px 1px #fff",
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
    padding: "1em",
    borderRadius: "1em",
  },
  iconsColor: {
    color: "#385968",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#385968",
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#385968",
  },
}));

export default function PaientRegistration({
  getFirstName,
  getSecondName,
  getBloodGroup,
  getEmail,
  getStatus,
  getLastName,
  getAddress,
  getBirthDate,
  getPhone,
  obj,
}) {
  const [firstName, setFirstName] = useState();
  const [secondName, setSecondName] = useState();
  const [lastName, setLastName] = useState();
  const [birthDate, setbirthDate] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [status, setStatus] = useState();
  const [bloodGroup, setbloodGroup] = useState();
  const [phone, setPhone] = useState();
  const classes = useStyles();

  return (
    <div
      className=" row justify-content-center small-labels"
      style={{ marginTop: "50px" }}
    >
      <Col>
        <div class="card">
          <Form className={classes.form} noValidate>
            <Col container spacing={2}>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    variant="outlined"
                    type="text"
                    required
                    fullWidth
                    size="small"
                    id="firstName"
                    placeholder="First Name"
                    name="firstName"
                    autoComplete="firstName"
                    onChange={(event) => {
                      setFirstName(event.target.value);
                      getFirstName(event.target.value);
                      console.log("yyyyys", firstName);
                    }}
                    defaultValue={obj.firstName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Second Name</Form.Label>
                  <Form.Control
                    variant="outlined"
                    required
                    fullWidth
                    type="text"
                    size="small"
                    id="secondName"
                    placeholder="Second Name"
                    name="secondName"
                    autoComplete="secondName"
                    onChange={(event) => {
                      setSecondName(event.target.value);
                      getSecondName(event.target.value);
                      console.log("yyyyys", firstName);
                    }}
                    defaultValue={obj.secondName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    id="lastName"
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    autoComplete="lastName"
                    onChange={(event) => {
                      getLastName(event.target.value);
                      console.log("yyyyys", lastName);
                    }}
                    defaultValue={obj.lastName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    id="email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={(event) => {
                      getEmail(event.target.value);
                      // console.log("yyyyys" , username);
                    }}
                    defaultValue={obj.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    id="address"
                    placeholder="Address"
                    name="address"
                    type="text"
                    autoComplete="address"
                    onChange={(event) => {
                      getAddress(event.target.value);
                      // console.log("yyyyys" , username);
                    }}
                    defaultValue={obj.address}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    variant="outlined"
                    required
                    fullWidth
                    size="phone"
                    name="phone"
                    placeholder="Phone"
                    type="text"
                    id="phone"
                    // autoComplete="current-password"
                    onChange={(event) => {
                      getPhone(event.target.value);
                      // console.log("email" , email);
                    }}
                    defaultValue={obj.phone}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>BirthDate</Form.Label>
                  <Form.Control
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    name="birthDate"
                    placeholder="BirthDate"
                    type="date"
                    id="birthDate"
                    autoComplete="current-password"
                    onChange={(event) => {
                      getBirthDate(event.target.value);
                      // console.log("password" , pass);
                    }}
                    defaultValue={obj.birthDate}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>status</Form.Label>
                  <Form.Control
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    name="status"
                    placeholder="Status"
                    type="text"
                    id="status"
                    // autoComplete="current-password"
                    onChange={(event) => {
                      getStatus(event.target.value);
                      // console.log("email" , email);
                    }}
                    defaultValue={obj.status}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>blood Group</Form.Label>
                  <Form.Control
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    name="bloodGroup"
                    placeholder="Blood Group"
                    type="text"
                    id="bloodGroup"
                    // autoComplete="current-password"
                    onChange={(event) => {
                      getBloodGroup(event.target.value);
                      // console.log("email" , email);
                    }}
                    defaultValue={obj.bloodGroup}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
              </Row>
            </Col>

            <Col container justify="flex-end">
              <Col item>
                {/* <Link href="#" variant="body2">
                                  Forgot Password
                                </Link> */}
              </Col>
            </Col>
          </Form>
        </div>
      </Col>
    </div>
  );
}
