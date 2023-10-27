import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/user/userActions";

function AdView({  }: any) {
  return (
    <Fragment>

     <img className="w-full h-[300px] object-cover border" src="https://images.unsplash.com/photo-1697981626472-459685bbfd5e?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMDV8fHxlbnwwfHx8fHw%3D"/>
    </Fragment>
  );
}

const mapStateToProps = (state: any) => {
  return {
    // recommendedUsers: state.user.recommendedUsers || [],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // GET_RECOMMENDED_USERS: () => dispatch(userActions.GET_RECOMMENDED()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdView);
