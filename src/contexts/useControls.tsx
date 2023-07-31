import { createContext, useContext, useState } from 'react';

interface ControlsContextInterface {
  gridSize: number;
  setGridSize: (gridSize: number) => void;
  activeVideos: Map<number, boolean>;
  isVideoActive: (index: number) => boolean;
  addActiveVideo: (index: number) => void;
  removeActiveVideo: (index: number) => void;
  gridSizeMap: { [key: string]: number };
}

export const ControlsContextProvider = ({ children }: ControlsContextProviderProps) => {
  const [gridSize, setGridSize] = useState<number>(4);
  const [activeVideos, setActiveVideos] = useState<Map<number, boolean>>(new Map());

  const isVideoActive = (index: number) => {
    // Check if the map has the index
    return activeVideos.has(index);
  };

  const addActiveVideo = (index: number) => {
    // Create a duplicate of active videos
    const newActiveVideos = new Map(activeVideos);

    // Set the video index to true on the new active videos
    newActiveVideos.set(index, true);

    // Set the active videos state to the new active videos
    return setActiveVideos(newActiveVideos);
  };

  const removeActiveVideo = (index: number) => {
    // Create a duplicate of active videos
    const newActiveVideos = new Map(activeVideos);

    // Remove the video index from the map
    newActiveVideos.delete(index);

    // Set the active videos state to the new active videos
    return setActiveVideos(newActiveVideos);
  };

  const gridSizeMap: { [key: string]: number } = {
    1: 1,
    2: 1,
    4: 2,
    6: 3,
    8: 4,
    9: 3,
  };

  const providerValue: ControlsContextInterface = {
    gridSize,
    setGridSize,
    activeVideos,
    isVideoActive,
    addActiveVideo,
    removeActiveVideo,
    gridSizeMap,
  };

  return <ControlsContext.Provider value={providerValue}>{children}</ControlsContext.Provider>;
};

// -------------------------------------------
// Helper / creator functions
// -------------------------------------------

const ControlsContext = createContext<ControlsContextInterface>({} as ControlsContextInterface);

export const useControlsContext = () => {
  return useContext(ControlsContext);
};

interface ControlsContextProviderProps {
  children: React.ReactNode;
}
