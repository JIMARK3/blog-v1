const articles = [
    {
        id: 1,
        title: "Linux内核架构详解",
        category: "os",
        date: "2024-01-15",
        tags: ["Linux", "操作系统", "内核"],
        preview: "深入探讨Linux内核的基本架构，包括进程管理、内存管理、文件系统等核心概念...",
        content: `
            <h1>Linux内核架构详解</h1>
            <div class="article-meta">
                <span>发布日期: 2024-01-15</span>
                <div class="tags">
                    <span class="tag">Linux</span>
                    <span class="tag">操作系统</span>
                    <span class="tag">内核</span>
                </div>
            </div>
            <article>
                <h2>1. 引言</h2>
                <p>Linux内核是现代操作系统中最重要的开源项目之一，本文将深入探讨其架构设计...</p>
                
                <h2>2. 进程管理</h2>
                <p>Linux内核通过精心设计的进程调度器来管理系统中的所有进程...</p>
                
                <h2>3. 内存管理</h2>
                <p>内存管理子系统负责处理物理内存和虚拟内存的分配与回收...</p>
                
                <h2>4. 文件系统</h2>
                <p>Linux支持多种文件系统，通过VFS层提供统一的接口...</p>
            </article>
        `
    },
    {
        id: 2,
        title: "深入理解JavaScript异步编程",
        category: "programming",
        date: "2024-01-16",
        tags: ["JavaScript", "异步编程", "Promise"],
        preview: "详细讲解JavaScript中的异步编程模式，包括回调、Promise、async/await等概念...",
        content: `
            <h1>深入理解JavaScript异步编程</h1>
            <div class="article-meta">
                <span>发布日期: 2024-01-16</span>
                <div class="tags">
                    <span class="tag">JavaScript</span>
                    <span class="tag">异步编程</span>
                    <span class="tag">Promise</span>
                </div>
            </div>
            <article>
                <h2>1. 异步编程基础</h2>
                <p>在JavaScript中，异步编程是处理非阻塞操作的核心机制...</p>
                
                <h2>2. Promise详解</h2>
                <p>Promise提供了一种优雅的方式来处理异步操作...</p>
                
                <h2>3. Async/Await</h2>
                <p>ES2017引入的async/await语法让异步代码更易读写...</p>
            </article>
        `
    },
    {
        id: 3,
        title: "Git工作流最佳实践",
        category: "blog",
        date: "2024-01-17",
        tags: ["Git", "版本控制", "团队协作"],
        preview: "介绍在团队开发中的Git最佳实践，包括分支管理、提交规范等内容...",
        content: `
            <h1>Git工作流最佳实践</h1>
            <div class="article-meta">
                <span>发布日期: 2024-01-17</span>
                <div class="tags">
                    <span class="tag">Git</span>
                    <span class="tag">版本控制</span>
                    <span class="tag">团队协作</span>
                </div>
            </div>
            <article>
                <h2>1. 分支管理策略</h2>
                <p>合理的分支管理策略是团队协作的基础...</p>
                
                <h2>2. 提交规范</h2>
                <p>规范的提交信息能够提高代码库的可维护性...</p>
                
                <h2>3. 工作流程</h2>
                <p>GitFlow、主干开发等不同工作流程的比较与适用场景...</p>
            </article>
        `
    }
];