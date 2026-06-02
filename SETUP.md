# Quick Setup Guide

## ⚡ Get Started in 5 Minutes

### Step 1: Add Your Images (Most Important!)
1. Create an `img/` folder in your website directory (already exists)
2. Add the following 32 images:
   - 7 hero slides (`slide1.jpg` - `slide7.jpg`)
   - 9 blog images (`blog1.jpg` - `blog9.jpg`)
   - 12 gallery images (`gallery1.jpg` - `gallery12.jpg`)
   - 4 team photos (`team1.jpg` - `team4.jpg`)

**👉 See `IMAGE_GUIDE.md` for detailed image specifications**

### Step 2: Open the Website
Simply open `index.html` in your web browser. That's it!

### Step 3: Test the Features
- Click "Donate Now" to test donation form
- Try the gallery filters
- Search blog posts
- Test mobile view (press F12, then Ctrl+Shift+M)

### Step 4: Customize Your Content
Edit the HTML files to add:
- Your organization name
- Contact information
- Custom colors (in style.css)
- Blog content
- Team member names

---

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `index.html` | Home page with hero slideshow |
| `about.html` | About us, mission, team |
| `gallery.html` | Image gallery with filters |
| `blog.html` | Blog posts and updates |
| `contact.html` | Contact form and FAQ |
| `style.css` | All styling and layout |
| `script.js` | Interactivity (slideshow, modals, etc.) |
| `README.md` | Full documentation |
| `IMAGE_GUIDE.md` | Image specifications and tips |

---

## 🎨 Customization Checklist

### Basic Customization (5-10 minutes)
- [ ] Add your 32 images to `img/` folder
- [ ] Update organization name in navigation
- [ ] Update phone number and email in footer
- [ ] Update address in footer

### Medium Customization (20-30 minutes)
- [ ] Customize about.html with your story
- [ ] Update team member names and titles
- [ ] Edit blog post titles and descriptions
- [ ] Update contact information on contact.html
- [ ] Add social media links

### Advanced Customization (1-2 hours)
- [ ] Change color scheme (edit CSS variables)
- [ ] Create custom blog posts
- [ ] Reorder gallery categories
- [ ] Add FAQ questions
- [ ] Integrate with email service
- [ ] Add payment gateway for donations

---

## 🚀 Quick Edits

### Change Organization Name
Edit in `index.html` (line ~18):
```html
<h1>Network for Children</h1>
<p>In Need Orphanage Home</p>
```

### Change Contact Info
Edit in all HTML files (footer section):
```html
<p>Phone: +1 (555) 123-4567</p>
<p>Email: info@networkforchildren.org</p>
<p>Address: 123 Hope Street, City, Country</p>
```

### Change Primary Color
Edit in `style.css` (search and replace):
- Change all `#3498db` (blue) to your color
- Change all `#e74c3c` (red) to your color

### Change Slideshow Speed
Edit in `script.js` (line ~45):
```javascript
}, 6000); // Change 6000 to milliseconds (e.g., 5000 = 5 seconds)
```

---

## 🖼️ Placeholder Images

Don't have images yet? Use free stock photos:

### Hero Slides (Inspirational)
- Unsplash: Search "children", "happy", "education"
- Pexels: Search "community", "people", "hope"

### Blog Images (Activity Photos)
- Search relevant keywords on Unsplash/Pexels
- Use Canva to create simple graphics

### Gallery Images (Diverse Activities)
- Mix of action shots and group photos
- Show variety of programs

### Team Photos
- Professional headshots or casual portraits
- Consistent style for polished look

**Free Resources**:
- Unsplash.com
- Pexels.com
- Pixabay.com
- Canva.com

---

## ✅ Testing Checklist

### Before Going Live
- [ ] All images are in `img/` folder with correct names
- [ ] Website opens without errors in Chrome/Firefox
- [ ] Slideshow auto-advances and manual navigation works
- [ ] Gallery filters work correctly
- [ ] Donate button opens form
- [ ] Contact form submits successfully
- [ ] Mobile view looks good (test on phone or with F12)
- [ ] Links navigate correctly
- [ ] No broken images (check console)
- [ ] Page speed is acceptable

### Mobile Testing
Open each page and verify:
- [ ] Navigation hamburger menu works
- [ ] Images load and display properly
- [ ] Text is readable
- [ ] Buttons are clickable
- [ ] Forms work on mobile keyboard
- [ ] Slideshow works on touch devices

---

## 📱 Mobile Optimization

The website is fully responsive! To test:

