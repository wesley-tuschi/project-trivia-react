import React from 'react';
import { connect } from 'react-redux';

class Config extends React.Component {
  render() {
    return (
      <div>
        <h2 data-testid="settings-title">Configurações</h2>
      </div>
    );
  }
}

export default connect()(Config);
