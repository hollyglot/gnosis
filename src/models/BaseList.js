import { Record, List, Map } from 'immutable';

const defaultValues = {
  loading: false,
  errorMessage: '',
  options: new Map(),
  data: new List(),
};

export default class BaseList extends Record(defaultValues, 'BaseList') {
  constructor(values) {
    super({
      ...values,
      options: values && values.options ? values.options : defaultValues.options,
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
