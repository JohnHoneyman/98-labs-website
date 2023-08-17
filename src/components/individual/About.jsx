const aboutContent = [
  {
    caption: "Extraordinary work from the ordinary people",
    body: "We believe that in order to build excellent products and services, we need to invest in the people who makes them. We believe in the vastness of human potential no matter who he or she may be. \n\nIn other words, we believe in putting people first.",
  },
  {
    caption: "Excellence and continuous improvement",
    body: "98Labs believes in fostering a culture of excellence and continuous improvement. We believe in empowering ordinary people to find and solve problems and to make improvements. We don't want to be comfortable wit hteh norm. We encourage to build, seek, and destroy in our search for excellence.",
  },
  {
    caption: "Hands-on management through training, coaching and mentoring",
    body: '"To know oneself is to study oneself in action with another person." - Bruce Lee \n\nNew hires get individualized training while being supervised by manager who are also engineers and teachers. 98Labs believes in teh importance of both theory and practice.',
  },
];

const About = () => {
  return (
    <div className="flex items-center justify-center bg-gray-950 text-white mt-40">
      <ul className="w-11/12 relative">
        {aboutContent.map((item, index) => (
          <li
            key={index}
            className={`h-screen w-11/12 mx-auto flex flex-col justify-center gap-3 transition-all ease duration-[2000ms] ${
              // index !== itemNo && "invisible opacity-0"
              ""
            }`}
          >
            <div className="font-semibold text-7xl w-11/12 leading-none uppercase">
              {item.caption}
            </div>
            <div className="w-10/12 text-sm">{item.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;
