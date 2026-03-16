# 🛠️ Quick Reference - How to Edit Your Website

## 📝 Most Common Edits

### 1️⃣ **Change Showroom Name**
File: `src/components/Navbar.jsx` (line 11)
```jsx
<h1 className="text-3xl font-bold text-red-500">
  🏍️ Your Showroom Name Here
</h1>
```

Also update in: `src/components/Footer.jsx` (line 13)

---

### 2️⃣ **Update Contact Number**
File: `src/components/Navbar.jsx` - Replace phone number
File: `src/components/Sidebar.jsx` - Replace in href
File: `src/components/Footer.jsx` - Update in contact section
File: `src/pages/Home.jsx` - Update in location section

**Example**: Change `+91 9999 999 999` to your actual number

---

### 3️⃣ **Add/Edit a Bike**
File: `src/data/bikesData.js`

To ADD:
```javascript
{
  id: 11,
  name: "Hero Model Name",
  category: "Commuter", // or "Executive", "Scooter", "Performance"
  price: 85000,
  image: "/images/bike.jpg",
  engine: "156 cc, 4-stroke",
  mileage: "65 km/l",
  topSpeed: "135 km/h",
  color: ["Black", "Red", "Silver"],
  description: "Brief description of bike",
  features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  onRoad: 95000,
  discount: 3000
}
```

To EDIT: Find the bike and update values
To DELETE: Remove the entire bike object

---

### 4️⃣ **Update Bike Prices**
File: `src/data/bikesData.js`
- Change `price` for showroom price
- Change `onRoad` for on-road price
- Change `discount` for current discount

---

### 5️⃣ **Add a Service**
File: `src/data/bikesData.js` → `serviceCategories` array

```javascript
{
  id: 9,
  name: "Bike Wash",
  description: "Professional bike washing with care",
  price: 300,
  time: "30 minutes"
}
```

---

### 6️⃣ **Update Service Prices**
File: `src/data/bikesData.js`
Find the service and change `price` value

---

### 7️⃣ **Change Showroom Address**
File: `src/pages/Home.jsx` (search for "Kagal, Maharashtra")
File: `src/components/Footer.jsx` (update contact section)
Change all instances to your actual address

---

### 8️⃣ **Update Email Address**
File: `src/components/Footer.jsx` - Update email
File: `src/pages/Home.jsx` - Update in location section
File: `src/components/AppointmentForm.jsx` - For form handling

---

### 9️⃣ **Add a Customer Review**
File: `src/data/bikesData.js` → `reviewsData` array

```javascript
{
  id: 6,
  name: "Customer Name",
  rating: 5,
  image: "👨", // or any emoji
  comment: "Their review text here",
  date: "2026-03-01"
}
```

---

### 🔟 **Change Showroom Hours**
File: `src/components/Footer.jsx`
```jsx
<p className="flex items-center gap-2">
  <span>⏰</span>
  <span>Your Hours Here</span>
</p>
```

---

## 🎨 **Color Changes**

### Primary Red (used for buttons, highlights):
Search for: `bg-red-500`, `text-red-500`, `border-red-500`
Replace with: `bg-blue-500`, `text-blue-500`, etc.

### Dark Background:
Search for: `bg-gray-900`, `bg-black`

### Light Background:
Search for: `bg-white`, `bg-gray-50`

---

## 📱 **Emergency Fixes**

### If page looks broken:
1. Check if you saved all files (Ctrl+S)
2. Stop and restart the dev server: `npm run dev`
3. Hard refresh browser: Ctrl+Shift+R

### If calculator doesn't work:
Check `src/data/bikesData.js` - make sure bikes have `onRoad` price

### If links don't work:
Check `src/App.jsx` - routing should be correct

---

## 📁 **File Locations Reference**

| What | Where |
|-----|-------|
| Bike Data | `src/data/bikesData.js` |
| Showroom Name | `src/components/Navbar.jsx` |
| Phone Number | `src/components/Sidebar.jsx` |
| Address/Email | `src/components/Footer.jsx` |
| Homepage Content | `src/pages/Home.jsx` |
| Services List | `src/pages/Services.jsx` |
| Finance Options | `src/pages/Finance.jsx` |
| Bikes Catalog | `src/pages/Bikes.jsx` |
| Reviews Display | `src/pages/Home.jsx` |
| Appointments | `src/components/AppointmentForm.jsx` |

---

## 🎯 **Customization Steps**

### To make website fully yours:

1. **Start with Data** (5 min)
   - Edit `src/data/bikesData.js`
   - Update all 10 bikes with YOUR bikes
   - Update prices with YOUR prices
   - Add YOUR discount amounts

2. **Update Contact Info** (5 min)
   - Navbar: Showroom name
   - Sidebar: Phone number  
   - Footer: All contact details
   - Services/Finance: Address updates

3. **Edit Services** (5 min)
   - Update service names
   - Update service prices
   - Update service descriptions

4. **Update Finance Options** (optional)
   - Update partner names if different
   - Update interest rates
   - Update tenure options

5. **Add Reviews** (optional)
   - Add your actual customer reviews
   - Include 5-star ratings
   - Add customer names

6. **Test Everything**
   - Click all buttons
   - Fill out appointment form
   - Try calculator with different bikes
   - Check all pages load correctly

---

## ⚠️ **Things NOT to Change**

❌ Don't change file names ❌ Don't remove components ❌ Don't delete routes
❌ Don't modify component structure unless you know React
❌ Don't change utility functions in `src/utils/`

✅ Only edit DATA in `src/data/bikesData.js`
✅ Only edit TEXT content in components
✅ Only edit className colors if you know Tailwind

---

## 🚀 **Deploy Your Website**

Once you're happy with changes:

```bash
# Build for production
npm run build

# This creates a 'dist' folder
# Upload to your hosting provider
```

---

## 💡 **Pro Tips**

- Keep a backup of original files
- Change one thing at a time
- Test after each change
- Use Ctrl+F to find and replace
- If something breaks, Ctrl+Z to undo

---

## 📞 **Need Help?**

If you can't find where to edit something:

1. Use Ctrl+F to search for the text you want to change
2. Make the change
3. Save with Ctrl+S
4. Refresh browser

Example: Want to change "🔧 Garage Services" title?
→ Ctrl+F → Search "Garage Services" → Edit text

---

## 🎉 **You're Ready!**

Your website is fully customizable and ready to showcase your showroom to customers. Good luck! 🏍️
