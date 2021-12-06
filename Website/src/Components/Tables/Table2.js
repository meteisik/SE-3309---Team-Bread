import { render } from "@testing-library/react";
import { Typography } from "@mui/material";

//Displays Name, Vaccine, Clinic info

export default class BasicTable extends Component{
    

 render()
 {
 
    const length = Object.keys(Output).length
 

    return (

        
        <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="customized table">
            <TableHead>
                <TableRow>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Address</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {apiAppointmentResponse.map((row, i) => (
                    <TableRow
                        key={i}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell align="right">{apiAppointmentResponse[i].personName}</TableCell>
                        <TableCell align="right">{apiAppointmentResponse[i].injectionDate}</TableCell>
                        <TableCell align="right">{apiAppointmentResponse[i].address}</TableCell>
                    </TableRow>
                )
                )}
            </TableBody>
        </Table>
    </TableContainer>
  );
}
}