import React from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { taskService } from "../services/api";
import { useAuthStore, useTaskStore } from "../store/index";

/* ─── God-tier styles ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --void:    #04050d;
    --surface: rgba(255,255,255,0.032);
    --surface2:rgba(255,255,255,0.06);
    --border:  rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.14);
    --accent:  #9b6dff;
    --accent2: #5b9fff;
    --glow:    rgba(155,109,255,0.22);
    --glow2:   rgba(91,159,255,0.14);
    --green:   #2ddb96;
    --amber:   #f5a623;
    --red:     #ff5e6c;
    --text:    #ede9ff;
    --muted:   rgba(237,233,255,0.42);
    --faint:   rgba(237,233,255,0.16);
    --font-d:  'Syne', sans-serif;
    --font-b:  'DM Sans', sans-serif;
    --ease:    cubic-bezier(0.22,1,0.36,1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ─── ROOT ─── */
  .gd-root {
    min-height: 100vh;
    background: var(--void);
    font-family: var(--font-b);
    color: var(--text);
    overflow-x: hidden;
    position: relative;
  }

  /* ─── AMBIENT AURORA ─── */
  .gd-aurora {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
  }
  .gd-aurora-orb {
    position: absolute; border-radius: 50%;
    filter: blur(80px);
    animation: orb-drift 18s ease-in-out infinite alternate;
  }
  .gd-aurora-orb:nth-child(1) {
    width: 700px; height: 500px; top: -200px; left: -150px;
    background: radial-gradient(ellipse, rgba(100,60,220,0.18) 0%, transparent 70%);
    animation-duration: 20s;
  }
  .gd-aurora-orb:nth-child(2) {
    width: 600px; height: 500px; top: -100px; right: -200px;
    background: radial-gradient(ellipse, rgba(45,120,255,0.12) 0%, transparent 70%);
    animation-duration: 26s; animation-delay: -8s;
  }
  .gd-aurora-orb:nth-child(3) {
    width: 500px; height: 400px; bottom: 10%; left: 30%;
    background: radial-gradient(ellipse, rgba(45,219,150,0.07) 0%, transparent 70%);
    animation-duration: 30s; animation-delay: -14s;
  }
  @keyframes orb-drift {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(40px, 30px) scale(1.06); }
  }

  /* ─── NOISE GRAIN ─── */
  .gd-grain {
    position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }

  /* ─── SCAN LINE ─── */
  .gd-scanline {
    position: fixed; inset: 0; z-index: 2; pointer-events: none;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.03) 2px,
      rgba(0,0,0,0.03) 4px
    );
  }

  /* ─── LAYER ─── */
  .gd-layer { position: relative; z-index: 10; }

  /* ─── HEADER ─── */
  .gd-header {
    position: sticky; top: 0; z-index: 100;
    backdrop-filter: blur(32px) saturate(200%);
    -webkit-backdrop-filter: blur(32px) saturate(200%);
    background: rgba(4,5,13,0.72);
    border-bottom: 1px solid var(--border);
  }
  .gd-header-inner {
    max-width: 1360px; margin: 0 auto;
    padding: 0 2.5rem; height: 68px;
    display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
  }

  /* Logo */
  .gd-logo { display: flex; align-items: center; gap: 11px; }
  .gd-logo-mark {
    position: relative; width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, #5b33cc, #9b6dff);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-d); font-weight: 800; font-size: 16px; color: #fff;
    box-shadow: 0 0 20px rgba(155,109,255,0.45), inset 0 1px 0 rgba(255,255,255,0.2);
  }
  .gd-logo-mark::after {
    content: '';
    position: absolute; inset: -1px; border-radius: 11px;
    background: linear-gradient(135deg, rgba(155,109,255,0.6), rgba(91,159,255,0.3));
    z-index: -1; filter: blur(6px);
  }
  .gd-logo-name {
    font-family: var(--font-d); font-weight: 800; font-size: 18px;
    letter-spacing: -0.4px; color: var(--text);
  }

  /* Header greeting */
  .gd-greeting {
    display: flex; align-items: center; gap: 10px;
    font-size: 13px; color: var(--muted);
  }
  .gd-greeting-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: linear-gradient(135deg, #5b33cc, #9b6dff);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff;
    box-shadow: 0 0 12px rgba(155,109,255,0.4);
  }
  .gd-greeting strong { color: var(--text); font-weight: 600; }

  /* Header right */
  .gd-header-right { display: flex; align-items: center; gap: 10px; }
  .gd-status-pill {
    display: flex; align-items: center; gap: 6px;
    padding: 5px 12px 5px 8px;
    border-radius: 999px;
    border: 1px solid rgba(45,219,150,0.25);
    background: rgba(45,219,150,0.06);
    font-size: 12px; font-weight: 500; color: var(--green);
  }
  .gd-status-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 6px var(--green);
    animation: pulse-dot 2.4s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.85); }
  }
  .gd-logout-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 7px 16px; border-radius: 9px;
    border: 1px solid var(--border2);
    background: var(--surface);
    color: var(--muted); font-family: var(--font-b); font-size: 13px; font-weight: 500;
    cursor: pointer;
    transition: background 0.2s var(--ease), color 0.2s var(--ease), box-shadow 0.2s var(--ease);
  }
  .gd-logout-btn:hover {
    background: var(--surface2);
    color: var(--text);
    box-shadow: 0 0 16px rgba(155,109,255,0.1);
  }

  /* ─── MAIN ─── */
  .gd-main {
    max-width: 1360px; margin: 0 auto;
    padding: 3rem 2.5rem 6rem;
  }

  /* ─── HERO HEADLINE ─── */
  .gd-hero { margin-bottom: 3rem; }
  .gd-hero-label {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 4px 12px 4px 8px; border-radius: 999px;
    border: 1px solid rgba(155,109,255,0.25);
    background: rgba(155,109,255,0.08);
    font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--accent);
    margin-bottom: 1rem;
  }
  .gd-hero-label span {
    width: 5px; height: 5px; border-radius: 50%; background: var(--accent);
    box-shadow: 0 0 6px var(--accent);
  }
  .gd-hero-title {
    font-family: var(--font-d);
    font-weight: 800; font-size: clamp(28px, 3.5vw, 44px);
    letter-spacing: -1.5px; line-height: 1.08;
    color: var(--text);
    margin-bottom: 0.5rem;
  }
  .gd-hero-title em {
    font-style: normal;
    background: linear-gradient(135deg, #9b6dff 0%, #5b9fff 50%, #2ddb96 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .gd-hero-sub { font-size: 15px; color: var(--muted); }

  /* ─── STAT CARDS ─── */
  .gd-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 2.5rem;
  }
  @media (max-width: 1100px) { .gd-stats { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px)  { .gd-stats { grid-template-columns: 1fr; } }

  .gd-stat {
    position: relative; overflow: hidden;
    padding: 1.75rem 1.75rem 1.5rem;
    border-radius: 20px;
    border: 1px solid var(--border);
    background: var(--surface);
    backdrop-filter: blur(16px);
    cursor: default;
    transition: transform 0.35s var(--ease), border-color 0.35s var(--ease), box-shadow 0.35s var(--ease);
    animation: stat-in 0.6s var(--ease) both;
  }
  .gd-stat:nth-child(1) { animation-delay: 0.05s; }
  .gd-stat:nth-child(2) { animation-delay: 0.12s; }
  .gd-stat:nth-child(3) { animation-delay: 0.19s; }
  .gd-stat:nth-child(4) { animation-delay: 0.26s; }
  @keyframes stat-in {
    from { opacity: 0; transform: translateY(24px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .gd-stat:hover {
    transform: translateY(-4px);
    border-color: var(--border2);
    box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 0 40px var(--stat-glow, rgba(155,109,255,0.12));
  }

  /* Aurora border on hover */
  .gd-stat::before {
    content: '';
    position: absolute; inset: 0;
    background: var(--stat-gradient, none);
    opacity: 0; transition: opacity 0.4s;
    border-radius: inherit; pointer-events: none;
  }
  .gd-stat:hover::before { opacity: 1; }

  /* Top shimmer line */
  .gd-stat::after {
    content: '';
    position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
    background: var(--stat-line, linear-gradient(90deg, transparent, rgba(155,109,255,0.5), transparent));
    opacity: 0; transition: opacity 0.4s;
  }
  .gd-stat:hover::after { opacity: 1; }

  .gd-stat[data-c="purple"] {
    --stat-glow: rgba(155,109,255,0.14);
    --stat-gradient: radial-gradient(ellipse at 80% 0%, rgba(155,109,255,0.12) 0%, transparent 65%);
    --stat-line: linear-gradient(90deg, transparent, rgba(155,109,255,0.6), transparent);
  }
  .gd-stat[data-c="green"] {
    --stat-glow: rgba(45,219,150,0.12);
    --stat-gradient: radial-gradient(ellipse at 80% 0%, rgba(45,219,150,0.1) 0%, transparent 65%);
    --stat-line: linear-gradient(90deg, transparent, rgba(45,219,150,0.6), transparent);
  }
  .gd-stat[data-c="amber"] {
    --stat-glow: rgba(245,166,35,0.12);
    --stat-gradient: radial-gradient(ellipse at 80% 0%, rgba(245,166,35,0.1) 0%, transparent 65%);
    --stat-line: linear-gradient(90deg, transparent, rgba(245,166,35,0.6), transparent);
  }
  .gd-stat[data-c="red"] {
    --stat-glow: rgba(255,94,108,0.12);
    --stat-gradient: radial-gradient(ellipse at 80% 0%, rgba(255,94,108,0.1) 0%, transparent 65%);
    --stat-line: linear-gradient(90deg, transparent, rgba(255,94,108,0.6), transparent);
  }

  .gd-stat-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
  .gd-stat-icon {
    width: 40px; height: 40px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .gd-stat-icon[data-c="purple"] { background: rgba(155,109,255,0.14); box-shadow: 0 0 16px rgba(155,109,255,0.2); }
  .gd-stat-icon[data-c="green"]  { background: rgba(45,219,150,0.12);  box-shadow: 0 0 16px rgba(45,219,150,0.18); }
  .gd-stat-icon[data-c="amber"]  { background: rgba(245,166,35,0.12);  box-shadow: 0 0 16px rgba(245,166,35,0.18); }
  .gd-stat-icon[data-c="red"]    { background: rgba(255,94,108,0.12);  box-shadow: 0 0 16px rgba(255,94,108,0.18); }

  .gd-stat-trend {
    font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 999px;
  }
  .gd-stat-trend.up   { background: rgba(45,219,150,0.1); color: var(--green); }
  .gd-stat-trend.warn { background: rgba(245,166,35,0.1); color: var(--amber); }

  .gd-stat-value {
    font-family: var(--font-d);
    font-weight: 800;
    font-size: 52px; line-height: 1;
    letter-spacing: -2.5px;
    margin-bottom: 6px;
  }
  .gd-stat-value[data-c="purple"] { color: var(--accent); }
  .gd-stat-value[data-c="green"]  { color: var(--green); }
  .gd-stat-value[data-c="amber"]  { color: var(--amber); }
  .gd-stat-value[data-c="red"]    { color: var(--red); }

  .gd-stat-label {
    font-size: 12px; font-weight: 500; letter-spacing: 0.06em;
    text-transform: uppercase; color: var(--muted); margin-bottom: 1.25rem;
  }

  /* Bar track */
  .gd-stat-bar { height: 3px; border-radius: 3px; background: rgba(255,255,255,0.07); overflow: hidden; }
  .gd-stat-fill {
    height: 100%; border-radius: 3px;
    transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
  }
  .gd-stat-fill[data-c="purple"] { background: linear-gradient(90deg, #5b33cc, #9b6dff); box-shadow: 0 0 8px rgba(155,109,255,0.6); }
  .gd-stat-fill[data-c="green"]  { background: linear-gradient(90deg, #0db36e, #2ddb96); box-shadow: 0 0 8px rgba(45,219,150,0.6); }
  .gd-stat-fill[data-c="amber"]  { background: linear-gradient(90deg, #c47d10, #f5a623); box-shadow: 0 0 8px rgba(245,166,35,0.6); }
  .gd-stat-fill[data-c="red"]    { background: linear-gradient(90deg, #cc2d3e, #ff5e6c); box-shadow: 0 0 8px rgba(255,94,108,0.6); }

  /* ─── BODY GRID ─── */
  .gd-body {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 20px;
    align-items: start;
  }
  @media (max-width: 1100px) { .gd-body { grid-template-columns: 1fr; } }

  /* ─── CONTROLS PANEL ─── */
  .gd-controls {
    padding: 1.5rem;
    border-radius: 20px;
    border: 1px solid var(--border);
    background: var(--surface);
    backdrop-filter: blur(16px);
    margin-bottom: 1.25rem;
    animation: panel-in 0.5s var(--ease) 0.3s both;
  }
  @keyframes panel-in {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .gd-controls-row {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 12px;
  }
  @media (max-width: 700px) { .gd-controls-row { grid-template-columns: 1fr; } }

  .gd-input {
    width: 100%; padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: rgba(255,255,255,0.03);
    color: var(--text); font-family: var(--font-b); font-size: 13.5px;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .gd-input::placeholder { color: var(--faint); }
  .gd-input:focus {
    border-color: rgba(155,109,255,0.5);
    background: rgba(155,109,255,0.05);
    box-shadow: 0 0 0 3px rgba(155,109,255,0.08);
  }
  .gd-input option { background: #0e0f1e; color: var(--text); }

  .gd-cta {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 22px; border-radius: 10px; border: none;
    background: linear-gradient(135deg, #5b33cc, #9b6dff);
    color: #fff; font-family: var(--font-d); font-weight: 700; font-size: 14px;
    cursor: pointer; letter-spacing: 0.01em;
    box-shadow: 0 4px 24px rgba(91,51,204,0.45), inset 0 1px 0 rgba(255,255,255,0.15);
    transition: transform 0.2s var(--ease), box-shadow 0.2s var(--ease);
    position: relative; overflow: hidden;
  }
  .gd-cta::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    opacity: 0; transition: opacity 0.2s;
  }
  .gd-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 36px rgba(91,51,204,0.6), inset 0 1px 0 rgba(255,255,255,0.15); }
  .gd-cta:hover::before { opacity: 1; }
  .gd-cta:active { transform: translateY(0); }

  .gd-cta-cancel {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 22px; border-radius: 10px;
    border: 1px solid var(--border2);
    background: var(--surface2);
    color: var(--muted); font-family: var(--font-d); font-weight: 600; font-size: 14px;
    cursor: pointer;
    transition: color 0.2s, background 0.2s;
  }
  .gd-cta-cancel:hover { color: var(--text); background: rgba(255,255,255,0.08); }

  /* ─── TASK FORM WRAPPER ─── */
  .gd-form-wrap {
    padding: 2rem;
    border-radius: 20px;
    border: 1px solid rgba(155,109,255,0.25);
    background: rgba(91,51,204,0.07);
    backdrop-filter: blur(16px);
    margin-bottom: 1.25rem;
    box-shadow: 0 0 40px rgba(91,51,204,0.1);
    animation: form-slide 0.3s var(--ease) both;
  }
  @keyframes form-slide {
    from { opacity: 0; transform: translateY(-10px) scale(0.99); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ─── EMPTY STATE ─── */
  .gd-empty {
    text-align: center;
    padding: 6rem 2rem;
    border-radius: 24px;
    border: 1px dashed var(--border2);
    background: var(--surface);
    animation: panel-in 0.4s var(--ease) both;
  }
  .gd-empty-icon { font-size: 64px; display: block; margin-bottom: 1.5rem; }
  .gd-empty h2 { font-family: var(--font-d); font-weight: 700; font-size: 24px; margin-bottom: 0.5rem; }
  .gd-empty p { color: var(--muted); font-size: 15px; margin-bottom: 2rem; }

  /* ─── LOADING ─── */
  .gd-loader {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 6rem 0; gap: 1.25rem;
  }
  .gd-spinner {
    width: 40px; height: 40px; border-radius: 50%;
    border: 2px solid var(--border);
    border-top-color: var(--accent);
    animation: spin 0.7s linear infinite;
    box-shadow: 0 0 16px rgba(155,109,255,0.3);
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .gd-loader p { font-size: 14px; color: var(--muted); }

  /* ─── SECTION LABEL ─── */
  .gd-section-label {
    font-family: var(--font-d); font-size: 11px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--faint);
    margin-bottom: 1rem;
    display: flex; align-items: center; gap: 10px;
  }
  .gd-section-label::after {
    content: ''; flex: 1; height: 1px;
    background: linear-gradient(90deg, var(--border2), transparent);
  }

  /* ─── SIDEBAR ─── */
  .gd-sidebar { display: flex; flex-direction: column; gap: 16px; }

  /* Activity card */
  .gd-card {
    border-radius: 20px;
    border: 1px solid var(--border);
    background: var(--surface);
    backdrop-filter: blur(16px);
    overflow: hidden;
    animation: panel-in 0.5s var(--ease) 0.35s both;
  }
  .gd-card-head {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .gd-card-title {
    font-family: var(--font-d); font-weight: 700; font-size: 14px;
    letter-spacing: -0.2px;
  }
  .gd-card-badge {
    font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 999px;
    background: rgba(155,109,255,0.12); color: var(--accent);
  }
  .gd-card-body { padding: 1.25rem 1.5rem; }

  /* Activity feed */
  .gd-activity { display: flex; flex-direction: column; gap: 0; }
  .gd-activity-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
    transition: background 0.2s;
  }
  .gd-activity-item:last-child { border-bottom: none; }
  .gd-activity-dot {
    width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0;
  }
  .gd-activity-dot.green  { background: var(--green);  box-shadow: 0 0 6px var(--green); }
  .gd-activity-dot.purple { background: var(--accent);  box-shadow: 0 0 6px var(--accent); }
  .gd-activity-dot.amber  { background: var(--amber);   box-shadow: 0 0 6px var(--amber); }
  .gd-activity-dot.red    { background: var(--red);     box-shadow: 0 0 6px var(--red); }
  .gd-activity-text { font-size: 13px; color: var(--muted); line-height: 1.45; }
  .gd-activity-text strong { color: var(--text); font-weight: 500; }
  .gd-activity-time { font-size: 11px; color: var(--faint); margin-top: 2px; }

  /* Progress ring card */
  .gd-ring-wrap {
    display: flex; flex-direction: column; align-items: center; gap: 1rem;
    padding: 1.5rem;
  }
  .gd-ring-svg { overflow: visible; }
  .gd-ring-track {
    fill: none; stroke: var(--border); stroke-width: 8;
  }
  .gd-ring-fill {
    fill: none; stroke-width: 8; stroke-linecap: round;
    stroke: url(#ring-grad);
    transition: stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1);
    transform-origin: center;
    transform: rotate(-90deg);
    filter: drop-shadow(0 0 6px rgba(155,109,255,0.6));
  }
  .gd-ring-label {
    font-family: var(--font-d); font-weight: 800; font-size: 32px;
    letter-spacing: -1.5px; fill: var(--text);
  }
  .gd-ring-sub { font-size: 12px; fill: var(--muted); }
  .gd-ring-stats {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px; width: 100%;
  }
  .gd-ring-stat {
    text-align: center; padding: 10px;
    border-radius: 10px; border: 1px solid var(--border); background: rgba(255,255,255,0.02);
  }
  .gd-ring-stat-val { font-family: var(--font-d); font-weight: 700; font-size: 20px; }
  .gd-ring-stat-val.green  { color: var(--green); }
  .gd-ring-stat-val.purple { color: var(--accent); }
  .gd-ring-stat-lbl { font-size: 11px; color: var(--muted); margin-top: 2px; }

  /* Priority breakdown */
  .gd-priority { display: flex; flex-direction: column; gap: 12px; padding: 1.25rem 1.5rem; }
  .gd-priority-row { display: flex; align-items: center; gap: 10px; }
  .gd-priority-label { font-size: 12px; font-weight: 500; width: 52px; color: var(--muted); }
  .gd-priority-track { flex: 1; height: 6px; border-radius: 3px; background: rgba(255,255,255,0.05); overflow: hidden; }
  .gd-priority-fill {
    height: 100%; border-radius: 3px;
    transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
  }
  .gd-priority-fill.high   { background: linear-gradient(90deg, #cc2d3e, #ff5e6c); box-shadow: 0 0 6px rgba(255,94,108,0.5); }
  .gd-priority-fill.medium { background: linear-gradient(90deg, #c47d10, #f5a623); box-shadow: 0 0 6px rgba(245,166,35,0.5); }
  .gd-priority-fill.low    { background: linear-gradient(90deg, #0db36e, #2ddb96); box-shadow: 0 0 6px rgba(45,219,150,0.5); }
  .gd-priority-count { font-size: 12px; color: var(--faint); width: 20px; text-align: right; }

  /* Alert */
  .gd-alert-wrap { margin-bottom: 1.5rem; }
`;

/* ─── Completion ring ─── */
function CompletionRing({ pct = 0, completed = 0, total = 0 }) {
  const R = 56, C = 2 * Math.PI * R;
  const offset = C - (pct / 100) * C;
  return (
    <div className="gd-ring-wrap">
      <svg className="gd-ring-svg" width="160" height="160" viewBox="0 0 160 160">
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5b33cc" />
            <stop offset="50%" stopColor="#9b6dff" />
            <stop offset="100%" stopColor="#5b9fff" />
          </linearGradient>
        </defs>
        <circle className="gd-ring-track" cx="80" cy="80" r={R} />
        <circle
          className="gd-ring-fill"
          cx="80" cy="80" r={R}
          strokeDasharray={C}
          strokeDashoffset={offset}
        />
        <text className="gd-ring-label" x="80" y="76" textAnchor="middle" dominantBaseline="middle">{pct}%</text>
        <text className="gd-ring-sub"   x="80" y="97" textAnchor="middle">complete</text>
      </svg>
      <div className="gd-ring-stats">
        <div className="gd-ring-stat">
          <div className="gd-ring-stat-val green">{completed}</div>
          <div className="gd-ring-stat-lbl">Done</div>
        </div>
        <div className="gd-ring-stat">
          <div className="gd-ring-stat-val purple">{total - completed}</div>
          <div className="gd-ring-stat-lbl">Remaining</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Activity feed ─── */
function ActivityFeed({ tasks }) {
  const recent = React.useMemo(() => {
    const items = [];
    const safe = tasks || [];
    safe.slice(0, 4).forEach((t) => {
      if (t.status === "completed") {
        items.push({ color: "green", text: <><strong>{t.title}</strong> marked complete</>, time: "recently" });
      } else if (t.priority === "high") {
        items.push({ color: "red", text: <><strong>{t.title}</strong> flagged as high priority</>, time: "active" });
      } else {
        items.push({ color: "purple", text: <><strong>{t.title}</strong> added to queue</>, time: "pending" });
      }
    });
    if (items.length === 0) items.push({ color: "amber", text: <>No activity yet — create your first task</>, time: "now" });
    return items;
  }, [tasks]);

  return (
    <div className="gd-activity">
      {recent.map((a, i) => (
        <div key={i} className="gd-activity-item">
          <div className={`gd-activity-dot ${a.color}`} />
          <div>
            <div className="gd-activity-text">{a.text}</div>
            <div className="gd-activity-time">{a.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Priority breakdown ─── */
function PriorityBreakdown({ tasks }) {
  const safe = tasks || [];
  const high   = safe.filter(t => t.priority === "high").length;
  const medium = safe.filter(t => t.priority === "medium").length;
  const low    = safe.filter(t => t.priority === "low").length;
  const total  = Math.max(safe.length, 1);

  return (
    <div className="gd-priority">
      {[
        { label: "High",   count: high,   pct: (high   / total) * 100, cls: "high" },
        { label: "Medium", count: medium, pct: (medium / total) * 100, cls: "medium" },
        { label: "Low",    count: low,    pct: (low    / total) * 100, cls: "low" },
      ].map(({ label, count, pct, cls }) => (
        <div key={label} className="gd-priority-row">
          <span className="gd-priority-label">{label}</span>
          <div className="gd-priority-track">
            <div className={`gd-priority-fill ${cls}`} style={{ width: `${pct}%` }} />
          </div>
          <span className="gd-priority-count">{count}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Main export ─── */
export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const {
    tasks, setTasks, loading, setLoading, error, setError,
    filter, setFilter, searchTerm, setSearchTerm,
    getFilteredTasks, addTask, updateTask, removeTask,
  } = useTaskStore();

  const [showForm, setShowForm]     = React.useState(false);
  const [editingTask, setEditingTask] = React.useState(null);
  const [sortBy, setSortBy]         = React.useState("recent");

  /* Inject styles */
  React.useEffect(() => {
    const id = "gd-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = STYLES;
      document.head.appendChild(tag);
    }
  }, []);

  React.useEffect(() => { fetchTasks(); }, [filter, searchTerm]);

  const fetchTasks = async () => {
    setLoading(true); setError(null);
    try {
      const params = {};
      if (filter !== "all") params.status = filter;
      if (searchTerm) params.search = searchTerm;
      const response = await taskService.getAllTasks(params);
      setTasks(response.data.data.tasks || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally { setLoading(false); }
  };

  const handleCreateTask = async (formData) => {
    setLoading(true);
    try {
      const res = await taskService.createTask(formData);
      addTask(res.data.data); setShowForm(false); setError(null);
    } catch (err) { setError(err.response?.data?.message || "Failed to create task"); }
    finally { setLoading(false); }
  };

  const handleUpdateTask = async (formData) => {
    setLoading(true);
    try {
      const res = await taskService.updateTask(editingTask._id, formData);
      updateTask(editingTask._id, res.data.data); setEditingTask(null); setError(null);
    } catch (err) { setError(err.response?.data?.message || "Failed to update task"); }
    finally { setLoading(false); }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Delete this task?")) {
      try { await taskService.deleteTask(taskId); removeTask(taskId); setError(null); }
      catch (err) { setError(err.response?.data?.message || "Failed to delete task"); }
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const res = await taskService.toggleTask(taskId);
      updateTask(taskId, { status: res.data.data.status });
    } catch (err) { setError(err.response?.data?.message || "Failed to toggle task"); }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getSortedTasks = () => {
    let s = [...getFilteredTasks()];
    if (sortBy === "recent")   s.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === "oldest")   s.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sortBy === "priority") { const o = { high: 0, medium: 1, low: 2 }; s.sort((a, b) => o[a.priority] - o[b.priority]); }
    if (sortBy === "dueDate")  s.sort((a, b) => { if (!a.dueDate) return 1; if (!b.dueDate) return -1; return new Date(a.dueDate) - new Date(b.dueDate); });
    return s;
  };

  const safe = tasks || [];
  const stats = {
    total:       safe.length,
    completed:   safe.filter(t => t.status === "completed").length,
    pending:     safe.filter(t => t.status === "pending").length,
    highPriority: safe.filter(t => t.priority === "high").length,
  };
  const completionPct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const filteredTasks = getSortedTasks();

  const initials = user?.name
    ? user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const statCards = [
    { label: "Total Tasks",   value: stats.total,        c: "purple", icon: "📋", trend: "+3 this week", trendCls: "up", pct: Math.min(stats.total * 5, 100) },
    { label: "Completed",     value: stats.completed,    c: "green",  icon: "✅", trend: `${completionPct}% rate`,   trendCls: "up", pct: completionPct },
    { label: "Pending",       value: stats.pending,      c: "amber",  icon: "⏳", trend: "in queue", trendCls: "warn", pct: stats.total ? (stats.pending / stats.total) * 100 : 0 },
    { label: "High Priority", value: stats.highPriority, c: "red",    icon: "🔥", trend: "urgent",    trendCls: "warn", pct: stats.total ? (stats.highPriority / stats.total) * 100 : 0 },
  ];

  return (
    <div className="gd-root">
      {/* Atmosphere */}
      <div className="gd-aurora">
        <div className="gd-aurora-orb" />
        <div className="gd-aurora-orb" />
        <div className="gd-aurora-orb" />
      </div>
      <div className="gd-grain" />
      <div className="gd-scanline" />

      <div className="gd-layer">
        {/* ─── Header ─── */}
        <header className="gd-header">
          <div className="gd-header-inner">
            <div className="gd-logo">
              <div className="gd-logo-mark">T</div>
              <span className="gd-logo-name">TaskOS</span>
            </div>

            <div className="gd-greeting">
              <div className="gd-greeting-avatar">{initials}</div>
              <span>Welcome back, <strong>{user?.name ?? "Commander"}</strong></span>
            </div>

            <div className="gd-header-right">
              <div className="gd-status-pill">
                <div className="gd-status-dot" />
                Operational
              </div>
              <button className="gd-logout-btn" onClick={handleLogout}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sign out
              </button>
            </div>
          </div>
        </header>

        {/* ─── Main ─── */}
        <main className="gd-main">
          {error && (
            <div className="gd-alert-wrap">
              <Alert type="error" message={error} onClose={() => setError(null)} />
            </div>
          )}

          {/* Hero */}
          <div className="gd-hero">
            <div className="gd-hero-label"><span />Command Center</div>
            <h1 className="gd-hero-title">
              Your task <em>universe.</em>
            </h1>
            <p className="gd-hero-sub">
              {stats.total === 0
                ? "Blank slate. Everything begins here."
                : `${stats.pending} tasks in orbit · ${stats.completed} missions complete`}
            </p>
          </div>

          {/* Stats */}
          <div className="gd-stats">
            {statCards.map(({ label, value, c, icon, trend, trendCls, pct }) => (
              <div key={label} className="gd-stat" data-c={c}>
                <div className="gd-stat-head">
                  <div className="gd-stat-icon" data-c={c}>{icon}</div>
                  <span className={`gd-stat-trend ${trendCls}`}>{trend}</span>
                </div>
                <div className="gd-stat-value" data-c={c}>{value}</div>
                <div className="gd-stat-label">{label}</div>
                <div className="gd-stat-bar">
                  <div className="gd-stat-fill" data-c={c} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Body grid */}
          <div className="gd-body">
            {/* Left column */}
            <div>
              {/* Controls */}
              <div className="gd-controls">
                <div className="gd-controls-row">
                  <input
                    type="text"
                    placeholder="🔍  Search tasks…"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="gd-input"
                  />
                  <select value={filter} onChange={e => setFilter(e.target.value)} className="gd-input">
                    <option value="all">All Tasks</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="gd-input">
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest First</option>
                    <option value="priority">By Priority</option>
                    <option value="dueDate">Due Date</option>
                  </select>
                </div>

                {editingTask || showForm ? (
                  <button className="gd-cta-cancel" onClick={() => { setEditingTask(null); setShowForm(false); }}>
                    ✕ &nbsp;{editingTask ? "Cancel Edit" : "Close"}
                  </button>
                ) : (
                  <button className="gd-cta" onClick={() => setShowForm(true)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    New Task
                  </button>
                )}
              </div>

              {/* Task form */}
              {(showForm || editingTask) && (
                <div className="gd-form-wrap">
                  <TaskForm
                    task={editingTask || undefined}
                    onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                    onCancel={() => { setShowForm(false); setEditingTask(null); }}
                    loading={loading}
                  />
                </div>
              )}

              {/* Task list / states */}
              {loading && !safe.length ? (
                <div className="gd-loader">
                  <div className="gd-spinner" />
                  <p>Pulling tasks from the void…</p>
                </div>
              ) : safe.length === 0 ? (
                <div className="gd-empty">
                  <span className="gd-empty-icon">🌌</span>
                  <h2>Empty universe</h2>
                  <p>No tasks exist yet. Create your first mission.</p>
                  <button className="gd-cta" onClick={() => setShowForm(true)}>+ Create Task</button>
                </div>
              ) : filteredTasks.length === 0 ? (
                <div className="gd-empty">
                  <span className="gd-empty-icon">🔭</span>
                  <h2>Nothing found</h2>
                  <p>No tasks match your search or filter.</p>
                </div>
              ) : (
                <>
                  <p className="gd-section-label">{filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}</p>
                  <TaskList
                    tasks={filteredTasks}
                    onToggle={handleToggleTask}
                    onEdit={setEditingTask}
                    onDelete={handleDeleteTask}
                  />
                </>
              )}
            </div>

            {/* Right sidebar */}
            <div className="gd-sidebar">
              {/* Completion ring */}
              <div className="gd-card">
                <div className="gd-card-head">
                  <span className="gd-card-title">Completion</span>
                  <span className="gd-card-badge">{completionPct}%</span>
                </div>
                <CompletionRing
                  pct={completionPct}
                  completed={stats.completed}
                  total={stats.total}
                />
              </div>

              {/* Priority breakdown */}
              <div className="gd-card">
                <div className="gd-card-head">
                  <span className="gd-card-title">Priority Breakdown</span>
                </div>
                <PriorityBreakdown tasks={safe} />
              </div>

              {/* Activity feed */}
              <div className="gd-card">
                <div className="gd-card-head">
                  <span className="gd-card-title">Activity</span>
                  <span className="gd-card-badge">Live</span>
                </div>
                <div className="gd-card-body">
                  <ActivityFeed tasks={safe} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}