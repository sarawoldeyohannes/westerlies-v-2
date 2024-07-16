export interface FilterProps {
    type?: string;
    tags: any[];
    selectedLocation: string;
    setSelectedLocation: (selectedLocation: string) => void;
    setLocationList: (locationList: any[]) => void;
  }