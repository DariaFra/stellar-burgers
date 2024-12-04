import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { removeIngredients } from '../../services/slices/ingredientSlice';
import { selectorUser } from '../../services/slices/userSlice';
import { getOrderBurger } from '../../services/actions/constructorAction';
import { orderCancel } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
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

  const onOrderClick = () => {
    if (!user.name) {
      return navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) return;

    const currentIngredientId = currentIngredient.map((item) => item._id);

    dispatch(
      getOrderBurger([constructorItems.bun._id, ...currentIngredientId])
    );
  };

  const closeOrderModal = () => {
    dispatch(removeIngredients());
    dispatch(orderCancel());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price : 0) +
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
