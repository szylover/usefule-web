import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type SubPageLayoutProps = {
  title: string;
  description: string;
  accent?: 'travel' | 'photo' | 'default';
  children: ReactNode;
};

const SubPageLayout = ({ title, description, accent = 'default', children }: SubPageLayoutProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    const historyState = window.history.state as { idx?: number } | null;

    if (historyState?.idx && historyState.idx > 0) {
      navigate(-1);
      return;
    }

    navigate('/');
  };

  return (
    <div className="subpage-shell">
      <button type="button" className="back-button" onClick={handleBack}>
        <span className="back-icon" aria-hidden="true">
          ←
        </span>
        返回概览
      </button>

      <section className={`subpage-hero subpage-hero-${accent}`}>
        <p className="subpage-breadcrumb">Portal / {title}</p>
        <h1>{title}</h1>
        <p className="subpage-description">{description}</p>
      </section>

      <div className="subpage-content">{children}</div>
    </div>
  );
};

export default SubPageLayout;
