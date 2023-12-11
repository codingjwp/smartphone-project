import { usePhoneStore } from '../states/stores'

export const useFilterData = () => {
  const { phoneList, filters, setFilter, pages } = usePhoneStore(({ phoneList, filters, setFilter, pages }) => ({ phoneList, filters, setFilter, pages }))
  const hasBrands = filters.brand;
  const hasStorage = filters.storage;
  const hasOs = filters.os;
  const hasText = filters.text;

  const filterList = phoneList.filter((phone) => {
    const checkBrand = hasBrands === 'all' ? true : phone.brands.includes(hasBrands);
    const checkStorage = hasStorage === 'all' ? true : phone.brands.includes(hasStorage);
    const checkOs = hasOs === 'all' ? true : phone.brands.includes(hasOs);
    const checkText = hasText === '' ? true : phone.model.toLowerCase().includes(hasText);
    setFilter('text', '');
    return checkBrand && checkStorage && checkOs && checkText
  })
  return { filterList, pages };
}