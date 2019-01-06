import { PaperScope } from 'paper';

const defaultScope = new PaperScope();

const scope = (scopeState = defaultScope, action) => {
  switch (action.type) {
    default:
      return scopeState;
  }
};

export default scope;
