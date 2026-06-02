/* ===========================
   SLIDESHOW FUNCTIONALITY
   =========================== */

let slideIndex = 1;
let slideTimer;

// Gallery Data Array - EASILY UPDATABLE
const galleryData = [
    { id: 1, image: 'img/1.jpg', title: 'Learning Together', category: 'activities' },
    { id: 2, image: 'img/2.jpg', title: 'Art & Creativity', category: 'activities' },
    { id: 3, image: 'img/3.jpg', title: 'Classroom Sessions', category: 'education' },
    { id: 4, image: 'img/4.jpg', title: 'Computer Skills', category: 'education' },
    { id: 5, image: 'img/5.jpg', title: 'Happy Moments', category: 'daily-life' },
    { id: 6, image: 'img/6.jpg', title: 'Celebration Time', category: 'events' },
    { id: 7, image: 'img/7.jpg', title: 'Group Activities', category: 'activities' },
    { id: 8, image: 'img/8.jpg', title: 'Daily Care', category: 'daily-life' },
    { id: 9, image: 'img/9.jpg', title: 'Community Events', category: 'events' },
    { id: 10, image: 'img/10.jpg', title: 'Learning Time', category: 'education' },
    { id: 11, image: 'img/11.jpg', title: 'Sports & Games', category: 'activities' },
    { id: 12, image: 'img/12.jpg', title: 'Recreation', category: 'daily-life' },
    { id: 13, image: 'img/13.jpg', title: 'Special Events', category: 'events' }
];

// Initialize slideshow
window.addEventListener('load', function() {
    showSlides(slideIndex);
    startSlideshow();
    setupHamburgerMenu();
    initCarousel();
});

function changeSlide(n) {
    clearTimeout(slideTimer);
    showSlides(slideIndex += n);
    startSlideshow();
}

function currentSlide(n) {
    clearTimeout(slideTimer);
    showSlides(slideIndex = n);
    startSlideshow();
}

function showSlides(n) {
    let slides = document.getElementsByClassName('slide');
    let dots = document.getElementsByClassName('dot');
    
    if (slides.length === 0) return; // Exit if no slides on this page
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('active');
}

function startSlideshow() {
    slideTimer = setTimeout(function() {
        slideIndex++;
        showSlides(slideIndex);
        startSlideshow();
    }, 6000); // Change slide every 6 seconds
}

/* ===========================
   HAMBURGER MENU
   =========================== */

function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

/* ===========================
   MODAL FUNCTIONALITY
   =========================== */

function openDonateModal() {
    const modal = document.getElementById('donateModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeDonateModal() {
    const modal = document.getElementById('donateModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('donateModal');
    if (event.target === modal) {
        closeDonateModal();
    }
});

/* ===========================
   DONATION FORM HANDLING
   =========================== */

function processDonationWithPayPal(event) {
    event.preventDefault();
    
    const name = document.getElementById('donerName').value;
    const email = document.getElementById('donerEmail').value;
    const amount = document.getElementById('amount').value;
    const message = document.getElementById('donerMessage')?.value || '';
    
    // Store donation info
    const donation = {
        name: name,
        email: email,
        amount: amount,
        message: message,
        timestamp: new Date().toLocaleString()
    };
    
    // Save to localStorage
    let donations = localStorage.getItem('donations');
    donations = donations ? JSON.parse(donations) : [];
    donations.push(donation);
    localStorage.setItem('donations', JSON.stringify(donations));
    
    // Redirect to PayPal
    redirectToPayPal(amount, name, email);
}

function redirectToPayPal(amount, name, email) {
    // PayPal payment form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://www.paypal.com/cgi-bin/webscr';
    form.target = '_blank';
    
    // Required PayPal parameters
    const params = {
        'cmd': '_xclick',
        'business': 'your-paypal-email@example.com',  // Replace with actual PayPal account
        'item_name': 'Donation for Network for Children in Need',
        'item_number': '1',
        'amount': amount,
        'currency_code': 'USD',
        'invoice': 'ORG-' + Date.now(),
        'return': window.location.href,
        'cancel_return': window.location.href,
        'notify_url': 'https://your-domain.com/notify.php',  // Your backend URL
        'payer_email': email,
        'first_name': name.split(' ')[0],
        'last_name': name.split(' ').slice(1).join(' ') || 'Donor'
    };
    
    // Add form fields
    for (const key in params) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = params[key];
        form.appendChild(input);
    }
    
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    
    // Show confirmation
    alert(`Processing donation of $${amount} for ${name}. You will be redirected to PayPal.`);
    closeDonateModal();
}

