import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const SkeletonCard = () => (
  <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3">
    <div className="bg-gray-200 dark:bg-gray-700 h-36 rounded-md mb-3" />
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4" />
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
  </div>
);

const EmptyState = ({ message, isLoading = false }) => {
  const { t } = useTranslation();
  const messageToShow = message || t("empty_message");

  if (isLoading) {
    // show skeleton grid while loading so user understands data is coming
    return (
      <div className="py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-36 h-36 mb-6 flex items-center justify-center">
        <svg
          className="w-24 h-24 text-gray-300"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="30" fill="#F3F4F6" />
          <g>
            <path
              d="M20 36c0 6 6 10 12 10s12-4 12-10"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="24" cy="28" r="3" fill="#9CA3AF" />
            <circle cx="40" cy="28" r="3" fill="#9CA3AF" />
          </g>
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        {messageToShow}
      </h3>
      <p className="text-sm text-gray-500">{t("try_search_other")}</p>
    </div>
  );
};

EmptyState.propTypes = {
  message: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default EmptyState;
