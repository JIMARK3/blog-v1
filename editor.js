document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const titleInput = document.getElementById('title');
    const categorySelect = document.getElementById('category');
    const tagsInput = document.getElementById('tags');
    const saveButton = document.getElementById('save-button');
    const clearButton = document.getElementById('clear-button');

    // 配置 marked
    marked.setOptions({
        breaks: true,
        gfm: true,
        highlight: function(code) {
            return code;
        }
    });

    // 实时预览
    function updatePreview() {
        const markdownContent = markdownInput.value;
        const htmlContent = marked(markdownContent);
        preview.innerHTML = htmlContent;
    }

    // 插入 Markdown 语法
    window.insertMarkdown = function(prefix, suffix) {
        const start = markdownInput.selectionStart;
        const end = markdownInput.selectionEnd;
        const text = markdownInput.value;
        const selection = text.substring(start, end);
        
        const before = text.substring(0, start);
        const after = text.substring(end);
        
        markdownInput.value = before + prefix + selection + suffix + after;
        
        // 更新光标位置
        const newCursorPos = selection ? start + prefix.length + selection.length + suffix.length 
                                     : start + prefix.length;
        
        markdownInput.focus();
        markdownInput.setSelectionRange(newCursorPos, newCursorPos);
        
        updatePreview();
    };

    // 生成文章内容
    function generateArticleContent() {
        const title = titleInput.value;
        const tags = tagsInput.value.split(',').map(tag => tag.trim());
        
        return `
            <h1>${title}</h1>
            <div class="article-meta">
                <span>发布日期: ${new Date().toISOString().split('T')[0]}</span>
                <div class="tags">
                    ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <article>
                ${marked(markdownInput.value)}
            </article>
        `;
    }

    // 保存文章
    function saveArticle() {
        if (!titleInput.value || !markdownInput.value || !tagsInput.value) {
            alert('请填写所有必填字段！');
            return;
        }

        const article = {
            id: Date.now(),
            title: titleInput.value,
            category: categorySelect.value,
            date: new Date().toISOString().split('T')[0],
            tags: tagsInput.value.split(',').map(tag => tag.trim()),
            preview: markdownInput.value.slice(0, 200) + '...',
            content: generateArticleContent()
        };

        // 获取现有文章
        fetch('articles.js')
            .then(response => response.text())
            .then(text => {
                const existingArticles = eval(text.replace('const articles = ', ''));
                existingArticles.unshift(article);
                const newContent = 'const articles = ' + JSON.stringify(existingArticles, null, 4) + ';';
                
                return fetch('/save-article', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: newContent })
                });
            })
            .then(response => {
                if (response.ok) {
                    alert('文章保存成功！');
                    window.location.href = 'index.html';
                } else {
                    throw new Error('保存失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('保存失败，请重试！');
            });
    }

    // 清空内容
    function clearContent() {
        if (confirm('确定要清空所有内容吗？')) {
            titleInput.value = '';
            categorySelect.selectedIndex = 0;
            tagsInput.value = '';
            markdownInput.value = '';
            updatePreview();
        }
    }

    // 事件监听
    markdownInput.addEventListener('input', updatePreview);
    saveButton.addEventListener('click', saveArticle);
    clearButton.addEventListener('click', clearContent);

    // 自动保存到 localStorage
    const autoSave = () => {
        const data = {
            title: titleInput.value,
            category: categorySelect.value,
            tags: tagsInput.value,
            content: markdownInput.value
        };
        localStorage.setItem('draft', JSON.stringify(data));
    };

    // 每30秒自动保存
    setInterval(autoSave, 30000);

    // 恢复草稿
    const draft = localStorage.getItem('draft');
    if (draft) {
        const data = JSON.parse(draft);
        titleInput.value = data.title || '';
        categorySelect.value = data.category || 'programming';
        tagsInput.value = data.tags || '';
        markdownInput.value = data.content || '';
        updatePreview();
    }
});