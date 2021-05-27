import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    // get data from local storage
    const storedCart = localStorage.getItem('@RocketShoes:cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // create cart ref
  const prevCartRef = useRef<Product[]>();

  // load the current ref
  useEffect(() => {
    prevCartRef.current = cart;
  }, []);

  // get the previous value of the cart
  const cartPreviousValue = prevCartRef.current ?? cart;

  // if the cart has changed, save to local storage
  useEffect(() => {
    if (cartPreviousValue !== cart) {
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart));
    }
  }, [cart, cartPreviousValue]);

  const addProduct = async (productId: number) => {
    try {
      // load stock item
      const { data } = await api.get(`stock/${productId}`);
      // get the amount of this item in stock
      const stockItemAmount = data.amount;
      // find the item the user is trying to add in the cart
      const cartItem = cart.find(product => product.id === productId);
      // get the amount of this item in the cart
      const cartItemAmount = cartItem ? cartItem.amount : 0;
      // if there is none of this product in the cart
      if (!cartItemAmount) {
        // load the products list
        const { data } = await api.get(`products/${productId}`);
        // use the amount as 1 for the first insert
        const updatedCart = [ ...cart, { ...data, amount: 1 } ];
        // insert the new product in the cart
        setCart(updatedCart);
      } else {
        // if there is no stock available
        if (cartItemAmount+1 > stockItemAmount) {
          // if it's out of stock
          toast.error('Quantidade solicitada fora de estoque');
          return ;
        } else {
          // create a new cart with updated amounts
          const updatedCart = {
            productId: productId,
            amount: cartItemAmount+1,
          }
          // update the product amount in the cart
          updateProductAmount(updatedCart);
        }
      }
    } catch {
      // if there is an error adding a product
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // find the product to be removed
      const productInCart = cart.find(product => product.id === productId);
      // if it exists
      if (productInCart) {
        // filter the cart to remove the product
        const filteredCart = cart.filter(product => product.id !== productId);
        // set the filtered cart
        setCart(filteredCart);
      } else {
        // if there is none of this product to remove
        throw Error();
      }
    } catch {
      // if there is an error removing a product
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // if the amount is <= 0, leave the function
      if (amount <= 0)
        return ;
      // if there is a cart
      if (cart) {
        // load stock item
        const { data } = await api.get(`stock/${productId}`);
        // get the amount of this item in stock
        const stockItemAmount = data.amount;
        // if the amount
        if (amount > stockItemAmount) {
          // if it's out of stock
          toast.error('Quantidade solicitada fora de estoque');
          return ;
        } else {
          // map the cart to adjust the new amount
          const mappedCart = cart.map((item) => {
            return item.id === productId ? { ...item, amount: amount } : item;
          });
          // set the new cart with updated amounts
          setCart(mappedCart);
        }
      }
    } catch {
      // if there is an error updating the product amount
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);
  return context;
}
