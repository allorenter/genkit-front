import { createContext } from 'react';

const AppIsLoadedContext = createContext([[], () => {}]);

export default AppIsLoadedContext;
