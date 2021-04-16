import PropagateLoader from 'react-spinners/PropagateLoader';

import MainLayout from 'layouts/MainLayout/MainLayout';

import './Loader.scss';

const Loader = () => (
  <MainLayout sectionName="loader">
    <div className="loader__content">
      <PropagateLoader color="#000000" loading size={12} />
    </div>
  </MainLayout>
);

export default Loader;
