import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect } from 'react';
import PDF from './PDF';
import Form from './PrescriptionForm';
import Table from './Table';
import Template from './Template';

// import StepperForms from './Stepper';




function getSteps() {
  return ['Choose Template','Choose Drugs', 'Review Drugs','Print Prescription'];
}



export default function Prescription({match})
{

        // In order to gain access to the child component instance,
  // you need to assign it to a `ref`, so we call `useRef()` to get one
  const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    iconPlus:{
      margin: "auto",
      textAlign:"center"
      // float:"right",
    },
    input: {
      display: 'none',
    },

  }),
);


  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [header, setHeader] = React.useState(null);
  const [footer, setFooter] = React.useState(null);
  const [notes, setNotes] = React.useState(null);
  const [PID, setPID] = React.useState(null);
  const [prescription_rows, setPrescription_Rows] = React.useState([]);
  const steps = getSteps();
  const childRef = React.useRef();
  const pdfRef = React.useRef();
  
  const AddRow = (data)=>{
    prescription_rows.push(data)
    setPrescription_Rows([...prescription_rows])
    childRef.current.addRow(prescription_rows);
    pdfRef.current.addRow(prescription_rows);
  }
  const DeleteRows = (data)=>{
    setPrescription_Rows([...data])

     pdfRef.current.updateData(data);

  }


  function GetStepContent(stepIndex) {

    switch (stepIndex) {
      case 0:
        return <Template header={header} footer={footer} setHeader={setHeader} setFooter={setFooter} setNotes={setNotes}/>
      case 1:
        return <Form PID={PID} add_row={AddRow}/>
  
      case 2:
        return <Table prescription_rows={prescription_rows}  DelteFromPDF={DeleteRows} visitId = {match.params.visitId} ref={childRef}/>
      default:
        return <PDF header={header} footer={footer} prescription_rows={prescription_rows} printableId='printme' ref={pdfRef}/>

    }
  }

  useEffect(() => {
    document.getElementById("temp").remove();

}, []);

  const addPrescription = ()=>{
    axios.post('http://localhost:3000/visit/addPrescription',{
      notes: notes,
      visit_id : match.params.visitId
    }).then(res=>{
        setPID(res.data.insertId)
    }).catch(err=>{
      console.log(err)
    })
  }


  const handleNext = () => {
    if(!header && !footer && !notes && !PID){
      alert("please Fill Data")
      return
    }
    if(activeStep == 0 && !PID){
      addPrescription()
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
    return(
      //   <div>
      //   <Grid style={{position:'absolute',marginTop:25}} container spacing={3}>
      //   <Grid item xs={4}>
      //     <Form add_row={AddRow}/>
      //   </Grid>
      //   <Grid item xs={4}>
      //   <Table DelteFromPDF={DeleteRows} visitId = {match.params.visitId} ref={childRef}/>
      //   </Grid>
      //   <Grid item xs={4}>
      //     <PDF printableId='printme' ref={pdfRef}/>
      //   </Grid>
      // </Grid>
      // </div>
      <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{GetStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Div To Initialize Refs */}
      <div id="temp" style={{display:'none'}}>
      <PDF style={{display:'none'}} printableId='printme' ref={pdfRef}/>
       <Table  DelteFromPDF={DeleteRows} visitId = {match.params.visitId} ref={childRef}/>
        <Form add_row={AddRow}/>
         <Template classes={classes}/>

      </div>
      {/* Div To Initialize Refs */}

    </div>
    )
}