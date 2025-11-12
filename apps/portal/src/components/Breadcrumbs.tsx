import { Link } from 'react-router-dom';
import { readableRouteName } from '../utils/storage';

interface BreadcrumbsProps {
  path: string;
}

const Breadcrumbs = ({ path }: BreadcrumbsProps) => {
  const segments = path.split('/').filter(Boolean);
  const crumbs = segments.map((_, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    return {
      href,
      label: readableRouteName[href] ?? segments[index]
    };
  });

  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumbs__link">
        {readableRouteName['/']}
      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.href} className="breadcrumbs__item">
          <span className="breadcrumbs__separator">/</span>
          <Link to={crumb.href} className="breadcrumbs__link">
            {crumb.label}
          </Link>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
