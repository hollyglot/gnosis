import { Record, List } from 'immutable';

const defaultValues = {
  loading: false,
  errorMessage: '',
  data: new List(),
};

export default class BaseList extends Record(defaultValues, 'BaseList') {
  constructor(values) {
    super({
      ...values,
    });
  }

  static findByKeyValue(items, key, value) {
    return items.find((item) => {
      return item.get(`${ key }`) === value ? item : undefined;
    });
  }

  static findIndexByKeyValue(items, key, value) {
    return items.findIndex((item) => {
      return item.get(`${ key }`) === value ? item : undefined;
    });
  }
}

export const toEntityList = (data, Entity) => {
  let entityItems = new List();
  if (data) {
    data.forEach((value) => {
      entityItems = entityItems.push(new Entity(value));
    });
  }
  return entityItems;
};
