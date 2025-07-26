import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: '' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab sx={{color:"white"}} label="Top Tracks" />
        <Tab sx={{color:"white"}} label="Top Artsist" />
        <Tab sx={{color:"white"}} label="Top Albums" />
      </Tabs>
    </Box>
  );
}
