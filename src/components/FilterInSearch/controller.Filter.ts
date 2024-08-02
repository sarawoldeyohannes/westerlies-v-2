export interface FilterProps {
    type?: string;
    tags: any[];
    selectedLocation: string;
    selectedTagsList: any[];
    setSelectedLocation: (selectedLocation: string) => void;
    setLocationList: (locationList: any[]) => void;
    setSelectedTags: (selectedTags: any) => void;
  }