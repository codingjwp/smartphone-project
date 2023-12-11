import { StateCreator } from 'zustand'

export type CategorysData = {
  categorys: string[];
}

export type TotalPageData = {
  pages: {
    page: number,
    totalPage: number
  }
}

export type FilterGroups = {
  filters: {
    brand: string;
    storage: string;
    os: string;
  }
}

export const createCategorySlice: StateCreator<CategorysData,
  [], [], CategorysData> = (_) => ({
    categorys: []
  })

export const createTotalPageSlice: StateCreator<TotalPageData,
  [], [], TotalPageData> = (_) => ({
    pages: {
      page: 1,
      totalPage: 1
    }
  })

export const createFilterSlice: StateCreator<FilterGroups,
  [], [], FilterGroups> = (_) => ({
    filters: {
      brand: 'all',
      storage: 'all',
      os: 'all'
    }
  })




