// React default import not required with automatic JSX runtime
// assets import removed because it's unused
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 my-10 mt-24 text-sm">
        <div className="flex flex-col gap-5">
          <a href="#homepage" className="text-xl font-bold ">
            Luna<span className="text-sm">Helthy</span>{" "}
          </a>
          <p className=" md:w-2/3 w-full">
            {t("footer.about_short", "Handmade chocolates crafted with care.")}
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">{t("footer.company")}</p>
          <ul className="flex flex-col gap-1 cursor-pointer">
            <li>
              <Link to="/">{t("navbar.home")}</Link>
            </li>
            <li>
              <Link to="/about">{t("navbar.about")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("about.contact_button")}</Link>
            </li>
            <li>
              <Link to="/">{t("footer.policy", "Policy")}</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">
            {t("footer.get_in_touch", "Get In Touch")}
          </p>
          <ul className="flex flex-col gap-1 ">
            <li>{t("footer.phone_label", "Phone Number")} : 123456789</li>
            <li>
              {t("footer.whatsapp_label", "Whatsapp Number")} : 1234567890
            </li>
            <li>{t("footer.email_label", "Email")} : project@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="text-center py-5  text-sm font-semibold">
          Copyright 2024@forever.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
