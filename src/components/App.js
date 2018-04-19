import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import User from "./User";
import AvoidElement from "./AvoidElement";

class App extends PureComponent {
  static propTypes = {
    /**
     * Function which will toggle the user.
     * @param {Object}  user  The user object.
     */
    onFetchRecommendations: PropTypes.func.isRequired,

    /** An array of users. */
    users: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    })).isRequired,

    /** An object of places to avoid. */
    placesToAvoid: PropTypes.object.isRequired,

    /** An array of places to go. */
    placesToGo: PropTypes.arrayOf(PropTypes.string)
  };

  handleClick = user => {
    const { onFetchRecommendations } = this.props;
    onFetchRecommendations(user);
  };

  render() {
    const {
      users,
      selectedUsers,
      placesToAvoid,
      placesToGo
    } = this.props;

    return (
      <div>
        <div className="users">
          {users.map(user => (
            <User
              key={user.name}
              user={user}
              isSelected={selectedUsers.includes(user)}
              onClick={this.handleClick}
            />
          ))}
        </div>
        Places to go
        <ul className="places-to-go">
          {placesToGo.map(name => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        Places to avoid
        <ul className="places-to-avoid">
          {Object.keys(placesToAvoid).map(venueName => (
            <AvoidElement
              key={venueName}
              venueName={venueName}
              reasons={placesToAvoid[venueName]}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
