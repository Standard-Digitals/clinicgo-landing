# Clinic Go - Enterprise Design Guide

## 🎨 Visual Design System

### Color Palette

#### Primary Colors
```
Blue:     #2563eb (rgb(37, 99, 235))
Indigo:   #4f46e5 (rgb(79, 70, 229))
Cyan:     #06b6d4 (rgb(6, 182, 212))
```

#### Semantic Colors
```
Success:  #10b981 (Emerald)
Warning:  #f59e0b (Amber)
Error:    #ef4444 (Red)
Info:     #3b82f6 (Blue)
```

#### Neutral Colors
```
Slate-50:   #f8fafc
Slate-100:  #f1f5f9
Slate-200:  #e2e8f0
Slate-300:  #cbd5e1
Slate-400:  #94a3b8
Slate-500:  #64748b
Slate-600:  #475569
Slate-700:  #334155
Slate-800:  #1e293b
Slate-900:  #0f172a
```

### Gradients

#### Primary Gradient
```
from-blue-600 via-blue-500 to-indigo-600
```

#### Secondary Gradient
```
from-blue-600 to-indigo-600
```

#### Subtle Gradient
```
from-slate-50 to-blue-50
```

---

## 📐 Typography

### Font Family
- **Primary:** System fonts (sans-serif)
- **Fallback:** -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

### Font Sizes

#### Headings
| Level | Size | Weight | Line Height |
|-------|------|--------|-------------|
| H1 | 48px (sm), 64px (md), 84px (lg) | Bold (700) | 1.1 |
| H2 | 36px (sm), 48px (md), 60px (lg) | Bold (700) | 1.2 |
| H3 | 24px (sm), 28px (md), 32px (lg) | Bold (700) | 1.3 |
| H4 | 20px | Semibold (600) | 1.4 |

#### Body Text
| Type | Size | Weight | Line Height |
|------|------|--------|-------------|
| Large | 20px | Regular (400) | 1.6 |
| Base | 16px | Regular (400) | 1.6 |
| Small | 14px | Regular (400) | 1.5 |
| Tiny | 12px | Regular (400) | 1.5 |

#### Labels
| Type | Size | Weight | Tracking |
|------|------|--------|----------|
| Label | 14px | Semibold (600) | 0.05em |
| Badge | 12px | Semibold (600) | 0.1em |
| Caption | 12px | Medium (500) | 0.05em |

---

## 🎯 Spacing System

### Spacing Scale
```
xs:   4px   (0.25rem)
sm:   8px   (0.5rem)
md:   16px  (1rem)
lg:   24px  (1.5rem)
xl:   32px  (2rem)
2xl:  48px  (3rem)
3xl:  64px  (4rem)
4xl:  96px  (6rem)
```

### Common Spacing Patterns

#### Sections
- **Padding:** py-24 (96px top/bottom)
- **Padding:** px-4 sm:px-6 lg:px-8
- **Max Width:** max-w-7xl

#### Cards
- **Padding:** p-8
- **Border Radius:** rounded-xl
- **Gap:** gap-8

#### Buttons
- **Padding:** px-6 py-3 (small), px-8 py-4 (large)
- **Border Radius:** rounded-lg
- **Gap:** gap-2

---

## 🔘 Components

### Buttons

#### Primary Button
```
bg-blue-600 text-white font-semibold rounded-lg
hover:bg-blue-700 active:bg-blue-800
shadow-md shadow-blue-600/30
```

#### Secondary Button
```
bg-slate-100 text-slate-900 font-semibold rounded-lg
hover:bg-slate-200 active:bg-slate-300
border border-slate-200
```

#### Ghost Button
```
text-slate-700 font-medium
hover:text-blue-600 hover:bg-blue-50
rounded-lg px-3 py-2
```

### Cards

#### Feature Card
```
p-8 rounded-xl border border-slate-200 bg-white
hover:border-blue-300 hover:shadow-lg
transition-all duration-300
```

#### Stat Card
```
text-center
text-4xl sm:text-5xl font-bold text-blue-600 mb-2
text-slate-600 font-medium
```

### Badges

#### Status Badge
```
inline-flex items-center gap-2
px-4 py-2 rounded-full
bg-blue-50 border border-blue-200
text-blue-700 text-sm font-semibold
```

---

## 🎬 Animations

### Transitions
```
transition-all duration-300
transition-colors
transition-transform
```

### Hover Effects

#### Card Hover
```
hover:border-blue-300
hover:shadow-lg
transition-all duration-300
```

#### Button Hover
```
hover:bg-blue-700
active:bg-blue-800
transition-all
```

#### Icon Hover
```
group-hover:bg-blue-600
group-hover:text-white
transition-all
```

### Animations

