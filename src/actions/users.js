import { getUsers } from "./data";

/**
 * Sets the error
 * @param {string}  error  A descriptive error message
 * @returns {{
 *   type: string,
 *   payload: {isLoading: boolean, error: *}
 * }} dispatch event
 */
const setError = error => ({
  type: "USERS_SET",
  payload: {
    isLoading: false,
    error
  }
});

/**
 * Sets up the reducer for the request.
 * @returns {{
 *   type: string,
 *   payload: {isLoading: boolean}
 * }} dispatch event
 */
const requestUsers = () => ({
  type: "USERS_SET",
  payload: {
    isLoading: true
  }
});

/**
 * Receives the users
 * @param {Array}  data  An array of user data.
 * @returns {{
 *   type: string,
 *   payload: {isLoading: boolean, error: string, data: Array}
 * }} dispatch event
 */
const receiveUsers = data => ({
  type: "USERS_SET",
  payload: {
    isLoading: false,
    error: "",
    data
  }
});

/**
 * Function to format the data for use within the app
 * @param {Array}  users  An array of user data
 */
const getFormattedData = users => users.map(({ name, wont_eat: wontEat, drinks }) => ({
  name,
  wontEat: wontEat.map(food => food.toLowerCase()),
  drinks: drinks.map(drink => drink.toLowerCase())
}));

/**
 * Contacts the server to get the users.
 * @returns {dispatch} dispatch event.
 */
const fetchUsers = () => async dispatch => {
  dispatch(requestUsers());

  try {
    const users = await getUsers();
    const formattedData = getFormattedData(users);

    return dispatch(receiveUsers(formattedData));
  } catch ({ message }) {
    return dispatch(setError(message));
  }
};

/**
 * Determine whether to get the users or not.
 * @param {boolean}  isLoading  Whether the request is loading
 * @param {Array}  data  Array of the data.
 */
const shouldFetchUsers = ({
  users: {
    isLoading,
    data
  }
}) => !isLoading && data.length === 0;

/**
 * Fetches the users if required
 * @returns {dispatch} dispatch event.
 */
export const fetchUsersIfRequired = () => (dispatch, getState) => {
  if (shouldFetchUsers(getState())) {
    return dispatch(fetchUsers());
  }
};
