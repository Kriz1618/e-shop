const API_URL = process.env.REACT_APP_API_URL;

export const fetcher = async (url) => {
  const responseObj = { errorMessage: '', data: [] };
  try {
    const response = await fetch(`${API_URL}/${url}`);

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    const data = await response.json();

    responseObj.data = data;
  } catch (err) {
    responseObj.errorMessage = err.message;
  } finally {
    return responseObj;
  }
};

export const getCategories = () => {
  return fetcher('categories');
};

export const getProducts = (catId) => {
  return fetcher(`products?catId=${catId}`);
};

export const getProductById = id => {
  return fetcher(`products/${id}`);
};

export const getProductsByQuery = query => {
  return fetcher('/products?q=' + query);
};
