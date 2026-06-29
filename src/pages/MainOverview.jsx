// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Zap, Gauge, Activity, Cpu, ArrowDown, ShieldAlert, ChevronDown, ChevronUp } from "lucide-react";
// import aiLogo from "../assets/AI LOGO.png";


// export default function MainOverview() {
//   const [transformersExpanded, setTransformersExpanded] = useState(false);

//   const outgoing = [
//     { name: "OG-1", transformer: "TR-1" },
//     { name: "OG-2", transformer: "TR-2" },
//     { name: "OG-3", transformer: "TR-3" },
//     { name: "OG-4", transformer: "TR-4" },
//     { name: "OG-5", transformer: "TR-5" },
//     { name: "OG-6", transformer: "TR-6" },
//   ];

//   const transformers = [
//     { id: "TR-1", oilTemp: "54°C", windingTemp: "61°C", buchholz: "Healthy", load: "68%" },
//     { id: "TR-2", oilTemp: "52°C", windingTemp: "59°C", buchholz: "Healthy", load: "62%" },
//     { id: "TR-3", oilTemp: "55°C", windingTemp: "60°C", buchholz: "Healthy", load: "71%" },
//     { id: "TR-4", oilTemp: "53°C", windingTemp: "58°C", buchholz: "Healthy", load: "65%" },
//     { id: "TR-5", oilTemp: "56°C", windingTemp: "63°C", buchholz: "Healthy", load: "74%" },
//     { id: "TR-6", oilTemp: "51°C", windingTemp: "57°C", buchholz: "Healthy", load: "60%" },
//   ];

//   // Helper component for animated vertical lines
//   const VerticalConnector = ({ height = "h-12", label = "" }) => (
//     <div className="flex flex-col items-center w-full">
//       <div className={`flow-line-vertical ${height}`}>
//         <div className="flow-pulse-vertical" />
//       </div>
//       {label && (
//         <span className="text-[10px] font-300 tracking-widest uppercase text-[#004AAD] mt-1">
//           {label}
//         </span>
//       )}
//     </div>
//   );

//   // Helper component for busbar equipment blocks
//   const BusbarBlock = ({ name, voltage }) => (
//     <div className="w-full max-w-4xl mx-auto my-4 busbar-glow-bg border-2 border-[#004AAD] p-4 text-center rounded shadow-lg relative">
//       <div className="busbar-glow-element" />
//       <div className="relative z-10 flex items-center justify-between px-6">
//         <div className="flex items-center gap-2">
//           <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
//           <span className="text-xs font-300 text-blue-200 tracking-wider">SYSTEM BUSBAR ACTIVE</span>
//         </div>
//         <h3 className="text-xl font-300 text-white tracking-widest">{name}</h3>
//         <span className="bg-[#004AAD] border border-blue-400 text-white text-xs font-300 px-3 py-1 rounded">
//           {voltage}
//         </span>
//       </div>
//     </div>
//   );

//   const [kiosksExpanded, setKiosksExpanded] = useState(false);
//   const [busbarsExpanded, setBusbarsExpanded] = useState(false);

//   // Helper component for building tower UI
//   const BuildingTower = ({ id, name, floors, clients }) => (
//     <Link
//       to={`/building/${id}`}
//       className="group flex flex-col md:flex-row items-center gap-6 bg-[#081F5C] border-2 border-[#004AAD] p-6 hover-lift text-white rounded shadow-xl w-full"
//     >
//       {/* Tower Graphic */}
//       <div className="relative w-28 h-56 bg-[#05143C] border border-blue-900 rounded-t p-2 flex flex-col justify-between overflow-hidden shadow-inner shrink-0">
//         {/* Sky antenna */}
//         <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-[#004AAD]">
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400" />
//         </div>

//         {/* Helipad glow */}
//         <div className="h-[2px] w-full bg-[#004AAD] shadow-[0_0_10px_#00E5FF]" />

//         {/* Windows layout representing 20 floors */}
//         <div className="grid grid-cols-4 gap-1.5 h-44 overflow-hidden py-1">
//           {Array.from({ length: 48 }).map((_, idx) => (
//             <span
//               key={idx}
//               className="h-2 rounded-sm transition-colors duration-300 bg-white/10 group-hover:bg-[#00E5FF]/40 shadow-[0_0_2px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_4px_rgba(0,229,255,0.4)]"
//             />
//           ))}
//         </div>

//         {/* Tower Base */}
//         <div className="h-2 w-full bg-[#004AAD]" />
//       </div>

//       {/* Info details */}
//       <div className="flex-1 text-center md:text-left">
//         <span className="text-[10px] font-300 tracking-widest text-blue-300 uppercase">
//           Digital Twin Node
//         </span>
//         <h3 className="text-2xl font-300 text-white tracking-wide mt-1 group-hover:text-blue-200 transition-colors">
//           {name}
//         </h3>
//         <div className="mt-3 grid grid-cols-2 gap-2 text-left">
//           <div className="bg-[#05143C] p-2 border border-blue-950">
//             <span className="text-[9px] text-blue-300 font-300 block">HEIGHT</span>
//             <strong className="text-sm font-extrabold">{floors} FLOORS</strong>
//           </div>
//           <div className="bg-[#05143C] p-2 border border-blue-950">
//             <span className="text-[9px] text-blue-300 font-300 block">TENANTS</span>
//             <strong className="text-sm font-300">{clients} ZONES</strong>
//           </div>
//         </div>
//         {/* <p className="mt-3 text-xs text-blue-100 font-medium leading-relaxed">
//           Click tower console to view floor blueprints and active HVAC / EMS energy telemetry.
//         </p>
//         <span className="mt-4 inline-flex items-center gap-1 bg-[#004AAD] text-white text-xs font-black px-4 py-2 hover:bg-[#003b8a] transition-colors border border-blue-400">
//           ENTER CONSOLE
//         </span> */}
//       </div>
//     </Link>
//   );

//   return (
//     <main className="min-h-screen bg-white text-[#081F5C] flex flex-col font-sans">

//       {/* SCADA Top Navigation Bar */}
//       {/* <header className="sticky top-0 z-50 bg-[#081F5C] border-b-4 border-[#004AAD] px-6 py-4 text-white shadow-md">
//         <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4">
//           <div className="flex items-center gap-3">
//             <div className="bg-[#004AAD] p-2 rounded shadow">
//               <Cpu className="h-6 w-6 text-white" />
//             </div>
//             <div>
//               <p className="text-[9px] font-black tracking-[0.3em] text-blue-300 uppercase">
//                 Enterprise Building Management System
//               </p>
//               <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
//                 BMS Command Control Overview
//               </h1>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3.5 py-1.5 text-xs font-extrabold tracking-wider text-white">
//               <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
//               SCADA CONNECTED
//             </span>
//           </div>
//         </div>
//       </header> */}


// <header className="sticky top-0 z-50 h-[72px] bg-[#081F5C] border-b-4 border-[#004AAD] px-4 text-white shadow-md">
//   <div className="h-full mx-auto max-w-7xl flex justify-between items-center">

//     {/* Left Side */}
//     <div className="flex items-center gap-3">
//    <img
//   src={aiLogo}
//   alt="AI Logo"
//   className="h-28 w-28 object-contain -my-6"
//  />

//       <h1 className="text-lg font-semibold tracking-tight text-white uppercase leading-none">
//         BMS Command Control Overview
//       </h1>
//     </div>

//     {/* Right Side */}
//     <span className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3 py-1 text-[10px] font-bold tracking-wider text-white">
//       <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
//       SCADA CONNECTED
//     </span>

//   </div>
// </header>



//       {/* Main Single Line Diagram Console */}
//       <section className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
//         <div className="bg-slate-50 border border-slate-200 p-6 md:p-10 shadow-inner rounded-lg">

//           {/* Section Heading */}
//           <div className="mb-8 border-b-2 border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div>
//               <h2 className="text-xl font-black text-[#081F5C] tracking-wide uppercase">
//                 Electrical Mimic Single Line Diagram (SLD)
//               </h2>
//               <p className="text-xs text-slate-500 font-semibold mt-1">
//                 Visualizing physical power distribution path from incoming utility feeders to end-user tenants.
//               </p>
//             </div>
//             <strong className="text-xs bg-[#081F5C] text-white px-3 py-1 font-bold">33kV / 433V GRID</strong>
//           </div>

//           {/* 1. SOURCE SECTION */}
//           <div className="max-w-3xl mx-auto bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white shadow-lg relative panel-active-glow rounded-md">
//             <div className="absolute top-3 right-3 flex gap-2">
//               <span className="flex items-center gap-1 bg-[#05143C] border border-emerald-500 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded shadow-[0_0_8px_rgba(52,211,153,0.2)]">
//                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
//                 ONLINE
//               </span>
//             </div>

//             <div className="text-center pb-4 mb-4 border-b border-blue-900/60">
//               <span className="text-[10px] font-black text-blue-300 tracking-[0.2em] block uppercase">CENTRAL CONTROL PANEL</span>
//               <h3 className="text-2xl font-black mt-1 text-white tracking-widest">33kV SOURCE PANELS</h3>
//               <p className="text-xs text-blue-200 mt-1 font-semibold">Dual high-tension grid utility connection monitoring node</p>
//             </div>

//             <div className="grid gap-4 md:grid-cols-2">
//               {/* Feeder 1 */}
//               <div className="bg-[#05143C] border border-[#004AAD] p-4 rounded relative">
//                 <div className="flex justify-between items-start">
//                   <span className="text-[9px] font-black text-blue-300 tracking-wider uppercase">SOURCE 1 (MAINGRID)</span>
//                   <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#34d399]" />
//                 </div>
//                 <div className="mt-2 flex items-center gap-3">
//                   <div className="bg-[#081F5C] p-2 border border-blue-900 rounded">
//                     <Zap className="h-5 w-5 text-emerald-400" />
//                   </div>
//                   <div>
//                     <span className="text-xl font-black block tracking-wide text-white">33.0 kV</span>
//                     <span className="text-[10px] font-bold text-emerald-400">ACTIVE FEEDER</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Feeder 2 */}
//               <div className="bg-[#05143C] border border-[#004AAD] p-4 rounded relative opacity-90">
//                 <div className="flex justify-between items-start">
//                   <span className="text-[9px] font-black text-blue-300 tracking-wider uppercase">SOURCE 2 (DG STANDBY)</span>
//                   <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-[0_0_6px_#fbbf24]" />
//                 </div>
//                 <div className="mt-2 flex items-center gap-3">
//                   <div className="bg-[#081F5C] p-2 border border-blue-900 rounded">
//                     <Zap className="h-5 w-5 text-amber-400" />
//                   </div>
//                   <div>
//                     <span className="text-xl font-black block tracking-wide text-white">33.0 kV</span>
//                     <span className="text-[10px] font-bold text-amber-300">STANDBY MODE</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* SVG Animated Split Lines (Source -> Incomings) */}
//           <div className="w-full max-w-4xl mx-auto h-16 relative">
//             <svg className="w-full h-full overflow-visible" viewBox="0 0 800 64" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <defs>
//                 <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
//                   <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#00E5FF" />
//                 </marker>
//               </defs>
//               {/* Static Background Path */}
//               <path d="M 400 0 V 32 H 200 V 64 M 400 32 H 600 V 64" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
//               {/* Animated Flow Path Left */}
//               <path d="M 400 0 V 32 H 200 V 64" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="flow-path-left" markerEnd="url(#arrow-cyan)" />
//               {/* Animated Flow Path Right */}
//               <path d="M 400 0 V 32 H 600 V 64" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="flow-path-right" markerEnd="url(#arrow-cyan)" />
//             </svg>
//           </div>

//           {/* 2. INCOMING SECTION (Side-by-Side) */}
//           <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
//             {/* Incoming 1 */}
//             <div className="bg-[#081F5C] border-2 border-[#004AAD] p-5 text-white shadow-md relative panel-active-glow rounded-md">
//               <div className="absolute top-2 right-2">
//                 <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#34d399]" />
//               </div>
//               <span className="text-[9px] font-black text-blue-300 tracking-wider block uppercase">FEEDER BREAKER 1</span>
//               <h4 className="text-lg font-black mt-1 text-white">Incoming 1</h4>

//               <div className="mt-4 grid grid-cols-2 gap-2 bg-[#05143C] p-3 border border-blue-900">
//                 <div>
//                   <span className="text-[9px] text-blue-300 font-bold block">VOLTAGE</span>
//                   <strong className="text-sm font-extrabold text-white">33.0 kV</strong>
//                 </div>
//                 <div>
//                   <span className="text-[9px] text-blue-300 font-bold block">BREAKER</span>
//                   <strong className="text-sm font-extrabold text-emerald-400">CLOSED / ON</strong>
//                 </div>
//               </div>
//             </div>

//             {/* Incoming 2 */}
//             <div className="bg-[#081F5C] border-2 border-[#004AAD] p-5 text-white shadow-md relative panel-active-glow rounded-md">
//               <div className="absolute top-2 right-2">
//                 <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#34d399]" />
//               </div>
//               <span className="text-[9px] font-black text-blue-300 tracking-wider block uppercase">FEEDER BREAKER 2</span>
//               <h4 className="text-lg font-black mt-1 text-white">Incoming 2</h4>

//               <div className="mt-4 grid grid-cols-2 gap-2 bg-[#05143C] p-3 border border-blue-900">
//                 <div>
//                   <span className="text-[9px] text-blue-300 font-bold block">VOLTAGE</span>
//                   <strong className="text-sm font-extrabold text-white">33.0 kV</strong>
//                 </div>
//                 <div>
//                   <span className="text-[9px] text-blue-300 font-bold block">BREAKER</span>
//                   <strong className="text-sm font-extrabold text-emerald-400">CLOSED / ON</strong>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* SVG Animated Merge Lines (Incomings -> Outgoing) */}
//           <div className="w-full max-w-4xl mx-auto h-16 relative">
//             <svg className="w-full h-full overflow-visible" viewBox="0 0 800 64" fill="none" xmlns="http://www.w3.org/2000/svg">
//               {/* Static Background Path */}
//               <path d="M 200 0 V 32 H 400 V 64 M 600 0 V 32 H 400" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
//               {/* Animated Flow Path Left */}
//               <path d="M 200 0 V 32 H 400 V 64" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="flow-path-left" markerEnd="url(#arrow-cyan)" />
//               {/* Animated Flow Path Right */}
//               <path d="M 600 0 V 32 H 400 V 64" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="flow-path-right" markerEnd="url(#arrow-cyan)" />
//             </svg>
//           </div>

