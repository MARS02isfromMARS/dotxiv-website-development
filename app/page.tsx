import React from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Orbit,
  Telescope,
  Sun,
  Sparkles,
  Globe2,
} from 'lucide-react';

const categories = [
  {
    label: '01',
    title: 'Orbital mechanics',
    text: 'From Keplerian motion to perturbation theory.',
    icon: Orbit,
    image: '/images/blackhole.jpg', // Replace with your image path
  },
  {
    label: '02',
    title: 'Observational astronomy',
    text: 'Read the sky through photons, spectra, and surveys.',
    icon: Telescope,
    image: '/images/eye-nebula.jpg', // Replace with your image path
  },
  {
    label: '03',
    title: 'Stellar astronomy',
    text: 'The physics of stars, from birth to remnants.',
    icon: Sun,
    image: '/images/sun-earth.jpg', // Replace with your image path
  },
  {
    label: '04',
    title: 'Galactic astronomy',
    text: 'Structure, dynamics, and the cosmic web.',
    icon: Sparkles,
    image: '/images/satellite.jpg', // Replace with your image path
  },
  {
    label: '05',
    title: 'Cosmology',
    text: 'The origin, evolution, and ultimate fate of the universe.',
    icon: Globe2,
    image: '/images/astronaut.jpg', // Replace with your image path
  },
];

export default function ResourceCategories() {
  return (
    <div className="bg-black p-4 sm:p-8 min-h-screen text-white font-sans">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon;

          return (
            <div
              key={category.label}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900 min-h-[300px] p-6 flex flex-col justify-between transition-all duration-300 hover:border-white/30"
            >
              {/* Background Space Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-50"
                style={{ backgroundImage: `url(${category.image})` }}
              />

              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

              {/* Top Row: Category Label & Icon */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400 tracking-wider">
                  {category.label}
                </span>
                <div className="p-2.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-neutral-200">
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Content: Title, Subtext & Action Link */}
              <div className="relative z-10 space-y-2.5">
                <h3 className="text-2xl font-medium tracking-tight text-white">
                  {category.title}
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed max-w-sm">
                  {category.text}
                </p>

                <div className="pt-2">
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1.5 text-xs text-neutral-300 group-hover:text-white transition-colors"
                  >
                    <span>Click to explore</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
