export const photoCategories = [
  {
    id: 'library',
    label: '素材图库',
    summary: '精选 RAW 素材库，随时挑选不同光线与题材动手实操。'
  },
  {
    id: 'repository',
    label: 'GitHub 项目',
    summary: '开源调色/自动化项目，扩展工作流并参考算法思路。'
  }
] as const;

export type PhotoResourceCategory = (typeof photoCategories)[number]['id'];
export type PhotoFilterCategory = 'all' | PhotoResourceCategory;

export const photoFilters = [
  {
    id: 'all' as const,
    label: '全部',
    summary: '整合素材库与 GitHub 项目，一次性浏览所有灵感入口。'
  },
  ...photoCategories
] as const;

export type PhotoResource = {
  id: string;
  category: PhotoResourceCategory;
  name: string;
  link: string;
  tip: string;
};

export const photoResources: PhotoResource[] = [
  {
    id: 'unsplash',
    category: 'library',
    name: 'Unsplash Free RAW',
    link: 'https://unsplash.com/s/photos/raw',
    tip: '挑曝光或色偏更明显的照片练习修色'
  },
  {
    id: 'pexels',
    category: 'library',
    name: 'Pexels RAW Portraits',
    link: 'https://www.pexels.com/search/raw%20portrait/',
    tip: '练习人像肤色白平衡与饱和度调节'
  },
  {
    id: 'shotkit',
    category: 'library',
    name: 'Shotkit 138 Free RAW Files',
    link: 'https://shotkit.com/free-raw-photos/',
    tip: '聚焦曝光曲线与整体场景色调的改造'
  },
  {
    id: 'signature-edits',
    category: 'library',
    name: 'Signature Edits Free RAW',
    link: 'https://www.signatureedits.com/free-raw-photos/',
    tip: '尝试冷暖调互换与风格化调色'
  },
  {
    id: 'detty-studio',
    category: 'library',
    name: 'Detty Studio Free RAW',
    link: 'https://dettystudio.com/free-raw-photos/',
    tip: '在不同光线风格下训练色调平衡'
  },
  {
    id: 'auto-color',
    category: 'repository',
    name: 'Auto-color-exploration',
    link: 'https://github.com/ChihYuHsieh/Auto-color-exploration',
    tip: '从参考图抽取调色方案再微调'
  },
  {
    id: 'easy-color-corrector',
    category: 'repository',
    name: 'ComfyUI-EasyColorCorrector',
    link: 'https://github.com/regiellis/ComfyUI-EasyColorCorrector',
    tip: '动手实践 Lift/Gamma/Gain 等节点调色'
  },
  {
    id: 'acb',
    category: 'repository',
    name: 'acb (Adobe Color Book Tool)',
    link: 'https://github.com/atesgoral/acb',
    tip: '提取色卡并统一风格的工作流'
  },
  {
    id: 'chartthrob',
    category: 'repository',
    name: 'ChartThrob',
    link: 'https://github.com/joker-b/ChartThrob',
    tip: '练习 RGB 与 CMYK 色域转换差异'
  },
  {
    id: 'photoshop-sdk',
    category: 'repository',
    name: 'Adobe Photoshop API SDK',
    link: 'https://github.com/adobe/aio-lib-photoshop-api',
    tip: '探索自动化批量调色与图层处理'
  }
];
