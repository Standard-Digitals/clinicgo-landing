# Clinic Go Process Section - Quick Start Guide

## 🚀 Access the Component

### View the Process Flow
Navigate to: **`/clinic-go-process`**

### Add to Navigation
Edit your navigation component and add:
```tsx
<Link to="/clinic-go-process">Process Flow</Link>
```

## 📋 Component Files

| File | Purpose |
|------|---------|
| `src/components/ui/radial-orbital-timeline.tsx` | Main interactive timeline component |
| `src/components/ClinicGoProcess.tsx` | Clinic-specific wrapper with data |
| `src/pages/ClinicGoProcess.tsx` | Full page with hero section |
| `src/components/ui/badge.tsx` | Status badge component |
| `src/components/ui/button.tsx` | Interactive button component |
| `src/components/ui/card.tsx` | Card container component |

## 🎨 Current Workflow Steps

1. **Patient Registration** - Initial health information
2. **Appointment Booking** - Smart scheduling
3. **Pre-Consultation** - Reminders & questionnaire
4. **Consultation** - Telemedicine or in-clinic
5. **Follow-up & Payment** - Completion & next steps

## ⚙️ Customization

### Change Workflow Steps
Edit `src/components/ClinicGoProcess.tsx`:

```tsx
const clinicProcessData = [
  {
    id: 1,
    title: "Your Step",
    date: "Step 1",
    content: "Description here",
    category: "Category",
    icon: YourIcon, // from lucide-react
    relatedIds: [2], // Connected steps
    status: "completed", // or "in-progress", "pending"
    energy: 100, // 0-100
  },
  // Add more steps...
];
```

### Adjust Animation Speed
In `src/components/ui/radial-orbital-timeline.tsx`, line ~95:

```tsx
// Faster rotation (increase from 0.3)
const newAngle = (prev + 0.5) % 360;

// Slower rotation (decrease from 0.3)
const newAngle = (prev + 0.1) % 360;
```

### Change Orbit Radius
In `src/components/ui/radial-orbital-timeline.tsx`, line ~115:

```tsx
const radius = 250; // Increase for larger orbit (default: 200)
```

### Customize Colors
Update gradient classes in the component:

```tsx
// Center glow colors
from-purple-500 via-blue-500 to-teal-500

// Energy bar colors
from-blue-500 to-purple-500
```

## 🔗 Connected Nodes

Steps can be connected to show relationships:

```tsx
relatedIds: [2, 3, 4] // This step connects to steps 2, 3, and 4
```

When you click a step, connected steps will pulse and highlight.

## 📊 Status Types

| Status | Appearance | Use Case |
|--------|-----------|----------|
| `completed` | White background, black text | Finished steps |
| `in-progress` | Black background, white text | Current step |
| `pending` | Dark background, faded text | Future steps |

## 🎯 Energy Levels

The energy value (0-100) controls:
- Size of the pulsing aura around each node
- Visual intensity indicator
- Displayed as a progress bar in the detail card

## 📱 Responsive Behavior

- Full-screen on desktop
- Optimized for mobile viewing
- Touch-friendly click areas
- Smooth animations on all devices

## 🔧 Dependencies

```json
{
  "@radix-ui/react-slot": "^1.2.4",
  "class-variance-authority": "^0.7.0",
  "lucide-react": "^0.546.0"
}
```

## 🧪 Testing

```bash
# Development
npm run dev

# Build
npm run build

# Type checking
npm run lint
```

Visit: `http://localhost:5173/clinic-go-process`

## 💡 Tips

1. **Icons**: Use any icon from `lucide-react`
2. **Colors**: Tailwind color classes work throughout
3. **Animations**: CSS animations are GPU-accelerated
4. **Performance**: Component optimized for smooth 60fps
5. **Accessibility**: Keyboard navigation supported

## 🐛 Troubleshooting

### Timeline not showing
- Check if route `/clinic-go-process` is added to App.tsx
- Verify component imports are correct
- Check browser console for errors

### Animations stuttering
- Reduce animation speed (increase interval value)
- Check browser performance
- Disable other heavy animations

### Styling issues
- Ensure Tailwind CSS is properly configured
- Check if custom CSS in index.css is loaded
- Verify no CSS conflicts with existing styles

## 📚 Learn More

- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Radix UI](https://www.radix-ui.com)
- [React Hooks](https://react.dev/reference/react)

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: ✅ Production Ready
