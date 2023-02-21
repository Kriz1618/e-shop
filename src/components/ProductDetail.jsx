import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getProductById } from "../fetcher";
import { CartContext } from "../contexts/cartContext";

export const ProductDetail = () => {
  const { addProduct } = useContext(CartContext);
  const [product, setProduct] = useState({
    errorMessage: "",
    data: {},
  });
  const { productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProductById(productId);
      setProduct(responseObject);
    }

    fetchData();
  }, [productId]);

  const createMarkup = () => {
    return { __html: product.description };
  };

  return (
    <ProductInfoArticle>
      <ProductTitle>{product.title}</ProductTitle>

      <figure>
        <ProductImageContainer>
          <ProductImage
            src={`/assets/${product.image}`}
            alt={product.title}
          />
        </ProductImageContainer>
      </figure>

      <aside>
        <ProductInfo>
          <ProductInfoHeader>Dimensions</ProductInfoHeader>
          <label>{product.specs?.dimensions}</label>
        </ProductInfo>

        {product.specs?.capacity && (
          <ProductInfo>
            <ProductInfoHeader>Capacity</ProductInfoHeader>
            <label>{product.specs?.capacity}</label>
          </ProductInfo>
        )}

        <ProductInfo>
          <ProductInfoHeader>Features</ProductInfoHeader>
          <ul>
            {product.features?.map((f, i) => {
              return (
                <ProductInfoListItem key={`feature${i}`}>
                  {f}
                </ProductInfoListItem>
              );
            })}
          </ul>
        </ProductInfo>
      </aside>

      <aside>
        <ProductInfoFinancePrice>
          &pound;{product.price}
        </ProductInfoFinancePrice>

        <ProductInfoStock>
          <ProductInfoStockLabel>
            Stock Level: {product.stock}
          </ProductInfoStockLabel>
          <ProductInfoStockLabel>FREE Delivery</ProductInfoStockLabel>
        </ProductInfoStock>

        <ProductInfoAction>
          <ProductInfoActionButton
            onClick={() =>
              addProduct({
                id: product.id,
                title: product.title,
                price: product.price,
              })
            }
          >
            Add to Basket
          </ProductInfoActionButton>
        </ProductInfoAction>
      </aside>

      <ProductInfoDescription
        dangerouslySetInnerHTML={createMarkup()}
      ></ProductInfoDescription>
    </ProductInfoArticle>
  )
};


const ProductInfoArticle = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.25fr 1fr 0.25fr;
  column-gap: 20px;
`;

const ProductInfoDescription = styled.div`
  grid-column: 1 / span 3;
`;

const ProductTitle = styled.div`
  grid-column: 1 / span 3;
  color: darkslategray;
  font-weight: bold;
  font-size: 1.5em;
  padding-left: 10px;
`;

const ProductImageContainer = styled.div`
  padding: 10px;
  width: 60%;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductInfoHeader = styled.h3`
  color: darkslategray;
  font-size: 1em;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 5px;
`;

const ProductInfoListItem = styled.li`
  padding-top: 5px;
`;

const ProductInfoStock = styled.div`
  padding-left: 10px;
  margin-top: 20px;
  padding-top: 10px;
  background-color: lightgrey;
  height: 20%;
  width: 30%;
  border-radius: 5px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
`;

const ProductInfoStockLabel = styled.label`
  padding-bottom: 5px;
`;

const ProductInfoAction = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductInfoActionButton = styled.button`
  width: 160px;
  height: 30px;
  border-radius: 10px;
  margin-top: 20px;
  background-color: lightgray;
  border: solid 1px slategrey;
  font-weight: bold;
`;

const ProductInfoFinancePrice = styled.div`
  color: darkslategray;
  font-size: 2em;
  font-weight: bold;
  padding-top: 10px;
`;
