import { Link } from "react-router-dom";

const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "offer",
    title: "Offer",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const Nav = () => {
  return (
    <nav className="sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-20 bg-black">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <Link to="/" className="flex items-center">
            <img src="./logo.png" alt="98Labs" className="w-28" />
          </Link>
        </div>
        <ul className="flex gap-10 items-center text-white text-lg font-semibold tracking-widest">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className="text-secondary hover:text-white cursor-pointer"
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
