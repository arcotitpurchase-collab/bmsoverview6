// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function OverviewPage() {
//   const navigate = useNavigate();

//   const initialFlow = [
//     { key: "source", title: "33kV Source", sub: "Grid / DG Input", incoming: 1120, outgoing: 1085, today: 18420, month: 486500 },
//     { key: "feeder", title: "33kV Feeder", sub: "HT Feeder Panel", incoming: 1085, outgoing: 1040, today: 17680, month: 462300 },
//     { key: "transformer", title: "Transformers", sub: "33kV / 433V", incoming: 1040, outgoing: 980, today: 16940, month: 441900 },
//     { key: "kiosk", title: "LT Kiosk", sub: "433V Panels", incoming: 980, outgoing: 935, today: 15720, month: 408700 },
//     { key: "busbar", title: "LT Busbar", sub: "Busduct", incoming: 935, outgoing: 900, today: 14980, month: 392100 },
//     { key: "pcc", title: "PCC Main", sub: "Wing Distribution", incoming: 900, outgoing: 850, today: 14160, month: 366400 },
//     { key: "wing1", title: "Wing 1", sub: "PCC 1 / PCC 2", incoming: 425, outgoing: 402, today: 7080, month: 181000 },
//     { key: "wing2", title: "Wing 2", sub: "PCC 3 / PCC 4", incoming: 425, outgoing: 410, today: 7420, month: 190400 },
//   ];

//   const [flowData, setFlowData] = useState(initialFlow);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setFlowData((prev) =>
//         prev.map((item) => {
//           const incoming = Math.max(
//             40,
//             item.incoming + Math.floor(Math.random() * 21) - 10
//           );

//           const outgoing = Math.min(
//             incoming - 5,
//             Math.max(35, item.outgoing + Math.floor(Math.random() * 17) - 8)
//           );

//           return {
//             ...item,
//             incoming,
//             outgoing,
//             today: item.today + Math.floor(outgoing / 75),
//             month: item.month + Math.floor(outgoing / 38),
//           };
//         })
//       );
//     }, 5000);

//     return () => clearInterval(timer);
//   }, []);

//   const totals = useMemo(() => {
//     const incoming = flowData[0].incoming;
//     const wing1 = flowData.find((x) => x.key === "wing1")?.outgoing || 0;
//     const wing2 = flowData.find((x) => x.key === "wing2")?.outgoing || 0;
//     const outgoing = wing1 + wing2;
//     const loss = incoming - outgoing;
//     const efficiency = Math.round((outgoing / incoming) * 100);
//     const today = flowData.reduce((sum, x) => sum + x.today, 0);
//     const month = flowData.reduce((sum, x) => sum + x.month, 0);

//     return { incoming, outgoing, loss, efficiency, today, month, wing1, wing2 };
//   }, [flowData]);

//   const StatCard = ({ title, value, sub, tone = "cyan" }) => (
//     <div className="relative overflow-hidden rounded-xl bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-xl panel-active-glow p-5">
//       <div
//         className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl ${
//           tone === "green"
//             ? "bg-emerald-400/25"
//             : tone === "amber"
//             ? "bg-amber-400/25"
//             : "bg-cyan-400/25"
//         }`}
//       />

//       <span className="relative text-[10px] font-black text-blue-300 uppercase tracking-[0.22em]">
//         {title}
//       </span>

//       <strong className="relative block mt-2 text-2xl font-black">
//         {value}
//       </strong>

//       <span className="relative block mt-1 text-[10px] text-slate-300 uppercase">
//         {sub}
//       </span>
//     </div>
//   );

//   const TrendChart = ({ title, data }) => {
//     const max = Math.max(...data.map((x) => x.value));

//     return (
//       <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
//         <h3 className="text-[#081F5C] font-black uppercase mb-5">{title}</h3>

//         <div className="h-[240px] flex items-end gap-4 bg-slate-50 border border-slate-200 rounded-lg p-5">
//           {data.map((x) => (
//             <div
//               key={x.label}
//               className="flex-1 flex flex-col items-center justify-end gap-2 h-full"
//             >
//               <span className="text-[9px] text-[#004AAD] font-black">
//                 {Math.round(x.value / 1000)}k
//               </span>

//               <div
//                 className="w-full rounded-t-lg bg-gradient-to-t from-[#081F5C] via-[#004AAD] to-cyan-400 shadow-[0_0_14px_rgba(0,229,255,0.35)]"
//                 style={{ height: `${Math.max(25, (x.value / max) * 185)}px` }}
//               />

//               <span className="text-[10px] font-black text-[#081F5C]">
//                 {x.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const InternalFlowChart = () => {
//     const maxIncoming = Math.max(...flowData.map((item) => item.incoming));
//     const chartHeight = 360;
//     const chartWidth = 1000;

//     const points = flowData.map((item, index) => {
//       const x = 70 + index * 125;
//       const outgoingY =
//         chartHeight - 60 - (item.outgoing / maxIncoming) * 245;
//       const incomingY =
//         chartHeight - 60 - (item.incoming / maxIncoming) * 245;
//       const lossY = chartHeight - 60 - ((item.incoming - item.outgoing) / maxIncoming) * 245;

//       return {
//         ...item,
//         x,
//         incomingY,
//         outgoingY,
//         lossY,
//         loss: item.incoming - item.outgoing,
//         efficiency: Math.round((item.outgoing / item.incoming) * 100),
//       };
//     });

//     const outgoingPath = points
//       .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.outgoingY}`)
//       .join(" ");

//     const incomingPath = points
//       .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.incomingY}`)
//       .join(" ");

//     return (
//       <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
//         <div className="mb-6">
//           <span className="text-[10px] font-black text-[#004AAD] uppercase tracking-[0.25em]">
//             Flow Wise Internal Consumption
//           </span>

//           <h3 className="text-xl font-black text-[#081F5C] uppercase mt-1">
//             Source to Wing Energy Transfer Chart
//           </h3>

//           <p className="text-xs text-slate-500 mt-1">
//             Blue line shows incoming power, cyan line shows outgoing power, and
//             amber markers show internal loss at each stage.
//           </p>
//         </div>

//         <div className="overflow-x-auto">
//           <div className="min-w-[1050px] rounded-2xl bg-gradient-to-br from-[#081F5C] via-[#061746] to-[#020617] p-6">
//             <svg
//               viewBox={`0 0 ${chartWidth} ${chartHeight}`}
//               className="w-full h-[390px]"
//               fill="none"
//             >
//               <defs>
//                 <linearGradient id="incomingLine" x1="0" x2="1">
//                   <stop offset="0%" stopColor="#60A5FA" />
//                   <stop offset="100%" stopColor="#004AAD" />
//                 </linearGradient>

//                 <linearGradient id="outgoingLine" x1="0" x2="1">
//                   <stop offset="0%" stopColor="#00E5FF" />
//                   <stop offset="100%" stopColor="#34D399" />
//                 </linearGradient>

//                 <filter id="glow">
//                   <feGaussianBlur stdDeviation="3" result="coloredBlur" />
//                   <feMerge>
//                     <feMergeNode in="coloredBlur" />
//                     <feMergeNode in="SourceGraphic" />
//                   </feMerge>
//                 </filter>
//               </defs>

//               {[0, 1, 2, 3, 4].map((i) => (
//                 <line
//                   key={i}
//                   x1="40"
//                   x2="980"
//                   y1={60 + i * 55}
//                   y2={60 + i * 55}
//                   stroke="rgba(255,255,255,0.08)"
//                   strokeWidth="1"
//                 />
//               ))}

//               <path
//                 d={incomingPath}
//                 stroke="url(#incomingLine)"
//                 strokeWidth="6"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 opacity="0.8"
//               />

//               <path
//                 d={outgoingPath}
//                 stroke="url(#outgoingLine)"
//                 strokeWidth="7"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 filter="url(#glow)"
//               />

//               {points.map((p) => (
//                 <g key={p.key}>
//                   <line
//                     x1={p.x}
//                     x2={p.x}
//                     y1={p.incomingY}
//                     y2={p.outgoingY}
//                     stroke="#FBBF24"
//                     strokeWidth="4"
//                     strokeDasharray="5 5"
//                   />

//                   <circle cx={p.x} cy={p.incomingY} r="7" fill="#60A5FA" />
//                   <circle cx={p.x} cy={p.outgoingY} r="8" fill="#00E5FF" />

//                   <circle
//                     cx={p.x}
//                     cy={(p.incomingY + p.outgoingY) / 2}
//                     r="10"
//                     fill="#F59E0B"
//                     opacity="0.95"
//                   />

//                   <text
//                     x={p.x}
//                     y={p.outgoingY - 18}
//                     textAnchor="middle"
//                     fontSize="12"
//                     fontWeight="800"
//                     fill="#E0F2FE"
//                   >
//                     {p.outgoing}kW
//                   </text>

//                   <text
//                     x={p.x}
//                     y="330"
//                     textAnchor="middle"
//                     fontSize="11"
//                     fontWeight="900"
//                     fill="#FFFFFF"
//                   >
//                     {p.title}
//                   </text>

//                   <text
//                     x={p.x}
//                     y="348"
//                     textAnchor="middle"
//                     fontSize="10"
//                     fontWeight="700"
//                     fill="#93C5FD"
//                   >
//                     Loss {p.loss}kW
//                   </text>
//                 </g>
//               ))}
//             </svg>

//             <div className="grid grid-cols-4 gap-4 mt-4">
//               <div className="bg-white/10 border border-white/10 rounded-xl p-4">
//                 <span className="text-[9px] font-black text-blue-300 uppercase tracking-wide">
//                   Incoming Line
//                 </span>
//                 <strong className="block text-white text-sm mt-1">
//                   Power received by each stage
//                 </strong>
//               </div>