#### Ping Animation
```
animate-ping
```

#### Bounce Animation
```
animate-bounce
```

---

## 📐 Layout Patterns

### Hero Section
```
Grid: lg:grid-cols-2
Gap: gap-12
Left: Content (space-y-8)
Right: Visual (h-[400px] or h-[600px])
```

### Feature Grid
```
Grid: md:grid-cols-2 lg:grid-cols-3
Gap: gap-8
Cards: p-8 rounded-xl border
```

### Stats Section
```
Grid: grid-cols-2 md:grid-cols-4
Gap: gap-8
Text: text-center
```

### Tabbed Section
```
Tabs: flex gap-4 border-b
Content: Grid lg:grid-cols-2 gap-12
```

---

## 🎨 Design Tokens

### Border Radius
```
rounded-lg:   8px
rounded-xl:   12px
rounded-2xl:  16px
rounded-full: 9999px
```

### Shadows
```
shadow-sm:  0 1px 2px 0 rgba(0, 0, 0, 0.05)
shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.1)
shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1)
shadow-xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1)
shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

### Borders
```
border:       1px solid
border-2:     2px solid
border-slate-200: Light gray
border-blue-300:  Light blue
```

---

## 📱 Responsive Breakpoints

### Tailwind Breakpoints
```
sm:  640px   (small devices)
md:  768px   (tablets)
lg:  1024px  (desktops)
xl:  1280px  (large desktops)
2xl: 1536px  (extra large)
```

### Mobile-First Approach
```
Base styles: Mobile (< 640px)
sm:         Small devices (≥ 640px)
md:         Tablets (≥ 768px)
lg:         Desktops (≥ 1024px)
```

---

## ♿ Accessibility

### Color Contrast
- **WCAG AA:** 4.5:1 for text
- **WCAG AAA:** 7:1 for text
- **Large text:** 3:1 minimum

### Focus States
```
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:ring-offset-2
```

### Semantic HTML
- Use `<button>` for buttons
- Use `<a>` for links
- Use `<h1>`, `<h2>`, etc. for headings
- Use `<nav>` for navigation

### ARIA Labels
```
aria-label="Toggle menu"
aria-expanded="true/false"
role="navigation"
```

---

## 🎯 Design Principles

### 1. Clarity
- Clear hierarchy
- Obvious CTAs
- Readable text
- Consistent patterns

### 2. Consistency
- Unified color palette
- Consistent spacing
- Uniform typography
- Predictable interactions

### 3. Accessibility
- High contrast
- Keyboard navigation
- Screen reader support
- Clear focus states

### 4. Performance
- Optimized images
- Minimal animations
- Efficient CSS
- Fast load times

### 5. Responsiveness
- Mobile-first design
- Flexible layouts
- Touch-friendly
- Readable on all sizes

---

## 📊 Component Library

### Icons
- **Library:** Lucide React
- **Size:** w-4 h-4 to w-12 h-12
- **Color:** Inherit from parent or explicit color

### Buttons
- Primary (Blue)
- Secondary (Gray)
- Ghost (Transparent)
- Danger (Red)

### Cards
- Feature cards
- Stat cards
- Content cards
- Interactive cards

### Forms
- Text inputs
- Textareas
- Checkboxes
- Radio buttons
- Select dropdowns

### Navigation
- Top navigation bar
- Mobile menu
- Breadcrumbs
- Tabs

---

## 🚀 Implementation Checklist

- ✅ Color palette defined
- ✅ Typography system established
- ✅ Spacing system implemented
- ✅ Component library created
- ✅ Responsive design applied
- ✅ Accessibility standards met
- ✅ Animations implemented
- ✅ Performance optimized

---

## 📝 Usage Examples

### Hero Section
```jsx
<section className="pt-20 sm:pt-28 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
    {/* Content */}
    {/* Visual */}
  </div>
</section>
```

### Feature Grid
```jsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {features.map((feature) => (
    <div key={feature.id} className="p-8 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg transition-all">
      {/* Content */}
    </div>
  ))}
</div>
```

### Button
```jsx
<button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all shadow-md shadow-blue-600/30">
  Start Free Trial
</button>
```

---

## 🎓 Best Practices

1. **Use consistent spacing** - Follow the spacing scale
2. **Maintain color hierarchy** - Use primary colors strategically
3. **Keep typography readable** - Proper font sizes and line heights
4. **Ensure accessibility** - High contrast and keyboard navigation
5. **Optimize performance** - Minimize animations and images
6. **Test responsiveness** - Check all breakpoints
7. **Follow patterns** - Use established component patterns
8. **Document changes** - Keep design system updated

---

**Design System Version:** 1.0  
**Last Updated:** 2024  
**Status:** Active
