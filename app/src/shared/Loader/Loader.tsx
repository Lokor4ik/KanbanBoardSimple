import MoonLoader from 'react-spinners/MoonLoader';

import MainLayout from 'layouts/MainLayout/MainLayout';

import './Loader.scss';

const Loader = () => (
  <MainLayout sectionName="loader">
    <div className="loader__content">
      <MoonLoader color="#9c27b0" loading size={100} />
    </div>
  </MainLayout>
);

export default Loader;
