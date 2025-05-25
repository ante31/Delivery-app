const mode = process.env.REACT_APP_MODE;

const productionUrl = process.env.REACT_APP_PRODUCTION_URL;
console.log('Mode:', process.env.REACT_APP_MODE);
console.log('Production URL:', process.env.REACT_APP_PRODUCTION_URL);

export const backendUrl = mode === 'production'
  ? productionUrl 
  : `http://192.168.216.14:3000`; 