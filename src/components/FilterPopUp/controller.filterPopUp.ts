export interface FilterPopUpProps {
    onClose: () => void;
    filterType: string;
  }
  export interface FilterItem {
    id: number;
    label: string;
    checked: boolean;
  }
  
  export const filterItems: FilterItem[] = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    label: `Item ${index + 1}`,
    checked: false,
  }));