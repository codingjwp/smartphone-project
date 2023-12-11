import { usePhoneStore } from '../states/stores'

export const useFilterData = () => {
  const { phoneList, filters, pages } = usePhoneStore(({ phoneList, filters, pages }) => ({ phoneList, filters, pages }));
  const hasBrands = filters.brand;
  const hasStorage = filters.storage;
  const hasOs = filters.os;
  const hasText = filters.text;
  const filterList = phoneList.filter((phone) => {
    const checkBrand = hasBrands === 'all' ? true : phone.brands.includes(hasBrands);
    const checkStorage = hasStorage === 'all' ? true : phone.storage.includes(hasStorage);
    const checkOs = hasOs === 'all' ? true : phone.os.includes(hasOs);
    const checkText = hasText === '' ? true : phone.model.toLowerCase().includes(hasText);
    return checkBrand && checkStorage && checkOs && checkText
  })

  return { filterList, pages };
}