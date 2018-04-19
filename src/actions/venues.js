import { getVenues } from "./data";

/**
 * Sets the error
 * @param {string}  error  A descriptive error message
 * @returns {{
 *   type: string,
 *   payload: {isLoading: boolean, error: *}
 * }} dispatch event
 */
const setError = error => ({
  type: "VENUES_SET",
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
const requestVenues = () => ({
  type: "VENUES_SET",
  payload: {
    isLoading: true
  }
});

/**
 * Receives the Venues
 * @param {Array}  data  An array of venue data.
 * @returns {{
 *   type: string,
 *   payload: {isLoading: boolean, error: string, data: Array}
 * }} dispatch event
 */
const receiveVenues = data => ({
  type: "VENUES_SET",
  payload: {
    isLoading: false,
    error: "",
    data
  }
});

/**
 * Function to format the venue data for use in the app.
 * @param {Array}  venues  An array of venues.
 */
const getFormattedData = venues => venues.map(({ name, food: foods, drinks }) => ({
  name,
  food: foods.map(food => food.toLowerCase()),
  drinks: drinks.map(drink => drink.toLowerCase())
}));

/**
 * Contacts the server to get the Venues.
 * @returns {dispatch} dispatch event.
 */
const fetchVenues = () => async dispatch => {
  dispatch(requestVenues());

  try {
    const venues = await getVenues();
    const formattedData = getFormattedData(venues);

    return dispatch(receiveVenues(formattedData));
  } catch ({ message }) {
    return dispatch(setError(message));
  }
};

/**
 * Determine whether to get the Venues or not.
 * @param {boolean}  isLoading  Whether the request is loading
 * @param {Array}  data  Array of the data.
 */
const shouldFetchVenues = ({
  venues: {
    isLoading,
    data
  }
}) => !isLoading && data.length === 0;

/**
 * Fetches the Venues if required
 * @returns {dispatch} dispatch event.
 */
export const fetchVenuesIfRequired = () => (dispatch, getState) => {
  if (shouldFetchVenues(getState())) {
    return dispatch(fetchVenues());
  }
};
