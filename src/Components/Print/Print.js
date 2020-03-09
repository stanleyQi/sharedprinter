import React,{Component} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';


import LeftPabel from "./leftPanel";
import Log from "./log";

import {
    printControl
} from "./Service/performPrint";

const style = {
    Paper:{padding:20,marginTop:10,marginBottom:10},
    GridContainer: {
        marginTop: 10,
        marginBottom: 10
    }
}


class Print extends Component{
    
    state={
       identity: 'client-01-printer-03', //client-01-printer-03
       server: 'ws://192.168.3.122:9999/print',
       tempfolder: 'c:\\sharedprintertemp\\',
       flag:0,
       logs:['init']
    }

    infoChange= (element)=>{
        this.setState({
            [element.id]: element.value
        });
        
    }

    onConnectClick=(e)=>{
        this.setState(
            {
                flag:this.state.flag===0?1:0
            },
            this.PerformPrinting
        );

    }

    PerformPrinting=()=>{
        printControl(this.state, (msg) => {
            this.setState({
                ...this.state,
                logs: this.state.logs.concat(msg)
            });
        });
    }
    render(){
        return ( 
        <div>
            <div>
                <Typography variant = "h2" align='center'>
                    Print 
                </Typography>
                {/* <Typography variant = "h6" align='center'>
                    <Link to = "/" > go to Home </Link>
                </Typography> */}
            </div>
            <div>
                <Grid container spacing={2} style={style.GridContainer}>
                    <Grid item xs={12}>
                        <LeftPabel 
                            info={this.state} 
                            onInfoChange={this.infoChange.bind(this)} 
                            flag={this.state.flag} 
                            onConnectClick={this.onConnectClick.bind(this)} 
                        />
                    </Grid>
                </Grid>
            </div>
            <div>
                <Log state={this.state}/>
            </div> 
        </div>
        );
    }
}

export default Print;