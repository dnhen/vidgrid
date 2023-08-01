import { useLocalStorage } from '@/hooks/useLocalStorage';
import { createContext, useContext, useEffect, useState } from 'react';

interface ChannelsContextInterface {
  channels: ChannelsObj;
  addCategory: (newCategoryName: string) => void;
  deleteCategory: (deleteCategoryName: string) => void;
  addChannel: (
    addChannelCategory: string,
    newChannelName: string,
    newChannelLocation: string,
    newChannelUrl: string,
    newChannelLogo: string
  ) => void;
  deleteChannel: (deleteChannelCategory: string, deleteChannelUrl: string) => void;
  clearChannels: () => void;
  getAusTvChannels: () => void;
}

export const ChannelsContextProvider = ({ children }: ChannelsContextProviderProps) => {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [channels, setChannelsHook] = useState<ChannelsObj>({});

  // Initial loading of channels
  useEffect(() => {
    // Get channels from local storage
    const savedGridSize = getLocalStorage('channels');

    // If saved channels exist, set them
    if (savedGridSize) {
      setChannels(savedGridSize);
    } else {
      // Otherwise, get them from the API
      getAusTvChannels();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // When channels update
  const setChannels = (newChannels: ChannelsObj) => {
    // Set the channels state
    setChannelsHook(newChannels);

    // Save the channels to local storage
    setLocalStorage('channels', newChannels);
  };

  const channelLocationLookup: { [key: string]: string } = {
    ade: 'Adelaide',
    bri: 'Brisbane',
    mel: 'Melbourne',
    per: 'Perth',
    syd: 'Sydney',
    nsw: 'New South Wales',
    vic: 'Victoria',
    qld: 'Queensland',
    act: 'Australian Capital Territory',
    tas: 'Tasmania',
    nt: 'Northern Territory',
    sa: 'South Australia',
    wa: 'Western Australia',
  };

  const addCategory = (newCategoryName: string) => {
    // Create a new channel object including the new category
    const newChannelsObject = {
      ...channels,
      [newCategoryName]: [],
    };

    // Set the new channels object
    return setChannels(newChannelsObject);
  };

  const deleteCategory = (deleteCategoryName: string) => {
    // Create new channels object
    const newChannelsObject = { ...channels };

    // Remove the key from the channels object
    delete newChannelsObject[deleteCategoryName];

    // Set the new channels object
    return setChannels(newChannelsObject);
  };

  const addChannel = (
    addChannelCategory: string,
    newChannelName: string,
    newChannelLocation: string,
    newChannelUrl: string,
    newChannelLogo: string
  ) => {
    // Create new channels object
    const newChannelsObject = { ...channels };

    // Add the channel to the category
    newChannelsObject[addChannelCategory] = [
      ...newChannelsObject[addChannelCategory],
      {
        name: newChannelName,
        location: newChannelLocation,
        url: newChannelUrl,
        logo: newChannelLogo,
      },
    ];

    // Set the new channels object
    return setChannels(newChannelsObject);
  };

  const deleteChannel = (deleteChannelCategory: string, deleteChannelUrl: string) => {
    // Create new channels object
    const newChannelsObject = { ...channels };
    const newChannels = [...newChannelsObject[deleteChannelCategory]];

    // Filter channels to remove the channel
    const filteredChannels = newChannels.filter((channel) => channel.url !== deleteChannelUrl);

    // Add the channel to the category
    newChannelsObject[deleteChannelCategory] = filteredChannels;

    // Set the new channels object
    return setChannels(newChannelsObject);
  };

  const clearChannels = () => {
    // Clear all channels
    return setChannels({});
  };

  // Location specific channels

  const getAusTvChannels = async () => {
    // Get all TV channels from the API
    const response = await fetch('https://i.mjh.nz/au/all/tv.json');

    // Convert response to json
    const channels: APIResponse = await response.json();

    // Format the response into channels object

    // Initially set into channel map (to prevent duplicates)
    const channelMap: Map<string, Channel[]> = new Map<string, Channel[]>();

    for (const [key, value] of Object.entries(channels)) {
      const category = value.network || 'Other';

      const channelObj = {
        name: value.name,
        location: channelLocationLookup[value.epg_id.slice(-3)] || 'National',
        url: value.mjh_master,
        logo: value.logo,
      };

      channelMap.set(category, [...(channelMap.get(category) || []), channelObj]);
    }

    // Convert channelMap to our final array of categories and channels
    const channelGroups: ChannelsObj = {};

    channelMap.forEach((channels, category) => {
      channelGroups[category] = channels.sort((a, b) =>
        `${a.name} - ${a.location}`.localeCompare(`${b.name} - ${b.location}`, undefined, { numeric: true })
      );
    });

    return setChannels(channelGroups);
  };

  const providerValue: ChannelsContextInterface = {
    channels,
    addCategory,
    deleteCategory,
    addChannel,
    deleteChannel,
    clearChannels,
    getAusTvChannels,
  };

  return <ChannelsContext.Provider value={providerValue}>{children}</ChannelsContext.Provider>;
};

// -------------------------------------------
// Interfaces
// -------------------------------------------
interface APIResponse {
  [key: string]: ChannelResponse;
}

interface ChannelResponse {
  epg_id: string;
  name: string;
  network: string;
  logo: string;
  mjh_master: string;
}

interface ChannelsObj {
  [key: string]: Channel[];
}

export interface Channel {
  name: string;
  location: string;
  url: string;
  logo: string;
}

// -------------------------------------------
// Helper / creator functions
// -------------------------------------------

const ChannelsContext = createContext<ChannelsContextInterface>({} as ChannelsContextInterface);

export const useChannelsContext = () => {
  return useContext(ChannelsContext);
};

interface ChannelsContextProviderProps {
  children: React.ReactNode;
}
