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
  setPhoneList: (data: PhoenDetailData[]) => void,
  setFilter: (keys: string, value: string) => void,
  setDetail: (id: number) => PhoenDetailData | undefined
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
      set(({ pages }) => ({ pages: { ...pages, page: pages.page + 1 } }))
      getPhoneFetch(get().pages.page + 1);
    },
    setPhoneList: (data) => {
      set(({ phoneList }) => ({
        phoneList: [
          ...phoneList,
          ...data
        ]
      }))
    },
    setFilter: (keys, value) => set(({ filters }) => {
      let updateFilter;
      if (keys === 'text')
        updateFilter = { ...filters, [keys]: value }
      else
        updateFilter = { ...filters, [keys]: value, text: '' }
      return { filters: updateFilter }
    }),
    setDetail: (id) => {
      const detail = get().phoneList.find((list) => list.id === id);
      return detail;
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
  const length = usePhoneStore.getState().phoneList.length;
  if (page === 1 && length > 0) return;
  fetch('/smartphone-project/db.json', { signal })
    .then((res) => res.json())
    .then((data: IPhoneObj) => {
      const newPhoneData = (data[`${page}`] as PhoenDetailData[])
      if (page === 1) {
        const { brands, totalPage } = (data.category as OtherCategory);
        usePhoneStore.getState().setCreateData(totalPage, brands, newPhoneData);
      }
      else {
        usePhoneStore.getState().setPhoneList(newPhoneData);
      }
    })
    .catch((error: unknown) => {
      if ((error as DOMException).name === 'AbortError')
        console.error('Abort Error: get Phone Fetch')
    })
}