import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Intro from './Page/Intro';
import Main from './Page/Main';

export default function App() {
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
