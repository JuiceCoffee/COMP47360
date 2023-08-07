






var globalState = {
    globalReload: 1,
  };
  
  export default globalState;


  export const updateGlobalReload = (newValue) => {
    globalState.globalReload = newValue;
  };