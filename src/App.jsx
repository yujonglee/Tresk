import { Route, Switch } from 'react-router-dom';

import Intro from './Page/Intro';
import Main from './Page/Main';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Intro} />
      <Route path="/app" component={Main} />
    </Switch>
  );
}
