const initialState = {
  isLoading: false,
  data: []
};

/**
 *
 * @param {Object}  state  Current State
 * @param {string}  type  Type of action
 * @param {Object}  payload  Payload
 * @returns {Object}  The current state
 */
const users = (state = initialState, { type, payload }) => {
  switch (type) {
    case "USERS_SET": {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};

export default users;