/* ===========================
   GALLERY CAROUSEL
   =========================== */

let carouselIndex = 0;
let carouselData = [];
let filteredCarouselData = [];
let carouselItemsPerView = 1;

function initCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    
    if (!carouselTrack) return;
    
    filteredCarouselData = galleryData;
    carouselData = galleryData;
    carouselIndex = 0;
    
    renderCarousel();
    createCarouselIndicators();
    updateCarouselPosition();
}

function renderCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    if (!carouselTrack) return;
    
    carouselTrack.innerHTML = '';
    
    filteredCarouselData.forEach(item => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        carouselItem.onclick = () => openLightbox(carouselItem);
        carouselItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="carousel-item-overlay">
                <p>${item.title}</p>
            </div>
        `;
        carouselTrack.appendChild(carouselItem);
    });
}

function createCarouselIndicators() {
    const indicatorsContainer = document.getElementById('carouselIndicators');
    if (!indicatorsContainer) return;
    
    indicatorsContainer.innerHTML = '';
    const numSlides = Math.ceil(filteredCarouselData.length / carouselItemsPerView);
    
    for (let i = 0; i < numSlides; i++) {
        const indicator = document.createElement('span');
        indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
        indicator.onclick = () => goToCarouselSlide(i);
        indicatorsContainer.appendChild(indicator);
    }
}

function updateCarouselPosition() {
    const carouselTrack = document.getElementById('carouselTrack');
    if (!carouselTrack) return;
    
    const offset = -carouselIndex * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
    
    // Update indicators
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === carouselIndex);
    });
}

function nextCarousel() {
    const numSlides = Math.ceil(filteredCarouselData.length / carouselItemsPerView);
    carouselIndex = (carouselIndex + 1) % numSlides;
    updateCarouselPosition();
}

function prevCarousel() {
    const numSlides = Math.ceil(filteredCarouselData.length / carouselItemsPerView);
    carouselIndex = (carouselIndex - 1 + numSlides) % numSlides;
    updateCarouselPosition();
}

function goToCarouselSlide(index) {
    carouselIndex = index;
    updateCarouselPosition();
}

function filterCarousel(category) {
    // Update active button
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter data
    if (category === 'all') {
        filteredCarouselData = galleryData;
    } else {
        filteredCarouselData = galleryData.filter(item => item.category === category);
    }
    
    // Reset carousel
    carouselIndex = 0;
    renderCarousel();
    createCarouselIndicators();
    updateCarouselPosition();
}

/* ===========================
   LIGHTBOX FUNCTIONALITY
   =========================== */

function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    
    if (lightbox) {
        const img = element.querySelector('img');
        const caption = element.querySelector('.gallery-overlay p')?.textContent || '';
        
        lightboxImage.src = img.src;
        document.querySelector('.lightbox-caption').textContent = caption;
        
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Close lightbox when clicking outside
window.addEventListener('click', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLightbox();
        closeDonateModal();
    }
});

/* ===========================
   BLOG POST FUNCTIONALITY
   =========================== */

// Blog post full content data
const blogPostsData = {
    1: {
        title: 'Our New Learning Center Opens',
        date: 'March 15, 2024',
        category: 'Education',
        content: `
            <p>We're thrilled to announce the opening of our brand-new learning center! Equipped with 20 computers, high-speed internet, and modern educational software, this facility will revolutionize how our children learn and develop digital skills.</p>
            
            <h3>What's Included</h3>
            <p>The learning center features:</p>
            <ul>
                <li>20 modern computers with latest software</li>
                <li>High-speed fiber internet connection</li>
                <li>Air-conditioned comfortable learning environment</li>
                <li>Professional IT support staff</li>
                <li>Online course access and certifications</li>
            </ul>
            
            <h3>Impact</h3>
            <p>This facility will enable our children to:</p>
            <ul>
                <li>Learn essential computer and digital literacy skills</li>
                <li>Access online educational resources</li>
                <li>Develop coding and programming abilities</li>
                <li>Prepare for tech careers</li>
                <li>Connect with the global community</li>
            </ul>
            
            <p>We are grateful to all donors who made this possible. Your support changes lives!</p>
        `
    },
    2: {
        title: 'Success Stories: Meet Our Graduates',
        date: 'March 10, 2024',
        category: 'Success Stories',
        content: `
            <p>Meet Emma, one of our inspiring graduates who grew up in our orphanage and is now studying engineering at university. Her success is a testament to the love, support, and education we provide to our children.</p>
            
            <h3>Emma's Story</h3>
            <p>Emma arrived at our orphanage when she was just 5 years old. Through the years, she showed remarkable determination and intellectual curiosity. Our staff nurtured her talents through quality education and mentorship.</p>
            
            <p>Today, at age 21, Emma is a second-year engineering student at the National University. She maintains a 3.8 GPA and has already completed two internships at leading tech companies.</p>
            
            <h3>Her Message</h3>
            <p>"The orphanage gave me not just shelter and education, but hope. The staff believed in me when I didn't believe in myself. Now I want to give back and help other children achieve their dreams too."</p>
            
            <h3>Career Plans</h3>
            <p>After graduation, Emma plans to work in renewable energy engineering and eventually start a non-profit to provide tech education to rural communities.</p>
            
            <p>Stories like Emma's inspire us to continue our mission of transforming young lives.</p>
        `
    },
    3: {
        title: 'Monthly Outreach Program Launched',
        date: 'March 5, 2024',
        category: 'Community',
        content: `
            <p>Our community outreach program has expanded to reach 100 more children in the surrounding villages. Through partnerships with local organizations, we now provide food, education, healthcare, and emotional support to vulnerable children in need.</p>
            
            <h3>Program Overview</h3>
            <p>The expanded outreach initiative includes:</p>
            <ul>
                <li>Weekly nutritious meals for 100 children</li>
                <li>Interactive educational workshops</li>
                <li>Free health check-ups and vaccinations</li>
                <li>Counseling and emotional support services</li>
                <li>Hygiene and sanitation education</li>
            </ul>
            
            <h3>Community Partners</h3>
            <p>We're working with local health clinics, schools, and community leaders to ensure maximum impact and sustainability.</p>
            
            <h3>Goals</h3>
            <p>Over the next year, we aim to:</p>
            <ul>
                <li>Reach 200 more children</li>
                <li>Establish three satellite programs in nearby villages</li>
                <li>Provide vocational training to 50 families</li>
                <li>Build two new community centers</li>
            </ul>
            
            <p>Your support makes these programs possible!</p>
        `
    },
    4: {
        title: 'Health & Wellness Initiative',
        date: 'February 28, 2024',
        category: 'Health',
        content: `
            <p>We've launched a comprehensive health and wellness program that includes regular medical check-ups, nutritional counseling, mental health support, and sports programs. Every child's physical and mental wellbeing is our priority.</p>
            
            <h3>Program Components</h3>
            <ul>
                <li><strong>Medical Care:</strong> Monthly health check-ups and emergency care</li>
                <li><strong>Nutrition:</strong> Balanced meals and nutritional counseling</li>
                <li><strong>Mental Health:</strong> Counseling and psychological support</li>
                <li><strong>Sports:</strong> Team sports and fitness activities</li>
                <li><strong>Education:</strong> Health and hygiene awareness programs</li>
            </ul>
            
            <h3>Results So Far</h3>
            <p>Since launching the program, we've seen improvements in:</p>
            <ul>
                <li>Improved academic performance</li>
                <li>Better overall health metrics</li>
                <li>Increased confidence and self-esteem</li>
                <li>Enhanced social skills</li>
            </ul>
            
            <p>We believe that a healthy child is a happy child who can thrive and reach their potential.</p>
        `
    },
    5: {
        title: 'Thanks to Our Amazing Donors',
        date: 'February 20, 2024',
        category: 'Community',
        content: `
            <p>A heartfelt thank you to all our donors and supporters who have made this year incredible. Your generosity has enabled us to provide better nutrition, improved facilities, and enhanced educational programs for our children.</p>
            
            <h3>What Your Donations Accomplished</h3>
            <ul>
                <li>Funded the new learning center with 20 computers</li>
                <li>Provided nutritious meals to 300+ children daily</li>
                <li>Established health and wellness programs</li>
                <li>Trained 50 staff members</li>
                <li>Expanded community outreach to 100 more children</li>
            </ul>
            
            <h3>Impact By The Numbers</h3>
            <p>This year alone:</p>
            <ul>
                <li>250 children received care and education</li>
                <li>100+ community children reached through outreach</li>
                <li>98% success rate in education programs</li>
                <li>Zero child malnutrition cases</li>
            </ul>
            
            <h3>Our Commitment</h3>
            <p>We promise to continue being transparent about how funds are used and to maximize the impact of every donation. Together, we're changing lives!</p>
        `
    },
    6: {
        title: 'Valentine\'s Day Celebrations',
        date: 'February 14, 2024',
        category: 'Events',
        content: `
            <p>Our children had a wonderful time celebrating Valentine's Day with games, special meals, and lots of love. These moments remind us of why our work is so important - to fill the lives of children with joy and warmth.</p>
            
            <h3>Celebration Highlights</h3>
            <ul>
                <li>Special Valentine's breakfast with heart-shaped treats</li>
                <li>Craft activities creating Valentine decorations</li>
                <li>Group games and competitions with prizes</li>
                <li>Love and appreciation sharing circle</li>
                <li>Special dinner celebrating unity and friendship</li>
            </ul>
            
            <h3>Children's Reactions</h3>
            <p>The joy on the children's faces was priceless! Many of them had never experienced such celebration before. Through simple gestures of love and care, we reminded them that they are valued and cherished.</p>
            
            <h3>Life Lessons</h3>
            <p>Events like this teach children about:</p>
            <ul>
                <li>The importance of expressing love and gratitude</li>
                <li>Community and belonging</li>
                <li>Creating positive memories together</li>
                <li>Self-worth and acceptance</li>
            </ul>
            
            <p>These are the moments that build character and resilience in our children.</p>
        `
    },
    7: {
        title: 'Skills Training Program Launch',
        date: 'February 10, 2024',
        category: 'Education',
        content: `
            <p>We've introduced vocational training programs to help our older children develop practical skills in carpentry, tailoring, cooking, and other trades. This prepares them for sustainable livelihoods after leaving our care.</p>
            
            <h3>Training Options</h3>
            <ul>
                <li><strong>Carpentry:</strong> Furniture making and woodwork</li>
                <li><strong>Tailoring:</strong> Garment design and sewing</li>
                <li><strong>Cooking:</strong> Professional culinary arts</li>
                <li><strong>Mechanic:</strong> Basic vehicle maintenance</li>
                <li><strong>Agriculture:</strong> Sustainable farming techniques</li>
            </ul>
            
            <h3>Program Details</h3>
            <p>Students receive 6-12 months of intensive training with:</p>
            <ul>
                <li>Experienced instructors and mentors</li>
                <li>Quality tools and materials</li>
                <li>Business skills training</li>
                <li>Job placement assistance</li>
                <li>Certification upon completion</li>
            </ul>
            
            <h3>Success Metrics</h3>
            <p>Our goal is to ensure every youth graduates with:</p>
            <ul>
                <li>Market-ready professional skills</li>
                <li>Business mindset and confidence</li>
                <li>Sustainable income opportunities</li>
                <li>Self-employment capability</li>
            </ul>
        `
    },
    8: {
        title: 'New Dormitory Construction Completed',
        date: 'February 1, 2024',
        category: 'Updates',
        content: `
            <p>The new dormitory building is now complete! It provides comfortable sleeping quarters for 50 more children with modern amenities, better ventilation, and a safe, nurturing environment for rest and recovery.</p>
            
            <h3>Facility Features</h3>
            <ul>
                <li>50 comfortable sleeping spaces with quality mattresses</li>
                <li>Modern bathroom facilities with hot water</li>
                <li>Well-ventilated rooms with natural light</li>
                <li>Climate control for comfort</li>
                <li>Safe, secure building with emergency exits</li>
            </ul>
            
            <h3>Safety & Comfort</h3>
            <p>The dormitory meets all international standards for:</p>
            <ul>
                <li>Child safety and protection</li>
                <li>Healthcare and sanitation</li>
                <li>Fire safety and emergency protocols</li>
                <li>Accessibility for children with disabilities</li>
            </ul>
            
            <h3>Impact</h3>
            <p>This new facility increases our capacity to serve 50 more vulnerable children. Each child now has a safe, comfortable place to sleep and rest, which is essential for their development and wellbeing.</p>
            
            <p>We're grateful to all donors who funded this life-changing project!</p>
        `
    },
    9: {
        title: 'Annual Sports Day 2024',
        date: 'January 25, 2024',
        category: 'Events',
        content: `
            <p>Our annual sports day was a huge success with children participating in various athletic events, team competitions, and fun activities. It was wonderful to see the children laughing, competing, and celebrating together.</p>
            
            <h3>Events Held</h3>
            <ul>
                <li>100-meter dash and relay races</li>
                <li>Long jump and high jump competitions</li>
                <li>Football and basketball tournaments</li>
                <li>Volleyball and badminton matches</li>
                <li>Tug-of-war team competitions</li>
                <li>Three-legged race and fun games</li>
            </ul>
            
            <h3>Participation</h3>
            <p>All 250 children in our care participated in different events based on their age and abilities. Team spirit was evident throughout the day!</p>
            
            <h3>Benefits</h3>
            <p>Sports day provides important benefits:</p>
            <ul>
                <li>Physical fitness and health</li>
                <li>Teamwork and cooperation skills</li>
                <li>Healthy competition and sportsmanship</li>
                <li>Confidence building</li>
                <li>Joy and celebration</li>
                <li>Bonding among children and staff</li>
            </ul>
            
            <p>These events are crucial for developing well-rounded, healthy children!</p>
        `
    }
};

function searchPosts() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const content = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Open blog post modal
function openBlogPost(postNumber) {
    const post = blogPostsData[postNumber];
    if (!post) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.id = 'blogPostModal';
    modal.innerHTML = `
        <div class="modal-content blog-post-modal">
            <span class="close" onclick="closeBlogPost()">&times;</span>
            <h2>${post.title}</h2>
            <div class="blog-post-meta">
                <span class="blog-date">${post.date}</span>
                <span class="blog-category">${post.category}</span>
            </div>
            <div class="blog-post-content">
                ${post.content}
            </div>
            <button class="btn btn-secondary" onclick="closeBlogPost()">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeBlogPost();
        }
    });
}