//           {/* 3. 33kV OUTGOING PANEL */}
//           <div className="w-full max-w-4xl mx-auto my-2 busbar-glow-bg border-2 border-[#004AAD] p-5 text-center rounded shadow-lg relative panel-active-glow">
//             <div className="busbar-glow-element" />
//             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 gap-4">
//               <div className="flex items-center gap-2">
//                 <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
//                 <span className="text-xs font-black text-blue-200 tracking-wider">OUTGOING BUSBAR ENERGIZED</span>
//               </div>
//               <h3 className="text-xl font-black text-white tracking-widest">33kV OUTGOING</h3>
//               <div className="flex gap-4">
//                 <span className="bg-[#05143C] border border-[#004AAD] text-emerald-400 text-xs font-extrabold px-3 py-1 rounded">
//                   33.0 kV
//                 </span>
//                 <span className="bg-[#05143C] border border-[#004AAD] text-white text-xs font-extrabold px-3 py-1 rounded">
//                   50.0 Hz
//                 </span>
//               </div>
//             </div>
//           </div>

//           <VerticalConnector height="h-10" label="Feeder Bus Connection" />

//           {/* 4. 33kV FEEDER PANEL */}
//           <div className="w-full max-w-5xl mx-auto my-4 bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white shadow-lg relative panel-active-glow rounded-md">
//             <div className="text-center pb-4 mb-4 border-b border-blue-900/60">
//               <span className="text-[10px] font-black text-blue-300 tracking-[0.2em] block uppercase">FEEDER SWITCHGEAR PANEL</span>
//               <h3 className="text-xl font-black text-white tracking-widest mt-1">33kV FEEDER PANEL</h3>
//             </div>

//             {/* 1. INCOMING FEEDER Section */}
//             <div className="mb-4">
//               <div className="max-w-xs mx-auto bg-[#05143C] border border-[#004AAD] p-4 text-center rounded relative">
//                 <span className="text-[9px] font-black text-blue-300 tracking-wider block uppercase">INCOMING FEEDER</span>
//                 <strong className="text-sm font-black text-white mt-1 block">INCOMING FEEDER 1</strong>
//                 <div className="mt-2 flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold">
//                   <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
//                   CONNECTED / ACTIVE
//                 </div>
//               </div>
//             </div>

//             {/* Animated Split SVG Flow Lines inside the panel */}
//             <div className="w-full h-12 relative my-2">
//               <svg className="w-full h-full overflow-visible" viewBox="0 0 960 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <defs>
//                   <marker id="arrow-cyan-small" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
//                     <path d="M 0 2 L 6 5 L 0 8 z" fill="#00E5FF" />
//                   </marker>
//                 </defs>
//                 {/* Background line bus split */}
//                 <path d="M 480 0 V 16 H 80 V 48 M 80 16 H 240 V 48 M 240 16 H 400 V 48 M 400 16 H 560 V 48 M 560 16 H 720 V 48 M 720 16 H 880 V 48" stroke="#004AAD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                
//                 {/* Animated Flow Lines */}
//                 <path d="M 480 0 V 16 H 80 V 48" stroke="#00E5FF" strokeWidth="2.5" className="flow-path-left" markerEnd="url(#arrow-cyan-small)" />
//                 <path d="M 480 0 V 16 H 240 V 48" stroke="#00E5FF" strokeWidth="2.5" className="flow-path-left" markerEnd="url(#arrow-cyan-small)" />
//                 <path d="M 480 0 V 16 H 400 V 48" stroke="#00E5FF" strokeWidth="2.5" className="flow-path-left" markerEnd="url(#arrow-cyan-small)" />
//                 <path d="M 480 0 V 16 H 560 V 48" stroke="#00E5FF" strokeWidth="2.5" className="flow-path-right" markerEnd="url(#arrow-cyan-small)" />
//                 <path d="M 480 0 V 16 H 720 V 48" stroke="#00E5FF" strokeWidth="2.5" className="flow-path-right" markerEnd="url(#arrow-cyan-small)" />
//                 <path d="M 480 0 V 16 H 880 V 48" stroke="#00E5FF" strokeWidth="2.5" className="flow-path-right" markerEnd="url(#arrow-cyan-small)" />
//               </svg>
//             </div>

//             {/* 2. OUTGOING FEEDERS Section (Grid of 6) */}
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 mt-2">
//               {outgoing.map((item) => (
//                 <div
//                   key={item.name}
//                   className="bg-[#05143C] border border-[#004AAD] p-4 text-center text-white shadow rounded"
//                 >
//                   <span className="text-[9px] font-bold text-blue-300 block">FEEDER</span>
//                   <strong className="text-lg font-black block tracking-wider mt-1">{item.name}</strong>
//                   <p className="text-[10px] text-blue-100 font-bold mt-1">To {item.transformer}</p>
//                   <div className="mt-3 flex items-center justify-center gap-1.5 text-emerald-400">
//                     <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
//                     <span className="text-xs font-black">ON</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Connectors to Transformers (Collapsed/Header Feed) */}
//           {!transformersExpanded && (
//             <VerticalConnector height="h-10" label="Transformer Feed" />
//           )}

//           {/* 6. 33/0.433kV TRANSFORMERS CENTRAL CARD */}
//  <div className="flex justify-center w-full my-3">
//   <div
//     onClick={() => setTransformersExpanded(!transformersExpanded)}
//     className="w-[90%] md:w-[70%] lg:w-[45%] h-32 max-w-xl bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-lg rounded-md cursor-pointer hover:bg-[#0A276E] transition-colors"
//   >
//     <div className="h-full flex flex-col items-center justify-center text-center">

//       {/* Transformer Icon */}
//       <svg
//         className="w-16 h-10 text-blue-300 mb-2"
//         viewBox="0 0 60 30"
//         fill="none"
//       >
//         <circle
//           cx="20"
//           cy="15"
//           r="12"
//           stroke="currentColor"
//           strokeWidth="2.5"
//         />
//         <circle
//           cx="40"
//           cy="15"
//           r="12"
//           stroke="currentColor"
//           strokeWidth="2.5"
//         />
//       </svg>

//       {/* Text */}
//       <span className="text-[10px] font-black text-blue-300 tracking-[0.2em] uppercase">
//         STEP-DOWN SUBSTATION
//       </span>

//       <h3 className="text-lg font-black text-white tracking-wider mt-1">
//         33 / 0.433kV TRANSFORMERS
//       </h3>

//     </div>
//   </div>
// </div>

//           {/* Expanded details container */}
//         <div
//   className={`transition-all duration-500 ease-in-out overflow-hidden ${
//     transformersExpanded
//       ? "max-h-[2000px] opacity-100"
//       : "max-h-0 opacity-0 pointer-events-none"
//   }`}
// >
//   {/* Flow from top transformer box */}
//   <div className="flex justify-center h-10">
//     <div className="flow-line-vertical h-full">
//       <div className="flow-pulse-vertical" />
//     </div>
//   </div>

//   {/* Transformer row */}
//   <div className="max-w-7xl mx-auto px-4">

//     {/* Horizontal bus without extra left/right line */}
//     <div className="mx-auto w-[84%] h-[2px] bg-cyan-400 relative overflow-hidden">
//       <div className="flow-pulse-horizontal" />
//     </div>

//     {/* 6 Transformers in same line */}
//     <div className="grid grid-cols-6 gap-4">
//       {transformers.map((tf) => (
//         <div key={tf.id} className="flex flex-col items-center">

//           {/* Vertical drop line */}
//           <div className="flow-line-vertical h-8">
//             <div className="flow-pulse-vertical" />
//           </div>

//           {/* Transformer Card */}
//           <div className="w-full bg-[#081F5C] border-2 border-[#004AAD] p-4 text-white shadow-md flex flex-col justify-between rounded relative panel-active-glow min-h-[200px]">
//             <div>
//               <div className="mb-3 flex justify-center items-center">
//                 <svg
//                   className="w-14 h-8 text-blue-300"
//                   viewBox="0 0 60 30"
//                   fill="none"
//                 >
//                   <circle
//                     cx="20"
//                     cy="15"
//                     r="12"
//                     stroke="currentColor"
//                     strokeWidth="2.5"
//                   />
//                   <circle
//                     cx="40"
//                     cy="15"
//                     r="12"
//                     stroke="currentColor"
//                     strokeWidth="2.5"
//                   />
//                 </svg>
//               </div>

//               <strong className="text-base font-black block text-center tracking-widest">
//                 {tf.id}
//               </strong>

//               <span className="text-[9px] font-bold text-blue-300 text-center block uppercase">
//                 33kV / 433V TX
//               </span>
//             </div>

//             <div className="mt-4 space-y-2 border-t border-blue-900 pt-3">
//               <div className="flex justify-between items-center text-[10px]">
//                 <span className="text-blue-200">Oil Temp:</span>
//                 <span className="font-extrabold text-white">
//                   {tf.oilTemp}
//                 </span>
//               </div>

//               <div className="flex justify-between items-center text-[10px]">
//                 <span className="text-blue-200">Wind Temp:</span>
//                 <span className="font-extrabold text-white">
//                   {tf.windingTemp}
//                 </span>
//               </div>

//               <div className="flex justify-between items-center text-[10px]">
//                 <span className="text-blue-200">Relay:</span>
//                 <span className="font-extrabold text-emerald-400">
//                   {tf.buchholz}
//                 </span>
//               </div>

//               <div className="flex justify-between items-center text-[10px]">
//                 <span className="text-blue-200">Load:</span>
//                 <span className="font-extrabold text-white">
//                   {tf.load}
//                 </span>
//               </div>
//             </div>
//           </div>

//         </div>
//       ))}
//     </div>
//   </div>
// </div>

//           {/* Stepped-Down Feed to LT Kiosk */}
//           {transformersExpanded ? (
//             <div className="w-full max-w-4xl mx-auto grid grid-cols-6 h-12 px-4">
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <div key={i} className="flex justify-center h-full">
//                   <div className="flow-line-vertical h-full">
//                     <div className="flow-pulse-vertical" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <VerticalConnector height="h-10" label="Stepped-Down Feed" />
//           )}

//           {/* 7. COMMON LT KIOSK */}
//           {/* <div className="max-w-4xl mx-auto bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white shadow-xl">
//             <div className="text-center">
//               <span className="text-[10px] font-black text-blue-300 tracking-wider block uppercase">STEP-DOWN COMBINER PANEL</span>
//               <h3 className="text-2xl font-black tracking-widest text-white mt-1"> LT KIOSK</h3>
//               <p className="text-xs text-blue-200 mt-1 font-semibold">Collects stepped-down 433V lines from all 6 transformers</p>
//             </div>

//             <div className="mt-6 grid grid-cols-3 gap-4 border-t border-blue-900 pt-4">
//               <div className="bg-[#05143C] border border-blue-900 p-4 text-center">
//                 <span className="text-[10px] text-blue-200 block font-bold">BUSBAR VOLTAGE</span>
//                 <strong className="text-2xl font-black text-white block mt-1">433 V</strong>
//               </div>
//               <div className="bg-[#05143C] border border-blue-900 p-4 text-center">
//                 <span className="text-[10px] text-blue-200 block font-bold">TOTAL CURRENT</span>
//                 <strong className="text-2xl font-black text-white block mt-1">2430 A</strong>
//               </div>
//               <div className="bg-[#05143C] border border-blue-900 p-4 text-center">
//                 <span className="text-[10px] text-blue-200 block font-bold">POWER FACTOR (PF)</span>
//                 <strong className="text-2xl font-black text-white block mt-1">0.98</strong>
//               </div>
//             </div>
//           </div> */}

//           <div className="flex justify-center w-full my-3">
//   <div
//     onClick={() => setKiosksExpanded(!kiosksExpanded)}
//     className="w-[90%] md:w-[70%] lg:w-[45%] h-32 max-w-xl bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-lg rounded-md cursor-pointer hover:bg-[#0A276E] transition-colors"
//   >
//     <div className="h-full flex flex-col items-center justify-center text-center">
//       <span className="text-[10px] font-black text-blue-300 tracking-[0.2em] uppercase">
//         STEP-DOWN COMBINER PANEL
//       </span>

//       <h3 className="text-lg font-black text-white tracking-wider mt-1">
//         LT KIOSK
//       </h3>
//     </div>
//   </div>
// </div>

// <div
//   className={`transition-all duration-500 ease-in-out overflow-hidden ${
//     kiosksExpanded
//       ? "max-h-[2000px] opacity-100"
//       : "max-h-0 opacity-0 pointer-events-none"
//   }`}
// >
//   <div className="flex justify-center h-10">
//     <div className="flow-line-vertical h-full">
//       <div className="flow-pulse-vertical" />
//     </div>
//   </div>

//   <div className="max-w-7xl mx-auto px-4">
//     <div className="mx-auto w-[84%] h-[2px] bg-cyan-400 relative overflow-hidden">
//       <div className="flow-pulse-horizontal" />
//     </div>

//     <div className="grid grid-cols-6 gap-4">
//       {Array.from({ length: 6 }).map((_, index) => (
//         <div key={index} className="flex flex-col items-center">
//           <div className="flow-line-vertical h-8">
//             <div className="flow-pulse-vertical" />
//           </div>

//           <div className="w-full bg-[#081F5C] border-2 border-[#004AAD] p-4 text-white shadow-md rounded relative panel-active-glow min-h-[200px] flex flex-col items-center justify-center text-center">
//             <span className="text-[10px] font-black text-blue-300 uppercase tracking-wider">
//               LT KIOSK
//             </span>

//             <strong className="text-xl font-black tracking-widest mt-2">
//               KIOSK-{index + 1}
//             </strong>

//             <span className="text-[9px] font-bold text-blue-300 uppercase mt-1">
//               433V PANEL
//             </span>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>

//           <VerticalConnector height="h-10" />

//           {/* 8. LT BUSBAR */}
//           {/* <BusbarBlock name="COMMON LT BUSBAR (433V)" voltage="433V" />

