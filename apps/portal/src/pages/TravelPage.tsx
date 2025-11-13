import SubPageLayout from '../components/SubPageLayout';

type TravelPageProps = {
  showBackButton?: boolean;
};

const TravelPage = ({ showBackButton = true }: TravelPageProps) => {
  return (
    <SubPageLayout
      title="环球旅行清单"
      description="按地区、城市逐层展开清单，记录每一次打卡与灵感。"
      accent="travel"
      showBackButton={showBackButton}
    >
      <div className="placeholder">
        <h2>功能建设中</h2>
        <p>即将上线的旅行清单会围绕国家 → 城市 → 景点三级结构展开，并即时记录到本地数据库。</p>
        <ul className="placeholder-list">
          <li>按洲/区域快速筛选，或直接搜索目的地。</li>
          <li>展开国家查看城市，再深入查看景点与备注。</li>
          <li>切换“已到访”状态立刻写入 LiteSQLite，并触发同步事件。</li>
          <li>随时查看国家完成度与下一步旅程灵感。</li>
        </ul>
      </div>
    </SubPageLayout>
  );
};

export default TravelPage;
