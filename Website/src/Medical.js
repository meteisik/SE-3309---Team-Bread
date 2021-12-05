import React,{useState,useEffect} from 'react'
import HospitalTable from "./Components/Tables/HospitalTable.js"
import HealthCareCentreTable from "./Components/Tables/HealthCareCentreTable"
import VaccineClinicTable from "./Components/Tables/VaccineClinicTable"

function Table(props) {
  const tableNum = props.tableState;
  if (tableNum==0) {
    return <HealthCareCentreTable HCC={props.apiTable}></HealthCareCentreTable>;
  }else if(tableNum==1){
    return <VaccineClinicTable clinicArray={props.apiTable}></VaccineClinicTable>
  }else{
    return <HospitalTable hospitalArray={props.apiTable}></HospitalTable>;
  }
  
}

function Medical() {
 
    const [apiResponse, setResponse] = useState([]);
    const [tableState, setTableState] = useState(0);

    useEffect(() => {
        getDefaultTable();
    }, []);

    
    

    

      function getDefaultTable() {
        fetch("http://localhost:9000/testAPI/getHealthCentres")
            .then(res => res.text())
            .then(res => setResponse(JSON.parse(res)));
          setTableState(0);
           
      }
      function getClinics() {
        fetch("http://localhost:9000/testAPI/getClinics")
            .then(res => res.text())
            .then(res => setResponse(JSON.parse(res)));
            setTableState(1);
      }
      function getHospitals() {
        fetch("http://localhost:9000/testAPI/getHospitals")
            .then(res => res.text())
            .then(res => setResponse(JSON.parse(res)));
            setTableState(2);
      }
      return(

        <div id ="message container"> 

        <button onClick={getDefaultTable}>All</button>
        <button onClick={getClinics}>Clinics</button>
        <button onClick={getHospitals}>Hospitals</button>

          <Table tableState={tableState} apiTable={apiResponse}></Table>

        </div>
      )

    
}


export default Medical
