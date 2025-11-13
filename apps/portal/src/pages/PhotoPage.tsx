import { useEffect, useMemo, useState } from 'react';
import SubPageLayout from '../components/SubPageLayout';
import {
  photoCategories,
  photoFilters,
  photoResources,
  PhotoFilterCategory
} from '../data/photoResources';
import { openExternal } from '../utils/openExternal';

const FAVORITE_STORAGE_KEY = 'photoResourceFavorites';

const readStoredFavorites = () => {
  if (typeof window === 'undefined') {
    return [] as string[];
  }

  try {
    const raw = window.localStorage.getItem(FAVORITE_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
};

const initialCounts: Record<PhotoFilterCategory, number> = {
  all: 0,
  library: 0,
  repository: 0
};

const PhotoPage = () => {
  const [activeFilter, setActiveFilter] = useState<PhotoFilterCategory>('all');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(readStoredFavorites);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const resourcesInView = useMemo(() => {
    if (activeFilter === 'all') {
      return photoResources;
    }

    return photoResources.filter((resource) => resource.category === activeFilter);
  }, [activeFilter]);

  const filteredResources = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return resourcesInView.filter((resource) => {
      if (favoritesOnly && !favoriteSet.has(resource.id)) {
        return false;
      }

      if (!query) {
        return true;
      }

      const haystack = `${resource.name} ${resource.tip}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [favoriteSet, favoritesOnly, resourcesInView, searchTerm]);

  const favoriteCountInView = useMemo(
    () => resourcesInView.filter((resource) => favoriteSet.has(resource.id)).length,
    [favoriteSet, resourcesInView]
  );

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id);
      }
      return [...prev, id];
    });
  };

  const currentFilterMeta = photoFilters.find((filter) => filter.id === activeFilter);

  const categoryCount = useMemo<Record<PhotoFilterCategory, number>>(() => {
    return photoResources.reduce(
      (acc, resource) => {
        acc.all += 1;
        acc[resource.category] += 1;
        return acc;
      },
      { ...initialCounts }
    );
  }, []);

  return (
    <SubPageLayout
      title="摄影后期练习"
      description="汇总 RAW 素材与开源工具，随时挑选练习题重启调色手感。"
      accent="photo"
    >
      <section className="photo-toolbar">
        <div className="photo-tabs" role="tablist" aria-label="resource categories">
          {photoFilters.map((filter) => {
            const isActive = filter.id === activeFilter;

            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="photo-tabpanel"
                className={`photo-tab${isActive ? ' is-active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                <span className="photo-tab-label">{filter.label}</span>
                <span className="photo-tab-count">{categoryCount[filter.id]} 条资源</span>
              </button>
            );
          })}
        </div>
        <div className="photo-filters">
          <label className="photo-search">
            <span className="visually-hidden">搜索资源</span>
            <input
              type="search"
              placeholder="按名称或练习建议搜索"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
          <button
            type="button"
            className={`favorite-filter${favoritesOnly ? ' is-active' : ''}`}
            onClick={() => setFavoritesOnly((prev) => !prev)}
          >
            {favoritesOnly ? '显示全部' : '仅看收藏'}
          </button>
        </div>
      </section>

      {currentFilterMeta && (
        <div className="photo-summary">
          <p className="photo-summary-text">{currentFilterMeta.summary}</p>
          <div className="photo-summary-metrics" aria-live="polite">
            <span>当前 {resourcesInView.length} 条</span>
            <span>收藏 {favoriteCountInView} 条</span>
          </div>
        </div>
      )}

      <div id="photo-tabpanel" role="tabpanel" className="resource-grid">
        {filteredResources.length === 0 ? (
          <div className="resource-empty">
            <p>未找到符合条件的资源，换个关键词或关闭“仅看收藏”试试。</p>
          </div>
        ) : (
          filteredResources.map((resource) => {
            const isFavorite = favoriteSet.has(resource.id);
            const tabLabel = photoCategories.find((category) => category.id === resource.category)?.label;

            return (
              <article key={resource.id} className="resource-card">
                <header className="resource-card-header">
                  <span className="resource-tag">{tabLabel}</span>
                  <button
                    type="button"
                    className={`favorite-button${isFavorite ? ' is-active' : ''}`}
                    aria-pressed={isFavorite}
                    aria-label={isFavorite ? `取消收藏 ${resource.name}` : `收藏 ${resource.name}`}
                    onClick={() => toggleFavorite(resource.id)}
                  >
                    <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
                    {isFavorite ? '已收藏' : '收藏'}
                  </button>
                </header>
                <h3>{resource.name}</h3>
                <p className="resource-tip">{resource.tip}</p>
                <div className="resource-actions">
                  <button type="button" className="resource-open" onClick={() => void openExternal(resource.link)}>
                    打开资源
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </SubPageLayout>
  );
};

export default PhotoPage;
