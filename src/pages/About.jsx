// React default import removed (automatic JSX runtime)
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="">
      <Title text1={t("about.title_part1")} text2={t("about.title_part2")} />

      <div className="flex  flex-col lg:flex-row md:flex-row justify-center gap-10 text-start items-start mt-16">
        <img
          src={assets.about_img}
          alt=""
          className="border border-gray-800 w-96 rounded-md"
        />
        <div className="flex flex-col gap-14 justify-center items-start">
          <p className="max-w-[600px]  md:text-md lg:text-md  mt-8">
            {t("about.description")}
          </p>
          <Link to="/contact">
            <button className="bg-red-500 text-white px-4 py-2">
              {t("about.contact_button")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
