import { createContext, useContext, useState } from 'react';

interface ControlsContextInterface {
  gridSize: number;
  setGridSize: (gridSize: number) => void;
}

const ControlsContext = createContext<ControlsContextInterface>({} as ControlsContextInterface);

export const useControlsContext = () => {
  return useContext(ControlsContext);
};

interface ControlsContextProviderProps {
  children: React.ReactNode;
}

export const ControlsContextProvider = ({ children }: ControlsContextProviderProps) => {
  const [gridSize, setGridSize] = useState<number>(4);

  const providerValue: ControlsContextInterface = {
    gridSize,
    setGridSize,
  };

  return <ControlsContext.Provider value={providerValue}>{children}</ControlsContext.Provider>;
};
