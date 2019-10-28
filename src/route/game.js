import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PageLoadingComp } from '../components/PageLoading';

const GameQuitSmoke = lazy(() => import('../pages/GameQuitSmoke'));

function Router() {
  return (
    <Suspense fallback={<PageLoadingComp />}>
      <Switch>
        <Route path="/game/quitsmoke" exact component={GameQuitSmoke} />
      </Switch>
    </Suspense>
  );
}

export default Router;
