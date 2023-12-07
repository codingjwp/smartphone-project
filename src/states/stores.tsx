import { create, StateCreator } from "zustand"
import { persist } from 'zustand/middleware'

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
  modeling: string;
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
  phoneList: PhoneData[];
  filterData: PhoneData[];
  setDetail: (id: number) => PhoneData | undefined;
}

const createPhoneSlice: StateCreator<IPageSlice & IFilterSlice & IPhoneSlice, [], [], IPhoneSlice> = (_, get) => ({
  category: [],
  baseData: {},
  phoneList: [],
  filterData: [],
  setDetail: (id) => {
    const filter = get().filterData.find((item) => item.id === id);
    return filter;
  }
})

/** page 관련 Store */
interface IPageSlice {
  pages: { page: number, totalPage: number },
  setNextPage: () => void;
}

const createPageSlice: StateCreator<IPageSlice & IFilterSlice & IPhoneSlice, [], [], IPageSlice> = (set, get) => ({
  pages: { page: 1, totalPage: 1 },
  setNextPage: () => {
    const prev = get().pages.page;
    const next = (prev + 1) > get().pages.totalPage ? prev : prev + 1;
    const nextData = !(prev === next && prev === get().pages.totalPage) ? get().baseData[`${next}`] as PhoneData[] : [];
    set(({pages}) => ({ pages: { ...pages, page: next } }))
    if (nextData.length > 0) {
      set(({phoneList}) => ({ phoneList: [...phoneList, ...nextData]}))
      get().setFilter('text', '');
    }
  }
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
  setFilter: (keys, value) => set(({ filter }) => ({
    filter: keys === 'text' ? filter : { ...filter, [keys]: value },
    filterData: get().phoneList.filter((phone) => {
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
        phoneList: state.phoneList,
        filterData: state.filterData,
      })
    }
  ))

export const createPhones = () => {
  fetch('https://codingjwp.github.io/smartphone-project/db.json')
    .then((res) => res.json())
    .then((data: PhoneObject) => {
      usePhoneStore.setState(({ pages, filter }) => ({
        category: (data.category as CategoryData).brands,
        pages: { ...pages, totalPage: (data.category as CategoryData).totalPage },
        baseData: data,
        phoneList: (data[`${pages.page}`] as PhoneData[]),
        filterData: (data[`${pages.page}`] as PhoneData[]).filter((phone) => {
          const brands = filter.brand === 'all' || phone.brands.includes(filter.brand);
          const storage = filter.storage === 'all' || phone.storage.includes(filter.storage);
          const os = filter.os === 'all' || phone.os.includes(filter.os);
          return brands && storage && os;
        })
      }));
    });
}