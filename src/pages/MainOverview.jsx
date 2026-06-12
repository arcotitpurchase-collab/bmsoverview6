import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Gauge, Activity, Cpu, ArrowDown, ShieldAlert, ChevronDown, ChevronUp } from "lucide-react";

export default function MainOverview() {
  const [transformersExpanded, setTransformersExpanded] = useState(false);

  const outgoing = [
    { name: "OG-1", transformer: "TR-1" },
    { name: "OG-2", transformer: "TR-2" },
    { name: "OG-3", transformer: "TR-3" },
    { name: "OG-4", transformer: "TR-4" },
    { name: "OG-5", transformer: "TR-5" },
    { name: "OG-6", transformer: "TR-6" },
  ];

  const transformers = [
    { id: "TR-1", oilTemp: "54°C", windingTemp: "61°C", buchholz: "Healthy", load: "68%" },
    { id: "TR-2", oilTemp: "52°C", windingTemp: "59°C", buchholz: "Healthy", load: "62%" },
    { id: "TR-3", oilTemp: "55°C", windingTemp: "60°C", buchholz: "Healthy", load: "71%" },
    { id: "TR-4", oilTemp: "53°C", windingTemp: "58°C", buchholz: "Healthy", load: "65%" },
    { id: "TR-5", oilTemp: "56°C", windingTemp: "63°C", buchholz: "Healthy", load: "74%" },
    { id: "TR-6", oilTemp: "51°C", windingTemp: "57°C", buchholz: "Healthy", load: "60%" },
  ];

  // Helper component for animated vertical lines
  const VerticalConnector = ({ height = "h-12", label = "" }) => (
    <div className="flex flex-col items-center w-full">
      <div className={`flow-line-vertical ${height}`}>
        <div className="flow-pulse-vertical" />
      </div>
      {label && (
        <span className="text-[10px] font-300 tracking-widest uppercase text-[#004AAD] mt-1">
          {label}
        </span>
      )}
    </div>
  );

  // Helper component for busbar equipment blocks
  const BusbarBlock = ({ name, voltage }) => (
    <div className="w-full max-w-4xl mx-auto my-4 busbar-glow-bg border-2 border-[#004AAD] p-4 text-center rounded shadow-lg relative">
      <div className="busbar-glow-element" />
      <div className="relative z-10 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-300 text-blue-200 tracking-wider">SYSTEM BUSBAR ACTIVE</span>
        </div>
        <h3 className="text-xl font-300 text-white tracking-widest">{name}</h3>
        <span className="bg-[#004AAD] border border-blue-400 text-white text-xs font-300 px-3 py-1 rounded">
          {voltage}
        </span>
      </div>
    </div>
  );

  const [kiosksExpanded, setKiosksExpanded] = useState(false);
  const [busbarsExpanded, setBusbarsExpanded] = useState(false);

  // Helper component for building tower UI
  const BuildingTower = ({ id, name, floors, clients }) => (
    <Link
      to={`/building/${id}`}
      className="group flex flex-col md:flex-row items-center gap-6 bg-[#081F5C] border-2 border-[#004AAD] p-6 hover-lift text-white rounded shadow-xl w-full"
    >
      {/* Tower Graphic */}
      <div className="relative w-28 h-56 bg-[#05143C] border border-blue-900 rounded-t p-2 flex flex-col justify-between overflow-hidden shadow-inner shrink-0">
        {/* Sky antenna */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-[#004AAD]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>

        {/* Helipad glow */}
        <div className="h-[2px] w-full bg-[#004AAD] shadow-[0_0_10px_#00E5FF]" />

        {/* Windows layout representing 20 floors */}
        <div className="grid grid-cols-4 gap-1.5 h-44 overflow-hidden py-1">
          {Array.from({ length: 48 }).map((_, idx) => (
            <span
              key={idx}
              className="h-2 rounded-sm transition-colors duration-300 bg-white/10 group-hover:bg-[#00E5FF]/40 shadow-[0_0_2px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_4px_rgba(0,229,255,0.4)]"
            />
          ))}
        </div>

        {/* Tower Base */}
        <div className="h-2 w-full bg-[#004AAD]" />
      </div>

      {/* Info details */}
      <div className="flex-1 text-center md:text-left">
        <span className="text-[10px] font-300 tracking-widest text-blue-300 uppercase">
          Digital Twin Node
        </span>
        <h3 className="text-2xl font-300 text-white tracking-wide mt-1 group-hover:text-blue-200 transition-colors">
          {name}
        </h3>
        <div className="mt-3 grid grid-cols-2 gap-2 text-left">
          <div className="bg-[#05143C] p-2 border border-blue-950">
            <span className="text-[9px] text-blue-300 font-300 block">HEIGHT</span>
            <strong className="text-sm font-extrabold">{floors} FLOORS</strong>
          </div>
          <div className="bg-[#05143C] p-2 border border-blue-950">
            <span className="text-[9px] text-blue-300 font-300 block">TENANTS</span>
            <strong className="text-sm font-300">{clients} ZONES</strong>
          </div>
        </div>
        {/* <p className="mt-3 text-xs text-blue-100 font-medium leading-relaxed">
          Click tower console to view floor blueprints and active HVAC / EMS energy telemetry.
        </p>
        <span className="mt-4 inline-flex items-center gap-1 bg-[#004AAD] text-white text-xs font-black px-4 py-2 hover:bg-[#003b8a] transition-colors border border-blue-400">
          ENTER CONSOLE
        </span> */}
      </div>
    </Link>
  );

  return (
    <main className="min-h-screen bg-white text-[#081F5C] flex flex-col font-sans">

      {/* SCADA Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#081F5C] border-b-4 border-[#004AAD] px-6 py-4 text-white shadow-md">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#004AAD] p-2 rounded shadow">
              <Cpu className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-[9px] font-black tracking-[0.3em] text-blue-300 uppercase">
                Enterprise Building Management System
              </p>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                BMS Command Control Overview
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3.5 py-1.5 text-xs font-extrabold tracking-wider text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              SCADA CONNECTED
            </span>
          </div>
        </div>
      </header>

      {/* Main Single Line Diagram Console */}
      <section className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        <div className="bg-slate-50 border border-slate-200 p-6 md:p-10 shadow-inner rounded-lg">

          {/* Section Heading */}
          <div className="mb-8 border-b-2 border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-black text-[#081F5C] tracking-wide uppercase">
                Electrical Mimic Single Line Diagram (SLD)
              </h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Visualizing physical power distribution path from incoming utility feeders to end-user tenants.
              </p>
            </div>
            <strong className="text-xs bg-[#081F5C] text-white px-3 py-1 font-bold">33kV / 433V GRID</strong>
          </div>

          {/* 1. SOURCE SECTION */}
          <div className="max-w-3xl mx-auto bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white shadow-lg relative panel-active-glow rounded-md">
            <div className="absolute top-3 right-3 flex gap-2">
              <span className="flex items-center gap-1 bg-[#05143C] border border-emerald-500 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded shadow-[0_0_8px_rgba(52,211,153,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>

            <div className="text-center pb-4 mb-4 border-b border-blue-900/60">
              <span className="text-[10px] font-black text-blue-300 tracking-[0.2em] block uppercase">CENTRAL CONTROL PANEL</span>
              <h3 className="text-2xl font-black mt-1 text-white tracking-widest">33kV SOURCE PANELS</h3>
              <p className="text-xs text-blue-200 mt-1 font-semibold">Dual high-tension grid utility connection monitoring node</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Feeder 1 */}
              <div className="bg-[#05143C] border border-[#004AAD] p-4 rounded relative">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-black text-blue-300 tracking-wider uppercase">SOURCE 1 (MAINGRID)</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#34d399]" />
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="bg-[#081F5C] p-2 border border-blue-900 rounded">
                    <Zap className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-xl font-black block tracking-wide text-white">33.0 kV</span>
                    <span className="text-[10px] font-bold text-emerald-400">ACTIVE FEEDER</span>
                  </div>
                </div>
              </div>

              {/* Feeder 2 */}
              <div className="bg-[#05143C] border border-[#004AAD] p-4 rounded relative opacity-90">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-black text-blue-300 tracking-wider uppercase">SOURCE 2 (DG STANDBY)</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-[0_0_6px_#fbbf24]" />
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="bg-[#081F5C] p-2 border border-blue-900 rounded">
                    <Zap className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xl font-black block tracking-wide text-white">33.0 kV</span>
                    <span className="text-[10px] font-bold text-amber-300">STANDBY MODE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Animated Split Lines (Source -> Incomings) */}
          <div className="w-full max-w-4xl mx-auto h-16 relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#00E5FF" />
                </marker>
              </defs>
              {/* Static Background Path */}
              <path d="M 400 0 V 32 H 200 V 64 M 400 32 H 600 V 64" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              {/* Animated Flow Path Left */}
              <path d="M 400 0 V 32 H 200 V 64" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="flow-path-left" markerEnd="url(#arrow-cyan)" />
              {/* Animated Flow Path Right */}
              <path d="M 400 0 V 32 H 600 V 64" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="flow-path-right" markerEnd="url(#arrow-cyan)" />
            </svg>
          </div>

          {/* 2. INCOMING SECTION (Side-by-Side) */}
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Incoming 1 */}
            <div className="bg-[#081F5C] border-2 border-[#004AAD] p-5 text-white shadow-md relative panel-active-glow rounded-md">
              <div className="absolute top-2 right-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#34d399]" />
              </div>
              <span className="text-[9px] font-black text-blue-300 tracking-wider block uppercase">FEEDER BREAKER 1</span>
              <h4 className="text-lg font-black mt-1 text-white">Incoming 1</h4>

              <div className="mt-4 grid grid-cols-2 gap-2 bg-[#05143C] p-3 border border-blue-900">
                <div>
                  <span className="text-[9px] text-blue-300 font-bold block">VOLTAGE</span>
                  <strong className="text-sm font-extrabold text-white">33.0 kV</strong>
                </div>
                <div>
                  <span className="text-[9px] text-blue-300 font-bold block">BREAKER</span>
                  <strong className="text-sm font-extrabold text-emerald-400">CLOSED / ON</strong>
                </div>
              </div>
            </div>

            {/* Incoming 2 */}
            <div className="bg-[#081F5C] border-2 border-[#004AAD] p-5 text-white shadow-md relative panel-active-glow rounded-md">
              <div className="absolute top-2 right-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#34d399]" />
              </div>
              <span className="text-[9px] font-black text-blue-300 tracking-wider block uppercase">FEEDER BREAKER 2</span>
              <h4 className="text-lg font-black mt-1 text-white">Incoming 2</h4>

              <div className="mt-4 grid grid-cols-2 gap-2 bg-[#05143C] p-3 border border-blue-900">
                <div>
                  <span className="text-[9px] text-blue-300 font-bold block">VOLTAGE</span>
                  <strong className="text-sm font-extrabold text-white">33.0 kV</strong>
                </div>
                <div>
                  <span className="text-[9px] text-blue-300 font-bold block">BREAKER</span>
                  <strong className="text-sm font-extrabold text-emerald-400">CLOSED / ON</strong>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Animated Merge Lines (Incomings -> Outgoing) */}
          <div className="w-full max-w-4xl mx-auto h-16 relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Static Background Path */}
              <path d="M 200 0 V 32 H 400 V 64 M 600 0 V 32 H 400" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              {/* Animated Flow Path Left */}
              <path d="M 200 0 V 32 H 400 V 64" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="flow-path-left" markerEnd="url(#arrow-cyan)" />
              {/* Animated Flow Path Right */}
              <path d="M 600 0 V 32 H 400 V 64" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="flow-path-right" markerEnd="url(#arrow-cyan)" />
            </svg>
          </div>

          {/* 3. 33kV OUTGOING PANEL */}
          <div className="w-full max-w-4xl mx-auto my-2 busbar-glow-bg border-2 border-[#004AAD] p-5 text-center rounded shadow-lg relative panel-active-glow">
            <div className="busbar-glow-element" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-black text-blue-200 tracking-wider">OUTGOING BUSBAR ENERGIZED</span>
              </div>
              <h3 className="text-xl font-black text-white tracking-widest">33kV OUTGOING</h3>
              <div className="flex gap-4">
                <span className="bg-[#05143C] border border-[#004AAD] text-emerald-400 text-xs font-extrabold px-3 py-1 rounded">
                  33.0 kV
                </span>
                <span className="bg-[#05143C] border border-[#004AAD] text-white text-xs font-extrabold px-3 py-1 rounded">
                  50.0 Hz
                </span>
              </div>
            </div>
          </div>

          <VerticalConnector height="h-10" label="Feeder Bus Connection" />

          {/* 4. 33kV FEEDER PANEL */}
          <div className="w-full max-w-5xl mx-auto my-4 bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white shadow-lg relative panel-active-glow rounded-md">
            <div className="text-center pb-4 mb-4 border-b border-blue-900/60">
              <span className="text-[10px] font-black text-blue-300 tracking-[0.2em] block uppercase">FEEDER SWITCHGEAR PANEL</span>
              <h3 className="text-xl font-black text-white tracking-widest mt-1">33kV FEEDER PANEL</h3>
            </div>

            {/* 1. INCOMING FEEDER Section */}
            <div className="mb-4">
              <div className="max-w-xs mx-auto bg-[#05143C] border border-[#004AAD] p-4 text-center rounded relative">
                <span className="text-[9px] font-black text-blue-300 tracking-wider block uppercase">INCOMING FEEDER</span>
                <strong className="text-sm font-black text-white mt-1 block">INCOMING FEEDER 1</strong>
                <div className="mt-2 flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  CONNECTED / ACTIVE
                </div>
              </div>
            </div>

            {/* Animated Split SVG Flow Lines inside the panel */}
            <div className="w-full h-12 relative my-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 960 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrow-cyan-small" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 2 L 6 5 L 0 8 z" fill="#00E5FF" />
                  </marker>
                </defs>
                {/* Background line bus split */}
                <path d="M 480 0 V 16 H 80 V 48 M 80 16 H 240 V 48 M 240 16 H 400 V 48 M 400 16 H 560 V 48 M 560 16 H 720 V 48 M 720 16 H 880 V 48" stroke="#004AAD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Animated Flow Lines */}
                <path d="M 480 0 V 16 H 80 V 48" stroke="#00E5FF" strokeWidth="2.5" className="flow-path-left" markerEnd="url(#arrow-cyan-small)" />
                <path d="M 480 0 V 16 H 240 V 48" stroke="#00E5FF" strokeWidth="2.5" className="flow-path-left" markerEnd="url(#arrow-cyan-small)" />
                <path d="M 480 0 V 16 H 400 V 48" stroke="#00E5FF" strokeWidth="2.5" className="flow-path-left" markerEnd="url(#arrow-cyan-small)" />
                <path d="M 480 0 V 16 H 560 V 48" stroke="#00E5FF" strokeWidth="2.5" className="flow-path-right" markerEnd="url(#arrow-cyan-small)" />
                <path d="M 480 0 V 16 H 720 V 48" stroke="#00E5FF" strokeWidth="2.5" className="flow-path-right" markerEnd="url(#arrow-cyan-small)" />
                <path d="M 480 0 V 16 H 880 V 48" stroke="#00E5FF" strokeWidth="2.5" className="flow-path-right" markerEnd="url(#arrow-cyan-small)" />
              </svg>
            </div>

            {/* 2. OUTGOING FEEDERS Section (Grid of 6) */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 mt-2">
              {outgoing.map((item) => (
                <div
                  key={item.name}
                  className="bg-[#05143C] border border-[#004AAD] p-4 text-center text-white shadow rounded"
                >
                  <span className="text-[9px] font-bold text-blue-300 block">FEEDER</span>
                  <strong className="text-lg font-black block tracking-wider mt-1">{item.name}</strong>
                  <p className="text-[10px] text-blue-100 font-bold mt-1">To {item.transformer}</p>
                  <div className="mt-3 flex items-center justify-center gap-1.5 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
                    <span className="text-xs font-black">ON</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connectors to Transformers (Collapsed/Header Feed) */}
          {!transformersExpanded && (
            <VerticalConnector height="h-10" label="Transformer Feed" />
          )}

          {/* 6. 33/0.433kV TRANSFORMERS CENTRAL CARD */}
 <div className="flex justify-center w-full my-3">
  <div
    onClick={() => setTransformersExpanded(!transformersExpanded)}
    className="w-[90%] md:w-[70%] lg:w-[45%] h-32 max-w-xl bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-lg rounded-md cursor-pointer hover:bg-[#0A276E] transition-colors"
  >
    <div className="h-full flex flex-col items-center justify-center text-center">

      {/* Transformer Icon */}
      <svg
        className="w-16 h-10 text-blue-300 mb-2"
        viewBox="0 0 60 30"
        fill="none"
      >
        <circle
          cx="20"
          cy="15"
          r="12"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <circle
          cx="40"
          cy="15"
          r="12"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>

      {/* Text */}
      <span className="text-[10px] font-black text-blue-300 tracking-[0.2em] uppercase">
        STEP-DOWN SUBSTATION
      </span>

      <h3 className="text-lg font-black text-white tracking-wider mt-1">
        33 / 0.433kV TRANSFORMERS
      </h3>

    </div>
  </div>
</div>

          {/* Expanded details container */}
        <div
  className={`transition-all duration-500 ease-in-out overflow-hidden ${
    transformersExpanded
      ? "max-h-[2000px] opacity-100"
      : "max-h-0 opacity-0 pointer-events-none"
  }`}
>
  {/* Flow from top transformer box */}
  <div className="flex justify-center h-10">
    <div className="flow-line-vertical h-full">
      <div className="flow-pulse-vertical" />
    </div>
  </div>

  {/* Transformer row */}
  <div className="max-w-7xl mx-auto px-4">

    {/* Horizontal bus without extra left/right line */}
    <div className="mx-auto w-[84%] h-[2px] bg-cyan-400 relative overflow-hidden">
      <div className="flow-pulse-horizontal" />
    </div>

    {/* 6 Transformers in same line */}
    <div className="grid grid-cols-6 gap-4">
      {transformers.map((tf) => (
        <div key={tf.id} className="flex flex-col items-center">

          {/* Vertical drop line */}
          <div className="flow-line-vertical h-8">
            <div className="flow-pulse-vertical" />
          </div>

          {/* Transformer Card */}
          <div className="w-full bg-[#081F5C] border-2 border-[#004AAD] p-4 text-white shadow-md flex flex-col justify-between rounded relative panel-active-glow min-h-[200px]">
            <div>
              <div className="mb-3 flex justify-center items-center">
                <svg
                  className="w-14 h-8 text-blue-300"
                  viewBox="0 0 60 30"
                  fill="none"
                >
                  <circle
                    cx="20"
                    cy="15"
                    r="12"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="40"
                    cy="15"
                    r="12"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>

              <strong className="text-base font-black block text-center tracking-widest">
                {tf.id}
              </strong>

              <span className="text-[9px] font-bold text-blue-300 text-center block uppercase">
                33kV / 433V TX
              </span>
            </div>

            <div className="mt-4 space-y-2 border-t border-blue-900 pt-3">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-blue-200">Oil Temp:</span>
                <span className="font-extrabold text-white">
                  {tf.oilTemp}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px]">
                <span className="text-blue-200">Wind Temp:</span>
                <span className="font-extrabold text-white">
                  {tf.windingTemp}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px]">
                <span className="text-blue-200">Relay:</span>
                <span className="font-extrabold text-emerald-400">
                  {tf.buchholz}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px]">
                <span className="text-blue-200">Load:</span>
                <span className="font-extrabold text-white">
                  {tf.load}
                </span>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
  </div>
</div>

          {/* Stepped-Down Feed to LT Kiosk */}
          {transformersExpanded ? (
            <div className="w-full max-w-4xl mx-auto grid grid-cols-6 h-12 px-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex justify-center h-full">
                  <div className="flow-line-vertical h-full">
                    <div className="flow-pulse-vertical" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <VerticalConnector height="h-10" label="Stepped-Down Feed" />
          )}

          {/* 7. COMMON LT KIOSK */}
          {/* <div className="max-w-4xl mx-auto bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white shadow-xl">
            <div className="text-center">
              <span className="text-[10px] font-black text-blue-300 tracking-wider block uppercase">STEP-DOWN COMBINER PANEL</span>
              <h3 className="text-2xl font-black tracking-widest text-white mt-1"> LT KIOSK</h3>
              <p className="text-xs text-blue-200 mt-1 font-semibold">Collects stepped-down 433V lines from all 6 transformers</p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-blue-900 pt-4">
              <div className="bg-[#05143C] border border-blue-900 p-4 text-center">
                <span className="text-[10px] text-blue-200 block font-bold">BUSBAR VOLTAGE</span>
                <strong className="text-2xl font-black text-white block mt-1">433 V</strong>
              </div>
              <div className="bg-[#05143C] border border-blue-900 p-4 text-center">
                <span className="text-[10px] text-blue-200 block font-bold">TOTAL CURRENT</span>
                <strong className="text-2xl font-black text-white block mt-1">2430 A</strong>
              </div>
              <div className="bg-[#05143C] border border-blue-900 p-4 text-center">
                <span className="text-[10px] text-blue-200 block font-bold">POWER FACTOR (PF)</span>
                <strong className="text-2xl font-black text-white block mt-1">0.98</strong>
              </div>
            </div>
          </div> */}

          <div className="flex justify-center w-full my-3">
  <div
    onClick={() => setKiosksExpanded(!kiosksExpanded)}
    className="w-[90%] md:w-[70%] lg:w-[45%] h-32 max-w-xl bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-lg rounded-md cursor-pointer hover:bg-[#0A276E] transition-colors"
  >
    <div className="h-full flex flex-col items-center justify-center text-center">
      <span className="text-[10px] font-black text-blue-300 tracking-[0.2em] uppercase">
        STEP-DOWN COMBINER PANEL
      </span>

      <h3 className="text-lg font-black text-white tracking-wider mt-1">
        LT KIOSK
      </h3>
    </div>
  </div>
</div>

<div
  className={`transition-all duration-500 ease-in-out overflow-hidden ${
    kiosksExpanded
      ? "max-h-[2000px] opacity-100"
      : "max-h-0 opacity-0 pointer-events-none"
  }`}
>
  <div className="flex justify-center h-10">
    <div className="flow-line-vertical h-full">
      <div className="flow-pulse-vertical" />
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-4">
    <div className="mx-auto w-[84%] h-[2px] bg-cyan-400 relative overflow-hidden">
      <div className="flow-pulse-horizontal" />
    </div>

    <div className="grid grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="flow-line-vertical h-8">
            <div className="flow-pulse-vertical" />
          </div>

          <div className="w-full bg-[#081F5C] border-2 border-[#004AAD] p-4 text-white shadow-md rounded relative panel-active-glow min-h-[200px] flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-black text-blue-300 uppercase tracking-wider">
              LT KIOSK
            </span>

            <strong className="text-xl font-black tracking-widest mt-2">
              KIOSK-{index + 1}
            </strong>

            <span className="text-[9px] font-bold text-blue-300 uppercase mt-1">
              433V PANEL
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

          <VerticalConnector height="h-10" />

          {/* 8. LT BUSBAR */}
          {/* <BusbarBlock name="COMMON LT BUSBAR (433V)" voltage="433V" />

          <VerticalConnector height="h-14" label="Building Distribution Lines" /> */}

<div className="flex justify-center w-full my-3">
  <div
    onClick={() => setBusbarsExpanded(!busbarsExpanded)}
    className="w-[90%] md:w-[70%] lg:w-[45%] h-32 max-w-xl bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-lg rounded-md cursor-pointer hover:bg-[#0A276E] transition-colors"
  >
    <div className="h-full flex flex-col items-center justify-center text-center">

      <span className="text-[10px] font-black text-blue-300 tracking-[0.2em] uppercase">
        POWER DISTRIBUTION
      </span>

      <h3 className="text-lg font-black text-white tracking-wider mt-1">
         LT BUSBAR
      </h3>

      <span className="text-xs text-blue-300 mt-1">
        433V
      </span>

    </div>
  </div>
</div>

<div
  className={`transition-all duration-500 ease-in-out overflow-hidden ${
    busbarsExpanded
      ? "max-h-[2000px] opacity-100"
      : "max-h-0 opacity-0 pointer-events-none"
  }`}
>

  {/* Flow */}
  <div className="flex justify-center h-10">
    <div className="flow-line-vertical h-full">
      <div className="flow-pulse-vertical" />
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-4">

    {/* Horizontal Bus */}
    <div className="mx-auto w-[84%] h-[2px] bg-cyan-400 relative overflow-hidden">
      <div className="flow-pulse-horizontal" />
    </div>

   {/* 6 LT Busbars */}
<div className="grid grid-cols-6 gap-4">
  {Array.from({ length: 6 }).map((_, index) => (
    <div key={index} className="flex flex-col items-center">

      <div className="flow-line-vertical h-8">
        <div className="flow-pulse-vertical" />
      </div>

      <div className="w-full bg-[#081F5C] border-2 border-[#004AAD] p-4 text-white shadow-md rounded relative panel-active-glow min-h-[200px] flex flex-col items-center justify-center">
        <span className="text-[10px] font-black text-blue-300 uppercase tracking-wider">
          LT BUSBAR
        </span>

        <strong className="text-xl font-black tracking-widest mt-2">
          BUS-{index + 1}
        </strong>

        <span className="text-[9px] font-bold text-blue-300 uppercase mt-1">
          433V
        </span>
      </div>

    </div>
  ))}
</div>

  </div>

</div>

{/* Flow below all 6 busbars like LT Kiosk */}
<div className="flex justify-center h-14">
  <div className="flow-line-vertical h-full">
    <div className="flow-pulse-vertical" />
  </div>
</div>



          {/* 9. SKY-1 / SKY-2 BUILDINGS */}
          <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
            <BuildingTower id="sky-1" name="WING-A BUILDING" floors={20} clients={40} />
            <BuildingTower id="sky-2" name="WING-B BUILDING" floors={20} clients={40} />
          </div>

        </div>
      </section>

      {/* Footer System Diagnostics */}
      <footer className="bg-slate-100 border-t border-slate-200 py-6 px-6 text-slate-500 text-xs">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 font-semibold">
          <p>© 2026 Arcot Industries. All systems operational.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><ShieldAlert className="w-4 h-4 text-emerald-600" /> System Integrity: 100%</span>
            <span>Refreshed: Live Telemetry</span>
          </div>
        </div>
      </footer>

    </main>
  );
}
