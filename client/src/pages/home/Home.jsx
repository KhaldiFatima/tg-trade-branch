import { NavLink } from 'react-router-dom';
import MethodPayment from '../../components/methodPayment/MethodPayment';

import './Home.scss';
import '../../dashboard/dashboardList/DashboardList.scss';
import Table from '../../components/table/Table';
import InfoPage from '../../components/infoPage/InfoPage';
const Home = () => {
  return (
    <>
      <InfoPage />

      <Table title={'Transaction'} />
    </>
  );
};

export default Home;
