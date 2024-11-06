document.addEventListener('DOMContentLoaded', () => {
    const articlesContainer = document.getElementById('articles-container');
    const modal = document.getElementById('article-modal');
    const articleDetail = document.getElementById('article-detail');
    const closeBtn = document.querySelector('.close');
    let currentCategory = 'all';

    // 渲染文章列表
    function renderArticles(articles) {
        articlesContainer.innerHTML = articles
            .filter(article => currentCategory === 'all' || article.category === currentCategory)
            .map(article => `
                <div class="article-card" data-id="${article.id}">
                    <h2>${article.title}</h2>
                    <div class="article-meta">
                        <span>${article.date}</span>
                        <div class="tags">
                            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <p class="article-preview">${article.preview}</p>
                </div>
            `).join('');
    }

    // 显示文章详情
    function showArticleDetail(id) {
        const article = articles.find(a => a.id === parseInt(id));
        if (article) {
            articleDetail.innerHTML = article.content;
            modal.style.display = 'block';
        }
    }

    // 事件监听器
    articlesContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.article-card');
        if (card) {
            showArticleDetail(card.dataset.id);
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 分类导航
    document.querySelectorAll('nav ul a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentCategory = e.target.dataset.category;
            renderArticles(articles);
            
            // 更新活动状态
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // 初始化显示
    renderArticles(articles);
});