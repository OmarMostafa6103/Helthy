import PropTypes from "prop-types";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-xl">
        {text1} <span className="text-xl font-medium">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[2px] bg-black dark:bg-white"></p>
    </div>
  );
};

export default Title;

Title.propTypes = {
  text1: PropTypes.string,
  text2: PropTypes.string,
};
