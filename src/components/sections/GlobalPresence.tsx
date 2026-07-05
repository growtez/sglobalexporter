"use client";

import { useRef, memo, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import * as d3 from "d3-geo";
import * as topojson from "topojson-client";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const regions = [
  { name: "United Kingdom", region: "Europe", flag: "🇬🇧", coords: [-3.4359, 55.3781] },
  { name: "Germany", region: "Europe", flag: "🇩🇪", coords: [10.4515, 51.1656] },
  { name: "France", region: "Europe", flag: "🇫🇷", coords: [2.2137, 46.2276] },
  { name: "United States", region: "North America", flag: "🇺🇸", coords: [-95.7129, 37.0902] },
  { name: "Canada", region: "North America", flag: "🇨🇦", coords: [-106.3467, 56.1303] },
  { name: "UAE", region: "Middle East", flag: "🇦🇪", coords: [53.8478, 23.424] },
  { name: "Saudi Arabia", region: "Middle East", flag: "🇸🇦", coords: [45.0791, 23.8859] },
  { name: "Australia", region: "Oceania", flag: "🇦🇺", coords: [133.7751, -25.2743] },
  { name: "Japan", region: "Asia", flag: "🇯🇵", coords: [138.2529, 36.2048] },
  { name: "Singapore", region: "Asia", flag: "🇸🇬", coords: [103.8198, 1.3520] },
  { name: "Malaysia", region: "Asia", flag: "🇲🇾", coords: [101.9757, 4.2104] },
  { name: "South Africa", region: "Africa", flag: "🇿🇦", coords: [22.9375, -30.5594] },
];

const originCoord = [94.0166, 26.1420]; // Assam roughly

const MapChart = memo(() => {
  const [geographies, setGeographies] = useState<any[]>([]);

  useEffect(() => {
    fetch(geoUrl)
      .then((res) => res.json())
      .then((topology) => {
        // @ts-ignore
        const geos = topojson.feature(topology, topology.objects.countries).features;
        setGeographies(geos);
      });
  }, []);

  const width = 800;
  const height = 450;

  // geoEqualEarth for accurate relative sizes, matching previous look
  const projection = d3.geoEqualEarth()
    .scale(160)
    .translate([width / 2, height / 2]);
    
  const pathGenerator = d3.geoPath().projection(projection);

  const getCoords = (coords: [number, number]) => projection(coords) || [0, 0];
  const origin = getCoords(originCoord as [number, number]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[400px]">
      <g>
        {geographies.map((geo, i) => (
          <path
            key={`geo-${i}`}
            d={pathGenerator(geo) || ""}
            fill="hsl(150,20%,88%)"
            stroke="hsl(150,15%,80%)"
            strokeWidth={0.5}
            className="hover:fill-[#b5d5c5] transition-colors outline-none cursor-default"
          />
        ))}
      </g>

      {/* Connection Lines from Assam to destinations */}
      <g>
        {regions.map((region) => {
          const dest = getCoords(region.coords as [number, number]);
          return (
            <line
              key={`line-${region.name}`}
              x1={origin[0]}
              y1={origin[1]}
              x2={dest[0]}
              y2={dest[1]}
              stroke="hsl(43,65%,52%)"
              strokeWidth={1.5}
              strokeDasharray="2 3"
              opacity={0.6}
            />
          );
        })}
      </g>
      
      {/* Markers for Destinations */}
      <g>
        {regions.map((region) => {
          const dest = getCoords(region.coords as [number, number]);
          return (
            <circle
              key={`marker-${region.name}`}
              cx={dest[0]}
              cy={dest[1]}
              r={6}
              fill="hsl(43,65%,52%)"
            />
          );
        })}
      </g>

      {/* Marker for Origin */}
      <g>
        <circle cx={origin[0]} cy={origin[1]} r={9} fill="hsl(150,35%,20%)" />
        <circle cx={origin[0]} cy={origin[1]} r={15} fill="none" stroke="hsl(150,35%,20%)" strokeWidth={1.5} opacity={0.4} />
      </g>
    </svg>
  );
});
MapChart.displayName = "MapChart";

export default function GlobalPresence() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="global-presence"
      ref={ref}
      className="py-8 md:py-10 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="text-gold text-sm uppercase tracking-[0.3em] font-medium mb-4 block">
            Our Reach
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-forest mb-4">
            Global Presence
          </h2>
          <div className="h-px w-24 bg-gold mx-auto opacity-60 mt-6" />
          <p className="mt-6 text-stone-500 max-w-xl mx-auto text-lg font-light">
            From the Brahmaputra Valley to 30+ countries across 6 continents.
          </p>
        </motion.div>

        {/* World Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto rounded-3xl bg-forest/5 border border-forest/10 p-2 md:p-4 mb-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-forest/5 via-transparent to-gold/5 rounded-3xl" />
          
          <div className="relative z-10 w-full h-[300px] md:h-[400px] flex items-center justify-center">
            {mounted ? (
              <MapChart />
            ) : (
              <div className="w-full h-full bg-forest/5 animate-pulse rounded-2xl" />
            )}
          </div>
          
          {/* Legend */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[hsl(150,35%,20%)]" />
              <span className="text-xs text-stone-600">Origin — Assam, India</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[hsl(43,65%,52%)]" />
              <span className="text-xs text-stone-600">Export Destination</span>
            </div>
          </div>
        </motion.div>

        {/* Countries Grid (Compact) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {regions.map((country, i) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-50 border border-stone-100 hover:border-gold/40 hover:bg-gold/5 transition-colors cursor-default"
                title={`${country.name} (${country.region})`}
              >
                <span className="text-base leading-none">{country.flag}</span>
                <span className="text-xs font-medium text-stone-700 truncate">
                  {country.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
