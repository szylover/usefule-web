import { Link } from 'react-router-dom';

const navigationCards = [
  {
    title: '环球旅行清单',
    description: '按国家和城市规划你的旅程，打卡每一个目的地。',
    to: '/travel',
    accent: 'travel'
  },
  {
    title: '摄影后期练习',
    description: '整理修图练习素材与项目，随时进入调色状态。',
    to: '/photo',
    accent: 'photo'
  }
];

const PortalPage = () => {
  return (
    <div className="layout">
      <header className="header">
        <h1>Useful Portal</h1>
        <p className="subtitle">在这里切换不同的练习空间，保持创作灵感常驻。</p>
      </header>
      <section className="card-grid">
        {navigationCards.map((card) => (
          <Link key={card.to} to={card.to} className={`card card-${card.accent}`}>
            <div className="card-body">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <span className="card-cta">进入</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default PortalPage;
