import React from 'react';
import { Layout } from "antd";
import Routing from "pages";
import withApollo from "./with-apollo";
import './index.scss';

const App = () => {
  return (
    <div className="app">
      <Layout>
        <Layout.Header>
          <span className="app-title text-white">
            Todo App
          </span>
        </Layout.Header>
        <Layout.Content className="app-content">
          <Routing />
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default withApollo(App);
