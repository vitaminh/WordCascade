import { PaperScope } from 'paper';

const scope = (scopeState = new PaperScope(), action) => {
  switch (action.type) {
    default:
      return scopeState;
  }
};

export default scope;
