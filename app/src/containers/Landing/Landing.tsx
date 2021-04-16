import { useHistory } from 'react-router-dom';

import LandingContent from 'components/LandingContent/LandingContent';

import './Landing.scss';

const Landing = () => {
  const history = useHistory();

  const handleSignUp = () => {
    history.push('/signup');
  };

  return (
    <div className="landing__wrapper">
      <LandingContent handleSignUp={handleSignUp} />
    </div>
  );
};

export default Landing;
