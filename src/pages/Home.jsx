import { useContext, useEffect, useRef, useState } from "react";
import qs from "qs";
import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setPageCount,
  setFilters,
} from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import { fetchPizza } from "../redux/slices/pizzaSlice";

const Home = () => {
  const { categoryId, sort, pageCount, searchValue } = useSelector((state) => state.filter);
  const { items, isLoading } = useSelector((state) => state.pizza);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMount = useRef(false);

  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  const fetchPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(fetchPizza({ sortBy, category, order, search, pageCount }));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, pageCount]);

  useEffect(() => {
    if (isMount.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        pageCount,
      });
      navigate(`?${queryString}`);
    }
  }, [categoryId, sort.sortProperty, pageCount]);

  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => dispatch(setCategoryId(i))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {isLoading === "error" ? (
        <div style={{ textAlign: "center", marginTop: 80, marginBottom: 80 }}>
          <h2 style={{ marginBottom: 10 }}>Произошла ошибка😕</h2>
          <p>К сожалению, не удалось получить пиццы.</p>
        </div>
      ) : (
        <div className="content__items">
          {isLoading === "loading" ? skeleton : pizzas}
        </div>
      )}

      <Pagination onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

// fetch(
//   `https://64d72bc82a017531bc13046a.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
// )
//   .then((res) => res.json())
//   .then((data) => {
//     setItems(data);
//     setIsLoading(false);
//   });

// const pizzas = items
//   .filter((obj) => {
//     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
//       return true;
//     }
//     return false;
//   })
//   .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
