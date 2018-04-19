/**
 * Function which toggles the selected users
 * @param {Object}  user  A user object to check if selected or not.
 * @param {Array}  users  Array of selected user objects.
 * @returns {Array} A new array of selected users.
 */
const getSelectedUsers = (user, users) =>
  users.includes(user) ?
    users.filter(o => o !== user) :
    [ ...users, user ];

/**
 * Gets the foods available for a user at a venue
 * @param {Array}  wontEat  An array of what the user wont eat.
 * @param {Array}  foods  An array of what the venue supplies.
 * @returns {Array} An array of foods available for the user.
 */
const getAvailableFood = ({ wontEat }, { food: foods }) =>
  foods.filter(food => !wontEat.includes(food));

/**
 * Gets the drinks available for a user at a venue
 * @param {Array}  userDrinks  An array of what a user likes to drink.
 * @param {Array}  venueDrinks  An array of what a venue supplies.
 * @returns {Array}  An array of drinks available for the user.
 */
const getAvailableDrinks = ({ drinks: userDrinks }, { drinks: venueDrinks }) =>
  venueDrinks.filter(venueDrink => userDrinks.includes(venueDrink));

/**
 * Gets a list of places to avoid with reasons why.
 * @param {Array}  users  An array of users.
 * @param {Array}  venues  An array of venues.
 * @returns {Object}  An object of places and why the users should not visit.
 */
const getPlacesToAvoid = (users, venues) => {
  const placesToAvoid = {};

  venues.forEach(venue => {
    users.forEach(user => {
      const availableFood = getAvailableFood(user, venue);
      const availableDrinks = getAvailableDrinks(user, venue);

      if (availableFood.length === 0) {
        if (!placesToAvoid[venue.name]) {
          placesToAvoid[venue.name] = []
        }

        placesToAvoid[venue.name].push({
          user: user.name,
          reason: "NO_FOOD"
        });
      }

      if (availableDrinks.length === 0) {
        if (!placesToAvoid[venue.name]) {
          placesToAvoid[venue.name] = []
        }

        placesToAvoid[venue.name].push({
          user: user.name,
          reason: "NO_DRINKS"
        });
      }
    });
  });

  return placesToAvoid;
};

/**
 * Gets the list of venues to go based on where to avoid.
 * @param {Array}  placesToAvoid  An array of venue names to avoid.
 * @param {Array}  venues  An array of venues.
 * @returns {Array} A list of venues.
 */
const getPlacesToGo = (placesToAvoid, venues) =>
  venues.filter(({ name }) => !placesToAvoid.includes(name)).map(({ name }) => name);

/**
 * Receives the users
 * @param {Array}  users  An array of user objects.
 * @returns {Object} The event to dispatch.
 */
const receiveUsers = users => ({
  type: "RECOMMENDATIONS_SET",
  payload: {
    users
  }
});

/**
 * Receives the places to avoid
 * @param {Object}  placesToAvoid  An object of places to avoid
 * @returns {Object} The event to dispatch.
 */
const receivePlacesToAvoid = placesToAvoid => ({
  type: "RECOMMENDATIONS_SET",
  payload: {
    placesToAvoid
  }
});

/**
 * Receives the places to go
 * @param {Array}  placesToGo  An array of place names to visit.
 * @returns {Object} The event to dispatch
 */
const receivePlacesToGo = placesToGo => ({
  type: "RECOMMENDATIONS_SET",
  payload: {
    placesToGo
  }
});

/**
 * Fetches the recommendations for the users selected.
 * @param {Object}  user  A user object to add or remove.
 */
export const fetchRecommendations = user => (dispatch, getState) => {
  const { recommendations: { users }, venues: { data } } = getState();

  const selectedUsers = getSelectedUsers(user, users);
  const placesToAvoid = getPlacesToAvoid(selectedUsers, data);
  const placesToGo = getPlacesToGo(Object.keys(placesToAvoid), data);

  dispatch(receiveUsers(selectedUsers));
  dispatch(receivePlacesToAvoid(placesToAvoid));
  dispatch(receivePlacesToGo(placesToGo));
};
