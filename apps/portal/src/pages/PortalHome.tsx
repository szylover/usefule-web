import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LAST_VISITED_KEY, readableRouteName } from '../utils/storage';

type Agent = {
  id: string;
  title: string;
  description: string;
  path: string;
  cta: string;
  keywords: string[];
};

const agents: Agent[] = [
  {
    id: 'travel',
    title: '全球旅游清单',
    description: '以国家/城市层级管理旅行心愿单，记录已到访的景点并跟踪完成率。',
    path: '/travel',
    cta: '进入清单',
    keywords: ['旅行', '旅游', '清单', '国家', '城市']
  },
  {
    id: 'photo',
    title: '修图练习中心',
    description: '收集RAW素材与开源项目，便于进行色彩与后期练习。',
    path: '/photo',
    cta: '开始练习',
    keywords: ['修图', '照片', '后期', 'RAW', '练习']
  }
];

const PortalHome = () => {
  const [term, setTerm] = useState('');
  const [lastVisited] = useState(() => localStorage.getItem(LAST_VISITED_KEY));

  const filteredAgents = useMemo(() => {
    const keyword = term.trim().toLowerCase();
    if (!keyword) {
      return agents;
    }

    return agents.filter((agent) => {
      const haystack = [agent.title, agent.description, ...agent.keywords].join(' ').toLowerCase();
      return haystack.includes(keyword);
    });
  }, [term]);

  return (
    <section className="portal-home">
      <div className="portal-home__intro">
        <h1>欢迎来到 Usefule Web Portal</h1>
        <p>从统一入口快速访问各个主题代理（mini-site），探索旅行灵感与修图练习素材。</p>
      </div>

      <div className="portal-home__actions">
        <label className="search-field">
          <span className="search-field__label">搜索代理</span>
          <input
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="输入关键词（旅行、修图…）"
            className="search-field__input"
          />
        </label>
        {lastVisited ? (
          <Link to={lastVisited} className="resume-link">
            继续浏览：{readableRouteName[lastVisited] ?? lastVisited}
          </Link>
        ) : null}
      </div>

      <div className="portal-grid">
        {filteredAgents.map((agent) => (
          <article key={agent.id} className="portal-card">
            <div className="portal-card__body">
              <h2 className="portal-card__title">{agent.title}</h2>
              <p className="portal-card__description">{agent.description}</p>
            </div>
            <div className="portal-card__footer">
              <Link to={agent.path} className="portal-card__cta">
                {agent.cta}
              </Link>
            </div>
          </article>
        ))}

        {filteredAgents.length === 0 ? (
          <div className="portal-card portal-card--empty">
            <p>未找到匹配的代理。请尝试其他关键词。</p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PortalHome;
