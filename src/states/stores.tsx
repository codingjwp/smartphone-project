import { create, StateCreator } from "zustand"
import { persist} from 'zustand/middleware'

/** Phone 관련 Data Store */
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

interface PhoneObject {
  [key: string]: PhoneData[] | CategoryData;
}

interface IPhoneSlice {
  category: string[];
  baseData: PhoneObject;
  phoneData: PhoneData[];
  filterData: PhoneData[];
}

const createPhoneSlice: StateCreator<IPageSlice & IFilterSlice & IPhoneSlice, [], [], IPhoneSlice> = (set) => ({
  category: [],
  baseData: {},
  phoneData: [],
  filterData: [],
})

/** page 관련 Store */
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


/** Filter 관련 Store */
type FilterGroups = {
  brand: string;
  storage: string;
  os: string;
}

interface IFilterSlice {
  filter: FilterGroups;
  setFilter: (keys: string, value: string) => void;
}

const createFilterSlice: StateCreator<IPageSlice & IFilterSlice & IPhoneSlice, [], [], IFilterSlice> = (set, get) => ({
  filter: { brand: 'all', storage: 'all', os: 'all' },
  setFilter: (keys, value) => set(({filter}) => ({
    filter: keys === 'text' ? filter : { ...filter, [keys]: value },
    filterData: get().phoneData.filter((phone) => {
      const brands = keys === 'brand' 
        ? (value === 'all' ? true : phone.brands.includes(value))
        : (filter.brand === 'all' || phone.brands.includes(filter.brand));
      const storage = keys === 'storage' 
        ? (value === 'all' ? true : phone.storage.includes(value))
        : (filter.storage === 'all' || phone.storage.includes(filter.storage));
      const os = keys === 'os' 
        ? (value === 'all' ? true : phone.os.includes(value))
        : (filter.os === 'all' || phone.os.includes(filter.os));
      const text = keys === 'text' ? phone.model.toLowerCase().includes(value) : true;
      return brands && storage && os && text;
    })
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
      filterData: state.filterData,
    })
  }
))

export const createPhones = () => {
  fetch('db.json')
    .then((res) => res.json())
    .then((data: PhoneObject) => {
      usePhoneStore.setState(({pages, filter}) => ({
        category: (data.category as CategoryData).brands,
        pages: { ...pages, totalPage: (data.category as CategoryData).totalPage },
        baseData: data,
        phoneData:(data[`${pages.page}`] as PhoneData[]),
        filterData: (data[`${pages.page}`] as PhoneData[]).filter((phone) => {
          const brands = filter.brand === 'all' || phone.brands.includes(filter.brand);
          const storage = filter.storage === 'all' || phone.storage.includes(filter.storage);
          const os = filter.os === 'all' || phone.os.includes(filter.os);
          return brands && storage && os;
        })
      }));
    });
}