import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import '../calendar.scss';

const Layout = () => {
  return (
    <div className="container">
      <Header />
      <div className="page-layout">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};

const App = () => {
  return <Layout />;
};

export default App;