//               <div className="bg-white/10 border border-white/10 rounded-xl p-4">
//                 <span className="text-[9px] font-black text-cyan-300 uppercase tracking-wide">
//                   Outgoing Line
//                 </span>
//                 <strong className="block text-white text-sm mt-1">
//                   Power transferred forward
//                 </strong>
//               </div>

//               <div className="bg-white/10 border border-white/10 rounded-xl p-4">
//                 <span className="text-[9px] font-black text-amber-300 uppercase tracking-wide">
//                   Amber Markers
//                 </span>
//                 <strong className="block text-white text-sm mt-1">
//                   Internal power loss
//                 </strong>
//               </div>

//               <div className="bg-white/10 border border-white/10 rounded-xl p-4">
//                 <span className="text-[9px] font-black text-emerald-300 uppercase tracking-wide">
//                   Live Refresh
//                 </span>
//                 <strong className="block text-white text-sm mt-1">
//                   Updates every 5 seconds
//                 </strong>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   };

//   const dailyData = [
//     { label: "Mon", value: 16400 },
//     { label: "Tue", value: 17200 },
//     { label: "Wed", value: 15800 },
//     { label: "Thu", value: 18100 },
//     { label: "Fri", value: 19200 },
//     { label: "Sat", value: 14800 },
//     { label: "Today", value: Math.round(totals.today / 8) },
//   ];

//   const monthlyData = [
//     { label: "Jan", value: 420000 },
//     { label: "Feb", value: 438000 },
//     { label: "Mar", value: 451000 },
//     { label: "Apr", value: 469000 },
//     { label: "May", value: 481000 },
//     { label: "Now", value: Math.round(totals.month / 8) },
//   ];

//   return (
//     <div className="min-h-screen bg-[#EEF4FF]">
//       <header className="sticky top-0 z-[1000] h-[72px] bg-[#081F5C] border-b-4 border-[#004AAD] px-4 text-white shadow-md">
//         <div className="h-full mx-auto max-w-7xl flex justify-between items-center">
//           <div onClick={() => navigate("/")} className="cursor-pointer">
//             <h1 className="text-[26px] font-semibold tracking-[0.18em] uppercase">
//               ARCOT <span className="text-[#67E8F9]">IIoT 1.0</span>
//             </h1>

//             <span className="text-[9px] uppercase tracking-[0.35em] text-blue-300">
//               Complete Dashboard Overview
//             </span>
//           </div>

//           <button
//             onClick={() => navigate("/")}
//             className="h-[34px] px-4 bg-[#004AAD] border border-cyan-400 text-white text-[10px] font-black uppercase tracking-[0.15em]"
//           >
//             Dashboard
//           </button>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto p-6 space-y-6">
//         <section className="bg-white border border-slate-200 rounded-xl p-5 shadow">
//           <span className="text-[10px] font-black text-[#004AAD] uppercase tracking-[0.25em]">
//             BMS Command Center
//           </span>

//           <h2 className="text-2xl font-black text-[#081F5C] uppercase mt-1">
//             Source to Wing Complete Consumption Overview
//           </h2>
//         </section>

//         <section className="grid md:grid-cols-4 gap-4">
//           <StatCard title="Total Incoming" value={`${totals.incoming} kW`} sub="Source input" />
//           <StatCard title="Final Outgoing" value={`${totals.outgoing} kW`} sub="Wing load output" tone="green" />
//           <StatCard title="Distribution Loss" value={`${totals.loss} kW`} sub="Internal losses" tone="amber" />
//           <StatCard title="Efficiency" value={`${totals.efficiency}%`} sub="Power transfer" tone="green" />
//         </section>

//         <InternalFlowChart />

//         <section className="grid lg:grid-cols-2 gap-6">
//           <TrendChart title="Daily Consumption Overview" data={dailyData} />
//           <TrendChart title="Monthly Consumption Overview" data={monthlyData} />
//         </section>

//         <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
//           <h3 className="text-lg font-black text-[#081F5C] uppercase mb-5">
//             Internal Breakdown Table
//           </h3>

//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[900px] text-sm">
//               <thead>
//                 <tr className="bg-[#081F5C] text-white">
//                   <th className="p-3 text-left">Stage</th>
//                   <th className="p-3 text-right">Incoming</th>
//                   <th className="p-3 text-right">Outgoing</th>
//                   <th className="p-3 text-right">Loss</th>
//                   <th className="p-3 text-right">Today</th>
//                   <th className="p-3 text-right">Month</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {flowData.map((item) => (
//                   <tr key={item.key} className="border-b border-slate-200">
//                     <td className="p-3 font-black text-[#081F5C]">
//                       {item.title}
//                     </td>
//                     <td className="p-3 text-right">{item.incoming} kW</td>
//                     <td className="p-3 text-right text-emerald-600 font-bold">
//                       {item.outgoing} kW
//                     </td>
//                     <td className="p-3 text-right text-amber-600 font-bold">
//                       {item.incoming - item.outgoing} kW
//                     </td>
//                     <td className="p-3 text-right">
//                       {item.today.toLocaleString()} kWh
//                     </td>
//                     <td className="p-3 text-right">
//                       {item.month.toLocaleString()} kWh
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }





// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import prestigeLogo from "../assets/ser-removebg.png";

// export default function OverviewPage() {
//   const navigate = useNavigate();

//   const initialFlow = [
//     { key: "source", title: "33kV Source", short: "SRC", sub: "Grid / DG Input", incoming: 1120, outgoing: 1085, today: 18420, month: 486500 },
//     { key: "feeder", title: "33kV Feeder", short: "FDR", sub: "HT Feeder Panel", incoming: 1085, outgoing: 1040, today: 17680, month: 462300 },
//     { key: "transformer", title: "Transformers", short: "TRF", sub: "33kV / 433V", incoming: 1040, outgoing: 980, today: 16940, month: 441900 },
//     { key: "kiosk", title: "LT Kiosk", short: "KSK", sub: "433V Panels", incoming: 980, outgoing: 935, today: 15720, month: 408700 },
//     { key: "busbar", title: "LT Busbar", short: "BUS", sub: "Busduct", incoming: 935, outgoing: 900, today: 14980, month: 392100 },
//     { key: "pcc", title: "PCC Main", short: "PCC", sub: "Wing Distribution", incoming: 900, outgoing: 850, today: 14160, month: 366400 },
//     { key: "wing1", title: "Wing 1", short: "W1", sub: "PCC 1 / PCC 2", incoming: 425, outgoing: 402, today: 7080, month: 181000 },
//     { key: "wing2", title: "Wing 2", short: "W2", sub: "PCC 3 / PCC 4", incoming: 425, outgoing: 410, today: 7420, month: 190400 },
//   ];

//   const [flowData, setFlowData] = useState(initialFlow);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setFlowData((prev) =>
//         prev.map((item) => {
//           const incoming = Math.max(
//             40,
//             item.incoming + Math.floor(Math.random() * 21) - 10
//           );

//           const outgoing = Math.min(
//             incoming - 5,
//             Math.max(35, item.outgoing + Math.floor(Math.random() * 17) - 8)
//           );

//           return {
//             ...item,
//             incoming,
//             outgoing,
//             today: item.today + Math.floor(outgoing / 75),
//             month: item.month + Math.floor(outgoing / 38),
//           };
//         })
//       );
//     }, 5000);

//     return () => clearInterval(timer);
//   }, []);

//   const totals = useMemo(() => {
//     const incoming = flowData[0].incoming;
//     const wing1 = flowData.find((x) => x.key === "wing1")?.outgoing || 0;
//     const wing2 = flowData.find((x) => x.key === "wing2")?.outgoing || 0;
//     const outgoing = wing1 + wing2;
//     const loss = incoming - outgoing;
//     const efficiency = Math.round((outgoing / incoming) * 100);
//     const today = flowData.reduce((sum, x) => sum + x.today, 0);
//     const month = flowData.reduce((sum, x) => sum + x.month, 0);

//     return { incoming, outgoing, loss, efficiency, today, month, wing1, wing2 };
//   }, [flowData]);

//   const maxOutgoing = Math.max(...flowData.map((x) => x.outgoing));
//   const flowChartData = flowData.slice(0, 5);

//   const PanelCard = ({ title, children, className = "" }) => (
//     <section
//       className={`relative rounded-[22px] bg-white border border-slate-200 shadow-[0_14px_35px_rgba(8,31,92,0.08)] ${className}`}
//     >
//       <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 w-[70%] max-w-[320px] rounded-lg bg-[#081F5C] border border-[#004AAD] px-4 py-2.5 text-center shadow-md">
//         <h3 className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.08em] text-white">
//           {title}
//         </h3>
//       </div>
//       {children}
//     </section>
//   );

//   const Gauge = ({ value, label }) => {
//     const safeValue = Math.min(Math.max(value, 0), 100);

//     return (
//       <div className="flex flex-col items-center justify-center">
//         <div className="relative w-[135px] h-[76px] overflow-hidden">
//           <div className="absolute inset-0 rounded-t-full border-[20px] border-b-0 border-slate-100" />
//           <div
//             className="absolute inset-0 rounded-t-full border-[20px] border-b-0 border-[#004AAD]"
//             style={{
//               clipPath: `polygon(0 0, ${safeValue * 2}% 0, ${safeValue * 2}% 100%, 0 100%)`,
//             }}
//           />
//           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[30px] font-normal text-[#081F5C]">
//             {safeValue}%
//           </div>
//         </div>

