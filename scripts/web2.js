// Photography Resources functionality for web2

// Sample photography resources data
const resources = [
    {
        title: "Lightroom Classic Tutorial Series",
        category: "tutorials",
        icon: "🎬",
        description: "Comprehensive video series covering everything from basic adjustments to advanced masking and color grading techniques in Adobe Lightroom Classic.",
        tags: ["Lightroom", "Video", "Beginner-Friendly"],
        link: "#"
    },
    {
        title: "Cinematic Color Grading Presets",
        category: "presets",
        icon: "🎨",
        description: "Professional preset collection inspired by popular films. Includes 25+ presets for moody, cinematic looks in your photographs.",
        tags: ["Lightroom", "Film Look", "Color Grading"],
        link: "#"
    },
    {
        title: "Free RAW Practice Images",
        category: "raw-samples",
        icon: "📸",
        description: "Download high-quality RAW files from various photography genres - portrait, landscape, street, and wildlife. Perfect for practicing editing techniques.",
        tags: ["RAW Files", "Practice", "Free"],
        link: "#"
    },
    {
        title: "Photoshop Frequency Separation Guide",
        category: "tutorials",
        icon: "📚",
        description: "Step-by-step written guide on mastering frequency separation for advanced skin retouching and texture work in Photoshop.",
        tags: ["Photoshop", "Retouching", "Advanced"],
        link: "#"
    },
    {
        title: "Capture One Pro Basics",
        category: "tutorials",
        icon: "🎓",
        description: "Introduction to Capture One Pro workflow, covering tethered shooting, layer-based adjustments, and color management.",
        tags: ["Capture One", "Video", "Workflow"],
        link: "#"
    },
    {
        title: "Portrait Retouching Toolkit",
        category: "tools",
        icon: "🛠️",
        description: "Collection of Photoshop actions and brushes for efficient portrait retouching. Includes skin smoothing, dodge & burn, and eye enhancement tools.",
        tags: ["Photoshop", "Actions", "Portrait"],
        link: "#"
    },
    {
        title: "Natural Landscape Presets",
        category: "presets",
        icon: "🌄",
        description: "Enhance your landscape photos with these natural-looking presets designed to bring out detail and color without overdoing it.",
        tags: ["Lightroom", "Landscape", "Natural"],
        link: "#"
    },
    {
        title: "Black & White Conversion Masterclass",
        category: "tutorials",
        icon: "⚫",
        description: "Learn advanced black and white conversion techniques using multiple methods in both Lightroom and Photoshop.",
        tags: ["B&W", "Lightroom", "Photoshop"],
        link: "#"
    },
    {
        title: "Street Photography RAW Pack",
        category: "raw-samples",
        icon: "🏙️",
        description: "Urban street photography RAW files for practicing quick edits and maintaining natural street aesthetics.",
        tags: ["RAW Files", "Street", "Urban"],
        link: "#"
    },
    {
        title: "AI-Powered Editing Tools Review",
        category: "tools",
        icon: "🤖",
        description: "Comprehensive review and comparison of AI-powered photo editing tools including Luminar AI, Topaz Labs, and ON1 Photo RAW.",
        tags: ["AI", "Software Review", "Comparison"],
        link: "#"
    },
    {
        title: "Food Photography Editing Guide",
        category: "tutorials",
        icon: "🍽️",
        description: "Specialized tutorial for food photography post-processing - color correction, sharpening, and making your food photos look delicious.",
        tags: ["Food", "Commercial", "Color"],
        link: "#"
    },
    {
        title: "Golden Hour Presets Collection",
        category: "presets",
        icon: "🌅",
        description: "Warm, glowing presets perfect for golden hour and sunset photography. Works great with outdoor portraits and landscapes.",
        tags: ["Golden Hour", "Warm Tones", "Sunset"],
        link: "#"
    },
    {
        title: "Wildlife Photography RAW Files",
        category: "raw-samples",
        icon: "🦁",
        description: "Practice editing challenging wildlife shots with varying lighting conditions and motion blur scenarios.",
        tags: ["Wildlife", "RAW Files", "Nature"],
        link: "#"
    },
    {
        title: "Advanced Masking Techniques",
        category: "tutorials",
        icon: "🎭",
        description: "Master complex masking in Lightroom and Photoshop for selective adjustments and creative compositing.",
        tags: ["Masking", "Advanced", "Compositing"],
        link: "#"
    },
    {
        title: "Color Calibration Tools",
        category: "tools",
        icon: "🎨",
        description: "Guide to using ColorChecker and other calibration tools for accurate color reproduction in your workflow.",
        tags: ["Color Management", "Calibration", "Professional"],
        link: "#"
    },
    {
        title: "Moody Dark Presets Pack",
        category: "presets",
        icon: "🌙",
        description: "Create atmospheric, dark mood photos with this collection of presets featuring crushed blacks and muted tones.",
        tags: ["Moody", "Dark", "Atmospheric"],
        link: "#"
    }
];

let currentFilter = 'all';

// Filter resources by category
function filterResources(category) {
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-tag').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderResources();
}

// Render resources to the DOM
function renderResources() {
    const resourcesList = document.getElementById('resourcesList');
    resourcesList.innerHTML = '';
    
    // Filter resources based on current filter
    const filteredResources = currentFilter === 'all' 
        ? resources 
        : resources.filter(r => r.category === currentFilter);
    
    if (filteredResources.length === 0) {
        resourcesList.innerHTML = '<div class="no-resources">No resources found in this category.</div>';
        return;
    }
    
    // Render each resource
    filteredResources.forEach(resource => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        
        const tagsHTML = resource.tags.map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');
        
        card.innerHTML = `
            <div class="resource-icon">${resource.icon}</div>
            <h3 class="resource-title">${resource.title}</h3>
            <span class="resource-category">${getCategoryName(resource.category)}</span>
            <p class="resource-description">${resource.description}</p>
            <div class="resource-tags">${tagsHTML}</div>
            <a href="${resource.link}" class="resource-link ${resource.link === '#' ? 'disabled' : ''}" 
               ${resource.link === '#' ? 'onclick="return false;"' : ''}>
                ${resource.link === '#' ? 'Coming Soon' : 'View Resource'}
            </a>
        `;
        
        resourcesList.appendChild(card);
    });
}

// Get category display name
function getCategoryName(category) {
    const categoryNames = {
        'tutorials': 'Tutorial',
        'presets': 'Presets',
        'raw-samples': 'RAW Samples',
        'tools': 'Tools'
    };
    return categoryNames[category] || category;
}

// Initialize the app
renderResources();
