import React from "react";

const Skeleton: React.FC = () => {
  return (
    <div className="skeleton-container">
      <article className="card-skeleton">
        <div className="skeleton-title pulse"></div>
        <div className="skeleton-line pulse"></div>
        <div className="skeleton-line pulse"></div>
        <div className="skeleton-box pulse"></div>
      </article>

      <aside className="status-skeleton pulse"></aside>
    </div>
  );
};

export default Skeleton;