import { SectionWrapper } from "../hoc";

const Offers = () => {
  return <div className="flex items-center justify-center h-screen">Offers</div>;
};

const OffersPage = SectionWrapper(Offers, "offer");

export default OffersPage;