// Close blog post modal
function closeBlogPost() {
    const modal = document.getElementById('blogPostModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

/* ===========================
   CONTACT FORM HANDLING
   =========================== */

function submitContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    // Create contact object
    const contact = {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        timestamp: new Date().toLocaleString()
    };
    
    // Store in localStorage
    let contacts = localStorage.getItem('contacts');
    contacts = contacts ? JSON.parse(contacts) : [];
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    // Show success message
    alert(`Thank you, ${name}! We received your message and will get back to you soon at ${email}.`);
    
    // Reset form
    event.target.reset();
}

/* ===========================
   NEWSLETTER SUBSCRIPTION
   =========================== */

function subscribeNewsletter(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Store subscription
    let subscribers = localStorage.getItem('newsletter');
    subscribers = subscribers ? JSON.parse(subscribers) : [];
    
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter', JSON.stringify(subscribers));
        alert(`Thank you for subscribing, ${email}! You'll receive our updates.`);
    } else {
        alert('This email is already subscribed!');
    }
    
    event.target.reset();
}

/* ===========================
   SMOOTH SCROLL BEHAVIOR
   =========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/* ===========================
   SCROLL ANIMATIONS
   =========================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards on page load
window.addEventListener('load', function() {
    document.querySelectorAll('.blog-card, .team-member, .faq-card, .stat-card').forEach(el => {
        observer.observe(el);
    });
});

/* ===========================
   ACTIVE PAGE NAVIGATION
   =========================== */

function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('load', updateActiveNav);

/* ===========================
   SCROLL TO TOP BUTTON
   =========================== */

const scrollBtn = document.createElement('button');
scrollBtn.textContent = '↑';
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 999;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollBtn);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
});

scrollBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

scrollBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

/* ===========================
   UTILITY FUNCTIONS
   =========================== */

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Get donations statistics
function getDonationStats() {
    const donations = JSON.parse(localStorage.getItem('donations')) || [];
    return {
        totalDonations: donations.length,
        totalAmount: donations.reduce((sum, d) => sum + parseFloat(d.amount), 0),
        averageDonation: donations.length > 0 ? donations.reduce((sum, d) => sum + parseFloat(d.amount), 0) / donations.length : 0
    };
}

// Log analytics (for future implementation)
function logPageView() {
    const pageView = {
        page: window.location.pathname,
        timestamp: new Date().toLocaleString(),
        referrer: document.referrer
    };
    
    // This can be expanded to send data to an analytics service
    console.log('Page view logged:', pageView);
}

window.addEventListener('load', logPageView);

/* ===========================
   RESPONSIVE ADJUSTMENTS
   =========================== */

function handleResponsive() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        if (navLinks) navLinks.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
}

window.addEventListener('resize', handleResponsive);
