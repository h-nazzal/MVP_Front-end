import React, { Component } from 'react';
import ModalComp from "./typesGenerator/modalGenerator";
import { Card, Col } from 'react-bootstrap';



class SessionCode extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      columns:[] ,
      openModal:false,
      ModalAddtionInputs : [
          
              {
            "type": "text",
            "name" : "code"
                }
      ] ,
      style:{
        marginTop :"3em"
      }
     }
  }

  handleClose = () => {
    this.setState({openModal : false})
  };
  handleopenModal = () => {
    this.setState({openModal : true})
  };

  async componentDidMount(){}

  handleChange = (evt) =>{

    const value = evt.target.value;
    console.log("value : "  , value)
    this.setState({
      [evt.target.name]: value
    });
  }
  handleSubmit = () =>{
    if(this.props.fromComponent === "choice"){
      this.handleSubmitForChoice()
    }
    else if(this.props.fromComponent==="visit"){
      this.handleSubmitForVisit()
    }
    else{
      this.handleSubmitForpharmacy()
    }

  }
  //from public DashBoard ==> choice page
  handleSubmitForChoice = () =>{ ///*** Edit the Endpoint when Abdo Finish it */
    console.log("submittttteeedddd" , this.props) ;
    this.props.history.push({
      pathname : `${this.props.history.location.pathname}/acceptOrders`,
      state: this.state.code
    })
    
  }
  // from Visit component
  handleSubmitForVisit = () =>{ ///*** edit it when adding sessionCode in Visit Module */
    console.log("here: " , this.props);
    this.props.history.push({
      pathname : `${this.props.history.location.pathname}/visit`,
      state: this.state.code
    })

  }
  handleSubmitForpharmacy = () =>{
    this.props.history.push({
      pathname : `${this.props.history.location.pathname}/pharmacyModule`,
      state: this.state.code
    })
  }

  render() { 
    const tableData = {
      columns:this.state.columns,
      data :this.state.data
    };
 
    return (
      <>
      {
        this.props.fromComponent === "pharmacy" && (
          <Col xs={10} md={4} lg={3} className="my-4" onClick={()=>{
            this.handleopenModal()
          }}>
          {this.props.body}
          </Col>
        )
      }
        {
          
          this.props.body && this.props.fromComponent !== "pharmacy" && (
            <div  style={{cursor:"pointer"}} onClick={()=>{
              this.handleopenModal()
            }}>
            {this.props.body}
            </div>
          )
        }
        {
          !this.props.body && this.props.fromComponent !== "pharmacy"(
            <button  className="btn btn-primary" hidden={this.props.hidden} style={{display: this.props.hidden ? "none" :"block"}}
            onClick={() => {  
                  this.handleopenModal()
              }}>{this.props.buttonValue}</button>
          )
        }
     

     {
       this.state.ModalAddtionInputs &&this.state.ModalAddtionInputs.length > 0 &&(
        <ModalComp show={this.state.openModal}
        onHide={this.handleClose}
        ModalInputs={this.state.ModalAddtionInputs}
        updatedTypeObj = {this.state.typeObj}
        handleChange = {this.handleChange}
        handleAdding={this.handleSubmit}
        formType = {"Enter Code"}
        value ="Submit"
       
       />
       )
     }
      </>
    );
  }
}
 
export default SessionCode;