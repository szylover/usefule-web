import { ReactNode, useMemo, useState } from 'react';
import PhotoPage from './PhotoPage';
import TravelPage from './TravelPage';

type AgentNode = {
  id: 'travel' | 'photo';
  label: string;
  description: string;
  accent: 'travel' | 'photo';
  summary: string;
  render: () => ReactNode;
};

const agentNodes: AgentNode[] = [
  {
    id: 'travel',
    label: '环球旅行清单',
    description: '按国家 / 城市体系化排布清单，随时勾选到访状态。',
    accent: 'travel',
    summary: '国家 → 城市 → 景点三级列表，支持完成度统计。',
    render: () => <TravelPage showBackButton={false} />
  },
  {
    id: 'photo',
    label: '摄影后期练习',
    description: '收集 RAW 素材与 GitHub 工具，让调色练习随手可用。',
    accent: 'photo',
    summary: '素材图库与开源项目双标签，搭配收藏组合。',
    render: () => <PhotoPage showBackButton={false} />
  }
];

const PortalPage = () => {
  const [activeAgentId, setActiveAgentId] = useState<AgentNode['id']>(agentNodes[0].id);
  const activeAgent = useMemo(
    () => agentNodes.find((agent) => agent.id === activeAgentId),
    [activeAgentId]
  );

  return (
    <div className="portal-shell">
      <header className="portal-header">
        <h1>Useful Portal</h1>
        <p className="subtitle">左侧快速定位 mini-site，右侧即时加载对应练习空间。</p>
      </header>
      <div className="portal-body">
        <nav className="portal-tree" aria-label="Agent navigator">
          <p className="tree-heading">练习合集</p>
          <ul className="tree-list" role="tree">
            {agentNodes.map((agent) => {
              const isActive = agent.id === activeAgentId;
              return (
                <li key={agent.id} role="none">
                  <button
                    type="button"
                    role="treeitem"
                    aria-selected={isActive}
                    className={`tree-node tree-node-${agent.accent}${isActive ? ' is-active' : ''}`}
                    onClick={() => setActiveAgentId(agent.id)}
                  >
                    <div className="tree-node-main">
                      <span className="tree-node-label">{agent.label}</span>
                      <span className="tree-node-description">{agent.description}</span>
                    </div>
                    <span className="tree-node-summary">{agent.summary}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <section
          className="portal-stage"
          aria-live="polite"
          aria-label="Mini-site preview"
        >
          {activeAgent ? (
            <div className="portal-stage-inner" key={activeAgent.id}>
              {activeAgent.render()}
            </div>
          ) : (
            <div className="portal-stage-placeholder">
              <p>请选择左侧任意代理以加载内容。</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PortalPage;
