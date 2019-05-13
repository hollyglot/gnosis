import { Record, Map } from 'immutable';

const defaultValues = {
  loading: false,
  errorMessage: '',
  data: new Map(),
};

export default class BaseMap extends Record(defaultValues, 'BaseMap') {
  constructor(values) {
    super({
      ...values,
    });
  }
}
