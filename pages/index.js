import { useEffect } from "react";
import * as reactReduxModule from "react-redux";
import { bindActionCreators } from "redux";
import Page from "../components/Page";
import { addCount } from "../store/count/action";
import { wrapper } from "../store/store";
import { serverRenderClock, startClock } from "../store/tick/action";
const { connect } = reactReduxModule;
const Index = (props) => {
  useEffect(() => {
    const timer = props.startClock();

    return () => {
      clearInterval(timer);
    };
  }, [props]);

  return <Page title="Index Page" linkTo="/other" />;
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(serverRenderClock(true));
  store.dispatch(addCount());
});

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Index);
