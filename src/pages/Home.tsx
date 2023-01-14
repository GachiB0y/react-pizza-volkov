import React from 'react';

// import Categories from '../scss/componentsReact/CategoriesReact';
// import SortPizza, { typePopup } from '../scss/componentsReact/Sort';
// import PizzaBlock from '../scss/componentsReact/PizzaBlock';
// import Skeleton from '../scss/componentsReact/Skeleton';
// import Pagination from '../scss/componentsReact/Pagination/Index';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  IFilterSliceState,
  selectFilter,
  setCategoryID,
  setCurrentPage,
  setFilters,
} from '../redux/Slice/filterSlice';
import {
  Categories,
  SortPizza,
  PizzaBlock,
  Skeleton,
  Pagination,
} from '../scss/componentsReact/index';
import { fetchPizza, selectPizzaData, TFetchPizzasArgs } from '../redux/Slice/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, currentPage, searchValue } = useSelector(selectFilter);
  //@ts-ignore
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const { items, status } = useSelector(selectPizzaData);
  const onChangeCategory = React.useCallback((id: number) => dispatch(setCategoryID(id)), []);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizza = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizza({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
    window.scrollTo(0, 0);
  };

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     // const params = {
  //     //   categoryId: categoryId > 0 ? categoryId : null,
  //     //   sortProperty: sortType.sortProperty,
  //     //   currentPage,
  //     // };
  //     const queryString = qs.stringify({
  //       sortProperty: sortType.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   if (!window.location.search) {
  //     dispatch(fetchPizza({} as TFetchPizzasArgs));
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType, currentPage]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as TFetchPizzasArgs;
  //     const sort = typePopup.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         categoryId: Number(params.category),
  //         searchValue: params.search,
  //         currentPage: Number(params.currentPage),
  //         sort: sort || typePopup[0],
  //       }),
  //     );
  //     isSearch.current = true;
  //   }
  //   isMounted.current = true;
  // }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getPizza();

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCat={onChangeCategory} />
        <SortPizza />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось загрузить товар.Повторите попытку.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChagePage={onChangePage} />
    </div>
  );
};

export default Home;
