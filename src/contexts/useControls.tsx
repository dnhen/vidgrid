import { useLocalStorage } from '@/hooks/useLocalStorage';
import posthog from 'posthog-js';
import { createContext, useContext, useEffect, useState } from 'react';

const DEFAULT_GRID_SIZE = 4;

interface ControlsContextInterface {
  gridSize: number;
  setGridSize: (gridSize: number) => void;
  activeVideos: Map<number, boolean>;
  selectedVideo: { url: string; name: string } | null;
  setSelectedVideo: (video: { url: string; name: string } | null) => void;
  isVideoActive: (index: number) => boolean;
  addActiveVideo: (index: number) => void;
  removeActiveVideo: (index: number) => void;
  gridSizeMap: { [key: string]: GridSizeMapInterface };
}

export const ControlsContextProvider = ({ children }: ControlsContextProviderProps) => {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [gridSize, setGridSizeHook] = useState<number>(DEFAULT_GRID_SIZE);
  const [activeVideos, setActiveVideos] = useState<Map<number, boolean>>(new Map());
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; name: string } | null>(null);

  // Initial loading of grid size
  useEffect(() => {
    // Get grid size from local storage
    const savedGridSize = getLocalStorage('gridSize');

    // If local grid size exist, set it
    if (!!savedGridSize) {
      setGridSize(savedGridSize);
    } else {
      // Otherwise, set grid size to default
      setGridSize(DEFAULT_GRID_SIZE);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // When grid size updates
  const setGridSize = (newSize: number) => {
    // Set the grid size state
    setGridSizeHook(newSize);

    // Send event to posthog
    posthog.capture('grid_size_updated', {
      grid_size: newSize,
    });

    // Save the grid size to local storage
    setLocalStorage('gridSize', newSize);
  };

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

  const gridSizeMap: { [key: string]: GridSizeMapInterface } = {
    1: { rows: '1', columns: '1', elements: [{ rowStart: '1', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' }] },
    2: {
      rows: '2',
      columns: '1',
      elements: [
        { rowStart: '1', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
      ],
    },
    3: {
      rows: '2',
      columns: '2',
      elements: [
        { rowStart: '1', rowEnd: 'span 2', colStart: '1', colEnd: 'span 1' },
        { rowStart: '1', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
      ],
    },
    4: {
      rows: '2',
      columns: '2',
      elements: [
        { rowStart: '1', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '1', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
      ],
    },
    5: {
      rows: '4',
      columns: '4',
      elements: [
        { rowStart: '1', rowEnd: 'span 4', colStart: '1', colEnd: 'span 3' },
        { rowStart: '1', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
        { rowStart: '4', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
      ],
    },
    6: {
      rows: '3',
      columns: '3',
      elements: [
        { rowStart: '1', rowEnd: 'span 2', colStart: '1', colEnd: 'span 2' },
        { rowStart: '1', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
      ],
    },
    7: {
      rows: '4',
      columns: '4',
      elements: [
        { rowStart: '1', rowEnd: 'span 2', colStart: '1', colEnd: 'span 2' },
        { rowStart: '1', rowEnd: 'span 2', colStart: '3', colEnd: 'span 2' },
        { rowStart: '3', rowEnd: 'span 2', colStart: '1', colEnd: 'span 2' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
        { rowStart: '4', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '4', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
      ],
    },
    9: {
      rows: '3',
      columns: '3',
      elements: [
        { rowStart: '1', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '1', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
        { rowStart: '1', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
      ],
    },
    10: {
      rows: '4',
      columns: '4',
      elements: [
        { rowStart: '1', rowEnd: 'span 2', colStart: '1', colEnd: 'span 2' },
        { rowStart: '1', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '1', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 2', colStart: '1', colEnd: 'span 2' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
        { rowStart: '4', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '4', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
      ],
    },
    16: {
      rows: '4',
      columns: '4',
      elements: [
        { rowStart: '1', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '1', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
        { rowStart: '1', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '1', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
        { rowStart: '4', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '4', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
        { rowStart: '4', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '4', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
      ],
    },
    20: {
      rows: '5',
      columns: '4',
      elements: [
        { rowStart: '1', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '1', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
        { rowStart: '1', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '1', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '2', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '3', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
        { rowStart: '4', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '4', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
        { rowStart: '4', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '4', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
        { rowStart: '5', rowEnd: 'span 1', colStart: '1', colEnd: 'span 1' },
        { rowStart: '5', rowEnd: 'span 1', colStart: '2', colEnd: 'span 1' },
        { rowStart: '5', rowEnd: 'span 1', colStart: '3', colEnd: 'span 1' },
        { rowStart: '5', rowEnd: 'span 1', colStart: '4', colEnd: 'span 1' },
      ],
    },
  };

  const providerValue: ControlsContextInterface = {
    gridSize,
    setGridSize,
    activeVideos,
    selectedVideo,
    setSelectedVideo,
    isVideoActive,
    addActiveVideo,
    removeActiveVideo,
    gridSizeMap,
  };

  return <ControlsContext.Provider value={providerValue}>{children}</ControlsContext.Provider>;
};

interface GridSizeMapInterface {
  rows: string;
  columns: string;
  elements: GridSizeElementInterface[];
}

interface GridSizeElementInterface {
  rowStart: string;
  rowEnd: string;
  colStart: string;
  colEnd: string;
}

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
