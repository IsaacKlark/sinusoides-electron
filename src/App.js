import './App.css';
import Sinusoid from './Sinusoid';
import { Box } from '@mui/material';
function App() {
  return (
    <Box className="App" sx={{
      padding: '50px',
      display: 'flex',
      flexWrap: 'wrap',
      columnGap: '20px',
      rowGap: "40px",
      justifyContent: 'space-around'
    }}>
      <Sinusoid />
    </Box>
  );
}

export default App;
