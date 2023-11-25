import { create, StateCreator } from "zustand"
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


interface IPhoneSlice {
  category: string[];
  baseData: PhoneObject;
  phoneData: PhoneData[];
}

const createPhoneSlice: StateCreator<IPageSlice & IFilterSlice & IPhoneSlice, [], [], IPhoneSlice> = (set) => ({
  category: [],
  baseData: {},
  phoneData: [],
})

interface IPageSlice {
  pages: {page: number, totalPage: number},
  setNextPage: () => void;
}

const createPageSlice: StateCreator<IPageSlice & IFilterSlice & IPhoneSlice, [], [], IPageSlice> = (set) => ({
  pages: {page: 1, totalPage: 1},
  setNextPage: () => set(({pages}) => ({
    pages: {
      ...pages,
      page: (pages.page + 1) > pages.totalPage ? pages.page : ++pages.page
    }
  })),
})

interface IFilterSlice {
  filter: FilterGroups;
  setFilter: (keys: string, value: string) => void;
}

const createFilterSlice: StateCreator<IPageSlice & IFilterSlice & IPhoneSlice, [], [], IFilterSlice> = (set) => ({
  filter: { brand: 'all', storage: 'all', os: 'all', text: ''},
  setFilter: (keys, value) => set(({filter}) => ({
    filter: { ...filter, [keys]: value }
  }))
})


export const usePhoneStore = create<IPageSlice & IFilterSlice & IPhoneSlice>()(
  persist(
  (...props) => ({
  ...createPageSlice(...props),
  ...createFilterSlice(...props),
  ...createPhoneSlice(...props),
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
))

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