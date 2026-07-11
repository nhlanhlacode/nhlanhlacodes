import { OrderProvider } from "./context/OrderContext.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Menu from "./components/Menu.jsx";
import DrinkBuilder from "./components/DrinkBuilder.jsx";
import Booking from "./components/Booking.jsx";
import ThoughtBoard from "./components/ThoughtBoard.jsx";
import Footer from "./components/Footer.jsx";
import PickupCart from "./components/PickupCart.jsx";

export default function App() {
  return (
    <OrderProvider>
      <div className="min-h-screen bg-paper text-ink font-body">
        <Nav />
        <Hero />
        <Menu />
        <DrinkBuilder />
        <Booking />
        <ThoughtBoard />
        <Footer />
        <PickupCart />
      </div>
    </OrderProvider>
  );
}
