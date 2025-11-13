import SubPageLayout from '../components/SubPageLayout';

const PhotoPage = () => {
  return (
    <SubPageLayout
      title="摄影后期练习"
      description="汇总 RAW 素材与开源工具，随时挑选练习题重启调色手感。"
      accent="photo"
    >
      <div className="placeholder">
        <h2>功能建设中</h2>
        <p>接下来会提供素材图库 / GitHub 项目两个视图，每个资源都附带练习建议与外链跳转。</p>
        <ul className="placeholder-list">
          <li>卡片展示 RAW 素材库与项目，点击即可在系统浏览器打开。</li>
          <li>按标签或“收藏”筛选，快速找回常用练习素材。</li>
          <li>支持中英文提示语，便于在不同工作流中切换。</li>
          <li>计划接入本地收藏写入与同步事件，保持进度统一。</li>
        </ul>
      </div>
    </SubPageLayout>
  );
};

export default PhotoPage;
