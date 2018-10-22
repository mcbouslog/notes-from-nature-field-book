import PropTypes from 'prop-types';
import React from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Title from '../components/Title';
import { config } from '../config';

class UserStatsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      preferences: null,
    };
  }

  componentDidMount() {
    this.fetchPreferences();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.fetchPreferences();
    }
  }

  fetchPreferences() {
    const { user } = this.props;

    if (user && user.get) {
      user.get('project_preferences', { project_id: config.projectId })
        .then(([preferences]) => this.setState({ preferences }));
    }
  }

  render() {
    return (
      <Box colorIndex="light-1" margin={{ bottom: 'medium' }} pad="medium">
        <Title>Your Notes from Nature Stats</Title>
        <Heading align="center">{this.state.preferences? this.state.preferences.activity_count : '0'}</Heading>
        <Label align="center">Total Classifications</Label>
      </Box>
    );
  }
}

UserStatsContainer.propTypes = {
  user: PropTypes.shape({
    get: PropTypes.func,
  }),
};

UserStatsContainer.defaultProps = {
  user: null,
};

export default UserStatsContainer;