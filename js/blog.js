// Contentful API configuration
const SPACE_ID = 'a2cxhatr4q40'; // Provided Contentful space ID
const ACCESS_TOKEN = 'MupjJ69kqXwA71rrpXHtUWzkQYEPRNvxZG_TAypIfbE'; // Provided Contentful access token
const CONTENT_TYPE = 'blogPost';

// Fetch blog posts from Contentful
async function fetchBlogPosts() {
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE}&order=-fields.publishDate&include=2`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
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

// Render blog posts
function renderBlogPosts(data) {
    const container = document.getElementById('blog-posts-container');
    if (!container || !data) return;
    const posts = data.items;
    const assets = data.includes?.Asset || [];
    const entries = data.includes?.Entry || [];

    const postsHTML = posts.map(post => {
        const { title, slug, excerpt, featuredImage, publishDate, author } = post.fields;
        const imageId = featuredImage && featuredImage.sys.id;
        const imageUrl = imageId ? getAssetUrl(assets, imageId) : '';
        const authorId = author && author.sys.id;
        const authorName = authorId ? getAuthorName(entries, authorId) : 'The Sure Win Agency';
        const formattedDate = publishDate ? new Date(publishDate).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        }) : '';
        return `
            <article class="blog-card">
                <div class="blog-card-image">
                    <img src="${imageUrl}" alt="${title}">
                </div>
                <div class="blog-card-content">
                    <div class="blog-card-meta">
                        <span class="blog-card-date">${formattedDate}</span>
                        <span class="blog-card-author">By ${authorName}</span>
                    </div>
                    <h2 class="blog-card-title">${title}</h2>
                    <p class="blog-card-excerpt">${excerpt || ''}</p>
                    <a href="${slug}" class="blog-card-link">Read More</a>
                </div>
            </article>
        `;
    }).join('');
    container.innerHTML = postsHTML;
}

// Initialize blog
async function initBlog() {
    const data = await fetchBlogPosts();
    renderBlogPosts(data);
}

document.addEventListener('DOMContentLoaded', initBlog); 