//           <VerticalConnector height="h-14" label="Building Distribution Lines" /> */}

// <div className="flex justify-center w-full my-3">
//   <div
//     onClick={() => setBusbarsExpanded(!busbarsExpanded)}
//     className="w-[90%] md:w-[70%] lg:w-[45%] h-32 max-w-xl bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-lg rounded-md cursor-pointer hover:bg-[#0A276E] transition-colors"
//   >
//     <div className="h-full flex flex-col items-center justify-center text-center">

//       <span className="text-[10px] font-black text-blue-300 tracking-[0.2em] uppercase">
//         POWER DISTRIBUTION
//       </span>

//       <h3 className="text-lg font-black text-white tracking-wider mt-1">
//          LT BUSBAR
//       </h3>

//       <span className="text-xs text-blue-300 mt-1">
//         433V
//       </span>

//     </div>
//   </div>
// </div>

// <div
//   className={`transition-all duration-500 ease-in-out overflow-hidden ${
//     busbarsExpanded
//       ? "max-h-[2000px] opacity-100"
//       : "max-h-0 opacity-0 pointer-events-none"
//   }`}
// >

//   {/* Flow */}
//   <div className="flex justify-center h-10">
//     <div className="flow-line-vertical h-full">
//       <div className="flow-pulse-vertical" />
//     </div>
//   </div>

//   <div className="max-w-7xl mx-auto px-4">

//     {/* Horizontal Bus */}
//     <div className="mx-auto w-[84%] h-[2px] bg-cyan-400 relative overflow-hidden">
//       <div className="flow-pulse-horizontal" />
//     </div>

//    {/* 6 LT Busbars */}
// <div className="grid grid-cols-6 gap-4">
//   {Array.from({ length: 6 }).map((_, index) => (
//     <div key={index} className="flex flex-col items-center">

//       <div className="flow-line-vertical h-8">
//         <div className="flow-pulse-vertical" />
//       </div>

//       <div className="w-full bg-[#081F5C] border-2 border-[#004AAD] p-4 text-white shadow-md rounded relative panel-active-glow min-h-[200px] flex flex-col items-center justify-center">
//         <span className="text-[10px] font-black text-blue-300 uppercase tracking-wider">
//           LT BUSBAR
//         </span>

//         <strong className="text-xl font-black tracking-widest mt-2">
//           BUS-{index + 1}
//         </strong>

//         <span className="text-[9px] font-bold text-blue-300 uppercase mt-1">
//           433V
//         </span>
//       </div>

//     </div>
//   ))}
// </div>

//   </div>

// </div>

// {/* Flow below all 6 busbars like LT Kiosk */}
// <div className="flex justify-center h-14">
//   <div className="flow-line-vertical h-full">
//     <div className="flow-pulse-vertical" />
//   </div>
// </div>



//           {/* 9. SKY-1 / SKY-2 BUILDINGS */}
//           <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
//             <BuildingTower id="sky-1" name="WING-A BUILDING" floors={20} clients={40} />
//             <BuildingTower id="sky-2" name="WING-B BUILDING" floors={20} clients={40} />
//           </div>

//         </div>
//       </section>





//       {/* Footer System Diagnostics */}
//       <footer className="bg-slate-100 border-t border-slate-200 py-6 px-6 text-slate-500 text-xs">
//         <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 font-semibold">
//           <p>© 2026 Arcot Industries. All systems operational.</p>
//           <div className="flex items-center gap-4">
//             <span className="flex items-center gap-1"><ShieldAlert className="w-4 h-4 text-emerald-600" /> System Integrity: 100%</span>
//             <span>Refreshed: Live Telemetry</span>
//           </div>
//         </div>
//       </footer>

//     </main>
//   );
// }








import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, ShieldAlert, X } from "lucide-react";
import aiLogo from "../assets/AI LOGO.png";
import { useNavigate } from "react-router-dom";
import prestigeLogo from "../assets/ser-removebg.png";

