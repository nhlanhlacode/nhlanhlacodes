import { createContext, useContext, useState, useCallback } from "react";

const OrderContext = createContext(null);

let idCounter = 1;

export function OrderProvider({ children }) {
  const [order, setOrder] = useState([]); // locked-in drinks
  const [pickupTime, setPickupTime] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const lockIn = useCallback((drink) => {
    setOrder((prev) => [...prev, { ...drink, id: idCounter++ }]);
    setCartOpen(true);
  }, []);

  const removeDrink = useCallback((id) => {
    setOrder((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const clearOrder = useCallback(() => {
    setOrder([]);
    setPickupTime(null);
  }, []);

  return (
    <OrderContext.Provider
      value={{
        order,
        lockIn,
        removeDrink,
        clearOrder,
        pickupTime,
        setPickupTime,
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
