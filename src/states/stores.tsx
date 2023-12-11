import { create, StateCreator } from "zustand";
import { persist } from 'zustand/middleware';
import { CategorysData, TotalPageData, FilterGroups, createCategorySlice, createTotalPageSlice, createFilterSlice } from './otherSlice';
import { PhoenDetailData, PhoneData, createPhoneSlice } from './dataSlice';

type OtherCategory = {
  brands: string[];
  totalPage: number;
}

interface IPhoneObj {
  [key: string]: PhoenDetailData[] | OtherCategory
}

type FunctionModel = {
  setCreateData: (
    newTotalPage: number,
    newCategory: string[],
    newPhoneList: PhoenDetailData[]) => void,
  setNextPage: () => void,
  setPhoneList: (data: PhoneData) => void,
  setFilter: (keys: string, value: string) => void,
  setDetail: (id: number) => PhoenDetailData[] | undefined
}

const createFinshSlice: StateCreator<CategorysData & TotalPageData & FilterGroups & PhoneData,
  [], [], FunctionModel> = (set, get) => ({
    setCreateData: (newTotalPage, newCategory, newPhoneList) => {
      set(({ pages }) => ({
        pages: { ...pages, totalPage: newTotalPage },
        categorys: newCategory,
        phoneList: newPhoneList
      }))
    },
    setNextPage: () => {
      const isEndPage = get().pages.page + 1 > get().pages.totalPage;
      if (isEndPage) return;
      set(({ pages }) => ({
        pages: { ...pages, page: pages.page + 1 }
      }))
    },
    setPhoneList: (data) => {
      set(({ phoneList }) => ({
        phoneList: {
          ...phoneList,
          ...data
        }
      }))
    },
    setFilter: (keys, value) => set(({ filters }) => ({
      filters: keys === 'text' ? filters : { ...filters, [keys]: value },
    })),
    setDetail: (id) => {
      const detail = get().phoneList.filter((list) => {
        list.id === id
      })
      return detail
    }
  })

export const usePhoneStore = create<CategorysData & TotalPageData & FilterGroups & PhoneData & FunctionModel>()(
  persist(
    (...props) => ({
      ...createCategorySlice(...props),
      ...createTotalPageSlice(...props),
      ...createFilterSlice(...props),
      ...createPhoneSlice(...props),
      ...createFinshSlice(...props),
    }),
    {
      name: 'stores',
      partialize: (state) => ({
        pages: state.pages,
        categorys: state.categorys,
        filters: state.filters,
        phoneList: state.phoneList,
      })
    }
  )
)

export const getPhoneFetch = (page: number = 1, signal?: AbortSignal) => {
  fetch('/db.json', { signal })
    .then((res) => res.json())
    .then((data: IPhoneObj) => {
      console.log("getPhoen Fetch test");
      const { brands, totalPage } = (data.category as OtherCategory);
      const newPhoneData = (data[`${page}`] as PhoenDetailData[])
      usePhoneStore.getState().setCreateData(totalPage, brands, newPhoneData);
    })
    .catch((error: unknown) => {
      if ((error as DOMException).name === 'AbortError')
        console.error('Abort Error: get Phone Fetch')
    })
}


// const createPhoneSlice: StateCreator<IPageSlice & IFilterSlice & IPhoneSlice, [], [], IPhoneSlice> = (_, get) => ({
//   category: [],
//   baseData: {},
//   phoneList: [],
//   filterData: [],
//   setDetail: (id) => {
//     const filter = get().filterData.find((item) => item.id === id);
//     return filter;
//   }
// })

// const createPageSlice: StateCreator<IPageSlice & IFilterSlice & IPhoneSlice, [], [], IPageSlice> = (set, get) => ({
//   pages: { page: 1, totalPage: 1 },
//   setNextPage: () => {
//     const prev = get().pages.page;
//     const next = (prev + 1) > get().pages.totalPage ? prev : prev + 1;
//     const nextData = !(prev === next && prev === get().pages.totalPage) ? get().baseData[`${next}`] as PhoneData[] : [];
//     set(({pages}) => ({ pages: { ...pages, page: next } }))
//     if (nextData.length > 0) {
//       set(({phoneList}) => ({ phoneList: [...phoneList, ...nextData]}))
//       get().setFilter('text', '');
//     }
//   }
// })


// const createFilterSlice: StateCreator<IPageSlice & IFilterSlice & IPhoneSlice, [], [], IFilterSlice> = (set, get) => ({
//   filter: { brand: 'all', storage: 'all', os: 'all' },
//   setFilter: (keys, value) => set(({ filter }) => ({
//     filter: keys === 'text' ? filter : { ...filter, [keys]: value },
//     filterData: get().phoneList.filter((phone) => {
//       const brands = keys === 'brand'
//         ? (value === 'all' ? true : phone.brands.includes(value))
//         : (filter.brand === 'all' || phone.brands.includes(filter.brand));
//       const storage = keys === 'storage'
//         ? (value === 'all' ? true : phone.storage.includes(value))
//         : (filter.storage === 'all' || phone.storage.includes(filter.storage));
//       const os = keys === 'os'
//         ? (value === 'all' ? true : phone.os.includes(value))
//         : (filter.os === 'all' || phone.os.includes(filter.os));
//       const text = keys === 'text' ? phone.model.toLowerCase().includes(value) : true;
//       return brands && storage && os && text;
//     })
//   }))
// })

// export const createPhones = () => {
//   fetch('/db.json')
//     .then((res) => res.json())
//     .then((data: PhoneObject) => {
//       usePhoneStore.setState(({ pages }) => ({
//         category: (data.category as CategoryData).brands,
//         pages: { ...pages, totalPage: (data.category as CategoryData).totalPage },
//         phoneList: (data[`${pages.page}`] as PhoneData[])
//       }));
//     });
// }