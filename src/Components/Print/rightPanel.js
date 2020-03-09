import React,{Component} from "react";
import Typography from "@material-ui/core/Typography";
import {Paper} from '@material-ui/core';


const style = {
    Paper: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10
    }
}

class RightPabel extends Component {
    render(){
        return ( 
            <div>
                <Paper style={style.Paper}>
                    <Typography variant = "display4" align='left'>
                        this is right panel
                    </Typography>
                </Paper>
            </div>
        );
    }
}

export default RightPabel;