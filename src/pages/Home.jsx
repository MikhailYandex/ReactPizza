import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import qs from "qs";
import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setPageCount,
  setFilters,
} from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { categoryId, sort, pageCount } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
	const isSearch = useRef(false);
	const isMount = useRef(false);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(SearchContext);

  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
			const sort = list.find(obj => obj.sortProperty === params.sortProperty)
			dispatch(setFilters({...params, sort}))
			isSearch.current = true;
    }
  }, []);

	const fetchPizzas = () => {
		setIsLoading(true);
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://64d72bc82a017531bc13046a.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
	}

  useEffect(() => {
    window.scrollTo(0, 0);

		if (!isSearch.current) {
			fetchPizzas()
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
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
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
