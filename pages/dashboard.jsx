import withAuth from '../lib/withAuth';

const Dashboard = () => {
  return <h1>Bienvenido al Dashboard</h1>;
};

export default withAuth(Dashboard);
