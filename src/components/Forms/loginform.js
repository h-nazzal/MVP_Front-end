import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import  { useState } from 'react';
import { NativeSelect } from '@material-ui/core';
import axios from 'axios';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import "./form.css";
import { useFormik,Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory ,useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  marginTopp:{
    marginTop: theme.spacing(11),
    backgroundColor :"yellow"
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:"#e7f0f4",
    border:"1px solid #fff",
    boxShadow:"4px 3px 16px 1px #fff",
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
    padding:"1em",
    borderRadius:"1em"

  },
  iconsColor:{
    color:"#385968"
  },
  avatar: { 
    margin: theme.spacing(1),
    backgroundColor:"#385968"
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"#385968",
  },

}));

const validationSchema = Yup.object({
  username: Yup
  .string('UserName ')
    .max(20, 'UserName should be of maxmum 20 characters length')
    .required('UserName is required'),
  
 // email: Yup
   // .string('Enter your email')
   // .email('Enter a valid email')
    //.required('Email is required'),
  pass: Yup
    .string('Enter your password')
    .min(2, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function LoginForm() {
  //const [username, setUsername] = useState();
 // const [pass, setPass] = useState();
 // const [email, setEmail] = useState();
  const classes = useStyles();
  const history = useHistory();

  const handleSignup = async(values)=>{
    // alert(values)
    var details = {
      'userName':values.username,
      'Password': values.pass,
      // 'Email': email
  };
  
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  console.log("formBodu : " , formBody)
 await fetch('http://localhost:3000/authenticate/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  }).then((resp)=>{
  resp.json().then((data)=>{
    console.log("data:  " , data);
    localStorage.setItem('role', data.role);
    localStorage.setItem('userId', data.userId);

    if(parseInt(data.role) > 2 ){
      history.push("/dashBoard")
    }
    if(parseInt(data.role) == 1){
      history.push("/welcomePage");
    }
    if(parseInt(data.role) == 2){
      console.log("heeereeeee")
      axios.post('http://localhost:3000/lab/getLabByUser' ,{
        userId: data.userId
      } ,{
      } ).then(async resp => {
        console.log("resppppppp : " ,resp);
        localStorage.setItem('labId', resp.data.labId);
        history.push("/dashBoard")
     
        // setLabs(resp.data)
        // console.log("resp.data: " , resp.data);
      
      })
    }
    if(data.role == "done"){
      history.push("/welcomePage");
      console.log("heeereeeee")
      
    }

  })
    // resp.json();
    
  }).then((msg)=>{
    console.log("llkkkkkk :   ",msg);
  })
  .catch(()=>{
    console.log("errror")
  })


  
  }
  return (
      <div className="form-hero row" >
            <Container component="main" maxWidth="xs" >
    <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Login
                  </Typography>
                  <Formik 
                  initialValues={{username:'',pass:'',email:''}}
                  validationSchema={validationSchema}
                  onSubmit={(values,actions)=>{
                    handleSignup(values)
                    actions.resetForm()
                  }}
                  >
                    {(formikprops)=>(
                  <form>                 
                     <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          size="small"
                          id="username"
                          label="UserName"
                          name="userName"
                          autoComplete="username"
                          onChange = {formikprops.handleChange('username')}
                          onBlur = {formikprops.handleBlur('username')}
                          value = {formikprops.values.username}
                          error={formikprops.touched.username && formikprops.errors.username}
                          helperText={formikprops.touched.username && formikprops.errors.username}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle className={classes.iconsColor} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          size="small"
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          onChange = {formikprops.handleChange('pass')}
                          onBlur = {formikprops.handleBlur('pass')}
                          value = {formikprops.values.pass}
                          error={formikprops.touched.pass && formikprops.errors.pass}
                          helperText={formikprops.touched.pass && formikprops.errors.pass}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon className={classes.iconsColor} />
                              </InputAdornment>
                            ),
                          }}
                          
                        />
                      </Grid>
                      {/* <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          size="small"
                          name="email"
                          label="Email"
                          type="email"
                          id="email"
                          // autoComplete="current-password"
                          onChange = {(event) =>{
                            setEmail(event.target.value);
                            console.log("email" , email);
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MailOutlineIcon  className={classes.iconsColor}/>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid> */}
                    </Grid>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      // color="primary"
                      className={classes.submit}
                      onClick={formikprops.handleSubmit}

                    >
                      Login
                    </Button>
                    <Grid container justify="flex-end">
                      <Grid item>
                        <Link href="#" variant="body2">
                         havn't account? sign up
                        </Link>
                        <Link href="/forgetPassword" className="ml-3" variant="body2">
                          Forgot Password
                        </Link>
                      </Grid>
                    </Grid>
                    </form>
                    )}
                  </Formik>

                </div>
       
      </Container>
      </div>
   
  );
}