import React from 'react';
import refreshTokenRequest from 'server/AuthRequest/refreshTokenRequest';

interface Props {
  children: React.ReactElement;
}

const Refresh: React.FC<Props> = ({ children }): JSX.Element => {
  React.useEffect(() => {
    refreshTokenRequest().then((res) => {
      const shareme = JSON.parse(localStorage.getItem('shareme') || '');
      localStorage.setItem('shareme', JSON.stringify({ ...shareme, access: res.access }));
    });
  }, []);

  return <>{children}</>;
};

export default Refresh;
