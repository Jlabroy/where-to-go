import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class AvoidElement extends PureComponent {
  static propTypes = {
    /** The name of the venue to avoid. */
    venueName: PropTypes.string.isRequired,

    /** Array of reasons to avoid the venue. */
    reasons: PropTypes.arrayOf(PropTypes.shape({
      user: PropTypes.string,
      reason: PropTypes.oneOf(["NO_FOOD", "NO_DRINKS"])
    }))
  };

  render() {
    const { venueName, reasons } = this.props;

    return (
      <li>
        {venueName}
        <ul>
          {reasons.map(({ user, reason }) => (
            <li key={`reason-${user}-${reason}`}>
              There is nothing for {user} to{" "}
              {reason === "NO_FOOD" && "eat"}
              {reason === "NO_DRINKS" && "drink"}
            </li>
          ))}
        </ul>
      </li>
    )
  }
}

export default AvoidElement;
