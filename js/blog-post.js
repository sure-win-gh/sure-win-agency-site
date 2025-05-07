// Contentful API configuration
const SPACE_ID = 'a2cxhatr4q40';
const ACCESS_TOKEN = 'MupjJ69kqXwA71rrpXHtUWzkQYEPRNvxZG_TAypIfbE';
const CONTENT_TYPE = 'blogPost';

// Get slug from URL (e.g., /blog/my-post-slug or /blog/post.html?slug=my-post-slug)
function getSlug() {
    // Try to get from /blog/[slug] style
    const pathParts = window.location.pathname.split('/');
    const last = pathParts[pathParts.length - 1];
    if (last && last !== 'post.html') return last.replace('.html', '');
    // Try to get from ?slug= style
    const params = new URLSearchParams(window.location.search);
    return params.get('slug');
}

// Fetch a single blog post by slug
async function fetchBlogPost(slug) {
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE}&fields.slug=${slug}&include=2`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.items && data.items.length > 0 ? { post: data.items[0], includes: data.includes } : null;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

// Helper to get asset URL by ID
function getAssetUrl(assets, id) {
    const asset = assets.find(a => a.sys.id === id);
    return asset ? asset.fields.file.url : '';
}

// Helper to get author name by ID
function getAuthorName(entries, id) {
    const entry = entries.find(e => e.sys.id === id);
    return entry ? entry.fields.name : 'The Sure Win Agency';
}

// Render rich text (basic)
function renderRichText(richText) {
    if (!richText || !richText.content) return '';
    return richText.content.map(block => {
        if (block.nodeType === 'paragraph') {
            return `<p>${block.content.map(inline => inline.value || '').join('')}</p>`;
        }
        if (block.nodeType === 'heading-1') {
            return `<h1>${block.content.map(inline => inline.value || '').join('')}</h1>`;
        }
        if (block.nodeType === 'heading-2') {
            return `<h2>${block.content.map(inline => inline.value || '').join('')}</h2>`;
        }
        if (block.nodeType === 'heading-3') {
            return `<h3>${block.content.map(inline => inline.value || '').join('')}</h3>`;
        }
        if (block.nodeType === 'unordered-list') {
            return `<ul>${block.content.map(item => `<li>${item.content[0].content[0].value}</li>`).join('')}</ul>`;
        }
        if (block.nodeType === 'ordered-list') {
            return `<ol>${block.content.map(item => `<li>${item.content[0].content[0].value}</li>`).join('')}</ol>`;
        }
        // Add more node types as needed
        return '';
    }).join('');
}

// Render the blog post
function renderBlogPost(post, includes) {
    const container = document.getElementById('blog-post-content');
    if (!container || !post) return;
    const { title, featuredImage, publishDate, author, content, excerpt } = post.fields;
    const assets = includes?.Asset || [];
    const entries = includes?.Entry || [];
    const imageId = featuredImage && featuredImage.sys.id;
    const imageUrl = imageId ? getAssetUrl(assets, imageId) : '';
    const authorId = author && author.sys.id;
    const authorName = authorId ? getAuthorName(entries, authorId) : 'The Sure Win Agency';
    const formattedDate = publishDate ? new Date(publishDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    }) : '';
    const contentHTML = renderRichText(content);
    container.innerHTML = `
        <article class="blog-post">
            <h1 class="blog-post-title">${title}</h1>
            <div class="blog-post-meta">
                <span class="blog-post-date">${formattedDate}</span>
                <span class="blog-post-author">By ${authorName}</span>
            </div>
            ${imageUrl ? `<div class="blog-post-image"><img src="${imageUrl}" alt="${title}"></div>` : ''}
            <div class="blog-post-excerpt">${excerpt || ''}</div>
            <div class="blog-post-content">${contentHTML}</div>
        </article>
    `;
}

// Initialize blog post page
async function initBlogPost() {
    const slug = getSlug();
    if (!slug) {
        document.getElementById('blog-post-content').innerHTML = '<p>Post not found.</p>';
        return;
    }
    const data = await fetchBlogPost(slug);
    if (!data) {
        document.getElementById('blog-post-content').innerHTML = '<p>Post not found.</p>';
        return;
    }
    renderBlogPost(data.post, data.includes);
}

document.addEventListener('DOMContentLoaded', initBlogPost); 