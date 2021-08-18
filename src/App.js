import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-notifications/lib/notifications.css';
import './App.css';
import { NotificationContainer } from 'react-notifications';
import PageRoutes from './Routes';

function App() {
  return (
    <div className="container-color">
      <PageRoutes />
      <NotificationContainer />
    </div>
  );
}

export default App;
