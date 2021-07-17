import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useDispatch } from 'react-redux';

import {
  selectInside, selectNext, selectOutside, selectPrevious,
} from './redux_module/todoSlice';
import useGlobalDOMEvents from './hook';

import Intro from './Page/Intro';
import Main from './Page/Main';

export default function App() {
  const dispatch = useDispatch();

  useGlobalDOMEvents({
    keydown(e) {
      const notFound = () => null;

      const bindings = {
        ArrowUp: () => dispatch(selectPrevious()),
        ArrowDown: () => dispatch(selectNext()),
        ArrowLeft: () => dispatch(selectOutside()),
        ArrowRight: () => dispatch(selectInside()),
      };

      (bindings[e.key] ?? notFound)();
    },
  });
  return (
    <>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={Intro} />
        <Route path="/app" component={Main} />
      </Switch>
    </>
  );
}
