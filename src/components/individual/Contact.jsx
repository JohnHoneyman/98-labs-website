import { SectionWrapper } from "../hoc";

const Contact = () => {
  return <div className="flex items-center justify-center h-screen">Contact</div>;
};

const ContactPage = SectionWrapper(Contact, "contact");

export default ContactPage;
