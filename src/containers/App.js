import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchUsersIfRequired } from "../actions/users";
import { fetchVenuesIfRequired } from "../actions/venues";
import { fetchRecommendations } from "../actions/recommendations";
import App from "../components/App";

class Container extends PureComponent {
  static propTypes = {
    /** Function to fetch the users */
    onFetchUsers: PropTypes.func.isRequired,

    /** Function to fetch the venues. */
    onFetchVenues: PropTypes.func.isRequired
  };

  async componentDidMount() {
    const { onFetchUsers, onFetchVenues } = this.props;
    await onFetchUsers();
    await onFetchVenues();
  }

  render() {
    return <App {...this.props} />;
  }
}

const mapStateToProps = ({
  venues: {
    isLoading: isVenuesLoading,
    data: venues
  },
  users: {
    isLoading: isUsersLoading,
    data: users
  },
  recommendations: {
    placesToAvoid,
    placesToGo,
    users: selectedUsers
  }
}) => ({
  isVenuesLoading,
  isUsersLoading,
  venues,
  users,
  placesToAvoid,
  placesToGo,
  selectedUsers
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onFetchUsers: fetchUsersIfRequired,
      onFetchVenues: fetchVenuesIfRequired,
      onFetchRecommendations: fetchRecommendations
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Container);
