import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// @ts-ignore
import Breadcrumbs from "react-router-dynamic-breadcrumbs";
import { Breadcrumb, Spin } from "antd";

const TasksListPage = lazy(() => import("./tasks-list"));
const TaskDetailsPage = lazy(() => import("./task-details"));

export const routes = {
    "/": "Tasks",
    "/:id": "Task# :id",
};

const Routing = () => (
    <BrowserRouter>
        <Breadcrumbs
            mappedRoutes={routes}
            WrapperComponent={({ children }: any) => <Breadcrumb>{children}</Breadcrumb>}
            LinkComponent={({ children }: any) => <Breadcrumb.Item>{children}</Breadcrumb.Item>}
            ActiveLinkComponent={({ children }: any) => <Breadcrumb.Item>{children}</Breadcrumb.Item>}
        />
        <Suspense fallback={<Spin />}>
            <Switch>
                <Route exact path="/" component={TasksListPage} />
                <Route exact path="/:id" component={TaskDetailsPage} />
                <Redirect to="/" />
            </Switch>
        </Suspense>
    </BrowserRouter>
)

export default Routing
