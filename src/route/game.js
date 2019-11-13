import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PageLoadingComp } from '../components/PageLoading';

const GameQuitSmoke = lazy(() => import('../pages/GameQuitSmoke'));
const GameCirclePath = lazy(() => import('../pages/GameCirclePath'));

function Router() {
  return (
    <Suspense fallback={<PageLoadingComp />}>
      <Switch>
        <Route path="/game/quitsmoke" exact component={GameQuitSmoke} />
        <Route path="/game/circlepath" exact component={GameCirclePath} />
      </Switch>
    </Suspense>
  );
}

export default Router;
