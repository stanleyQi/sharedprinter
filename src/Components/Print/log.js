import React from "react";
import Typography from "@material-ui/core/Typography";
import {Tabs} from '@material-ui/core';
import Tab from '@material-ui/core/Tab';

import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import LogPanel1 from './logpanel1';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Log = (state) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return ( 
        <div>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary"> 
                <Tab label="Log" {...a11yProps(0)} />
                <Tab label="History" {...a11yProps(1)} disabled/>
            </Tabs>
            <TabPanel value={value} index={0}>
                <LogPanel1 state={state}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                history panel
            </TabPanel>
        </div>
    );
};

export default Log;