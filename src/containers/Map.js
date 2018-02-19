import { connect } from 'react-redux';
import Component from '../components/Map';
import * as actionCreators from '../actions';

const mapStateToProps = ({ locations }) => {
  const props = {
    locations,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;