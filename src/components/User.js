import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class User extends PureComponent {
  static propTypes = {
    /**
     * Function fired when the user row is clicked.
     * @param {Object}  user  The user object
     */
    onClick: PropTypes.func.isRequired,

    /** The user object. */
    user: PropTypes.shape({
      name: PropTypes.string
    }),

    /** Whether the user is selected or not. */
    isSelected: PropTypes.bool.isRequired
  };

  handleClick = () => {
    const { onClick, user } = this.props;
    onClick(user);
  };

  render() {
    const { user: { name }, isSelected } = this.props;

    return (
      <div
        className="user"
        onClick={this.handleClick}
      >
        <input type="checkbox" checked={isSelected} />
        {name}
      </div>
    );
  }
}

export default User;
