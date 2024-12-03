import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';

import { Preloader } from '@ui';
import { getUpdateUser, selectorUser } from '../../services/slices/userSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectorUser);
  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  console.log(selectorUser);
  /** TODO: взять переменную из стора */
  // const user = {
  //   name: '',
  //   email: ''
  // };

  if (!user) {
    return <Preloader />;
  }

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user.name || '',
      email: user.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(getUpdateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValue((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    },
    []
  );

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
