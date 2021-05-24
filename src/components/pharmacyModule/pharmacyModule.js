import React, { Component } from 'react';
import pharmacyModule from "../pharmacyModuleDB.json";
import DataTableComp from "../typesGenerator/dataTable";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const row = [
    {quantity : "one" , drug :"one" , notes:"one" , duration:"one"},
    {quantity : "two" , drug :"two" , notes:"two" , duration:"two"},
]
class PharmacyModule extends Component { // this Component to View All The Not Accepted Orders in our System
    constructor(props) {
        super(props);
        this.state = { 
            type:"",
            columns:[],
            Drugs:[] // this will be viewed in DataTable Component
         }
    }
    async componentDidMount(){
        this.setState({type: "pharmacyModule"});
        var type = "pharmacyModule";
        console.log("props: " , this.props)
      // for Doctor view
            await this.getDataForDoctorPrescriptions()
            await this.handleDataTableColumnsForDoctor(type)
        
        // await this.getData(type)
    }
     handleDataTableColumnsForDoctor = (type) => {
        var temp = []
        for(var p in pharmacyModule[type].columnsTableForDoctor ){
            temp.push(pharmacyModule[type].columnsTableForDoctor[p])     
        }
        this.setState({columns : temp})
        temp = []
        var newState = this.state;
        for(var property in pharmacyModule[type].state ){
          newState[property] = "" 
        }
        this.setState({newState})
    }


    handleAccept = async (id) =>{
      console.log("Accepted IDS:  " , this.state.acceptedIds )
      var details = {
        id : id,
        labFDId : localStorage.getItem("labId"),
        // labId: localStorage.getItem("labId")
      }

      
      console.log("detilaas : " , details)

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      console.log("formging:     " , formBody)
      console.log("formging:     " , JSON.stringify(details))
      
  await fetch(`${pharmacyModule[this.state.type].acceptOrder}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then((resp)=>{
        console.log("Getting: " , resp);
        resp.json().then((data)=>{
          console.log("ddddddddddddddddd;  " , data[0])
          this.setState({
            TypeObj:data[0]
          })
          // object = data
        })
      }).catch(()=>{
        console.log("errror")
      })
   
    }   
    getDataForDoctorPrescriptions = () =>{ // getData for Doctor Prescriptions
        var details = {     
            ptCode : this.props.history.location.state,
          }
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
        
           
        fetch(`${pharmacyModule["pharmacyModule"].getLastTenPrescription}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          }).then((resp)=>{
            resp.json().then((data)=>{
              console.log("All Incomming Data;  " , data)
  
  
              this.setState({ 
                Drugs:data
              })
        
            })
          }).catch(()=>{
            console.log("errror")
          })
    }

  
    render() { 
        return (     
         
        <Container fluid>
            
            <Row className= "py-3">
                <Col>
                    <h3>All Doctor Prescriptions</h3>
                    <div>You will Get All your Prescriptions....</div>
                </Col>
            </Row>
            <Row className= "py-3" >
                <Col sm={10}></Col>
                    <Col sm={2}><Button variant="success"  onClick = {()=>{
                        // this.setState({formType :"add"})
                        console.log("this.props.history : " , this.props)
                   this.props.history.push({
                       pathname:`${this.props.history.location.pathname}/prescription`,
                       state:{}
                   })
                    }}>Add New</Button>{' '}</Col>
            </Row>

            <Row className= "py-3">
               <Col>
                {console.log(this.state.columns)}
                <DataTableComp  data = {row} //change it to Drugs
                  columns = {this.state.columns}
                  title=""
                  />
               </Col> 
           
         </Row>
         </Container>
         



         );
    }
}
 
export default PharmacyModule;