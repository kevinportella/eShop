import React, { memo, useState } from "react"
import dynamic from 'next/dynamic'

import { AddProductToWishlistProps } from './AddProductToWishlist'

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist)
}, { 
  loading: () => <span>Carregando...</span>
})

type ProductItemProps = {
  product: {
    id: number,
    price: number,
    priceFormatted: string,
    title: string,
  }
  onAddToWishList: (id: number) => void;
}

export function ProductItemComponent({ product, onAddToWishList } : ProductItemProps) {
  const [ isAddingToWishList, setIsAddingToWishList ] = useState(false);

  return(
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>
      
      { isAddingToWishList && (
      <AddProductToWishlist 
        onAddToWishlist={() => onAddToWishList(product.id)}
        onRequestClose={() => setIsAddingToWishList(false)}
      />) }
    </div>
  );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product)
});

