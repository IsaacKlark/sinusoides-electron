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
      <Sinusoid _amplitude={0.5} />
      <Sinusoid _amplitude={1} />
      <Sinusoid _amplitude={1.5} />
      <Sinusoid _amplitude={0.7} />
      <Sinusoid _amplitude={2} />
      <Sinusoid _amplitude={0.3} />
      <Sinusoid _amplitude={2.8} />
      <Sinusoid _amplitude={1.3} />
    </Box>
  );
}

export default App;
