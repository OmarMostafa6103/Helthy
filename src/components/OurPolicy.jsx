// React default import not required with automatic JSX runtime
import { assets } from "../assets/assets";
import { useTranslation } from "react-i18next";

const OurPolicy = () => {
  const { t } = useTranslation();

  return (
    <div
      id="policy"
      className="flex flex-col sm:flex-row justify-around gap-12 text-center py-20 text-xs sm:text-sm md:text-base "
    >
      <div className="flex flex-col items-center">
        <img
          src={assets.chocolates}
          alt=""
          className="w-[150px] h-[150px] mb-4"
        />
        {/* <p className="font-semibold">Best Customer Support</p> */}
        <p className="text-center max-w-[500px] text-[1.25rem] font-light">
          {t("home.policy.handmade")}
        </p>
      </div>

      <div className="flex flex-col items-center">
        <img src={assets.fresh} alt="" className="w-[150px] h-[150px] mb-4" />
        {/* <p className="font-semibold">7 Days Return Policy</p> */}
        <p className="text-center max-w-[500px] text-[1.25rem] font-light">
          {t("home.policy.fresh")}
        </p>
      </div>

      <div className="flex flex-col items-center">
        <img
          src={assets.delicious}
          alt=""
          className="w-[150px] h-[150px] mb-4"
        />
        {/* <p className="font-semibold">Best Customer Support</p> */}
        <p className="text-center max-w-[500px] text-[1.25rem] font-light">
          {t("home.policy.delicious")}
        </p>
      </div>

      <div className="flex flex-col items-center">
        <img src={assets.message} alt="" className="w-[150px] h-[150px] mb-4" />
        {/* <p className="font-semibold">Best Customer Support</p> */}
        <p className="text-center max-w-[500px] text-[1.25rem] font-light">
          {t("home.policy.gift_message")}
        </p>
      </div>

      <div className="flex flex-col items-center">
        <img src={assets.backage} alt="" className="w-[150px] h-[150px] mb-4" />
        {/* <p className="font-semibold">Best Customer Support</p> */}
        <p className="text-center max-w-[500px] text-[1.25rem] font-light">
          {t("home.policy.packaging")}
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