**Desktop Browser**:
1. Press `F12` to open Developer Tools
2. Press `Ctrl+Shift+M` to enter mobile view
3. Select different device sizes

**Mobile Device**:
1. Open on your phone or tablet
2. Check that everything displays correctly
3. Test touch interactions

---

## 🔧 Troubleshooting

### Images Not Showing?
1. Check filename spelling (case-sensitive on some servers)
2. Verify images are in `img/` folder
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check console for error messages (F12)

### Slideshow Not Working?
1. Check browser console for JavaScript errors
2. Verify `script.js` is loading
3. Try different browser

### Form Not Submitting?
1. Open browser console (F12)
2. Check for error messages
3. Verify form field names match

### Colors Look Wrong?
1. Clear browser cache
2. Hard refresh (Ctrl+F5)
3. Check CSS syntax in style.css

---

## 🌐 Deployment

### Local Testing (No Internet Required)
- Just open `index.html` in any browser
- All features work locally

### Free Hosting Options

**Netlify** (Recommended):
1. Sign up at netlify.com
2. Drag and drop your website folder
3. Get a live URL instantly

**Vercel**:
1. Sign up at vercel.com
2. Connect your GitHub account
3. Deploy in one click

**GitHub Pages**:
1. Create GitHub repository
2. Upload files
3. Enable GitHub Pages in settings

**000webhost**:
1. Sign up (free tier available)
2. Upload files via FTP
3. Get free domain

---

## 💰 Advanced: Payment Integration

To accept real donations, integrate a payment gateway:

### Stripe (Recommended)
- Sign up at stripe.com
- Add payment form to donation modal
- Process payments securely

### PayPal
- Create PayPal account
- Generate checkout buttons
- Add to donation form

### Square
- Set up at squareup.com
- Easy integration
- Competitive rates

See main `README.md` for backend integration details.

---

## 📧 Email Integration

To send confirmation emails:

### SendGrid
1. Sign up (free tier: 100 emails/day)
2. Get API key
3. Call API from backend

### Mailchimp
1. For newsletter subscriptions
2. Free for up to 500 contacts
3. Email automation

### Gmail SMTP
- Use your Gmail account to send emails
- Simple to set up

---

## 📊 Features Summary

### ✨ Already Built-In
- [x] 7-image slideshow with auto-advance
- [x] Responsive galleryith filters
- [x] Full blog system
- [x] Donation form
- [x] Contact form
- [x] FAQ section
- [x] Team showcase
- [x] Statistics
- [x] Newsletter signup
- [x] Mobile menu
- [x] Search functionality
- [x] Scroll animations
- [x] Lightbox gallery
- [x] Data persistence (localStorage)

### 🔄 Quick to Add
- Social media integration
- Google Analytics
- Email notifications
- Payment processing
- Backend database
- Admin panel

---

## 🎓 Learning Resources

### HTML
- MDN Web Docs: developer.mozilla.org/en-US/docs/Web/HTML

### CSS
- CSS-Tricks: css-tricks.com
- MDN CSS Guide: developer.mozilla.org/en-US/docs/Web/CSS

### JavaScript
- JavaScript.info: javascript.info
- MDN JS Guide: developer.mozilla.org/en-US/docs/Web/JavaScript

---

## 📞 Support

### If You Get Stuck
1. **Check the README.md** - Most questions answered there
2. **Check IMAGE_GUIDE.md** - For image-related issues
3. **Browser Console (F12)** - Look for error messages
4. **Test in Different Browser** - Isolate browser-specific issues
5. **Clear Cache** - Often fixes display issues (Ctrl+Shift+Delete)

---

## ✨ Pro Tips

1. **Optimize Images First** - Use TinyPNG before uploading
2. **Test Regularly** - Check site in different browsers
3. **Update Content** - Keep blog posts and gallery fresh
4. **Mobile First** - Test on phone before desktop
5. **Fast Load** - Compress images and minify code
6. **Accessibility** - Add alt text to all images
7. **Security** - Keep backups, use HTTPS when deployed
8. **Analytics** - Add Google Analytics to track visitors

---

## 🎉 Next Steps

1. **Add Images** → Test locally → Customize content
2. **Deploy to Web** → Get feedback → Iterate
3. **Add Email** → Connect to database → Go live!
4. **Promote** → Share on social media → Grow audience

---

**Ready to go live?** Follow this sequence:
1. ✅ Add all images
2. ✅ Test locally
3. ✅ Customize content
4. ✅ Deploy to web host
5. ✅ Test on live server
6. ✅ Share with community

Good luck with your orphanage website! 🌟

---

**Version**: 1.0
**Last Updated**: March 2024
