import React, { Component, PropTypes } from 'react';

if (process.env.BROWSER) {
  require('../stylesheets/defaults/content.scss');
}

class App extends Component {
  render () {
    return (
      <main>
        <div className='content'>
          { this.props.children }
        </div>
      </main>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
