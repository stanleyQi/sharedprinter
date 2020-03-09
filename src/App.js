import React,{Component} from 'react';
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

class App extends Component{
  render() {
    return (
      <div>
          <Typography variant = "h2" align='center'>
            Login 
          </Typography>
          <Link to="/print">Link to the Print Page</Link>
      </div>
    );
  }
}

export default App;