export default function MainOverview() {
  const [activePopup, setActivePopup] = useState(null);
  const [transformersExpanded, setTransformersExpanded] = useState(true);
  const [kiosksExpanded, setKiosksExpanded] = useState(true);
  const [busbarsExpanded, setBusbarsExpanded] = useState(true);

const [openedBusbars, setOpenedBusbars] = useState([]);
const navigate = useNavigate();

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

// const OverviewBox = ({ title, subtitle, onClick }) => (
//   <button
//     onClick={onClick}
//     className="h-[160px] w-full bg-[#081F5C] border-2 border-[#004AAD] text-white rounded-1 shadow-xl hover:bg-[#0A276E] transition-colors flex flex-col items-center justify-center text-center px-6"
//   >
//     <h3 className="text-2xl font-400 uppercase tracking-wide">{title}</h3>
//     <p className="text-sm text-blue-300 font-bold uppercase mt-4">{subtitle}</p>
//   </button>
// );

const OverviewBox = ({
  title,
  subtitle,
  onClick,
  liveStatus = {
    on: true,
    healthy: true,
    off: false,
  },
}) => {
  const conditions = [
    {
      key: "on",
      label: "ON",
      value: liveStatus.on ? "Active" : "Inactive",
      active: liveStatus.on,
      color: "emerald",
    },
    {
      key: "healthy",
      label: "HEALTHY",
      value: liveStatus.healthy ? "Normal" : "Warning",
      active: liveStatus.healthy,
      color: "yellow",
    },
    {
      key: "off",
      label: "OFF",
      value: liveStatus.off ? "Stopped" : "No Fault",
      active: liveStatus.off,
      color: "red",
    },
  ];

  const colorClasses = {
    emerald: {
      dot: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]",
      text: "text-emerald-400",
    },
    yellow: {
      dot: "bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.9)]",
      text: "text-yellow-400",
    },
    red: {
      dot: "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]",
      text: "text-red-500",
    },
  };

  return (
    <div
      onClick={onClick}
      className="h-[145px] w-full bg-[#081F5C] border-2 border-[#004AAD] text-white rounded-none shadow-xl panel-active-glow flex flex-col text-center cursor-pointer overflow-hidden"
    >
     <div className="flex-1 flex flex-col items-center justify-center px-4">
  <h4 className="text-xl font-bold uppercase tracking-[0.05em] text-white">
    {title}
  </h4>

  <span className="mt-1 text-[11px] text-slate-300 font-medium">
    {subtitle}
  </span>
</div>

      <div className="grid grid-cols-3 border-t border-[#004AAD]/60 bg-[#061746]">
        {conditions.map((item) => {
          const c = colorClasses[item.color];

          return (
            <div
              key={item.key}
              className="py-2 flex flex-col items-center justify-center border-r last:border-r-0 border-[#004AAD]/40"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    item.active ? c.dot : "bg-slate-600 opacity-40"
                  }`}
                />
                <span
                  className={`text-[10px] font-black uppercase ${
                    item.active ? c.text : "text-slate-500"
                  }`}
                >
                  {item.label}
                </span>
              </div>

              <span className="mt-1 text-[8px] font-semibold text-slate-300 uppercase tracking-wide">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// const WingOverviewBox = ({ title, subtitle }) => (
//   <div className="h-[160px] w-[50%] mx-auto bg-[#081F5C] border-2 border-[#004AAD] text-white rounded-1 shadow-xl hover:bg-[#0A276E] transition-all duration-300 flex items-center justify-center gap-4 px-4">

//     {/* Building Design */}
//     <div className="w-[55px] h-[100px] bg-[#05143C] border border-[#004AAD] rounded-t-sm p-1.5 flex flex-col justify-between shrink-0">
//       <div className="h-[2px] w-full bg-cyan-400 shadow-[0_0_8px_#00E5FF]" />

//       <div className="grid grid-cols-4 gap-1">
//         {Array.from({ length: 28 }).map((_, i) => (
//           <span
//             key={i}
//             className="h-1.5 rounded-[2px] bg-white/15"
//           />
//         ))}
//       </div>

//       <div className="h-1.5 w-full bg-[#004AAD]" />
//     </div>

//     {/* Text Section */}
//     <div className="text-center">
//       <h3 className="text-lg font-semibold uppercase tracking-wide">
//         {title}
//       </h3>

//       <p className="text-[11px] text-blue-300 font-semibold uppercase mt-2">
//         {subtitle}
//       </p>
//     </div>

//   </div>
// );

// 

const FlowLineH = () => (
  <div className="h-[4px] w-full bg-cyan-400 relative overflow-hidden">
    <div className="flow-pulse-horizontal" />
  </div>
);

const FlowLineV = () => (
  <div className="w-[4px] h-full bg-cyan-400 relative overflow-hidden">
    <div className="flow-pulse-vertical" />
  </div>
);

 const PopupShell = ({ title, children, onBack }) => (
  <div className="fixed left-0 right-0 top-[72px] bottom-0 z z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-5">
<div className="w-full max-w-7xl h-[calc(100vh-110px)] overflow-y-auto bg-slate-50 border-2 border-[#004AAD] rounded-xl shadow-2xl p-6 relative">      <div className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200 pb-4 mb-6 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#004AAD]">
            BMS Detail View
          </span>
          <h2 className="text-xl font-black text-[#081F5C] uppercase mt-1">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="h-9 w-9 rounded bg-[#004AAD] text-white flex items-center justify-center hover:bg-[#003A86] transition-colors"
            >
              ←
            </button>
          )}

          <button
            type="button"
            onClick={() => setActivePopup(null)}
            className="h-9 w-9 rounded bg-[#081F5C] text-white flex items-center justify-center hover:bg-[#0A276E] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {children}
    </div>
  </div>
);

  // const SourcePopup = () => (
  //   <PopupShell title="33kV Source → Incoming → Outgoing">
  //     {/* 1. SOURCE SECTION */}
  //     <div className="max-w-3xl mx-auto bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white shadow-lg relative panel-active-glow rounded-md">
  //       <div className="absolute top-3 right-3 flex gap-2">
  //         <span className="flex items-center gap-1 bg-[#05143C] border border-emerald-500 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded shadow-[0_0_8px_rgba(52,211,153,0.2)]">
  //           <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
  //           ONLINE
  //         </span>
  //       </div>

  //       <div className="text-center pb-4 mb-4 border-b border-blue-900/60">
  //         <span className="text-[10px] font-black text-blue-300 tracking-[0.2em] block uppercase">CENTRAL CONTROL PANEL</span>
  //         <h3 className="text-2xl font-black mt-1 text-white tracking-widest">33kV SOURCE PANELS</h3>
  //         <p className="text-xs text-blue-200 mt-1 font-semibold">Dual high-tension grid utility connection monitoring node</p>
  //       </div>

  //       <div className="grid gap-4 md:grid-cols-2">
  //         <div className="bg-[#05143C] border border-[#004AAD] p-4 rounded relative">
  //           <div className="flex justify-between items-start">
  //             <span className="text-[9px] font-black text-blue-300 tracking-wider uppercase">SOURCE 1 (MAINGRID)</span>
  //             <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#34d399]" />
  //           </div>
  //           <div className="mt-2 flex items-center gap-3">
  //             <div className="bg-[#081F5C] p-2 border border-blue-900 rounded">
  //               <Zap className="h-5 w-5 text-emerald-400" />
  //             </div>
  //             <div>
  //               <span className="text-xl font-black block tracking-wide text-white">33.0 kV</span>
  //               <span className="text-[10px] font-bold text-emerald-400">ACTIVE FEEDER</span>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="bg-[#05143C] border border-[#004AAD] p-4 rounded relative opacity-90">
  //           <div className="flex justify-between items-start">
  //             <span className="text-[9px] font-black text-blue-300 tracking-wider uppercase">SOURCE 2 (DG STANDBY)</span>
  //             <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-[0_0_6px_#fbbf24]" />
  //           </div>
  //           <div className="mt-2 flex items-center gap-3">
  //             <div className="bg-[#081F5C] p-2 border border-blue-900 rounded">
  //               <Zap className="h-5 w-5 text-amber-400" />
  //             </div>
  //             <div>
  //               <span className="text-xl font-black block tracking-wide text-white">33.0 kV</span>
  //               <span className="text-[10px] font-bold text-amber-300">STANDBY MODE</span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* SVG Animated Split Lines (Source -> Incomings) */}
  //     <div className="w-full max-w-4xl mx-auto h-16 relative">
  //       <svg className="w-full h-full overflow-visible" viewBox="0 0 800 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <defs>
  //           <marker id="arrow-cyan-popup" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
  //             <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#00E5FF" />
  //           </marker>
  //         </defs>
  //         <path d="M 400 0 V 32 H 200 V 64 M 400 32 H 600 V 64" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  //         <path d="M 400 0 V 32 H 200 V 64" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="flow-path-left" markerEnd="url(#arrow-cyan-popup)" />
  //         <path d="M 400 0 V 32 H 600 V 64" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="flow-path-right" markerEnd="url(#arrow-cyan-popup)" />
  //       </svg>
  //     </div>

  //     {/* 2. INCOMING SECTION */}
  //     <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
  //       {['Incoming 1', 'Incoming 2'].map((item, index) => (
  //         <div key={item} className="bg-[#081F5C] border-2 border-[#004AAD] p-5 text-white shadow-md relative panel-active-glow rounded-md">
  //           <div className="absolute top-2 right-2">
  //             <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#34d399]" />
  //           </div>
  //           <span className="text-[9px] font-black text-blue-300 tracking-wider block uppercase">FEEDER BREAKER {index + 1}</span>
  //           <h4 className="text-lg font-black mt-1 text-white">{item}</h4>
  //           <div className="mt-4 grid grid-cols-2 gap-2 bg-[#05143C] p-3 border border-blue-900">
  //             <div>
  //               <span className="text-[9px] text-blue-300 font-bold block">VOLTAGE</span>
  //               <strong className="text-sm font-extrabold text-white">33.0 kV</strong>
  //             </div>
  //             <div>
  //               <span className="text-[9px] text-blue-300 font-bold block">BREAKER</span>
  //               <strong className="text-sm font-extrabold text-emerald-400">CLOSED / ON</strong>
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>

  //     {/* SVG Animated Merge Lines (Incomings -> Outgoing) */}
  //     <div className="w-full max-w-4xl mx-auto h-16 relative">
  //       <svg className="w-full h-full overflow-visible" viewBox="0 0 800 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <path d="M 200 0 V 32 H 400 V 64 M 600 0 V 32 H 400" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  //         <path d="M 200 0 V 32 H 400 V 64" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="flow-path-left" markerEnd="url(#arrow-cyan-popup)" />
  //         <path d="M 600 0 V 32 H 400 V 64" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="flow-path-right" markerEnd="url(#arrow-cyan-popup)" />
  //       </svg>
  //     </div>

  //     {/* 3. 33kV OUTGOING PANEL */}
  //     <div className="w-full max-w-4xl mx-auto my-2 busbar-glow-bg border-2 border-[#004AAD] p-5 text-center rounded shadow-lg relative panel-active-glow">
  //       <div className="busbar-glow-element" />
  //       <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 gap-4">
  //         <div className="flex items-center gap-2">
  //           <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
  //           <span className="text-xs font-black text-blue-200 tracking-wider">OUTGOING BUSBAR ENERGIZED</span>
  //         </div>
  //         <h3 className="text-xl font-black text-white tracking-widest">33kV OUTGOING</h3>
  //         <div className="flex gap-4">
  //           <span className="bg-[#05143C] border border-[#004AAD] text-emerald-400 text-xs font-extrabold px-3 py-1 rounded">33.0 kV</span>
  //           <span className="bg-[#05143C] border border-[#004AAD] text-white text-xs font-extrabold px-3 py-1 rounded">50.0 Hz</span>
  //         </div>
  //       </div>
  //     </div>
  //   </PopupShell>
  // );

  
//   const SourceBox = ({ title, subtitle, icon }) => (
//   <div className="h-[115px] w-full bg-[#081F5C] border-2 border-[#004AAD] text-white rounded-none shadow-xl panel-active-glow flex flex-col items-center justify-center text-center px-4">
//     {icon && (
//       <div className="bg-[#05143C] p-2 border border-blue-900 mb-2">
//         <Zap className="h-5 w-5 text-emerald-400" />
//       </div>
//     )}

//     <span className="text-[9px] font-black text-blue-300 tracking-[0.2em] uppercase">
//       {subtitle}x
//     </span>

//     <h4 className="text-lg font-semibold uppercase tracking-wide mt-1">
//       {title}
//     </h4>
//   </div>
// );

// const SourcePopup = () => (
//   <PopupShell title="33kV Source → 2 Incoming / 1 Outgoing ">
//     <div className="max-w-5xl mx-auto">

//       {/* SOURCE */}
//       <div className="flex justify-center">
//         <div className="w-[320px]">
//           <SourceBox
//             title="33kV SOURCE"
//             subtitle="CENTRAL CONTROL PANEL"
//             icon
//           />
//         </div>
//       </div>

//       {/* SOURCE DOWN TO BUS */}
//       <div className="flex justify-center h-10">
//         <div className="flow-line-vertical h-full">
//           <div className="flow-pulse-vertical" />
//         </div>
//       </div>

//       {/* BUS FLOW BELOW SOURCE */}
//       <div className="relative h-[4px] w-[760px] mx-auto bg-cyan-400 overflow-hidden">
//         <div className="flow-pulse-horizontal" />
//       </div>

//       {/* BUS TO INC1 / INC2 */}
//       <div className="relative h-14 w-[760px] mx-auto">
//         <div className="absolute left-0 top-0 h-full">
//           <div className="flow-line-vertical h-full">
//             <div className="flow-pulse-vertical" />
//           </div>
//         </div>

//         <div className="absolute right-0 top-0 h-full">
//           <div className="flow-line-vertical h-full">
//             <div className="flow-pulse-vertical" />
//           </div>
//         </div>
//       </div>

//       {/* INC1 - OUT - INC2 */}
//       <div className="grid grid-cols-[320px_80px_320px_80px_320px] items-center">
//         <SourceBox title="INC1" subtitle="FEEDER BREAKER" />

//         <div className="h-[4px] bg-cyan-400 relative overflow-hidden">
//           <div className="flow-pulse-horizontal" />
//         </div>

//         <SourceBox title="OUT" subtitle="OUTGOING BUSBAR" />

//         <div className="h-[4px] bg-cyan-400 relative overflow-hidden">
//           <div className="flow-pulse-horizontal" />
//         </div>

//         <SourceBox title="INC2" subtitle="FEEDER BREAKER" />
//       </div>

//       {/* OUT TO METER */}
//       <div className="flex justify-center h-12">
//         <div className="flow-line-vertical h-full">
//           <div className="flow-pulse-vertical" />
//         </div>
//       </div>

//       {/* METER */}
//       <div className="flex justify-center">
//         <div className="w-[320px]">
//           <SourceBox title="METER" subtitle="METERING UNIT" />
//         </div>
//       </div>

//       {/* METER TO FEEDER */}
//       <div className="flex justify-center h-12">
//         <div className="flow-line-vertical h-full">
//           <div className="flow-pulse-vertical" />
//         </div>
//       </div>

//       {/* FEEDER */}
//       <div className="flex justify-center">
//         <div className="w-[320px]">
//           <SourceBox title="33kV FEEDER" subtitle="FEEDER SWITCHGEAR PANEL" />
//         </div>
//       </div>

//     </div>
//   </PopupShell>
// );

const sourceAnalytics = {
  inc1Analytics: {
    title: "INC1 Incoming Feeder",
    subtitle: "Primary Incoming Supply",
    kwh: "1,280",
    kvh: "1,195",
    current: "420 A",
    voltage: "33.0 kV",
    pf: "0.98",
    load: 78,
    health: 94,
    status: "Stable",
  },
  outAnalytics: {
    title: "OUT Main Busbar",
    subtitle: "Main Outgoing Distribution",
    kwh: "2,460",
    kvh: "2,310",
    current: "810 A",
    voltage: "33.0 kV",
    pf: "0.97",
    load: 86,
    health: 91,
    status: "Active",
  },
  inc2Analytics: {
    title: "INC2 Incoming Feeder",
    subtitle: "Secondary Incoming Supply",
    kwh: "1,180",
    kvh: "1,115",
    current: "390 A",
    voltage: "33.0 kV",
    pf: "0.96",
    load: 72,
    health: 92,
    status: "Healthy",
  },
};

const SourceBox = ({ title, subtitle, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative h-[132px] w-full bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-none overflow-hidden ${
        onClick ? "cursor-pointer hover:border-cyan-400 transition-all" : ""
      }`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        {icon && (
          <div className="bg-[#05143C] p-2 border border-blue-900 mb-2">
            <Zap className="h-4 w-4 text-emerald-400" />
          </div>
        )}

        <h4 className="text-[15px] font-semibold tracking-wide leading-none">
          {title}
        </h4>

        <span className="mt-2 text-[9px] font-medium text-blue-300 tracking-[0.12em] leading-none">
          {subtitle}
        </span>

        {onClick && (
          <span className="mt-3 text-[9px] text-cyan-300 font-medium tracking-wide">
            Click Analytics
          </span>
        )}
      </div>
    </div>
  );
};

const FlowBar = () => (
  <div className="h-[4px] w-full bg-cyan-400 relative overflow-hidden">
    <div className="flow-pulse-horizontal" />
  </div>
);

const VerticalFlow = ({ height = "h-8" }) => (
  <div className={`flex justify-center ${height}`}>
    <div className="flow-line-vertical h-full">
      <div className="flow-pulse-vertical" />
    </div>
  </div>
);

const SourcePopup = ({ setActivePopup }) => {
  return (
    <PopupShell title="33kV Source → 2 Incoming / 1 Outgoing">
      <div className="max-w-6xl mx-auto pt-2 pb-4">
        <div className="flex justify-center">
          <div className="w-[320px]">
            <SourceBox
              title="33kV SOURCE"
              subtitle="CENTRAL CONTROL PANEL"
              icon
            />
          </div>
        </div>

        <VerticalFlow />

        <div className="relative h-[4px] w-[760px] mx-auto bg-cyan-400 overflow-hidden">
          <div className="flow-pulse-horizontal" />
        </div>

        <div className="relative h-10 w-[760px] mx-auto">
          <div className="absolute left-0 top-0 h-full">
            <div className="flow-line-vertical h-full">
              <div className="flow-pulse-vertical" />
            </div>
          </div>

          <div className="absolute right-0 top-0 h-full">
            <div className="flow-line-vertical h-full">
              <div className="flow-pulse-vertical" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[300px_55px_300px_55px_300px] items-center justify-center mx-auto">
          <SourceBox
            title="INC1"
            subtitle="FEEDER BREAKER"
            onClick={() => setActivePopup("inc1Analytics")}
          />

          <FlowBar />

          <SourceBox
            title="OUT"
            subtitle="OUTGOING BUSBAR"
            onClick={() => setActivePopup("outAnalytics")}
          />

          <FlowBar />

          <SourceBox
            title="INC2"
            subtitle="FEEDER BREAKER"
            onClick={() => setActivePopup("inc2Analytics")}
          />
        </div>

        <VerticalFlow />

        <div className="flex justify-center">
          <div className="w-[320px]">
            <SourceBox title="METER" subtitle="METERING UNIT" />
          </div>
        </div>

        <VerticalFlow />

        <div className="flex justify-center">
          <div className="w-[320px]">
            <SourceBox
              title="33kV FEEDER"
              subtitle="FEEDER SWITCHGEAR PANEL"
            />
          </div>
        </div>
      </div>
    </PopupShell>
  );
};

const IndividualSourceAnalytics = ({ type, onBack }) => {
  const data = sourceAnalytics[type];

  const graphValues =
    type === "outAnalytics"
      ? [62, 69, 74, 80, 76, 86, 82, 89, 84, 86]
      : type === "inc1Analytics"
      ? [42, 50, 58, 61, 66, 72, 70, 76, 74, 78]
      : [38, 44, 51, 58, 62, 66, 68, 70, 69, 72];

  const avg = Math.round(
    graphValues.reduce((a, b) => a + b, 0) / graphValues.length
  );

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020B24] text-white overflow-auto">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(0,74,173,0.22),transparent_35%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_30%)] p-8">
        <div className="max-w-7xl mx-auto">
          <button
            type="button"
            onClick={onBack}
            className="mb-6 px-5 py-2.5 bg-white/5 border border-cyan-400/40 text-cyan-200 text-[12px] font-medium tracking-wide hover:bg-cyan-400/10 transition shadow-none"
          >
            ← Back to Source
          </button>

          <div className="relative overflow-hidden bg-white/8 border border-white/10 shadow-none p-7">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-cyan-400" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-cyan-300 font-semibold tracking-[0.18em]">
                  ARCOT IIoT Live Electrical Analytics
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-wide">
                  {data.title}
                </h2>

                <p className="mt-1 text-[13px] font-medium text-blue-300 tracking-wide">
                  {data.subtitle}
                </p>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-[11px] font-semibold tracking-wide">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Live
                </span>

                <p className="mt-3 text-[10px] text-slate-400 tracking-wide">
                  Status: {data.status}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 mt-5">
            {[
              ["Energy", data.kwh, "kWh"],
              ["Reactive", data.kvh, "kVh"],
              ["Current", data.current, ""],
              ["Voltage", data.voltage, ""],
              ["Power Factor", data.pf, ""],
            ].map(([label, value, unit]) => (
              <div
                key={label}
                className="bg-white/7 border border-white/10 p-5 shadow-none"
              >
                <p className="text-[11px] font-medium text-slate-400">
                  {label}
                </p>

                <h3 className="mt-2 text-[24px] font-semibold">
                  {value}
                  <span className="ml-1 text-[11px] font-medium text-cyan-300">
                    {unit}
                  </span>
                </h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[1.2fr_0.8fr] gap-5 mt-5">
            <div className="bg-white/7 border border-white/10 p-6 shadow-none">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-[15px] font-semibold tracking-wide">
                    Load Consumption Graph
                  </h3>

                  <p className="text-[10px] text-slate-400 mt-1">
                    Last 10 live samples
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-slate-400">Average</p>
                  <h4 className="text-lg font-semibold text-cyan-300">
                    {avg}%
                  </h4>
                </div>
              </div>

              <div className="flex items-end gap-3 h-[280px] border-b border-white/10 pb-3">
                {graphValues.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end">
                    <div
                      className="bg-cyan-400/90 shadow-none"
                      style={{ height: `${v * 2.5}px` }}
                    />

                    <span className="text-[8px] text-center mt-2 text-blue-200">
                      {i + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mt-5">
                <div className="bg-[#06184A]/70 border border-white/10 p-4 shadow-none">
                  <p className="text-[10px] font-medium text-slate-400">
                    Peak Load
                  </p>
                  <h4 className="text-lg font-semibold">
                    {Math.max(...graphValues)}%
                  </h4>
                </div>

                <div className="bg-[#06184A]/70 border border-white/10 p-4 shadow-none">
                  <p className="text-[10px] font-medium text-slate-400">
                    Minimum
                  </p>
                  <h4 className="text-lg font-semibold">
                    {Math.min(...graphValues)}%
                  </h4>
                </div>

                <div className="bg-[#06184A]/70 border border-white/10 p-4 shadow-none">
                  <p className="text-[10px] font-medium text-slate-400">
                    Status
                  </p>
                  <h4 className="text-lg font-semibold text-emerald-300">
                    {data.status}
                  </h4>
                </div>
              </div>
            </div>

            <div className="bg-white/7 border border-white/10 p-6 shadow-none">
              <h3 className="text-[15px] font-semibold tracking-wide mb-6">
                Live Load Status
              </h3>

              <div className="flex justify-center">
                <div className="relative h-48 w-48 rounded-full border-[18px] border-white/10 flex items-center justify-center shadow-none">
                  <div className="absolute inset-[-18px] rounded-full border-[18px] border-cyan-400 border-r-transparent border-b-transparent rotate-45" />

                  <div className="text-center">
                    <span className="block text-[42px] font-semibold">
                      {data.load}%
                    </span>
                    <span className="text-[11px] font-medium text-cyan-300 tracking-wide">
                      Load
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {[
                  ["Load", data.load],
                  ["Power Factor", Number(data.pf) * 100],
                  ["System Health", data.health],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-blue-100 font-medium">
                        {label}
                      </span>
                      <span className="text-cyan-300 font-semibold">
                        {Math.round(value)}%
                      </span>
                    </div>

                    <div className="h-2 bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 shadow-none"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 bg-[#06184A]/70 border border-white/10 p-5 shadow-none">
                <p className="text-[10px] font-medium text-slate-400 tracking-wide">
                  Live Remark
                </p>

                <p className="mt-3 text-xs text-blue-100 leading-relaxed font-normal">
                  {type === "outAnalytics"
                    ? "Outgoing busbar is distributing combined incoming power with stable power factor and balanced active load."
                    : "Incoming feeder is operating in stable condition with healthy voltage, current, and load percentage."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const feederAnalytics = {
  incoming: {
    title: "Incoming Feeder 1",
    subtitle: "33kV Incoming Supply",
    kwh: "4,860",
    kvh: "4,520",
    current: "920 A",
    voltage: "33.0 kV",
    pf: "0.98",
    load: 82,
    health: 95,
    status: "CONNECTED",
  },
  og1: {
    title: "OG-1 Feeder",
    subtitle: "Outgoing to Transformer 1",
    kwh: "820",
    kvh: "765",
    current: "150 A",
    voltage: "33.0 kV",
    pf: "0.97",
    load: 74,
    health: 94,
    status: "ON",
  },
  og2: {
    title: "OG-2 Feeder",
    subtitle: "Outgoing to Transformer 2",
    kwh: "790",
    kvh: "740",
    current: "142 A",
    voltage: "33.0 kV",
    pf: "0.96",
    load: 71,
    health: 93,
    status: "ON",
  },
  og3: {
    title: "OG-3 Feeder",
    subtitle: "Outgoing to Transformer 3",
    kwh: "860",
    kvh: "815",
    current: "158 A",
    voltage: "33.0 kV",
    pf: "0.98",
    load: 77,
    health: 96,
    status: "ON",
  },
  og4: {
    title: "OG-4 Feeder",
    subtitle: "Outgoing to Transformer 4",
    kwh: "780",
    kvh: "735",
    current: "138 A",
    voltage: "33.0 kV",
    pf: "0.96",
    load: 69,
    health: 92,
    status: "ON",
  },
  og5: {
    title: "OG-5 Feeder",
    subtitle: "Outgoing to Transformer 5",
    kwh: "810",
    kvh: "760",
    current: "148 A",
    voltage: "33.0 kV",
    pf: "0.97",
    load: 73,
    health: 94,
    status: "ON",
  },
  og6: {
    title: "OG-6 Feeder",
    subtitle: "Outgoing to Transformer 6",
    kwh: "800",
    kvh: "750",
    current: "145 A",
    voltage: "33.0 kV",
    pf: "0.97",
    load: 72,
    health: 94,
    status: "ON",
  },
};

const FeederAnalyticsView = ({ data, onBack }) => {
  const graphValues = [45, 52, 59, 64, 70, data.load, 75, 79, 76, data.load];

  return (
    <div className="fixed inset-0 z-[99999] bg-[#020B24] text-white overflow-auto">
      <div className="min-h-screen p-8">
        <button
          onClick={onBack}
          className="mb-6 px-5 py-2.5 bg-white/5 border border-cyan-400/40 text-cyan-200 text-[12px] font-medium"
        >
          ← Back to Feeder Panel
        </button>

        <div className="bg-white/8 border border-white/10 p-7">
          <p className="text-[10px] text-cyan-300 font-semibold tracking-[0.18em]">
            ARCOT IIoT Feeder Flow Analytics
          </p>

          <div className="flex items-center justify-between mt-2">
            <div>
              <h2 className="text-3xl font-bold tracking-wide">
                {data.title}
              </h2>
              <p className="text-[13px] font-medium text-blue-300 mt-1">
                {data.subtitle}
              </p>
            </div>

            <span className="px-4 py-2 bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-[11px] font-semibold">
              {data.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 mt-5">
          {[
            ["Energy", data.kwh, "kWh"],
            ["Reactive", data.kvh, "kVh"],
            ["Current", data.current, ""],
            ["Voltage", data.voltage, ""],
            ["PF", data.pf, ""],
          ].map(([label, value, unit]) => (
            <div key={label} className="bg-white/7 border border-white/10 p-5">
              <p className="text-[11px] font-medium text-slate-400">
                {label}
              </p>
              <h3 className="mt-2 text-[24px] font-semibold">
                {value}{" "}
                <span className="text-[11px] text-cyan-300">{unit}</span>
              </h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1.2fr_0.8fr] gap-5 mt-5">
          <div className="bg-white/7 border border-white/10 p-6">
            <h3 className="text-[15px] font-semibold mb-6">
              Power Flow Graph
            </h3>

            <div className="flex items-end gap-3 h-[280px] border-b border-white/10 pb-3">
              {graphValues.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col justify-end">
                  <div
                    className="bg-cyan-400"
                    style={{ height: `${value * 2.5}px` }}
                  />
                  <span className="text-[8px] text-center mt-2 text-blue-200">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/7 border border-white/10 p-6">
            <h3 className="text-[15px] font-semibold mb-6">
              Live Flow Status
            </h3>

            <div className="flex justify-center">
              <div className="relative h-48 w-48 rounded-full border-[18px] border-white/10 flex items-center justify-center">
                <div className="absolute inset-[-18px] rounded-full border-[18px] border-cyan-400 border-r-transparent border-b-transparent rotate-45" />
                <div className="text-center">
                  <span className="block text-[42px] font-semibold">
                    {data.load}%
                  </span>
                  <span className="text-[11px] font-medium text-cyan-300">
                    Flow Load
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {[
                ["Load", data.load],
                ["Power Factor", Number(data.pf) * 100],
                ["Feeder Health", data.health],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-blue-100 font-medium">{label}</span>
                    <span className="text-cyan-300 font-semibold">
                      {Math.round(value)}%
                    </span>
                  </div>

                  <div className="h-2 bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-cyan-400"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 bg-[#06184A]/70 border border-white/10 p-5">
              <p className="text-[10px] font-medium text-slate-400">
                Live Remark
              </p>
              <p className="mt-3 text-xs text-blue-100 leading-relaxed">
                {data.title} is carrying stable power flow with healthy voltage,
                current, and power factor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeederPopup = () => {
  const [activeFeeder, setActiveFeeder] = React.useState(null);

  if (activeFeeder) {
    return (
      <FeederAnalyticsView
        data={feederAnalytics[activeFeeder]}
        onBack={() => setActiveFeeder(null)}
      />
    );
  }

  return (
    <PopupShell title="33kV Feeder Panel">
      <div className="w-full max-w-5xl mx-auto my-4 bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white relative rounded-md">
        <div className="text-center pb-4 mb-4 border-b border-blue-900/60">
          <span className="text-[10px] font-medium text-blue-300 tracking-[0.18em] block">
            FEEDER SWITCHGEAR PANEL
          </span>
          <h3 className="text-[20px] font-semibold text-white tracking-wide mt-1">
            33kV Feeder Panel
          </h3>
        </div>

        <div className="mb-4">
          <button
            type="button"
            onClick={() => setActiveFeeder("incoming")}
            className="max-w-xs w-full mx-auto bg-[#05143C] border border-[#004AAD] p-4 text-center rounded relative block hover:border-cyan-400 transition"
          >
            <span className="text-[9px] font-medium text-blue-300 tracking-wide block">
              INCOMING FEEDER
            </span>
            <strong className="text-[14px] font-semibold text-white mt-1 block">
              Incoming Feeder 1
            </strong>
            <div className="mt-2 flex items-center justify-center gap-1.5 text-emerald-400 text-[12px] font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Connected / Active
            </div>
            <p className="mt-2 text-[9px] text-cyan-300 font-medium">
              Click Analytics
            </p>
          </button>
        </div>

        <div className="w-full h-12 relative my-2">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 960 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker
                id="arrow-cyan-small-popup"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 2 L 6 5 L 0 8 z" fill="#00E5FF" />
              </marker>
            </defs>

            <path
              d="M 480 0 V 16 H 80 V 48 M 80 16 H 240 V 48 M 240 16 H 400 V 48 M 400 16 H 560 V 48 M 560 16 H 720 V 48 M 720 16 H 880 V 48"
              stroke="#004AAD"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {[80, 240, 400, 560, 720, 880].map((x, i) => (
              <path
                key={x}
                d={`M 480 0 V 16 H ${x} V 48`}
                stroke="#00E5FF"
                strokeWidth="2.5"
                className={i < 3 ? "flow-path-left" : "flow-path-right"}
                markerEnd="url(#arrow-cyan-small-popup)"
              />
            ))}
          </svg>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 mt-2">
          {outgoing.map((item, index) => {
            const feederKey = `og${index + 1}`;

            return (
              <button
                type="button"
                key={item.name}
                onClick={() => setActiveFeeder(feederKey)}
                className="bg-[#05143C] border border-[#004AAD] p-4 text-center text-white rounded hover:border-cyan-400 transition"
              >
                <span className="text-[9px] font-medium text-blue-300 block">
                  FEEDER
                </span>

                <strong className="text-[17px] font-semibold block tracking-wide mt-1">
                  {item.name}
                </strong>

                <p className="text-[10px] text-blue-100 font-medium mt-1">
                  To {item.transformer}
                </p>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-[12px] font-medium">ON</span>
                </div>

                <p className="mt-2 text-[9px] text-cyan-300 font-medium">
                  Click Analytics
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </PopupShell>
  );
};

  const TransformersPopup = () => (
    <PopupShell title="33 / 0.433kV Transformers">
      <div className="flex justify-center w-full my-3">
        <div onClick={() => setTransformersExpanded(!transformersExpanded)} className="w-[90%] md:w-[70%] lg:w-[45%] h-32 max-w-xl bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-lg rounded-md cursor-pointer hover:bg-[#0A276E] transition-colors">
          <div className="h-full flex flex-col items-center justify-center text-center">
            {/* <svg className="w-16 h-10 text-blue-300 mb-2" viewBox="0 0 60 30" fill="none">
              <circle cx="20" cy="15" r="12" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="40" cy="15" r="12" stroke="currentColor" strokeWidth="2.5" />
            </svg> */}
  <svg
  className="w-16 h-10 text-blue-300"
  viewBox="0 0 80 40"
  fill="none"
>
  {/* 33kV Side - Larger */}
  <circle
    cx="30"
    cy="20"
    r="12"
    stroke="currentColor"
    strokeWidth="2.5"
  />

  {/* 433V Side - Smaller & Overlapping */}
  <circle
    cx="46"
    cy="20"
    r="8"
    stroke="currentColor"
    strokeWidth="2.5"
  />
</svg>
            <span className="text-[10px] font-black text-blue-300 tracking-[0.2em] uppercase">STEP-DOWN SUBSTATION</span>
            <h3 className="text-lg font-black text-white tracking-wider mt-1">33 / 0.433kV TRANSFORMERS</h3>
          </div>
        </div>
      </div>
      {transformersExpanded && (
        <>
          <div className="flex justify-center h-10"><div className="flow-line-vertical h-full"><div className="flow-pulse-vertical" /></div></div>
          <div className="max-w-7xl mx-auto px-4">
            <div className="mx-auto w-[84%] h-[2px] bg-cyan-400 relative overflow-hidden"><div className="flow-pulse-horizontal" /></div>
            <div className="grid grid-cols-6 gap-4">
              {transformers.map((tf) => (
                <div key={tf.id} className="flex flex-col items-center">
                  <div className="flow-line-vertical h-8"><div className="flow-pulse-vertical" /></div>
                  <div className="w-full bg-[#081F5C] border-2 border-[#004AAD] p-4 text-white shadow-md flex flex-col justify-between rounded relative panel-active-glow min-h-[200px]">
                    <div>
                      <div className="mb-3 flex justify-center items-center">
                        {/* <svg className="w-14 h-8 text-blue-300" viewBox="0 0 60 30" fill="none"><circle cx="20" cy="15" r="12" stroke="currentColor" strokeWidth="2.5" /><circle cx="40" cy="15" r="12" stroke="currentColor" strokeWidth="2.5" /></svg> */}
 <svg
  className="w-16 h-10 text-blue-300"
  viewBox="0 0 80 40"
  fill="none"
>
  {/* 33kV Side - Larger */}
  <circle
    cx="30"
    cy="20"
    r="12"
    stroke="currentColor"
    strokeWidth="2.5"
  />

  {/* 433V Side - Smaller & Overlapping */}
  <circle
    cx="46"
    cy="20"
    r="8"
    stroke="currentColor"
    strokeWidth="2.5"
  />
</svg>
                      </div>
                      <strong className="text-base font-black block text-center tracking-widest">{tf.id}</strong>
                      <span className="text-[9px] font-bold text-blue-300 text-center block uppercase">33kV / 433V TX</span>
                    </div>
                    <div className="mt-4 space-y-2 border-t border-blue-900 pt-3">
                      <div className="flex justify-between items-center text-[10px]"><span className="text-blue-200">Oil Temp:</span><span className="font-extrabold text-white">{tf.oilTemp}</span></div>
                      <div className="flex justify-between items-center text-[10px]"><span className="text-blue-200">Wind Temp:</span><span className="font-extrabold text-white">{tf.windingTemp}</span></div>
                      <div className="flex justify-between items-center text-[10px]"><span className="text-blue-200">Relay:</span><span className="font-extrabold text-emerald-400">{tf.buchholz}</span></div>
                      <div className="flex justify-between items-center text-[10px]"><span className="text-blue-200">Load:</span><span className="font-extrabold text-white">{tf.load}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </PopupShell>
  );

  // const KioskPopup = () => (
  //   <PopupShell title="LT Kiosk">
  //     <div className="flex justify-center w-full my-3">
  //       <div onClick={() => setKiosksExpanded(!kiosksExpanded)} className="w-[90%] md:w-[70%] lg:w-[45%] h-32 max-w-xl bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-lg rounded-md cursor-pointer hover:bg-[#0A276E] transition-colors">
  //         <div className="h-full flex flex-col items-center justify-center text-center">
  //           <span className="text-[10px] font-black text-blue-300 tracking-[0.2em] uppercase">STEP-DOWN COMBINER PANEL</span>
  //           <h3 className="text-lg font-black text-white tracking-wider mt-1">LT KIOSK</h3>
  //         </div>
  //       </div>
  //     </div>
  //     {kiosksExpanded && (
  //       <>
  //         <div className="flex justify-center h-10"><div className="flow-line-vertical h-full"><div className="flow-pulse-vertical" /></div></div>
  //         <div className="max-w-7xl mx-auto px-4">
  //           <div className="mx-auto w-[84%] h-[2px] bg-cyan-400 relative overflow-hidden"><div className="flow-pulse-horizontal" /></div>
  //           <div className="grid grid-cols-6 gap-4">
  //             {Array.from({ length: 6 }).map((_, index) => (
  //               <div key={index} className="flex flex-col items-center">
  //                 <div className="flow-line-vertical h-8"><div className="flow-pulse-vertical" /></div>
  //                 <div className="w-full bg-[#081F5C] border-2 border-[#004AAD] p-4 text-white shadow-md rounded relative panel-active-glow min-h-[200px] flex flex-col items-center justify-center text-center">
  //                   <span className="text-[10px] font-black text-blue-300 uppercase tracking-wider">LT KIOSK</span>
  //                   <strong className="text-xl font-black tracking-widest mt-2">KIOSK-{index + 1}</strong>
  //                   <span className="text-[9px] font-bold text-blue-300 uppercase mt-1">433V PANEL</span>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </>
  //     )}
  //   </PopupShell>
  // );

const KioskMonitorBox = ({
  id,
  title,
  subtitle,
  openedKiosks,
  setOpenedKiosks,
}) => {
  const monitorData = [
    ["kWh", "1,280"],
    ["kVh", "1,195"],
    ["PF", "0.98"],
    ["AMPS", "420 A"],
    ["Voltage", "433 V"],
  ];

  const showMonitor = openedKiosks.includes(id);

  const handleHover = () => {
    setOpenedKiosks((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  return (
    <div
      onMouseEnter={handleHover}
      className="w-full bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-md rounded relative panel-active-glow h-[175px] overflow-hidden cursor-pointer"
    >
      {!showMonitor ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3">
          <span className="text-[9px] font-black text-blue-300 uppercase tracking-wider">
            LT KIOSK
          </span>

          <strong className="text-[18px] font-black tracking-widest mt-2">
            {title}
          </strong>

          <span className="text-[8px] font-bold text-blue-300 uppercase mt-1">
            {subtitle}
          </span>
        </div>
      ) : (
        <div className="absolute inset-0 z-20 bg-[#081F5C] px-4 py-3">
          <div className="text-center border-b border-[#2B5DA8] pb-2 mb-2">
            <h4 className="text-[12px] font-black text-white uppercase tracking-[0.12em] leading-none">
              {title}
            </h4>

            <span className="block mt-1 text-[7px] font-black tracking-[0.15em] text-blue-300 uppercase">
              Monitoring
            </span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-[7px] font-bold text-blue-300 uppercase">
              {subtitle}
            </span>

            <span className="flex items-center gap-1 text-[7px] font-bold text-emerald-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              Live
            </span>
          </div>

          <div className="px-2 space-y-[4px]">
            {monitorData.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between px-1"
              >
                <span className="text-[10px] font-medium text-slate-300">
                  {label}
                </span>

                <span className="text-[11px] font-bold text-white tabular-nums">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const KioskPopup = () => {
  const [openedKiosks, setOpenedKiosks] = React.useState([]);

  return (
    <PopupShell title="LT Kiosk">
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

      {kiosksExpanded && (
        <>
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
              {Array.from({ length: 6 }).map((_, index) => {
                const kioskId = `kiosk-${index + 1}`;

                return (
                  <div key={kioskId} className="flex flex-col items-center">
                    <div className="flow-line-vertical h-8">
                      <div className="flow-pulse-vertical" />
                    </div>

                    <KioskMonitorBox
                      id={kioskId}
                      title={`KIOSK-${index + 1}`}
                      subtitle="433V PANEL"
                      openedKiosks={openedKiosks}
                      setOpenedKiosks={setOpenedKiosks}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </PopupShell>
  );
};


  // const BusbarPopup = () => (
  //   <PopupShell title="LT Busduct / Busbar">
  //     <div className="flex justify-center w-full my-3">
  //       <div onClick={() => setBusbarsExpanded(!busbarsExpanded)} className="w-[90%] md:w-[70%] lg:w-[45%] h-32 max-w-xl bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-lg rounded-md cursor-pointer hover:bg-[#0A276E] transition-colors">
  //         <div className="h-full flex flex-col items-center justify-center text-center">
  //           <span className="text-[10px] font-black text-blue-300 tracking-[0.2em] uppercase">POWER DISTRIBUTION</span>
  //           <h3 className="text-lg font-black text-white tracking-wider mt-1">LT BUSDUCT / BUSBAR</h3>
  //           <span className="text-xs text-blue-300 mt-1">433V</span>
  //         </div>
  //       </div>
  //     </div>
  //     {busbarsExpanded && (
  //       <>
  //         <div className="flex justify-center h-10"><div className="flow-line-vertical h-full"><div className="flow-pulse-vertical" /></div></div>
  //         <div className="max-w-7xl mx-auto px-4">
  //           <div className="mx-auto w-[84%] h-[2px] bg-cyan-400 relative overflow-hidden"><div className="flow-pulse-horizontal" /></div>
  //           <div className="grid grid-cols-6 gap-4">
  //             {Array.from({ length: 6 }).map((_, index) => (
  //               <div key={index} className="flex flex-col items-center">
  //                 <div className="flow-line-vertical h-8"><div className="flow-pulse-vertical" /></div>
  //                 <div className="w-full bg-[#081F5C] border-2 border-[#004AAD] p-4 text-white shadow-md rounded relative panel-active-glow min-h-[200px] flex flex-col items-center justify-center">
  //                   <span className="text-[10px] font-black text-blue-300 uppercase tracking-wider">LT BUSBAR</span>
  //                   <strong className="text-xl font-black tracking-widest mt-2">BUS-{index + 1}</strong>
  //                   <span className="text-[9px] font-bold text-blue-300 uppercase mt-1">433V</span>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </>
  //     )}
  //   </PopupShell>
  // );

const BusbarMonitorBox = ({
  id,
  title,
  openedBusbars,
  setOpenedBusbars,
}) => {
  const monitorData = [
    ["Temp", "42°C"],
    ["Vibration", "Normal"],
    ["Health", "ON"],
  ];

  const showMonitor = openedBusbars.includes(id);

  const handleHover = () => {
    setOpenedBusbars((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  return (
    <div
      onMouseEnter={handleHover}
      className="w-full h-[165px] bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-md rounded relative panel-active-glow overflow-hidden cursor-pointer"
    >
      {!showMonitor ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3">
          <span className="text-[9px] font-black text-blue-300 uppercase tracking-wider">
            LT BUSBAR
          </span>

          <strong className="text-[18px] font-black tracking-widest mt-2">
            {title}
          </strong>

          <span className="text-[8px] font-bold text-blue-300 uppercase mt-1">
            433V
          </span>
        </div>
      ) : (
        <div className="absolute inset-0 z-20 bg-[#081F5C] px-4 py-3">
          <div className="text-center border-b border-[#2B5DA8] pb-2 mb-2">
            <h4 className="text-[12px] font-black text-white uppercase tracking-[0.12em] leading-none">
              {title}
            </h4>

            <span className="block mt-1 text-[7px] font-black tracking-[0.15em] text-blue-300 uppercase">
              Busbar Status
            </span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-[7px] font-bold text-blue-300 uppercase">
              Monitoring
            </span>

            <span className="flex items-center gap-1 text-[7px] font-bold text-emerald-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              Live
            </span>
          </div>

          <div className="px-2 space-y-[6px]">
            {monitorData.map(([label, value]) => {
              const healthyValue = value === "ON" || value === "Normal";

              return (
                <div
                  key={label}
                  className="flex items-center justify-between px-1"
                >
                  <span className="text-[10px] font-medium text-slate-300">
                    {label}
                  </span>

                  <span
                    className={`text-[11px] font-bold tabular-nums ${
                      healthyValue ? "text-emerald-400" : "text-white"
                    }`}
                  >
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const BusbarPopup = () => {
  const [openedBusbars, setOpenedBusbars] = React.useState([]);

  return (
    <PopupShell title="LT Busduct / Busbar">
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
              LT BUSDUCT / BUSBAR
            </h3>

            <span className="text-xs text-blue-300 mt-1">433V</span>
          </div>
        </div>
      </div>

      {busbarsExpanded && (
        <>
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
              {Array.from({ length: 6 }).map((_, index) => {
                const busbarId = `bus-${index + 1}`;

                return (
                  <div key={busbarId} className="flex flex-col items-center">
                    <div className="flow-line-vertical h-8">
                      <div className="flow-pulse-vertical" />
                    </div>

                    <BusbarMonitorBox
                      id={busbarId}
                      title={`BUS-${index + 1}`}
                      openedBusbars={openedBusbars}
                      setOpenedBusbars={setOpenedBusbars}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </PopupShell>
  );
};

// const Pcc1Popup = () => (
//   <PopupShell title="Wing 1 LT Distribution Flow">
//     <div className="relative w-full max-w-7xl mx-auto px-4 py-6 bg-white border border-slate-200 overflow-hidden">
//       <div className="relative w-full h-[560px]">

//         {/* PCC1 */}
//         <div className="absolute left-[3%] top-[20px] w-[30%] h-[235px] bg-[#081F5C] border-2 border-[#004AAD] p-5 text-white shadow-md rounded-lg panel-active-glow z-20">
//           <div className="text-center text-[12px] font-black text-blue-300 tracking-[0.2em] uppercase mb-4 border-b border-blue-900/60 pb-2">
//             PCC1
//           </div>

//           <div className="grid grid-cols-2 gap-6 h-[150px]">
//             {[
//               { title: "LT IN", value: "06" },
//               { title: "LT IN", value: "05" },
//             ].map((item) => (
//               <div
//                 key={item.value}
//                 className="bg-[#05143C] border-2 border-[#004AAD] rounded-xl flex flex-col items-center justify-center shadow-[0_0_16px_rgba(0,74,173,0.35)]"
//               >
//                 <span className="text-[10px] font-black text-blue-300 uppercase">
//                   {item.title}
//                 </span>
//                 <strong className="text-3xl font-black mt-2">
//                   {item.value}
//                 </strong>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* PCC2 */}
//         <div className="absolute left-[3%] top-[320px] w-[30%] h-[210px] bg-[#081F5C] border-2 border-[#004AAD] p-5 text-white shadow-md rounded-lg panel-active-glow z-20">
//           <div className="text-center text-[12px] font-black text-blue-300 tracking-[0.2em] uppercase mb-4 border-b border-blue-900/60 pb-2">
//             PCC2
//           </div>

//           <div className="grid grid-cols-2 gap-6 h-[125px]">
//             {[
//               { title: "LT IN", value: "01" },
//               { title: "LT IN", value: "02" },
//             ].map((item) => (
//               <div
//                 key={item.value}
//                 className="bg-[#05143C] border-2 border-[#004AAD] rounded-xl flex flex-col items-center justify-center shadow-[0_0_16px_rgba(0,74,173,0.35)]"
//               >
//                 <span className="text-[10px] font-black text-blue-300 uppercase">
//                   {item.title}
//                 </span>
//                 <strong className="text-3xl font-black mt-2">
//                   {item.value}
//                 </strong>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* DG INC */}
//         <div className="absolute right-[3%] top-[130px] w-[39%] h-[265px] bg-[#081F5C] border-2 border-[#004AAD] p-5 text-white shadow-md rounded-lg panel-active-glow z-20">
//           <div className="text-center text-[12px] font-black text-blue-300 tracking-[0.2em] uppercase mb-4 border-b border-blue-900/60 pb-2">
//             DG INC
//           </div>

//           <div className="grid grid-cols-2 gap-7">
//             {[
//               { title: "DG 1 & 2", values: ["1", "2"] },
//               { title: "DG 3 & 4", values: ["3", "4"] },
//             ].map((group) => (
//               <div
//                 key={group.title}
//                 className="bg-[#05143C] border-2 border-[#004AAD] p-4 rounded-xl shadow-[0_0_16px_rgba(0,74,173,0.35)]"
//               >
//                 <div className="text-center text-[11px] font-black text-blue-300 uppercase mb-4">
//                   {group.title}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   {group.values.map((value) => (
//                     <div
//                       key={value}
//                       className="h-[90px] bg-[#081F5C] border-2 border-[#004AAD] rounded-xl flex items-center justify-center text-2xl font-black shadow-[0_0_14px_rgba(0,74,173,0.35)]"
//                     >
//                       {value}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* FLOWS */}
//         <svg
//           className="absolute inset-0 w-full h-full pointer-events-none z-10"
//           viewBox="0 0 1200 560"
//           fill="none"
//         >
//           <defs>
//             <marker
//               id="wing-arrow"
//               viewBox="0 0 10 10"
//               refX="6"
//               refY="5"
//               markerWidth="5"
//               markerHeight="5"
//               orient="auto"
//             >
//               <path d="M 0 2 L 6 5 L 0 8 z" fill="#00E5FF" />
//             </marker>
//           </defs>

//           {/* DG 1&2 to PCC1 */}
// <path
//   d="M 360 105 H 820 V 250"
//   stroke="#004AAD"
//   strokeWidth="3"
//   fill="none"
// />

// <path
//   d="M 360 105 H 820 V 250"
//   stroke="#00E5FF"
//   strokeWidth="3"
//   fill="none"
//   className="flow-path-right"
//   markerEnd="url(#wing-arrow)"
// />

//           {/* DG 1&2 to PCC2 */}
//           <path d="M 820 245 V 455 H 360" stroke="#004AAD" strokeWidth="3" fill="none" />
//           <path
//             d="M 820 245 V 455 H 360"
//             stroke="#00E5FF"
//             strokeWidth="3"
//             fill="none"
//             className="flow-path-left"
//             markerEnd="url(#wing-arrow)"
//           />

//           {/* DG 3&4 to PCC1 */}
//           <path d="M 1020 205 V 70 H 360" stroke="#004AAD" strokeWidth="3" fill="none" />
//           <path
//             d="M 1020 205 V 70 H 360"
//             stroke="#00E5FF"
//             strokeWidth="3"
//             fill="none"
//             className="flow-path-left"
//             markerEnd="url(#wing-arrow)"
//           />

//           {/* DG 3&4 to PCC2 */}
//           <path d="M 1020 380 V 485 H 360" stroke="#004AAD" strokeWidth="3" fill="none" />
//           <path
//             d="M 1020 380 V 485 H 360"
//             stroke="#00E5FF"
//             strokeWidth="3"
//             fill="none"
//             className="flow-path-left"
//             markerEnd="url(#wing-arrow)"
//           />
//         </svg>

//       </div>
//     </div>
//   </PopupShell>
// );


const Pcc1Popup = () => {
  const [openedPanels, setOpenedPanels] = React.useState([]);

  const pcc1Panels = [
    { name: "LT6\nIN", arrow: "down" },
    { name: "DG1234\nIN", arrow: "down" },
    { name: "OG 1", arrow: "up" },
    { name: "RM1", arrow: "up" },
    { name: "RM2", arrow: "up" },
    { name: "Utility 1", arrow: "up" },
    { name: "Spare 1", arrow: "up" },
    { name: "Bus\nCoupler\nB/C", arrow: "both" },
    { name: "LT5", arrow: "down" },
    { name: "DG 1234", arrow: "down" },
    { name: "RM1", arrow: "up" },
    { name: "RM2", arrow: "up" },
    { name: "Utility 2", arrow: "up" },
    { name: "Spare 2", arrow: "up" },
  ];

  const pcc2Panels = [
    { name: "LT1\nIN", arrow: "down" },
    { name: "DG1234\nIN", arrow: "down" },
    { name: "OG 1", arrow: "up" },
    { name: "RM1", arrow: "up" },
    { name: "RM2", arrow: "up" },
    { name: "Utility 1", arrow: "up" },
    { name: "Spare 1", arrow: "up" },
    { name: "Bus\nCoupler\nB/C", arrow: "both" },
    { name: "LT2", arrow: "down" },
    { name: "DG 1234", arrow: "down" },
    { name: "RM1", arrow: "up" },
    { name: "RM2", arrow: "up" },
    { name: "Utility 2", arrow: "up" },
    { name: "Spare 2", arrow: "up" },
  ];

  const FlowArrow = ({ type, id }) => (
    <svg
      className="absolute left-0 -top-[48px] w-full h-12 overflow-visible pointer-events-none"
      viewBox="0 0 100 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id={`arrow-wing-${id}`}
          viewBox="0 0 10 10"
          refX="4"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 0 2 L 6 5 L 0 8 z" fill="#00E5FF" />
        </marker>
      </defs>

      {type === "down" && (
        <>
          <path d="M 50 0 V 48" stroke="#004AAD" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 50 0 V 48" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" className="flow-path-right" markerEnd={`url(#arrow-wing-${id})`} />
        </>
      )}

      {type === "up" && (
        <>
          <path d="M 50 48 V 0" stroke="#004AAD" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 50 48 V 0" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" className="flow-path-left" markerEnd={`url(#arrow-wing-${id})`} />
        </>
      )}

      {type === "both" && (
        <>
          <path d="M 18 24 H 82" stroke="#004AAD" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 18 24 H 82" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" className="flow-path-right" markerEnd={`url(#arrow-wing-${id})`} />
          <path d="M 82 24 H 18" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" className="flow-path-left" markerEnd={`url(#arrow-wing-${id})`} />
        </>
      )}
    </svg>
  );

  const PanelFeatures = ({ heading }) => (
    <div className="absolute inset-0 z-30 bg-[#081F5C] px-2 py-2">
      <div className="text-center text-[9px] font-black text-blue-300 uppercase tracking-wide leading-tight border-b border-[#2B5DA8] pb-1 mb-1 whitespace-pre-line">
        {heading}
      </div>

      <div className="flex justify-between text-[9px] leading-[15px]">
        <span className="text-blue-200">kWh</span>
        <span className="text-white">1245</span>
      </div>

      <div className="flex justify-between text-[9px] leading-[15px]">
        <span className="text-blue-200">kVh</span>
        <span className="text-white">1180</span>
      </div>

      <div className="flex justify-between text-[9px] leading-[15px]">
        <span className="text-blue-200">V</span>
        <span className="text-white">433V</span>
      </div>

      <div className="flex justify-between text-[9px] leading-[15px]">
        <span className="text-blue-200">PF</span>
        <span className="text-white">0.98</span>
      </div>

      <div className="flex justify-between text-[9px] leading-[15px]">
        <span className="text-blue-200">Amps</span>
        <span className="text-white">210A</span>
      </div>
    </div>
  );

  const PCCRow = ({ title, top, rowPanels }) => (
    <div className={`absolute left-0 ${top} w-full h-[210px]`}>
      <div className="absolute left-[10px] top-[-34px] text-[#081F5C] text-base font-semibold">
        {title}
      </div>

      <div className="absolute left-0 top-[45px] w-full h-[150px] flex items-stretch z-20">
        {rowPanels.map((panel, index) => {
          const panelId = `${title}-${index}`;
          const isOpened = openedPanels.includes(panelId);

          return (
            <div
              key={`${title}-${panel.name}-${index}`}
              onMouseEnter={() =>
                setOpenedPanels((prev) =>
                  prev.includes(panelId) ? prev : [...prev, panelId]
                )
              }
              className="relative h-full flex-1 min-w-0 bg-[#081F5C] border-2 border-[#004AAD] border-r-0 last:border-r-2 text-white"
            >
              <FlowArrow type={panel.arrow} id={`${title.replace(/\s/g, "")}-${index}`} />

              {isOpened ? (
                <PanelFeatures heading={panel.name} />
              ) : (
                <div className="absolute inset-0 z-20 flex items-center justify-center px-1">
                  <span className="text-[14px] md:text-[12px] font-semibold leading-tight text-center whitespace-pre-line">
                    {panel.name}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <PopupShell title="Wing 1 LT Distribution Flow" onBack={() => setActivePopup("pccMain")}>
      <div className="w-full max-w-[1600px] mx-auto px-4 py-6 overflow-visible">
        <div className="relative w-full h-[520px] overflow-visible">
          <PCCRow title="PCC 1" top="top-[25px]" rowPanels={pcc1Panels} />
          <PCCRow title="PCC 2" top="top-[285px]" rowPanels={pcc2Panels} />
        </div>
      </div>
    </PopupShell>
  );
};

const Pcc2Popup = () => {
  const [openedPanels, setOpenedPanels] = React.useState([]);

  const pcc3Panels = [
    { name: "LT4\nIN", arrow: "down" },
    { name: "DG567\nIN", arrow: "down" },
    { name: "OG 1", arrow: "up" },
    { name: "OG 2", arrow: "up" },
    { name: "OG 3", arrow: "up" },
    { name: "OG 4", arrow: "up" },
    { name: "OG 5", arrow: "up" },
    { name: "OG 6", arrow: "up" },
    { name: "OG 7", arrow: "up" },
    { name: "OG 8", arrow: "up" },
    { name: "OG 9", arrow: "up" },
    { name: "OG 10", arrow: "up" },
  ];

  const pcc4Panels = [
    { name: "LT3\nIN", arrow: "down" },
    { name: "DG567\nIN", arrow: "down" },
    { name: "OG 1", arrow: "up" },
    { name: "OG 2", arrow: "up" },
    { name: "OG 3", arrow: "up" },
    { name: "OG 4", arrow: "up" },
    { name: "OG 5", arrow: "up" },
    { name: "OG 6", arrow: "up" },
    { name: "OG 7", arrow: "up" },
    { name: "OG 8", arrow: "up" },
    { name: "OG 9", arrow: "up" },
    { name: "OG 10", arrow: "up" },
  ];

  const FlowArrow = ({ type, id }) => (
    <svg
      className="absolute left-0 -top-[48px] w-full h-12 overflow-visible pointer-events-none"
      viewBox="0 0 100 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id={`arrow-wing2-${id}`}
          viewBox="0 0 10 10"
          refX="4"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 0 2 L 6 5 L 0 8 z" fill="#00E5FF" />
        </marker>
      </defs>

      {type === "down" && (
        <>
          <path d="M 50 0 V 48" stroke="#004AAD" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 50 0 V 48" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" className="flow-path-right" markerEnd={`url(#arrow-wing2-${id})`} />
        </>
      )}

      {type === "up" && (
        <>
          <path d="M 50 48 V 0" stroke="#004AAD" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 50 48 V 0" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" className="flow-path-left" markerEnd={`url(#arrow-wing2-${id})`} />
        </>
      )}

      {type === "both" && (
        <>
          <path d="M 18 24 H 82" stroke="#004AAD" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 18 24 H 82" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" className="flow-path-right" markerEnd={`url(#arrow-wing2-${id})`} />
          <path d="M 82 24 H 18" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" className="flow-path-left" markerEnd={`url(#arrow-wing2-${id})`} />
        </>
      )}
    </svg>
  );

  const PanelFeatures = ({ heading }) => (
    <div className="absolute inset-0 z-30 bg-[#081F5C] px-2 py-2">
      <div className="text-center text-[9px] font-black text-blue-300 uppercase tracking-wide leading-tight border-b border-[#2B5DA8] pb-1 mb-1 whitespace-pre-line">
        {heading}
      </div>

      <div className="flex justify-between text-[9px] leading-[15px]">
        <span className="text-blue-200">kWh</span>
        <span className="text-white">1245</span>
      </div>

      <div className="flex justify-between text-[9px] leading-[15px]">
        <span className="text-blue-200">kVh</span>
        <span className="text-white">1180</span>
      </div>

      <div className="flex justify-between text-[9px] leading-[15px]">
        <span className="text-blue-200">V</span>
        <span className="text-white">433V</span>
      </div>

      <div className="flex justify-between text-[9px] leading-[15px]">
        <span className="text-blue-200">PF</span>
        <span className="text-white">0.98</span>
      </div>

      <div className="flex justify-between text-[9px] leading-[15px]">
        <span className="text-blue-200">Amps</span>
        <span className="text-white">210A</span>
      </div>
    </div>
  );

  const PCCRow = ({ title, top, rowPanels }) => (
    <div className={`absolute left-0 ${top} w-full h-[210px]`}>
      <div className="absolute left-[10px] top-[-34px] text-[#081F5C] text-base font-semibold">
        {title}
      </div>

      <div className="absolute left-0 top-[45px] w-full h-[150px] flex items-stretch z-20">
        {rowPanels.map((panel, index) => {
          const panelId = `${title}-${index}`;
          const isOpened = openedPanels.includes(panelId);

          return (
            <div
              key={`${title}-${panel.name}-${index}`}
              onMouseEnter={() =>
                setOpenedPanels((prev) =>
                  prev.includes(panelId) ? prev : [...prev, panelId]
                )
              }
              className="relative h-full flex-1 min-w-0 bg-[#081F5C] border-2 border-[#004AAD] border-r-0 last:border-r-2 text-white"
            >
              <FlowArrow type={panel.arrow} id={`${title.replace(/\s/g, "")}-${index}`} />

              {isOpened ? (
                <PanelFeatures heading={panel.name} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center px-1">
                  <span className="text-[14px] md:text-[12px] font-semibold leading-tight text-center whitespace-pre-line">
                    {panel.name}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <PopupShell title="Wing 2 LT Distribution Flow" onBack={() => setActivePopup("pccMain")}>
      <div className="w-full max-w-7xl mx-auto px-4 py-6 overflow-visible">
        <div className="relative w-full h-[520px] overflow-visible">
          <PCCRow title="PCC 3" top="top-[25px]" rowPanels={pcc3Panels} />
          <PCCRow title="PCC 4" top="top-[285px]" rowPanels={pcc4Panels} />
        </div>
      </div>
    </PopupShell>
  );
};

const PCCSimpleBox = ({ title, subtitle, onClick }) => (
  <div
    onClick={onClick}
    className="h-[145px] w-full bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-xl panel-active-glow flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden px-4"
  >
    <h4 className="text-xl font-bold uppercase tracking-[0.05em] text-white">
      {title}
    </h4>

    <span className="mt-1 text-[14px] text-slate-300 font-medium">
      {subtitle}
    </span>
  </div>
);

const PCCMainPopup = () => (
  <PopupShell title="PCC Main Overview">
    <div className="w-full max-w-6xl mx-auto px-6 py-10 overflow-hidden">
      <div className="relative w-full h-[360px]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[280px]">
          <PCCSimpleBox title="PCC" subtitle="Main LT Distribution" />
        </div>

        <svg
          className="absolute left-0 top-[145px] w-full h-[120px] overflow-visible pointer-events-none"
          viewBox="0 0 1000 120"
          fill="none"
        >
          <defs>
            <marker
              id="pcc-wing-arrow"
              viewBox="0 0 12 12"
              refX="5"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto"
            >
              <path d="M0 2 L6 5 L0 8 Z" fill="#00E5FF" />
            </marker>
          </defs>

          <path
            d="M500 0 V45 H250 V95"
            stroke="#004AAD"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M500 45 H750 V95"
            stroke="#004AAD"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M500 0 V45 H250 V95"
            stroke="#00E5FF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flow-path-left"
            markerEnd="url(#pcc-wing-arrow)"
          />

          <path
            d="M500 45 H750 V95"
            stroke="#00E5FF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flow-path-right"
            markerEnd="url(#pcc-wing-arrow)"
          />
        </svg>

        <div className="absolute left-[8%] top-[240px] w-[36%]">
          <PCCSimpleBox
            title="PCC 1 / PCC 2"
            subtitle="Wing A"
            onClick={() => setActivePopup("wing1")}
          />
        </div>

        <div className="absolute right-[8%] top-[240px] w-[36%]">
          <PCCSimpleBox
            title="PCC 3 / PCC 4"
            subtitle="Wing B"
            onClick={() => setActivePopup("wing2")}
          />
        </div>
      </div>
    </div>
  </PopupShell>
);


const RaisingMainPopup = () => {
  const [openedBoxes, setOpenedBoxes] = React.useState([]);

  const RMBox = ({ id, title, subtitle, hover = false, tall = false }) => {
    const isOpened = openedBoxes.includes(id);

    const monitorData = [
      ["kWh", "1245"],
      ["kVh", "1180"],
      ["V", "433V"],
      ["PF", "0.98"],
      ["Amps", "210A"],
    ];

    const handleHover = () => {
      if (!hover) return;

      setOpenedBoxes((prev) =>
        prev.includes(id) ? prev : [...prev, id]
      );
    };

    return (
      <div
        onMouseEnter={handleHover}
        className={`relative ${
          tall ? "h-[150px]" : "h-[95px]"
        } w-full bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-xl panel-active-glow flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden px-3`}
      >
        {hover && isOpened ? (
          <div className="absolute inset-0 z-20 bg-[#081F5C] px-4 py-3">
            <div className="text-center text-[9px] font-black text-blue-300 uppercase tracking-wide border-b border-[#2B5DA8] pb-1 mb-2">
              {title}
            </div>

            {monitorData.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between text-[11px] leading-[20px]"
              >
                <span className="text-blue-200">{label}</span>
                <span className="text-white">{value}</span>
              </div>
            ))}
          </div>
        ) : (
          <>
            <h4 className="text-base font-bold uppercase tracking-[0.05em]">
              {title}
            </h4>

            <span className="mt-1 text-[10px] text-slate-300 font-medium">
              {subtitle}
            </span>
          </>
        )}
      </div>
    );
  };

  return (
    <PopupShell
      title="Raising Main Distribution"
      onBack={() => setActivePopup(null)}
    >
      <div className="w-full max-w-6xl mx-auto px-6 py-6 overflow-visible">
        <div className="relative w-full h-[520px] overflow-visible">
          {/* MAIN RAISING MAIN */}
          <div className="absolute left-1/2 top-[-15px] -translate-x-1/2 w-[280px]">
            <RMBox
              id="main-rm"
              title="Raising Main"
              subtitle="Main Vertical Distribution"
            />
          </div>

          {/* FLOW: MAIN RAISING MAIN → WING A / WING B */}
          <svg
            className="absolute left-0 top-[80px] w-full h-[110px] overflow-visible pointer-events-none"
            viewBox="0 0 1000 110"
            fill="none"
          >
            <defs>
              <marker
                id="rm-arrow-1"
                viewBox="0 0 10 10"
                refX="4"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto"
              >
                <path d="M0 2 L6 5 L0 8 Z" fill="#00E5FF" />
              </marker>
            </defs>

            {["M500 0 V32 H250 V82", "M500 32 H750 V82"].map((d, i) => (
              <React.Fragment key={i}>
                <path
                  d={d}
                  stroke="#004AAD"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={d}
                  stroke="#00E5FF"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={i === 0 ? "flow-path-left" : "flow-path-right"}
                  markerEnd="url(#rm-arrow-1)"
                />
              </React.Fragment>
            ))}
          </svg>

          {/* WING A / WING B */}
          <div className="absolute left-[9%] top-[175px] w-[34%]">
            <RMBox id="wing-a" title="Wing A" />
          </div>

          <div className="absolute right-[9%] top-[175px] w-[34%]">
            <RMBox id="wing-b" title="Wing B" />
          </div>

          {/* FLOW: WINGS → 2 + 2 RAISING MAINS */}
          <svg
            className="absolute left-0 top-[270px] w-full h-[95px] overflow-visible pointer-events-none"
            viewBox="0 0 1000 95"
            fill="none"
          >
            <defs>
              <marker
                id="rm-arrow-2"
                viewBox="0 0 10 10"
                refX="4"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto"
              >
                <path d="M0 2 L6 5 L0 8 Z" fill="#00E5FF" />
              </marker>
            </defs>

            {[
              "M250 0 V32 H140 V76",
              "M250 0 V32 H360 V76",
              "M750 0 V32 H640 V76",
              "M750 0 V32 H860 V76",
            ].map((d, i) => (
              <React.Fragment key={i}>
                <path
                  d={d}
                  stroke="#004AAD"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={d}
                  stroke="#00E5FF"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flow-path-right"
                  markerEnd="url(#rm-arrow-2)"
                />
              </React.Fragment>
            ))}
          </svg>

          {/* FINAL 4 RAISING MAIN BOXES */}
          <div className="absolute left-[6%] top-[350px] w-[18%]">
            <RMBox id="rm-a1" title="Raising Main 1" hover tall />
          </div>

          <div className="absolute left-[30%] top-[350px] w-[18%]">
            <RMBox id="rm-a2" title="Raising Main 2" hover tall />
          </div>

          <div className="absolute right-[30%] top-[350px] w-[18%]">
            <RMBox id="rm-b1" title="Raising Main 3" hover tall />
          </div>

          <div className="absolute right-[6%] top-[350px] w-[18%]">
            <RMBox id="rm-b2" title="Raising Main 4" hover tall />
          </div>
        </div>
      </div>
    </PopupShell>
  );
};


const BuildingsPopup = () => {
 const BuildingBox = ({ title, subtitle, onClick, showIcon = false }) => (
  <div
    onClick={onClick}
    className="h-[125px] w-full bg-gradient-to-br from-[#081F5C] to-[#061746] border border-[#1F6FEB] text-white shadow-[0_12px_30px_rgba(8,31,92,0.25)] flex items-center justify-center text-center cursor-pointer px-5 overflow-hidden"
  >
    {showIcon && (
      <div className="w-[62px] h-[92px] border border-[#1F6FEB] bg-[#05143C] p-2 flex flex-col justify-between shrink-0 mr-5">
        <div className="h-[3px] w-full bg-[#00E5FF]" />

        <div className="grid grid-cols-4 gap-[4px]">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="w-[6px] h-[6px] rounded-[2px] bg-slate-400/60"
            />
          ))}
        </div>

        <div className="h-[8px] w-full bg-[#004AAD]" />
      </div>
    )}

    <div className="flex flex-col items-center justify-center">
      <h4 className="text-lg font-bold uppercase tracking-[0.08em]">
        {title}
      </h4>

      <span className="mt-2 text-[11px] text-blue-200 font-semibold">
        {subtitle}
      </span>
    </div>
  </div>
);

  return (
    <PopupShell
      title="Buildings Distribution"
      onBack={() => setActivePopup(null)}
    >
      <div className="w-full max-w-5xl mx-auto px-6 py-8 overflow-visible">
        <div className="relative h-[420px] overflow-visible">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[300px]">
            <BuildingBox
              title="Buildings"
              subtitle="Main Building Distribution"
            />
          </div>

          <svg
            className="absolute left-0 top-[130px] w-full h-[140px] overflow-visible pointer-events-none"
            viewBox="0 0 1000 140"
            fill="none"
          >
            <defs>
              <marker
                id="building-arrow"
                viewBox="0 0 10 10"
                refX="4"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto"
              >
                <path d="M0 2 L6 5 L0 8 Z" fill="#00E5FF" />
              </marker>
            </defs>

            <path
              d="M500 0 V45 H250 V105"
              stroke="#004AAD"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M500 45 H750 V105"
              stroke="#004AAD"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M500 0 V45 H250 V105"
              stroke="#00E5FF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flow-path-left"
              markerEnd="url(#building-arrow)"
            />

            <path
              d="M500 45 H750 V105"
              stroke="#00E5FF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flow-path-right"
              markerEnd="url(#building-arrow)"
            />
          </svg>

<div className="absolute left-[12%] top-[240px] w-[30%]">
  <Link to="/building/wing-a">
    <BuildingBox
      title="Wing A"
      subtitle="20 Floors / 40 Zones"
      showIcon
    />
  </Link>
</div>

<div className="absolute right-[12%] top-[240px] w-[30%]">
  <Link to="/building/wing-b">
    <BuildingBox
      title="Wing B"
      subtitle="20 Floors / 40 Zones"
      showIcon
    />
  </Link>
</div>
        </div>
      </div>
    </PopupShell>
  );
};



  return (

    <main className="min-h-screen bg-white text-[#081F5C] flex flex-col font-sans">
      {/* <header className="sticky top-0 z-50 h-[72px] bg-[#081F5C] border-b-4 border-[#004AAD] px-4 text-white shadow-md">
        <div className="h-full mx-auto max-w-7xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={aiLogo} alt="AI Logo" className="h-28 w-28 object-contain -my-6" />
            <h1 className="text-lg font-semibold tracking-tight text-white uppercase leading-none">ARCOT IIoT 1.0</h1>
          </div>
          <span className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3 py-1 text-[10px] font-bold tracking-wider text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            BLE CONNECTED
          </span>
        </div>
      </header> */}


<header className="sticky top-0 z-[1000] h-[72px] bg-[#081F5C] border-b-4 border-[#004AAD] px-4 text-white shadow-md">
  <div className="h-full mx-auto max-w-7xl flex justify-between items-center">

    {/* LEFT */}
    {/* <div
      onClick={() => setActivePopup(null)}
      className="ml-1 flex flex-col justify-center cursor-pointer"
    >
      <h1 className="text-[26px] font-semibold tracking-[0.18em] text-white leading-none uppercase">
        ARCOT
        <span className="text-[#67E8F9] ml-2">
          IIoT 1.0
        </span>
      </h1>

      <span className="mt-1 text-[9px] uppercase tracking-[0.35em] text-blue-300 font-medium">
        Industrial Internet of Things
      </span>
    </div> */}

    {/* LEFT */}
<div
  onClick={() => setActivePopup(null)}
  className="ml-1 flex items-center cursor-pointer"
>
  <div className="flex flex-col justify-center">
    <h1 className="text-[26px] font-semibold tracking-[0.18em] text-white leading-none uppercase">
      ARCOT
      <span className="text-[#67E8F9] ml-2">
        IIoT 1.0
      </span>
    </h1>

    <span className="mt-1 text-[9px] uppercase tracking-[0.35em] text-blue-300 font-medium">
      Industrial Internet of Things
    </span>
  </div>

  <div className="h-[58px] border-l border-[#004AAD] ml-5"></div>

  <img
  src={prestigeLogo}
  alt="Prestige Group"
  className="h-[60px] w-[110px] object-cover"
/>
 

</div>



    {/* RIGHT */}
  <div className="flex items-center gap-3">
  <button
    onClick={() => navigate("/overview")}
    className="h-[32px] px-4 bg-[#004AAD] border border-cyan-400 text-white text-[10px] font-black tracking-[0.15em] uppercase hover:bg-[#0058d6]"
  >
    Overview
  </button>

  <div className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3 py-1.5 rounded-sm">
    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
    <span className="text-[10px] font-bold tracking-[0.15em]">
      BLE CONNECTED
    </span>
  </div>

  <button
    onClick={() => {
      localStorage.removeItem("bmsLoggedIn");
      navigate("/auth");
    }}
    className="h-[32px] px-4 bg-red-600 border border-red-400 text-white text-[10px] font-black tracking-[0.15em] uppercase hover:bg-red-700"
  >
    Logout
  </button>
</div>
  </div>
</header>
      

<section className="w-full h-[calc(100vh-72px)] bg-slate-50 px-8 pt-2 pb-4 overflow-hidden">
  <div className="w-full h-full flex flex-col justify-start">

    {/* ROW 1: SOURCE → FEEDERS → TRANSFORMER → LT KIOSK */}
    <div className="grid grid-cols-[1fr_70px_1fr_70px_1fr_70px_1fr] items-center">
     <OverviewBox
  title="33kV Source"
  subtitle="2 Incoming / 1 Outgoing"
  liveStatus={{ on: true, healthy: true, off: false }}
  onClick={() => setActivePopup("source")}
/>

      <FlowLineH />

      <OverviewBox
        title="33kV Feeder"
        subtitle="1 Incoming / 6 Outgoing"
        onClick={() => setActivePopup("feeders")}
      />

      <FlowLineH />

      <OverviewBox
        title="Transformer"
        subtitle="33kV / 433V"
        onClick={() => setActivePopup("transformers")}
      />

      <FlowLineH />

      <OverviewBox
        title="LT Kiosk"
        subtitle="433V Panel"
        onClick={() => setActivePopup("kiosks")}
      />
    </div>

    {/* LT KIOSK → BUSDUCT */}
    <div className="relative h-[42px] w-full">
      <div className="absolute right-[12.5%] top-0 h-[21px] -translate-x-1/2">
        <FlowLineV />
      </div>

      <div className="absolute left-[7.5%] right-[12.5%] top-[20px]">
        <FlowLineH />
      </div>

      <div className="absolute left-[7.5%] top-[20px] h-[30px] -translate-x-1/2">
        <FlowLineV />
      </div>
    </div>

  {/* ROW 2: BUSDUCT → PCC → RAISING MAIN */}
<div className="relative mt-2">
  <div className="grid grid-cols-[1fr_70px_1fr_70px_1fr_70px_1fr] items-center">

    <OverviewBox
      title="Busduct"
      subtitle="LT Busduct Distribution"
      onClick={() => setActivePopup("busbars")}
    />

    <FlowLineH />

    <OverviewBox
      title="PCC"
      subtitle="Wing 1 + Wing 2"
      onClick={() => setActivePopup("pccMain")}
    />

    <FlowLineH />

    <OverviewBox
      title="Raising Main"
      subtitle="Vertical Distribution"
      onClick={() => setActivePopup("raisingMain")}
    />
    
    <FlowLineH />

    <OverviewBox
      title="WING"
      subtitle="wing A / wing B"
      onClick={() => setActivePopup("buildings")}
    />
    <div />
    <div />

  </div>
</div>


  </div>
</section>





      {activePopup === "source" && (
  <SourcePopup setActivePopup={setActivePopup} />
)}

{["inc1Analytics", "outAnalytics", "inc2Analytics"].includes(activePopup) && (
  <IndividualSourceAnalytics
    type={activePopup}
    onBack={() => setActivePopup("source")}
  />
)}
      {activePopup === "feeders" && <FeederPopup />}
      {activePopup === "transformers" && <TransformersPopup />}
      {activePopup === "kiosks" && <KioskPopup />}
      {activePopup === "busbars" && <BusbarPopup />}
      {activePopup === "pccMain" && <PCCMainPopup />}
{activePopup === "wing1" && <Pcc1Popup />}
{activePopup === "wing2" && <Pcc2Popup />}
{activePopup === "raisingMain" && <RaisingMainPopup />}
{activePopup === "buildings" && <BuildingsPopup />}

{activePopup === "overview" && <OverviewPopup />}


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
