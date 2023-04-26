import { UPDATE_CONFIGS } from '../actions';

const INITIAL_STATE = {
  categoryIdSelected: 9,
  dificultySelected: '',
};

const configReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_CONFIGS:
    return {
      ...state,
      categoryIdSelected: action.payload.categoryIdSelected,
      dificultySelected: action.payload.dificultySelected,
    };
  default:
    return state;
  }
};

export default configReducer;
