import PropTypes from "prop-types";

const Cookie = ({ style }) => (
  <div style={style} className="mx-1 text-3xl select-none" aria-hidden="true">
    🍪
  </div>
);

const CookieLoader = ({ className = "" }) => {
  const common = {
    animation: "pulse 1s ease-in-out infinite",
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <style>{`@keyframes pulse{0%{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:.8}100%{transform:scale(1);opacity:1}}`}</style>
      <Cookie style={{ ...common, animationDelay: "0s" }} />
      <Cookie style={{ ...common, animationDelay: "150ms" }} />
      <Cookie style={{ ...common, animationDelay: "300ms" }} />
    </div>
  );
};

Cookie.propTypes = {
  style: PropTypes.object,
};

CookieLoader.propTypes = {
  className: PropTypes.string,
};

export default CookieLoader;
