import React from "react";
import PropTypes from "prop-types";

const Progress = ({ percentage }) => {
  return (
    <div class="progress">
      <div
        className="progress-bar bg-warning"
        role="progressbar"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default Progress;
