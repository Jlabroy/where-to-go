const initialState = {
  users: [],
  placesToGo: [],
  placesToAvoid: {}
};

/**
 *
 * @param {Object}  state  Current State
 * @param {string}  type  Type of action
 * @param {Object}  payload  Payload
 * @returns {Object}  The current state
 */
const recommendations = (state = initialState, { type, payload }) => {
  switch (type) {
    case "RECOMMENDATIONS_SET": {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};

export default recommendations;
