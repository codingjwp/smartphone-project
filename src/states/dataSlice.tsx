import { StateCreator } from 'zustand'

export type PhoenDetailData = {
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

export type PhoneData = {
  phoneList: PhoenDetailData[]
}

export const createPhoneSlice: StateCreator<PhoneData,
  [], [], PhoneData> = () => ({
    phoneList: [],
    isLoading: false,
  })