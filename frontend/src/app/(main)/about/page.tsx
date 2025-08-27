export default function AboutPage() {
  return (
    <div className="container min-w-full py-8 space-y-16 lg:px-8 px-4">
      {/* Hero Section */}
      <Hero />

      {/* Our Story */}
      <OurStory />

      {/* Our Values */}
      <OurValues values={values} />

      {/* Team */}
      <Team team={team} />

      {/* Milestones */}
      <Milestones milestones={milestones} />

      {/* CTA */}
      <CallToAction />
    </div>
  );
}

import { Heart, Shield, Zap, Leaf, Users, Star } from "lucide-react";
import Hero from "@/components/about/Hero";
import OurStory from "@/components/about/OurStory";
import OurValues from "@/components/about/OurValues";
import Team from "@/components/about/Team";
import Milestones from "@/components/about/Milestones";
import CallToAction from "@/components/about/CallToAction";

const values = [
  {
    title: "Quality",
    description:
      "We never compromise on quality, using only the finest materials and craftsmanship in every product we create.",
    icon: Star,
  },
  {
    title: "Sustainability",
    description:
      "We're committed to reducing our environmental impact through responsible sourcing and eco-friendly practices.",
    icon: Leaf,
  },
  {
    title: "Innovation",
    description:
      "We constantly push boundaries to bring you products that combine cutting-edge technology with timeless design.",
    icon: Zap,
  },
  {
    title: "Customer Focus",
    description:
      "Your satisfaction is our priority. We listen to your feedback and continuously improve our products and services.",
    icon: Heart,
  },
  {
    title: "Integrity",
    description:
      "We operate with honesty and transparency in all aspects of our business, building trust with our customers and partners.",
    icon: Shield,
  },
  {
    title: "Community",
    description:
      "We believe in giving back to the communities that support us through charitable initiatives and partnerships.",
    icon: Users,
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Michael Chen",
    role: "Chief Design Officer",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Aisha Patel",
    role: "Head of Product",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "David Rodriguez",
    role: "Customer Experience",
    image: "/placeholder.svg?height=200&width=200",
  },
];

const milestones = [
  {
    year: "2010",
    title: "The Beginning",
    description:
      "Our founder started the company with just three products and a vision to create high-quality, sustainable goods.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    year: "2015",
    title: "Going Global",
    description:
      "We expanded our operations to international markets, bringing our products to customers around the world.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    year: "2018",
    title: "Sustainability Initiative",
    description:
      "We launched our comprehensive sustainability program, committing to carbon neutrality by 2025.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    year: "2023",
    title: "Innovation Hub",
    description:
      "We opened our state-of-the-art innovation center to develop the next generation of products.",
    image: "/placeholder.svg?height=300&width=500",
  },
];
