export interface HeaderProps {
    type?: string;
    headerClassName: any;
    searchResult: (searchedItemList: any) => void;
    cityId: string;
    setCityId: (cityId: string) => void;
    page?: string;
    selectedTags: any[];
    setSelectedTags: (selectedTags: string) => void;
  }