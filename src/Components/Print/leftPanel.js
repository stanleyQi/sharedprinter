import React from "react";
import {Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

const connetionStatus = ['Closed','Connected'];
const connectAction = ['Close', 'Connect'];

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    Paper: {
        padding: 10,
        marginTop: 0,
        marginBottom: 0
    },
    margin: {
        margin: theme.spacing(1),
        width:100
    }
}));


const LeftPabel =({info,onInfoChange,flag,onConnectClick})=>{

    const classes = useStyles();

    const connectClick = e => {
        onConnectClick(e);
    };
    
    return ( 
    <div>
        <Paper className={classes.Paper}>
            <form className={classes.root} noValidate autoComplete="off">
                < TextField id = "identity"
                label = "Identity"
                value = {
                    info.identity
                }
                onChange = {
                    (e) => {
                        onInfoChange(e.target)
                    }
                }
                />
                {/* <TextField id="target" label="Target"  value={props.target}/> */}
                <TextField
                    id="server"
                    label="Server"
                    value={info.server}
                    onChange={(e)=>{onInfoChange(e.target)}}
                    helperText=""
                />
                    
                <Button  onClick={(e)=>connectClick(e)} variant="contained" size="medium" color="primary" className={classes.margin}>
                    {connectAction[flag===0?1:0]}
                </Button>
                <Typography variant = "h4" align='center' display='inline'>
                    {connetionStatus[flag]} 
                </Typography>
                
            </form>
        </Paper>
    </div>
    );
}

export default LeftPabel;