//         <p className="mt-3 text-center text-[12px] font-medium text-slate-700">
//           {label}
//         </p>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#EEF4FF]">
//       <header className="sticky top-0 z-[1000] h-[72px] bg-[#081F5C] border-b-4 border-[#004AAD] px-4 text-white shadow-md">
//         <div className="h-full mx-auto max-w-7xl flex items-center justify-between">
//   {/* Left Section */}
//   <div
//     onClick={() => navigate("/")}
//     className="ml-1 flex items-center cursor-pointer"
//   >
//     <div className="flex flex-col justify-center">
//       <h1 className="text-[26px] font-semibold tracking-[0.18em] text-white leading-none uppercase">
//         ARCOT
//         <span className="text-[#67E8F9] ml-2">
//           IIoT 1.0
//         </span>
//       </h1>

//       <span className="mt-1 text-[9px] uppercase tracking-[0.35em] text-blue-300 font-medium">
//         Industrial Internet of Things
//       </span>
//     </div>

//     <div className="h-[58px] border-l border-[#004AAD] ml-5"></div>

//     <img
//       src={prestigeLogo}
//       alt="Prestige Group"
//       className="h-[60px] w-[110px] object-cover ml-5"
//     />
//   </div>

//   {/* Right Section */}
//   <button
//     onClick={() => navigate("/")}
//     className="h-[36px] px-5 bg-[#004AAD] border border-cyan-400 text-white text-[10px] font-black uppercase tracking-[0.15em] hover:bg-[#0058cc] transition-all"
//   >
//     Dashboard
//   </button>
// </div>
//       </header>

//       <main className="max-w-[1380px] mx-auto px-5 md:px-6 py-7">
//         <section className="mb-8 flex items-center justify-between">
//           <div>
//             <h2 className="text-[26px] md:text-[32px] font-bold text-[#081F5C] uppercase tracking-[0.03em]">
//               BMS Analysis Report
//             </h2>
//             <p className="mt-1 text-[12px] md:text-[13px] font-medium text-slate-500">
//               Live source to wing power monitoring overview
//             </p>
//           </div>
//         </section>

//         <section className="grid grid-cols-1 xl:grid-cols-3 gap-7 mb-8 pt-4">
//           <PanelCard title="Energy Flow Growth" className="p-6 min-h-[330px]">
//             <div className="pt-8 h-[260px]">
//               <svg viewBox="0 0 430 245" className="w-full h-full">
//                 {[0, 1, 2, 3, 4].map((i) => (
//                   <line
//                     key={i}
//                     x1="42"
//                     x2="400"
//                     y1={35 + i * 40}
//                     y2={35 + i * 40}
//                     stroke="#E5E7EB"
//                     strokeWidth="1.5"
//                   />
//                 ))}

//                 <polyline
//                   points={flowChartData
//                     .map((d, i) => `${65 + i * 82},${220 - (d.outgoing / maxOutgoing) * 165}`)
//                     .join(" ")}
//                   fill="none"
//                   stroke="#004AAD"
//                   strokeWidth="4"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />

//                 {flowChartData.map((d, i) => {
//                   const y = 220 - (d.outgoing / maxOutgoing) * 165;

//                   return (
//                     <g key={d.key}>
//                       <rect
//                         x={57 + i * 82}
//                         y={y - 8}
//                         width="16"
//                         height="16"
//                         rx="3"
//                         fill="#081F5C"
//                       />
//                       <text
//                         x={65 + i * 82}
//                         y={y - 16}
//                         textAnchor="middle"
//                         fontSize="10"
//                         fontWeight="700"
//                         fill="#004AAD"
//                       >
//                         {d.outgoing}
//                       </text>
//                       <text
//                         x={65 + i * 82}
//                         y="238"
//                         textAnchor="middle"
//                         fontSize="10"
//                         fontWeight="700"
//                         fill="#081F5C"
//                       >
//                         {d.short}
//                       </text>
//                     </g>
//                   );
//                 })}
//               </svg>
//             </div>
//           </PanelCard>

//           <PanelCard title="Consumption Breakdown" className="p-6 min-h-[330px]">
//             <div className="pt-10 grid grid-cols-1 sm:grid-cols-[170px_1fr] items-center gap-5 min-h-[235px]">
//               <div className="mx-auto w-[160px] h-[160px] rounded-full bg-[conic-gradient(#67E8F9_0_24%,#004AAD_24%_48%,#081F5C_48%_70%,#60A5FA_70%_86%,#CBD5E1_86%_100%)] shadow-inner" />

//               <div className="space-y-2.5">
//                 {[
//                   ["24%", "33kV Source"],
//                   ["24%", "33kV Feeder"],
//                   ["22%", "Transformers"],
//                   ["16%", "LT Kiosk"],
//                   ["14%", "LT Busbar"],
//                 ].map(([v, label]) => (
//                   <div key={label} className="grid grid-cols-[50px_1fr] items-center gap-3 text-[13px]">
//                     <strong className="rounded-md bg-blue-50 py-1 text-center text-[#081F5C] font-semibold">
//                       {v}
//                     </strong>
//                     <span className="font-medium text-slate-600">
//                       {label}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <p className="text-[12px] text-slate-500 leading-relaxed">
//               Real-time power distribution from HT source to LT busbar and wing level output.
//             </p>
//           </PanelCard>

//           <PanelCard title="Demand Trends" className="p-6 min-h-[330px]">
//             <div className="pt-10 h-[260px] flex items-end justify-between gap-4">
//               {flowChartData.map((d) => (
//                 <div key={d.key} className="flex-1 text-center">
//                   <div className="mb-2 text-[18px] font-semibold text-[#081F5C]">
//                     {d.short}
//                   </div>

//                   <div
//                     className="mx-auto w-full max-w-[46px] rounded-t-md bg-[#004AAD] shadow-[0_0_14px_rgba(0,74,173,0.22)] transition-all duration-500"
//                     style={{
//                       height: `${Math.max(55, (d.outgoing / maxOutgoing) * 160)}px`,
//                     }}
//                   />

//                   <p className="mt-2 text-[10px] font-bold text-slate-600">
//                     {d.outgoing}kW
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </PanelCard>
//         </section>

//         <PanelCard title="Distribution Share" className="mb-8 p-6">
//           <div className="pt-12 grid grid-cols-2 md:grid-cols-5 gap-6">
//             <Gauge value={totals.efficiency} label="Efficiency" />
//             <Gauge value={Math.round((totals.wing1 / totals.outgoing) * 100)} label="Wing 1" />
//             <Gauge value={Math.round((totals.wing2 / totals.outgoing) * 100)} label="Wing 2" />
//             <Gauge value={Math.round((totals.loss / totals.incoming) * 100)} label="Loss" />
//             <Gauge value={100} label="Live System" />
//           </div>
//         </PanelCard>

//        <div className="relative pt-5">
//   <PanelCard title="Live Monitoring Summary" className="p-0">
//     <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 text-center">
//       {[
//         ["Total Incoming", `${totals.incoming} kW`],
//         ["Final Outgoing", `${totals.outgoing} kW`],
//         ["Distribution Loss", `${totals.loss} kW`],
//         ["Efficiency", `${totals.efficiency}%`],
//         ["Today", `${totals.today.toLocaleString()} kWh`],
//         ["Month", `${totals.month.toLocaleString()} kWh`],
//       ].map(([label, value]) => (
//         <div
//           key={label}
//           className="min-h-[130px] px-4 py-6 flex flex-col items-center justify-center"
//         >
//           <p className="text-[12px] font-medium text-slate-600">
//             {label}
//           </p>
//           <h2 className="mt-3 text-[22px] md:text-[24px] font-bold text-[#004AAD] leading-tight">
//             {value}
//           </h2>
//         </div>
//       ))}
//     </div>
//   </PanelCard>
// </div>
//       </main>
//     </div>
//   );
// }





// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import prestigeLogo from "../assets/ser-removebg.png";

// export default function OverviewPage() {
//   const navigate = useNavigate();

//   const initialFlow = [
//     { key: "source", title: "33kV Source", short: "SRC", incoming: 1120, outgoing: 1085, today: 18420, month: 486500 },
//     { key: "feeder", title: "33kV Feeder", short: "FDR", incoming: 1085, outgoing: 1040, today: 17680, month: 462300 },
//     { key: "transformer", title: "Transformers", short: "TRF", incoming: 1040, outgoing: 980, today: 16940, month: 441900 },
//     { key: "kiosk", title: "LT Kiosk", short: "KSK", incoming: 980, outgoing: 935, today: 15720, month: 408700 },
//     { key: "busbar", title: "LT Busbar", short: "BUS", incoming: 935, outgoing: 900, today: 14980, month: 392100 },
//     { key: "pcc", title: "PCC Main", short: "PCC", incoming: 900, outgoing: 850, today: 14160, month: 366400 },
//     { key: "wing1", title: "Wing 1", short: "W1", incoming: 425, outgoing: 402, today: 7080, month: 181000 },
//     { key: "wing2", title: "Wing 2", short: "W2", incoming: 425, outgoing: 410, today: 7420, month: 190400 },
//   ];

