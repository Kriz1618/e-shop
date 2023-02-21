import { Outlet, Link } from "react-router-dom";

import { HomeIcon, CartIcon } from "./Icons";
import Search from "./Search";

export const Layout = ({ categories }) => {
  const renderCategories = () => {
    return categories.data.map((c) => (
      <li key={c.id}>
        <Link to={`/categories/${c.id}`}>{c.title}</Link>
      </li>
    ));
  };

  return (
    <>
      <header>
        <div id="headerHomeIcon">
          <Link to="/"><HomeIcon width={40} /></Link>
        </div>
        <Search />

        <div id="headerTitle">e-Shop</div>
        <div id="headerCartIcon">
          <Link to="/basket"><CartIcon width={40} /></Link>
        </div>
      </header>
      <section>
        <nav>
          {categories.errorMessage && (
            <div>Error: {categories.errorMessage}</div>
          )}

          <ul>{categories.data && renderCategories()}</ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </section>

      <footer>
        <Link to="/">Home</Link> | <Link to="/basket">Basket</Link>
      </footer>
    </>
  );
};
