import { Calendar, FileText, Users, CheckCircle2, Stethoscope } from "lucide-react";
import RadialOrbitalTimeline from "@/src/components/ui/radial-orbital-timeline";

const clinicProcessData = [
  {
    id: 1,
    title: "Patient Registration",
    date: "Step 1",
    content: "Patient registers and provides initial health information through the portal.",
    category: "Registration",
    icon: Users,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Appointment Booking",
    date: "Step 2",
    content: "Smart scheduler finds optimal appointment slot based on doctor availability.",
    category: "Scheduling",
    icon: Calendar,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Pre-Consultation",
    date: "Step 3",
    content: "Patient receives SMS reminder and completes pre-consultation questionnaire.",
    category: "Preparation",
    icon: FileText,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 4,
    title: "Consultation",
    date: "Step 4",
    content: "Doctor conducts consultation via telemedicine or in-clinic appointment.",
    category: "Service",
    icon: Stethoscope,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 60,
  },
  {
    id: 5,
    title: "Follow-up & Payment",
    date: "Step 5",
    content: "Process payment, schedule follow-up, and send confirmation via SMS/email.",
    category: "Completion",
    icon: CheckCircle2,
    relatedIds: [4],
    status: "pending" as const,
    energy: 40,
  },
];

export function ClinicGoProcessSection() {
  return (
    <div className="w-full bg-white">
      <RadialOrbitalTimeline timelineData={clinicProcessData} lightMode={true} />
    </div>
  );
}

export default ClinicGoProcessSection;