//   const [flowData, setFlowData] = useState(initialFlow);
//   const [lastUpdated, setLastUpdated] = useState(new Date());
//   const [reportView, setReportView] = useState("day");

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setFlowData((prev) =>
//         prev.map((item) => {
//           const incoming = Math.max(
//             40,
//             item.incoming + Math.floor(Math.random() * 15) - 7
//           );

//           const outgoing = Math.min(
//             incoming - 5,
//             Math.max(35, item.outgoing + Math.floor(Math.random() * 13) - 6)
//           );

//           return {
//             ...item,
//             incoming,
//             outgoing,
//             today: item.today + Math.floor(outgoing / 360),
//             month: item.month + Math.floor(outgoing / 180),
//           };
//         })
//       );

//       setLastUpdated(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const totals = useMemo(() => {
//     const incoming = flowData[0].incoming;
//     const wing1 = flowData.find((x) => x.key === "wing1")?.outgoing || 0;
//     const wing2 = flowData.find((x) => x.key === "wing2")?.outgoing || 0;
//     const outgoing = wing1 + wing2;
//     const loss = incoming - outgoing;
//     const efficiency = Math.round((outgoing / incoming) * 100);
//     const today = flowData.reduce((sum, x) => sum + x.today, 0);
//     const month = flowData.reduce((sum, x) => sum + x.month, 0);

//     return { incoming, outgoing, loss, efficiency, today, month, wing1, wing2 };
//   }, [flowData]);

//   const maxOutgoing = Math.max(...flowData.map((x) => x.outgoing));

//   const dayReport = [
//     { label: "12 AM", value: 820 },
//     { label: "04 AM", value: 760 },
//     { label: "08 AM", value: 1010 },
//     { label: "12 PM", value: totals.outgoing },
//     { label: "04 PM", value: 940 },
//     { label: "08 PM", value: 870 },
//   ];

//   const monthReport = [
//     { label: "Week 1", value: Math.round(totals.month * 0.22) },
//     { label: "Week 2", value: Math.round(totals.month * 0.25) },
//     { label: "Week 3", value: Math.round(totals.month * 0.27) },
//     { label: "Week 4", value: Math.round(totals.month * 0.26) },
//   ];

//   const activeReport = reportView === "day" ? dayReport : monthReport;
//   const maxReport = Math.max(...activeReport.map((x) => x.value));

//   const KpiCard = ({ value, label, active = false }) => (
//     <div
//       className={`relative h-[108px] overflow-hidden rounded-[4px] px-5 py-5 text-white shadow-[0_8px_24px_rgba(0,74,173,0.25)] ${
//         active ? "bg-[#1687D9]" : "bg-[#1E46B8]"
//       }`}
//     >
//       <h2 className="text-[32px] font-light leading-none tracking-wide text-center">
//         {value}
//       </h2>

//       <p className="mt-2 text-center text-[10px] font-black uppercase tracking-[0.12em] text-blue-100">
//         {label}
//       </p>

//       <svg
//         className="absolute left-0 bottom-0 w-full h-[34px] opacity-25"
//         viewBox="0 0 260 40"
//         preserveAspectRatio="none"
//       >
//         <path
//           d="M0 28 C25 8, 45 38, 70 20 C95 3, 110 33, 135 19 C160 4, 180 36, 205 18 C230 2, 245 27, 260 13"
//           fill="none"
//           stroke="#67E8F9"
//           strokeWidth="4"
//         />
//       </svg>
//     </div>
//   );

//   const SectionTitle = ({ title, right }) => (
//     <div className="mb-5 flex items-center justify-between">
//       <h3 className="text-[17px] font-semibold text-slate-700">{title}</h3>
//       {right}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#F5F9FF]">
//       <header className="sticky top-0 z-[1000] h-[72px] bg-[#081F5C] border-b-4 border-[#004AAD] px-4 text-white shadow-md">
//         <div className="h-full mx-auto max-w-7xl flex items-center justify-between">
//           <div
//             onClick={() => navigate("/")}
//             className="ml-1 flex items-center cursor-pointer"
//           >
//             <div className="flex flex-col justify-center">
//               <h1 className="text-[26px] font-semibold tracking-[0.18em] text-white leading-none uppercase">
//                 ARCOT <span className="text-[#67E8F9] ml-2">IIoT 1.0</span>
//               </h1>

//               <span className="mt-1 text-[9px] uppercase tracking-[0.35em] text-blue-300 font-medium">
//                 Industrial Internet of Things
//               </span>
//             </div>

//             <div className="h-[58px] border-l border-[#004AAD] ml-5"></div>

//             <img
//               src={prestigeLogo}
//               alt="Prestige Group"
//               className="h-[60px] w-[110px] object-cover ml-5"
//             />
//           </div>

//           <button
//             onClick={() => navigate("/")}
//             className="h-[36px] px-5 bg-[#004AAD] border border-cyan-400 text-white text-[10px] font-black uppercase tracking-[0.15em] hover:bg-[#0058cc] transition-all"
//           >
//             Dashboard
//           </button>
//         </div>
//       </header>

//       <main className="max-w-[1480px] mx-auto bg-white min-h-[calc(100vh-72px)] border-x border-blue-50 shadow-[0_0_24px_rgba(8,31,92,0.08)]">
       

//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-7 px-7 pt-8">
//           <KpiCard value={`${totals.incoming} kW`} label="Total Incoming" />
//           <KpiCard value={`${totals.outgoing} kW`} label="Final Outgoing" active />
//           <KpiCard value={`${totals.loss} kW`} label="Distribution Loss" />
//           <KpiCard value={`${totals.efficiency}%`} label="System Efficiency" active />
//           <KpiCard value={`${totals.today.toLocaleString()} kWh`} label="Today Energy" />
//         </section>

//         <section className="grid grid-cols-1 xl:grid-cols-[35%_60%] gap-9 px-7 pt-12">
//           <div>
//             <SectionTitle title="Power Consumption Distribution" />

//             <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] items-center gap-8 min-h-[280px]">
//               <div className="relative mx-auto w-[230px] h-[230px] rounded-full bg-[conic-gradient(#1687D9_0_22%,#1E46B8_22%_44%,#2F67E8_44%_67%,#1F78B8_67%_82%,#2048B8_82%_100%)]">
//                 <div className="absolute inset-[48px] rounded-full bg-white flex flex-col items-center justify-center">
//                   <h3 className="text-[22px] font-light text-slate-600">
//                     {totals.month.toLocaleString()}
//                   </h3>
//                   <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
//                     Month kWh
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 {[
//                   ["33kV Source", "#1687D9"],
//                   ["33kV Feeder", "#1E46B8"],
//                   ["Transformers", "#2F67E8"],
//                   ["LT Kiosk", "#1F78B8"],
//                   ["LT Busbar", "#2048B8"],
//                 ].map(([label, color]) => (
//                   <div key={label} className="flex items-center gap-3">
//                     <span
//                       className="h-3 w-3 rounded-full"
//                       style={{ backgroundColor: color }}
//                     />
//                     <span className="text-[13px] font-medium text-slate-500">
//                       {label}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//        <div>
//   <SectionTitle
//     title="Power Trend Analysis"
//     right={
//       <div className="flex items-center gap-5 text-[12px] text-slate-400">
//         <span className="text-[#004AAD] font-bold">Live</span>
//         <span>Day</span>
//         <span>Month</span>
//       </div>
//     }
//   />

//   <div className="h-[280px]">
//     <svg viewBox="0 0 780 280" className="w-full h-full">
//       {[0, 1, 2, 3, 4, 5].map((i) => (
//         <line
//           key={`h-${i}`}
//           x1="45"
//           x2="740"
//           y1={35 + i * 38}
//           y2={35 + i * 38}
//           stroke="#E5E7EB"
//           strokeWidth="1"
//         />
//       ))}

//       <polyline
//         points={flowData
//           .map((d, i) => {
//             const maxValue = Math.max(
//               ...flowData.flatMap((x) => [x.incoming, x.outgoing])
//             );
//             const x = 70 + i * 92;
//             const y = 245 - (d.incoming / maxValue) * 185;
//             return `${x},${y}`;
//           })
//           .join(" ")}
//         fill="none"
//         stroke="#081F5C"
//         strokeWidth="4"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />

//       <polygon
//         points={`
//           ${flowData
//             .map((d, i) => {
//               const maxValue = Math.max(
//                 ...flowData.flatMap((x) => [x.incoming, x.outgoing])
//               );
//               const x = 70 + i * 92;
//               const y = 245 - (d.outgoing / maxValue) * 185;
//               return `${x},${y}`;
//             })
//             .join(" ")}
//           ${70 + (flowData.length - 1) * 92},245
//           70,245
//         `}
//         fill="#1687D9"
//         opacity="0.22"
//       />

//       <polyline
//         points={flowData
//           .map((d, i) => {
//             const maxValue = Math.max(
//               ...flowData.flatMap((x) => [x.incoming, x.outgoing])
//             );
//             const x = 70 + i * 92;
//             const y = 245 - (d.outgoing / maxValue) * 185;
//             return `${x},${y}`;
//           })
//           .join(" ")}
//         fill="none"
//         stroke="#1687D9"
//         strokeWidth="5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />

//       {flowData.map((d, i) => {
//         const maxValue = Math.max(
//           ...flowData.flatMap((x) => [x.incoming, x.outgoing])
//         );

//         const x = 70 + i * 92;
//         const incomingY = 245 - (d.incoming / maxValue) * 185;
//         const outgoingY = 245 - (d.outgoing / maxValue) * 185;

//         return (
//           <g key={d.key}>
//             <circle cx={x} cy={incomingY} r="5" fill="#081F5C" />
//             <circle cx={x} cy={outgoingY} r="6" fill="#1687D9" />

//             <text
//               x={x}
//               y={incomingY - 12}
//               textAnchor="middle"
//               fontSize="9"
//               fontWeight="800"
//               fill="#081F5C"
//             >
//               {d.incoming}
//             </text>

//             <text
//               x={x}
//               y={outgoingY + 20}
//               textAnchor="middle"
//               fontSize="9"
//               fontWeight="800"
//               fill="#1687D9"
//             >
//               {d.outgoing}
//             </text>

//             <text
//               x={x}
//               y="268"
//               textAnchor="middle"
//               fontSize="10"
//               fontWeight="900"
//               fill="#64748B"
//             >
//               {d.short}
//             </text>
//           </g>
//         );
//       })}

//       <circle cx="555" cy="22" r="5" fill="#081F5C" />
//       <text x="568" y="26" fontSize="11" fontWeight="700" fill="#64748B">
//         Incoming
//       </text>

//       <circle cx="650" cy="22" r="5" fill="#1687D9" />
//       <text x="663" y="26" fontSize="11" fontWeight="700" fill="#64748B">
//         Outgoing
//       </text>
//     </svg>
//   </div>

//   <div className="grid grid-cols-4 text-center pt-2">
//     {[
//       [`${totals.incoming} kW`, "Incoming"],
//       [`${totals.outgoing} kW`, "Outgoing"],
//       [`${totals.loss} kW`, "Loss"],
//       [`${totals.efficiency}%`, "Efficiency"],
//     ].map(([v, l]) => (
//       <div key={l}>
//         <h3 className="text-[20px] font-light text-slate-600">
//           {v}
//         </h3>
//         <p className="text-[11px] text-slate-300">{l}</p>
//       </div>
//     ))}
//   </div>
// </div>
//         </section>

//         <section className="grid grid-cols-1 xl:grid-cols-[40%_36%_24%] gap-8 px-7 pt-12 pb-8">
//           <div>
//             <SectionTitle title="Live Energy Monitoring" />

//             <div className="h-[245px]">
//               <svg viewBox="0 0 520 240" className="w-full h-full">
//                 <path
//                   d="M35 80 C60 65, 85 95, 110 78 C145 55, 160 125, 190 110 C225 92, 242 130, 275 105 C305 80, 325 70, 355 82 C385 95, 400 62, 430 75 C460 90, 475 125, 500 105 L500 220 L35 220 Z"
//                   fill="#BFD8EA"
//                 />
//                 <path
//                   d="M35 130 C60 120, 85 145, 110 132 C145 112, 160 168, 190 150 C225 132, 242 160, 275 140 C305 120, 325 115, 355 128 C385 140, 400 110, 430 122 C460 134, 475 160, 500 142 L500 220 L35 220 Z"
//                   fill="#2F67E8"
//                   opacity="0.85"
//                 />
//                 <path
//                   d="M35 160 C70 148, 100 172, 130 158 C165 140, 185 190, 220 172 C250 155, 275 170, 310 150 C345 130, 380 160, 410 145 C445 130, 470 175, 500 155 L500 220 L35 220 Z"
//                   fill="#1E46B8"
//                   opacity="0.92"
//                 />
//               </svg>
//             </div>
//           </div>

//           <div>
//             <SectionTitle title="Source to Wing Flow Analysis" />

//             <div className="space-y-3 pt-3">
//               {flowData.map((item) => (
//                 <div
//                   key={item.key}
//                   className="grid grid-cols-[70px_1fr_70px] items-center gap-3"
//                 >
//                   <span className="text-[12px] font-semibold text-slate-400 text-right">
//                     {item.short}
//                   </span>

//                   <div className="h-[18px] bg-slate-100">
//                     <div
//                       className="h-full bg-gradient-to-r from-[#1687D9] to-[#1E46B8] transition-all duration-500"
//                       style={{
//                         width: `${Math.max(
//                           18,
//                           (item.outgoing / maxOutgoing) * 100
//                         )}%`,
//                       }}
//                     />
//                   </div>

//                   <span className="text-[12px] font-bold text-[#081F5C]">
//                     {item.outgoing}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="relative min-h-[245px] overflow-hidden rounded-sm bg-[#1E46B8] p-6 text-white">
//             <h3 className="text-[18px] font-semibold">System Health</h3>

//             <div className="mt-5 space-y-4 relative z-10">
//               {["Source", "Feeder", "Transformer", "Kiosk", "Busbar", "PCC"].map(
//                 (item) => (
//                   <div key={item} className="flex items-center justify-between">
//                     <span className="text-[12px] font-semibold text-blue-100">
//                       {item}
//                     </span>
//                     <span className="flex items-center gap-2 text-[11px] font-bold text-cyan-100">
//                       <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
//                       Healthy
//                     </span>
//                   </div>
//                 )
//               )}
//             </div>

//             <p className="mt-5 text-[11px] text-blue-100 relative z-10">
//               Updated: {lastUpdated.toLocaleTimeString()}
//             </p>
//           </div>
//         </section>

//         <section className="px-7 pb-10">
//           <div className="rounded-[6px] border border-blue-100 bg-white shadow-[0_14px_40px_rgba(8,31,92,0.08)]">
//             <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
//               <h3 className="text-[17px] font-semibold text-slate-700">
//                 {reportView === "day"
//                   ? "Day Wise Energy Report"
//                   : "Monthly Energy Report"}
//               </h3>

//               <div className="flex rounded-full bg-blue-50 p-1">
//                 <button
//                   onClick={() => setReportView("day")}
//                   className={`px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em] rounded-full ${
//                     reportView === "day"
//                       ? "bg-[#004AAD] text-white"
//                       : "text-[#004AAD]"
//                   }`}
//                 >
//                   Day Wise
//                 </button>

//                 <button
//                   onClick={() => setReportView("month")}
//                   className={`px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em] rounded-full ${
//                     reportView === "month"
//                       ? "bg-[#004AAD] text-white"
//                       : "text-[#004AAD]"
//                   }`}
//                 >
//                   Monthly
//                 </button>
//               </div>
//             </div>

//             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//               {activeReport.map((item) => (
//                 <div
//                   key={item.label}
//                   className="grid grid-cols-[80px_1fr_110px] items-center gap-4"
//                 >
//                   <span className="text-[12px] font-bold text-slate-500">
//                     {item.label}
//                   </span>

//                   <div className="h-[18px] rounded-full bg-slate-100 overflow-hidden">
//                     <div
//                       className="h-full rounded-full bg-gradient-to-r from-[#1687D9] to-[#1E46B8] transition-all duration-700"
//                       style={{ width: `${(item.value / maxReport) * 100}%` }}
//                     />
//                   </div>

//                   <strong className="text-right text-[13px] text-[#081F5C]">
//                     {item.value.toLocaleString()} kWh
//                   </strong>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }





// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import prestigeLogo from "../assets/ser-removebg.png";

// export default function OverviewPage() {
//   const navigate = useNavigate();

//   const initialFlow = [
//     { key: "source", title: "33kV Source", short: "SRC", incoming: 1120, outgoing: 1085, today: 18420, month: 486500 },
//     { key: "feeder", title: "33kV Feeder", short: "FDR", incoming: 1085, outgoing: 1040, today: 17680, month: 462300 },
//     { key: "transformer", title: "Transformers", short: "TRF", incoming: 1040, outgoing: 980, today: 16940, month: 441900 },
//     { key: "kiosk", title: "LT Kiosk", short: "KSK", incoming: 980, outgoing: 935, today: 15720, month: 408700 },
//     { key: "busbar", title: "LT Busbar", short: "BUS", incoming: 935, outgoing: 900, today: 14980, month: 392100 },
//     { key: "pcc", title: "PCC Main", short: "PCC", incoming: 900, outgoing: 850, today: 14160, month: 366400 },
//     { key: "wing1", title: "Wing 1", short: "W1", incoming: 425, outgoing: 402, today: 7080, month: 181000 },
//     { key: "wing2", title: "Wing 2", short: "W2", incoming: 425, outgoing: 410, today: 7420, month: 190400 },
//   ];

//   const colors = [
//     "#1687D9",
//     "#1E46B8",
//     "#2F67E8",
//     "#1F78B8",
//     "#2048B8",
//     "#2563EB",
//     "#67E8F9",
//     "#081F5C",
//   ];

//   const [flowData, setFlowData] = useState(initialFlow);
//   const [lastUpdated, setLastUpdated] = useState(new Date());
//   const [reportView, setReportView] = useState("month");

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setFlowData((prev) =>
//         prev.map((item) => {
//           const incoming = Math.max(
//             40,
//             item.incoming + Math.floor(Math.random() * 15) - 7
//           );

//           const outgoing = Math.min(
//             incoming - 5,
//             Math.max(35, item.outgoing + Math.floor(Math.random() * 13) - 6)
//           );

//           return {
//             ...item,
//             incoming,
//             outgoing,
//             today: item.today + Math.floor(outgoing / 360),
//             month: item.month + Math.floor(outgoing / 180),
//           };
//         })
//       );

//       setLastUpdated(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const totals = useMemo(() => {
//     const incoming = flowData[0].incoming;
//     const wing1 = flowData.find((x) => x.key === "wing1")?.outgoing || 0;
//     const wing2 = flowData.find((x) => x.key === "wing2")?.outgoing || 0;
//     const outgoing = wing1 + wing2;
//     const loss = incoming - outgoing;
//     const efficiency = Math.round((outgoing / incoming) * 100);
//     const today = flowData.reduce((sum, x) => sum + x.today, 0);
//     const month = flowData.reduce((sum, x) => sum + x.month, 0);

//     return { incoming, outgoing, loss, efficiency, today, month, wing1, wing2 };
//   }, [flowData]);

//   const maxValue = Math.max(
//     ...flowData.flatMap((x) => [x.incoming, x.outgoing])
//   );

//   const dayReport = [
//     { label: "12 AM", value: 820 },
//     { label: "04 AM", value: 760 },
//     { label: "08 AM", value: 1010 },
//     { label: "12 PM", value: totals.outgoing },
//     { label: "04 PM", value: 940 },
//     { label: "08 PM", value: 870 },
//   ];

//   const monthReport = [
//     { label: "Week 1", value: Math.round(totals.month * 0.22) },
//     { label: "Week 2", value: Math.round(totals.month * 0.25) },
//     { label: "Week 3", value: Math.round(totals.month * 0.27) },
//     { label: "Week 4", value: Math.round(totals.month * 0.26) },
//   ];

//   const activeReport = reportView === "day" ? dayReport : monthReport;
//   const maxReport = Math.max(...activeReport.map((x) => x.value));

//   const KpiCard = ({ value, label, active = false }) => (
//     <div
//       className={`relative h-[108px] overflow-hidden rounded-[4px] px-5 py-5 text-white shadow-[0_8px_24px_rgba(0,74,173,0.25)] ${
//         active ? "bg-[#1687D9]" : "bg-[#1E46B8]"
//       }`}
//     >
//       <h2 className="text-[32px] font-light leading-none tracking-wide text-center">
//         {value}
//       </h2>

//       <p className="mt-2 text-center text-[10px] font-black uppercase tracking-[0.12em] text-blue-100">
//         {label}
//       </p>

//       <svg
//         className="absolute left-0 bottom-0 w-full h-[34px] opacity-25"
//         viewBox="0 0 260 40"
//         preserveAspectRatio="none"
//       >
//         <path
//           d="M0 28 C25 8, 45 38, 70 20 C95 3, 110 33, 135 19 C160 4, 180 36, 205 18 C230 2, 245 27, 260 13"
//           fill="none"
//           stroke="#67E8F9"
//           strokeWidth="4"
//         />
//       </svg>
//     </div>
//   );

//   const SectionTitle = ({ title, right }) => (
//     <div className="mb-4 flex min-h-[38px] items-center justify-between">
//       <h3 className="text-[17px] font-semibold text-slate-700">{title}</h3>
//       {right}
//     </div>
//   );

//   return (
//     <div className="h-screen w-screen overflow-hidden bg-[#F5F9FF]">
//       <header className="h-[72px] bg-[#081F5C] border-b-4 border-[#004AAD] px-8 text-white shadow-md">
//         <div className="h-full w-full flex items-center justify-between">
//           <div
//             onClick={() => navigate("/")}
//             className="flex items-center cursor-pointer"
//           >
//             <div className="flex flex-col justify-center">
//               <h1 className="text-[26px] font-semibold tracking-[0.18em] text-white leading-none uppercase">
//                 ARCOT <span className="text-[#67E8F9] ml-2">IIoT 1.0</span>
//               </h1>

//               <span className="mt-1 text-[9px] uppercase tracking-[0.35em] text-blue-300 font-medium">
//                 Industrial Internet of Things
//               </span>
//             </div>

//             <div className="h-[58px] border-l border-[#004AAD] ml-5"></div>

//             <img
//               src={prestigeLogo}
//               alt="Prestige Group"
//               className="h-[60px] w-[110px] object-cover ml-5"
//             />
//           </div>

//           <button
//             onClick={() => navigate("/")}
//             className="h-[36px] px-6 bg-[#004AAD] border border-cyan-400 text-white text-[10px] font-black uppercase tracking-[0.15em] hover:bg-[#0058cc] transition-all"
//           >
//             Dashboard
//           </button>
//         </div>
//       </header>

//       <main className="h-[calc(100vh-72px)] w-full overflow-y-auto bg-white">
//         <div className="w-full px-8 py-8">
//           {/* KPI CARDS */}
//           <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//             <KpiCard value={`${totals.incoming} kW`} label="Total Incoming" />
//             <KpiCard value={`${totals.outgoing} kW`} label="Final Outgoing" active />
//             <KpiCard value={`${totals.loss} kW`} label="Distribution Loss" />
//             <KpiCard value={`${totals.efficiency}%`} label="System Efficiency" active />
//             <KpiCard value={`${totals.today.toLocaleString()} kWh`} label="Today Energy" />
//           </section>

//           {/* DONUT + TREND */}
//           <section className="grid grid-cols-1 xl:grid-cols-[34%_66%] gap-8 pt-8">
//             <div>
//               <SectionTitle title="Power Consumption Distribution" />

//               <div className="grid grid-cols-1 md:grid-cols-[230px_1fr] items-center gap-6 h-[280px]">
//                 <div className="relative mx-auto w-[210px] h-[210px] rounded-full bg-[conic-gradient(#1687D9_0_14%,#1E46B8_14%_28%,#2F67E8_28%_42%,#1F78B8_42%_56%,#2048B8_56%_70%,#2563EB_70%_82%,#67E8F9_82%_91%,#081F5C_91%_100%)]">
//                   <div className="absolute inset-[44px] rounded-full bg-white flex flex-col items-center justify-center">
//                     <h3 className="text-[21px] font-light text-slate-600 leading-none">
//                       {totals.month.toLocaleString()}
//                     </h3>
//                     <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
//                       Month kWh
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-2.5">
//                   {flowData.map((item, index) => (
//                     <div
//                       key={item.key}
//                       className="flex items-center justify-between gap-3"
//                     >
//                       <div className="flex items-center gap-3">
//                         <span
//                           className="h-3 w-3 rounded-full shrink-0"
//                           style={{ backgroundColor: colors[index] }}
//                         />
//                         <span className="text-[12px] font-semibold text-slate-500">
//                           {item.title}
//                         </span>
//                       </div>

//                       <span className="text-[12px] font-black text-[#081F5C]">
//                         {item.outgoing} kW
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div>
//               <SectionTitle
//                 title="Power Trend Analysis"
//                 right={
//                   <div className="flex items-center gap-5 text-[12px] text-slate-400">
//                     <span className="text-[#004AAD] font-bold">Live</span>
//                     <span>Day</span>
//                     <span>Month</span>
//                   </div>
//                 }
//               />

//               <div className="h-[245px]">
//                 <svg viewBox="0 0 780 250" className="w-full h-full">
//                   {[0, 1, 2, 3, 4, 5].map((i) => (
//                     <line
//                       key={i}
//                       x1="45"
//                       x2="740"
//                       y1={28 + i * 34}
//                       y2={28 + i * 34}
//                       stroke="#E5E7EB"
//                     />
//                   ))}

//                   <polyline
//                     points={flowData
//                       .map((d, i) => {
//                         const x = 70 + i * 92;
//                         const y = 215 - (d.incoming / maxValue) * 160;
//                         return `${x},${y}`;
//                       })
//                       .join(" ")}
//                     fill="none"
//                     stroke="#081F5C"
//                     strokeWidth="4"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />

//                   <polygon
//                     points={`
//                       ${flowData
//                         .map((d, i) => {
//                           const x = 70 + i * 92;
//                           const y = 215 - (d.outgoing / maxValue) * 160;
//                           return `${x},${y}`;
//                         })
//                         .join(" ")}
//                       ${70 + (flowData.length - 1) * 92},215
//                       70,215
//                     `}
//                     fill="#1687D9"
//                     opacity="0.22"
//                   />

//                   <polyline
//                     points={flowData
//                       .map((d, i) => {
//                         const x = 70 + i * 92;
//                         const y = 215 - (d.outgoing / maxValue) * 160;
//                         return `${x},${y}`;
//                       })
//                       .join(" ")}
//                     fill="none"
//                     stroke="#1687D9"
//                     strokeWidth="5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />

//                   {flowData.map((d, i) => {
//                     const x = 70 + i * 92;
//                     const incomingY = 215 - (d.incoming / maxValue) * 160;
//                     const outgoingY = 215 - (d.outgoing / maxValue) * 160;

//                     return (
//                       <g key={d.key}>
//                         <circle cx={x} cy={incomingY} r="5" fill="#081F5C" />
//                         <circle cx={x} cy={outgoingY} r="6" fill="#1687D9" />

//                         <text
//                           x={x}
//                           y={incomingY - 11}
//                           textAnchor="middle"
//                           fontSize="9"
//                           fontWeight="800"
//                           fill="#081F5C"
//                         >
//                           {d.incoming}
//                         </text>

//                         <text
//                           x={x}
//                           y={outgoingY + 20}
//                           textAnchor="middle"
//                           fontSize="9"
//                           fontWeight="800"
//                           fill="#1687D9"
//                         >
//                           {d.outgoing}
//                         </text>

//                         <text
//                           x={x}
//                           y="242"
//                           textAnchor="middle"
//                           fontSize="10"
//                           fontWeight="900"
//                           fill="#64748B"
//                         >
//                           {d.short}
//                         </text>
//                       </g>
//                     );
//                   })}

//                   <circle cx="555" cy="18" r="5" fill="#081F5C" />
//                   <text x="568" y="22" fontSize="11" fontWeight="700" fill="#64748B">
//                     Incoming
//                   </text>

//                   <circle cx="650" cy="18" r="5" fill="#1687D9" />
//                   <text x="663" y="22" fontSize="11" fontWeight="700" fill="#64748B">
//                     Outgoing
//                   </text>
//                 </svg>
//               </div>

//               <div className="grid grid-cols-4 text-center pt-3 border-t border-slate-100 mt-2">
//                 {[
//                   [`${totals.incoming} kW`, "Incoming"],
//                   [`${totals.outgoing} kW`, "Outgoing"],
//                   [`${totals.loss} kW`, "Loss"],
//                   [`${totals.efficiency}%`, "Efficiency"],
//                 ].map(([v, l]) => (
//                   <div key={l}>
//                     <h3 className="text-[20px] font-light text-slate-600 leading-none">
//                       {v}
//                     </h3>
//                     <p className="mt-2 text-[11px] text-slate-300">{l}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* BOTTOM ROW */}
//           <section className="grid grid-cols-1 xl:grid-cols-[40%_60%] gap-8 pt-8 items-stretch">
//          <div className="min-w-0">
//   <SectionTitle title="Live Energy Monitoring" />

//   <div className="h-[360px] rounded-[10px] border border-blue-100 bg-white p-6 shadow-[0_18px_40px_rgba(8,31,92,0.10)] flex flex-col overflow-hidden">
//     <div className="flex items-center justify-between shrink-0">
//       <div>
//         <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
//           Real-Time Load Curve
//         </p>
//         <h3 className="mt-2 text-[30px] font-light leading-none text-[#081F5C]">
//           {totals.outgoing} kW
//         </h3>
//       </div>

//       <div className="text-right">
//         <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
//           Updated
//         </p>
//         <p className="mt-2 text-[13px] font-bold text-[#004AAD]">
//           {lastUpdated.toLocaleTimeString()}
//         </p>
//       </div>
//     </div>

//     <div className="mt-4 flex-1 min-h-0 rounded-[8px] bg-gradient-to-b from-blue-50 to-white p-3">
//       <svg viewBox="0 0 520 190" className="w-full h-full">
//         {[0, 1, 2, 3].map((i) => (
//           <line
//             key={i}
//             x1="30"
//             x2="500"
//             y1={30 + i * 38}
//             y2={30 + i * 38}
//             stroke="#E5E7EB"
//           />
//         ))}

//         <polygon
//           points={`
//             ${flowData
//               .map((d, i) => {
//                 const x = 35 + i * 65;
//                 const y = 165 - (d.outgoing / maxValue) * 130;
//                 return `${x},${y}`;
//               })
//               .join(" ")}
//             ${35 + (flowData.length - 1) * 65},165
//             35,165
//           `}
//           fill="#1687D9"
//           opacity="0.25"
//         />

//         <polyline
//           points={flowData
//             .map((d, i) => {
//               const x = 35 + i * 65;
//               const y = 165 - (d.outgoing / maxValue) * 130;
//               return `${x},${y}`;
//             })
//             .join(" ")}
//           fill="none"
//           stroke="#004AAD"
//           strokeWidth="4"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />

//         {flowData.map((d, i) => {
//           const x = 35 + i * 65;
//           const y = 165 - (d.outgoing / maxValue) * 130;

//           return (
//             <g key={d.key}>
//               <circle cx={x} cy={y} r="5" fill="#081F5C" />
//               <text
//                 x={x}
//                 y="184"
//                 textAnchor="middle"
//                 fontSize="9"
//                 fontWeight="800"
//                 fill="#64748B"
//               >
//                 {d.short}
//               </text>
//             </g>
//           );
//         })}
//       </svg>
//     </div>

//     <div className="mt-4 grid grid-cols-3 gap-3 text-center shrink-0">
//       {[
//         ["Incoming", `${totals.incoming} kW`, "#081F5C"],
//         ["Outgoing", `${totals.outgoing} kW`, "#004AAD"],
//         ["Loss", `${totals.loss} kW`, "#F97316"],
//       ].map(([label, value, color]) => (
//         <div
//           key={label}
//           className="rounded-[8px] border border-slate-100 bg-slate-50 px-2 py-3"
//         >
//           <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
//             {label}
//           </p>
//           <h4
//             className="mt-2 text-[16px] font-light leading-none"
//             style={{ color }}
//           >
//             {value}
//           </h4>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>

//      <div className="min-w-0">
//   <SectionTitle
//     title={reportView === "day" ? "Day Wise Energy Report" : "Monthly Energy Report"}
//     right={
//       <div className="flex rounded-full bg-blue-50 p-1 shrink-0">
//         <button
//           onClick={() => setReportView("day")}
//           className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] rounded-full transition-all ${
//             reportView === "day"
//               ? "bg-[#004AAD] text-white shadow-sm"
//               : "text-[#004AAD] hover:bg-white"
//           }`}
//         >
//           Day Wise
//         </button>

//         <button
//           onClick={() => setReportView("month")}
//           className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] rounded-full transition-all ${
//             reportView === "month"
//               ? "bg-[#004AAD] text-white shadow-sm"
//               : "text-[#004AAD] hover:bg-white"
//           }`}
//         >
//           Monthly
//         </button>
//       </div>
//     }
//   />

//   <div className="relative h-[360px] overflow-hidden rounded-[10px] border border-blue-100 bg-white p-6 shadow-[0_18px_40px_rgba(8,31,92,0.10)] flex flex-col">
//     <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-blue-50/80" />

//     <div className="relative z-10 flex items-start justify-between">
//       <div>
//         <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
//           Consumption Graph
//         </p>
//         <h3 className="mt-2 text-[26px] font-light leading-none text-[#081F5C]">
//           {reportView === "day"
//             ? `${totals.today.toLocaleString()} kWh`
//             : `${totals.month.toLocaleString()} kWh`}
//         </h3>
//       </div>

//       <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1">
//         <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#004AAD]">
//           {reportView === "day" ? "Today" : "This Month"}
//         </span>
//       </div>
//     </div>

//     <div className="relative z-10 mt-5 flex-1 rounded-[8px] bg-gradient-to-b from-slate-50 to-white px-5 pt-4 pb-3">
//       <div className="absolute inset-x-5 top-1/4 border-t border-dashed border-slate-200" />
//       <div className="absolute inset-x-5 top-1/2 border-t border-dashed border-slate-200" />
//       <div className="absolute inset-x-5 top-3/4 border-t border-dashed border-slate-200" />

//       <div className="relative z-10 flex h-full items-end justify-between gap-6">
//         {activeReport.map((item) => {
//           const height = Math.max(42, (item.value / maxReport) * 160);

//           return (
//             <div key={item.label} className="flex flex-1 flex-col items-center justify-end">
//               <p className="mb-3 text-[11px] font-black text-[#081F5C]">
//                 {item.value.toLocaleString()}
//               </p>

//               <div
//                 className="w-full max-w-[76px] rounded-t-[9px] bg-gradient-to-t from-[#081F5C] via-[#004AAD] to-[#67E8F9] shadow-[0_8px_18px_rgba(0,74,173,0.22)] transition-all duration-700"
//                 style={{ height: `${height}px` }}
//               />

//               <p className="mt-3 text-[11px] font-bold text-slate-500">
//                 {item.label}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>

//     <div className="relative z-10 mt-5 grid grid-cols-3 gap-4 text-center">
//       {[
//         ["Today", totals.today.toLocaleString(), "kWh", "#081F5C"],
//         ["Month", totals.month.toLocaleString(), "kWh", "#004AAD"],
//         ["Avg Week", Math.round(totals.month / 4).toLocaleString(), "kWh", "#081F5C"],
//       ].map(([label, value, unit, color]) => (
//         <div
//           key={label}
//           className="rounded-[8px] border border-blue-100 bg-blue-50/60 py-3"
//         >
//           <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
//             {label}
//           </p>
//           <h3
//             className="mt-2 text-[18px] font-light leading-none"
//             style={{ color }}
//           >
//             {value}
//           </h3>
//           <p className="mt-1 text-[9px] text-slate-400">{unit}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }




import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import prestigeLogo from "../assets/ser-removebg.png";

export default function OverviewPage() {
  const navigate = useNavigate();

  const initialFlow = [
    { key: "source", title: "33kV Source", short: "SRC", incoming: 1120, outgoing: 1085, today: 18420, month: 486500 },
    { key: "feeder", title: "33kV Feeder", short: "FDR", incoming: 1085, outgoing: 1040, today: 17680, month: 462300 },
    { key: "transformer", title: "Transformers", short: "TRF", incoming: 1040, outgoing: 980, today: 16940, month: 441900 },
    { key: "kiosk", title: "LT Kiosk", short: "KSK", incoming: 980, outgoing: 935, today: 15720, month: 408700 },
    { key: "busbar", title: "LT Busbar", short: "BUS", incoming: 935, outgoing: 900, today: 14980, month: 392100 },
    { key: "pcc", title: "PCC Main", short: "PCC", incoming: 900, outgoing: 850, today: 14160, month: 366400 },
    { key: "wing1", title: "Wing 1", short: "W1", incoming: 425, outgoing: 402, today: 7080, month: 181000 },
    { key: "wing2", title: "Wing 2", short: "W2", incoming: 425, outgoing: 410, today: 7420, month: 190400 },
  ];

  const [flowData, setFlowData] = useState(initialFlow);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setFlowData((prev) =>
        prev.map((item) => {
          const incoming = Math.max(
            40,
            item.incoming + Math.floor(Math.random() * 15) - 7
          );

          const outgoing = Math.min(
            incoming - 5,
            Math.max(35, item.outgoing + Math.floor(Math.random() * 13) - 6)
          );

          return {
            ...item,
            incoming,
            outgoing,
            today: item.today + Math.floor(outgoing / 360),
            month: item.month + Math.floor(outgoing / 180),
          };
        })
      );

      setLastUpdated(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totals = useMemo(() => {
    const incoming = flowData[0].incoming;
    const wing1 = flowData.find((x) => x.key === "wing1")?.outgoing || 0;
    const wing2 = flowData.find((x) => x.key === "wing2")?.outgoing || 0;
    const outgoing = wing1 + wing2;
    const loss = incoming - outgoing;
    const efficiency = Math.round((outgoing / incoming) * 100);
    const today = flowData.reduce((sum, x) => sum + x.today, 0);
    const month = flowData.reduce((sum, x) => sum + x.month, 0);

    return { incoming, outgoing, loss, efficiency, today, month, wing1, wing2 };
  }, [flowData]);

  const maxValue = Math.max(
    ...flowData.flatMap((x) => [x.incoming, x.outgoing])
  );

  const Card = ({ children, className = "" }) => (
    <div
      className={`rounded-[18px] bg-[#224da3] border border-cyan-300/10 shadow-[0_10px_24px_rgba(0,0,0,0.25)] overflow-hidden ${className}`}
    >
      {children}
    </div>
  );

  const Title = ({ children }) => (
    <h3 className="text-[14px] font-bold text-blue-50 mb-2">{children}</h3>
  );

  return (
    <div className="min-h-screen w-full bg-[#151c55] text-white">
      <header className="sticky top-0 z-50 h-[64px] bg-[#10194b] px-6 flex items-center justify-between border-b border-cyan-400/20">
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer"
        >
          <div>
            <h1 className="text-[22px] font-semibold tracking-[0.18em] uppercase leading-none">
              ARCOT <span className="text-[#67E8F9]">IIOT 1.0</span>
            </h1>

            <p className="mt-2 text-[8px] tracking-[0.35em] uppercase text-cyan-200">
              Industrial Internet of Things
            </p>
          </div>

          <div className="h-[46px] border-l border-cyan-300/30 mx-4" />

          <img
            src={prestigeLogo}
            alt="Prestige"
            className="h-[48px] w-[95px] object-contain"
          />
        </div>

        <button
          onClick={() => navigate("/")}
          className="rounded-full border border-cyan-300/60 px-6 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100"
        >
          Dashboard
        </button>
      </header>

      <main className="w-full p-4">
        <div className="grid w-full grid-cols-12 gap-4">
          {/* LEFT */}
          <div className="col-span-3 space-y-4">
            <Card className="p-4 h-[140px]">
              <div className="grid grid-cols-2 h-full">
                <div className="flex flex-col justify-center">
                  <h2 className="text-[34px] font-light leading-none">
                    {totals.incoming}
                  </h2>
                  <p className="mt-3 text-[10px] text-cyan-300">Incoming kW</p>
                </div>

                <div className="border-l border-cyan-300/20 pl-5 flex flex-col justify-center">
                  <h2 className="text-[34px] font-light leading-none">
                    {totals.outgoing}
                  </h2>
                  <p className="mt-3 text-[10px] text-cyan-300">Outgoing kW</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 h-[220px]">
              <Title>Live Summary</Title>

              <div className="grid h-[calc(100%-28px)] grid-cols-2 gap-4">
                <div className="flex flex-col justify-center">
                  <h2 className="text-[30px] font-light leading-none text-cyan-100">
                    ↑ {totals.today.toLocaleString()}
                  </h2>
                  <p className="mt-3 text-[10px] text-cyan-300">
                    Today Energy kWh
                  </p>
                </div>

                <div className="flex flex-col justify-center">
                  <h2 className="text-[30px] font-light leading-none text-yellow-300">
                    ↓ {totals.loss}
                  </h2>
                  <p className="mt-3 text-[10px] text-cyan-300">Loss kW</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 h-[220px]">
              <Title>Equipment Load Bars</Title>

              <div className="flex h-[calc(100%-28px)] flex-col justify-center gap-4">
                {flowData.slice(0, 4).map((item) => (
                  <div key={item.key}>
                    <div className="mb-1 flex justify-between text-[10px] text-cyan-200">
                      <span>{item.title}</span>
                      <span>{item.outgoing} kW</span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-[#173579]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-yellow-300"
                        style={{ width: `${(item.outgoing / maxValue) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 h-[260px]">
              <Title>Day Wise Energy Report</Title>

              <div className="flex h-[calc(100%-28px)] items-end justify-between gap-3">
                {["12 AM", "04 AM", "08 AM", "12 PM", "04 PM", "08 PM"].map(
                  (label, i) => (
                    <div
                      key={label}
                      className="flex flex-1 flex-col items-center justify-end"
                    >
                      <div className="flex h-[165px] items-end gap-1">
                        <div
                          className="w-4 rounded-t bg-cyan-400"
                          style={{ height: `${82 + (i % 3) * 16}px` }}
                        />

                        <div
                          className="w-4 rounded-t bg-yellow-400"
                          style={{ height: `${72 + (i % 4) * 14}px` }}
                        />
                      </div>

                      <p className="mt-2 text-[10px] text-cyan-100">{label}</p>
                    </div>
                  )
                )}
              </div>
            </Card>
          </div>

          {/* MIDDLE */}
          <div className="col-span-3 space-y-4">
            <Card className="p-4 h-[270px]">
              <Title>System Efficiency</Title>

              <div className="flex h-[calc(100%-28px)] flex-col items-center justify-center">
                <div className="relative h-[155px] w-[155px] rounded-full bg-[conic-gradient(#35D8F5_0_65%,rgba(255,255,255,0.15)_65%_100%)]">
                  <div className="absolute inset-[17px] rounded-full bg-[#224da3] flex items-center justify-center">
                    <h2 className="text-[40px] font-light">
                      {totals.efficiency}%
                    </h2>
                  </div>
                </div>

                <button className="mt-4 rounded-full bg-cyan-400 px-14 py-2 text-[#12306F] text-[12px] font-black">
                  Healthy
                </button>
              </div>
            </Card>

            <Card className="p-4 h-[270px]">
              <Title>Area Load Curve</Title>

              <svg viewBox="0 0 330 160" className="w-full h-[210px]">
                <polygon
                  points="0,95 40,115 80,70 120,108 160,35 200,100 240,75 280,98 330,60 330,160 0,160"
                  fill="#35D8F5"
                  opacity="0.38"
                />

                <polygon
                  points="0,125 40,85 80,145 120,75 160,150 200,82 240,140 280,95 330,120 330,160 0,160"
                  fill="#F6B23F"
                  opacity="0.78"
                />
              </svg>
            </Card>

            <Card className="p-4 h-[315px]">
              <Title>Monthly Energy</Title>

              <h2 className="text-[38px] font-light text-yellow-300 leading-none">
                {totals.month.toLocaleString()}
              </h2>

              <p className="text-[11px] text-cyan-300 mt-2 mb-5">
                kWh this month
              </p>

              <div className="space-y-4">
                {[0.22, 0.25, 0.27, 0.26].map((v, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-12 text-[10px] text-cyan-200">
                      Week {i + 1}
                    </span>

                    <div className="flex-1 h-4 rounded-full bg-[#173579] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-300 via-cyan-400 to-blue-300"
                        style={{ width: `${v * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 h-[145px]">
                <Title>Realtime Monitoring</Title>

                <div className="grid grid-cols-2">
                  <div>
                    <h2 className="text-[32px] font-light">{totals.outgoing}</h2>
                    <p className="text-[10px] text-cyan-300">Live Load kW</p>
                  </div>

                  <div>
                    <h2 className="text-[20px] font-light text-yellow-300">
                      {lastUpdated.toLocaleTimeString()}
                    </h2>
                    <p className="text-[10px] text-cyan-300">Last Updated</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 h-[145px]">
                <Title>Power Load</Title>

                <svg viewBox="0 0 330 115" className="w-full h-[95px]">
                  <polyline
                    points="30,70 70,80 110,52 150,90 190,30 230,72 270,55 310,82"
                    fill="none"
                    stroke="#F6B23F"
                    strokeWidth="5"
                  />

                  <polyline
                    points="30,74 70,82 110,60 150,94 190,30 230,68 270,52 310,78"
                    fill="none"
                    stroke="#35D8F5"
                    strokeWidth="5"
                  />
                </svg>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 h-[185px]">
                <Title>Wing Distribution</Title>

                <div className="flex items-center justify-around">
                  {[
                    ["Wing 1", totals.wing1],
                    ["Wing 2", totals.wing2],
                  ].map(([label, value]) => (
                    <div key={label} className="text-center">
                      <div className="relative h-[100px] w-[100px] rounded-full bg-[conic-gradient(#F6B23F_0_72%,#35D8F5_72%_100%)]">
                        <div className="absolute inset-[13px] rounded-full bg-[#224da3] flex items-center justify-center">
                          <h3 className="text-[22px] font-light">{value}</h3>
                        </div>
                      </div>

                      <p className="mt-2 text-[11px] text-cyan-200">{label}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4 h-[185px]">
                <Title>System Status</Title>

                <h2 className="text-[34px] font-light text-cyan-100">HEALTHY</h2>

                <p className="text-[11px] text-cyan-300 mt-2">
                  All equipment running normally
                </p>

                <div className="mt-5 h-3 rounded-full bg-[#173579] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-yellow-300"
                    style={{ width: `${totals.efficiency}%` }}
                  />
                </div>
              </Card>
            </div>

            <Card className="p-4 h-[250px]">
              <Title>Power Trend Analysis</Title>

              <svg viewBox="0 0 760 220" className="w-full h-[200px]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="45"
                    x2="720"
                    y1={35 + i * 35}
                    y2={35 + i * 35}
                    stroke="rgba(255,255,255,0.12)"
                  />
                ))}

                <polyline
                  points={flowData
                    .map(
                      (d, i) =>
                        `${60 + i * 90},${185 - (d.incoming / maxValue) * 140}`
                    )
                    .join(" ")}
                  fill="none"
                  stroke="#F6B23F"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <polyline
                  points={flowData
                    .map(
                      (d, i) =>
                        `${60 + i * 90},${185 - (d.outgoing / maxValue) * 140}`
                    )
                    .join(" ")}
                  fill="none"
                  stroke="#35D8F5"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {flowData.map((d, i) => {
                  const x = 60 + i * 90;
                  const y = 185 - (d.outgoing / maxValue) * 140;

                  return (
                    <g key={d.key}>
                      <circle cx={x} cy={y} r="5" fill="#E9FFFF" />

                      <text
                        x={x}
                        y="210"
                        textAnchor="middle"
                        fontSize="10"
                        fill="#BCEEFF"
                      >
                        {d.short}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </Card>

            <Card className="p-4 h-[255px]">
              <Title>Equipment Flow Overview</Title>

              <div className="grid grid-cols-4 gap-3 h-[175px]">
                {flowData.map((item) => (
                  <div
                    key={item.key}
                    className="rounded-[12px] bg-[#173579] p-3 flex flex-col justify-center"
                  >
                    <p className="text-[10px] text-cyan-200">{item.short}</p>

                    <h4 className="text-[20px] font-light">{item.outgoing}</h4>

                    <p className="text-[9px] text-cyan-300">kW</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}