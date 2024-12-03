import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { removeIngredients } from '../../services/slices/ingredientSlice';
import {
  selectorUser,
  selectorIsUserAuth
} from '../../services/slices/userSlice';
import {
  getOrderBurger,
  orderCancel,
  orderModalData,
  orderRequest
} from '../../services/slices/orderBurgerSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectorUser);

  const { bun, currentIngredient } = useSelector(
    (state: RootState) => state.ingredients
  );

  const { orderRequest, orderModalData } = useSelector(
    (state: RootState) => state.orderBurger
  );

  const constructorItems = {
    bun: bun,
    ingredients: currentIngredient
  };

  console.log('asdasd');
  console.log(constructorItems);
  console.log(
    'Redux state:',
    useSelector((state) => state)
  );

  const onOrderClick = () => {
    if (!user.name) {
      return navigate('/login');
    }
    if (!constructorItems.bun!._id || orderRequest) return;
    const currentIngredientId = currentIngredient.map(
      (ingredient) => ingredient._id
    );
    dispatch(
      getOrderBurger([constructorItems.bun!._id, ...currentIngredientId])
    );
  };

  const closeOrderModal = () => {
    dispatch(removeIngredients());
    dispatch(orderCancel());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
