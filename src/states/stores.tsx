import { create } from "zustand"
import { persist} from 'zustand/middleware'

type PhoneData = {
  brands: string;
  model: string;
  battery: string;
  ram: string;
  storage: string;
  screen: string;
  os: string;
  height: string;
  width: string;
  id: number;
}

type CategoryData = {
  brands: string[];
  totalPage: number;
}

type FilterGroups = {
  brand: string;
  storage: string;
  os: string;
  text: string;
}

interface PhoneObject {
  [key: string]: PhoneData[] | CategoryData;
}

interface IPhoneStore {
  pages: {page: number, totalPage: number},
  category: string[];
  filter: FilterGroups;
  baseData: PhoneObject;
  phoneData: PhoneData[];
  setNextPage: () => void;
  setFilter: (keys: string, value: string) => void;
}

export const usePhoneStore = create<IPhoneStore>()(
  persist(
    (set) => ({
      pages: {page: 1, totalPage: 1},
      category: [],
      filter: { brand: 'all', storage: 'all', os: 'all', text: ''},
      baseData: {},
      phoneData: [],
      setNextPage: () => set(({pages}) => ({
        pages: {
          ...pages,
          page: (pages.page + 1) > pages.totalPage ? pages.page : ++pages.page
        }
      })),
      setFilter: (keys, value) => set(({filter}) => ({
        filter: { ...filter, [keys]: value }
      }))
    }),
    {
      name: 'base-store',
      partialize: (state) => ({
        pages: state.pages,
        category: state.category,
        filter: state.filter,
        baseData: state.baseData,
        phoneData: state.phoneData,
      })
    }
  )
)

export const createPhones = () => {
  fetch('db.json')
    .then((res) => res.json())
    .then((data: PhoneObject) => {
      usePhoneStore.setState(({pages}) => ({
        category: (data.category as CategoryData).brands,
        pages: { ...pages, totalPage: (data.category as CategoryData).totalPage },
        baseData: data,
        phoneData:(data[`${pages.page}`] as PhoneData[])
      }));
    });
}

export const pagePhones = () => usePhoneStore.setState(({pages, baseData, phoneData}) => ({
  phoneData: !baseData ? [] : [...phoneData, ...(baseData[`${pages.page}`] as PhoneData[])]
}))