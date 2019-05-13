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
