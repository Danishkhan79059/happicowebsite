"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, ArrowRight, Zap, ShieldCheck } from "lucide-react";
import "./CurtainIntro.css";

/**
 * Shared Content Component rendered in both Left and Right panels.
 * Because both panels clip at the exact 50vw center line, when closed they form
 * a single unified image. When opened, the left panel pulls the left half to the left,
 * and the right panel pulls the right half to the right ("text adha left aur adha right").
 */
function CurtainBrandDisplay({ progress, statusText }) {
  return (
    <div className="curtain-content-stage">
      {/* Ambient background particle glows */}
      <div className="curtain-particles-glow" aria-hidden="true" />

      {/* --- Top Pill Badge --- */}
      <div className="curtain-badge-wrapper">
        <div className="curtain-badge">
          <span className="curtain-badge-pulse" />
          <Sparkles className="curtain-badge-icon" />
          <span className="curtain-badge-text">Happico Experience Portal</span>
        </div>
      </div>

      {/* --- Central Emblem / Vault Lock --- */}
      <div className="curtain-emblem-container">
        <div className="curtain-emblem-halo" />
        <div className="curtain-emblem-core">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="curtain-emblem-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 4V20M18 4V20M6 12H18"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="7" r="1.6" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* --- Main Welcome Typography --- */}
      <div className="curtain-hero-text">
        <div className="curtain-intro-label">
          <span>W E L C O M E &nbsp; T O</span>
        </div>
        <h1 className="curtain-brand-name">
          <span className="curtain-gradient-text">HAPPICO</span>
        </h1>
        <p className="curtain-tagline">
          Empowering Next-Gen Developer Communities & Hackathons
        </p>
      </div>

      {/* --- Live Progress Indicator & System Telemetry --- */}
      <div className="curtain-progress-section">
        <div className="curtain-telemetry-header">
          <span className="curtain-status-title">
            <Zap className="curtain-zap-icon" />
            <span>{statusText}</span>
          </span>
          <span className="curtain-status-percent">{Math.min(100, Math.round(progress))}%</span>
        </div>

        <div className="curtain-progress-track">
          <div
            className="curtain-progress-fill"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>

      {/* --- Click to Enter / Skip Hint --- */}
      <div className="curtain-cta-hint">
        <span>Click anywhere or press [Space] to enter</span>
        <ArrowRight className="curtain-hint-arrow" />
      </div>
    </div>
  );
}

export default function CurtainIntro() {
  const [isOpen, setIsOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING PLATFORM...");
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Lock scrolling on mount
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress animation driver
    const startTime = performance.now();
    const duration = 1400; // 1.4s duration

    let frameId;
    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (pct < 35) {
        setStatusText("INITIALIZING ECOSYSTEM...");
      } else if (pct < 75) {
        setStatusText("PREPARING WORKSPACES...");
      } else if (pct < 98) {
        setStatusText("WELCOME TO HAPPICO...");
      } else {
        setStatusText("PORTAL OPENING...");
      }

      if (pct < 100 && !hasTriggeredRef.current) {
        frameId = requestAnimationFrame(updateProgress);
      } else if (!hasTriggeredRef.current) {
        // Trigger curtain open
        hasTriggeredRef.current = true;
        setIsOpen(true);
        document.body.style.overflow = originalOverflow || "unset";
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    // Completely unmount after curtains finish sliding out (1.3s transition + 0.3s safety)
    const unmountTimer = setTimeout(() => {
      setIsComplete(true);
    }, 2800);

    // Keyboard shortcut (Space, Enter, Esc) to skip instantly
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        triggerInstantOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(unmountTimer);
      document.body.style.overflow = originalOverflow || "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const triggerInstantOpen = () => {
    if (!hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      setProgress(100);
      setStatusText("PORTAL OPENING...");
      setIsOpen(true);
      document.body.style.overflow = "unset";
    }
  };

  // If transition finished, clean up from DOM
  if (isComplete) return null;

  return (
    <div
      onClick={triggerInstantOpen}
      className={`curtain-overlay ${isOpen ? "curtain-overlay--opening" : ""}`}
      aria-label="Welcome Curtain Intro"
      role="banner"
    >
      {/* =======================================================================
          LEFT CURTAIN PANEL
          50vw wide, fixed to left: 0.
          Slides to translateX(-101%) carrying the left half of text & graphics.
         ======================================================================= */}
      <div className="curtain-panel curtain-panel--left">
        {/* Fabric Fold Ripple Shadows */}
        <div className="curtain-fabric-pleats" aria-hidden="true" />

        {/* Ambient Radial Lighting on Left */}
        <div className="curtain-ambient-spot curtain-ambient-spot--left" aria-hidden="true" />

        {/* Cyber Diagonal Grid */}
        <div className="curtain-grid-texture" aria-hidden="true" />

        {/* 100vw content canvas anchored at left: 0. Displays [0 .. 50vw] */}
        <div className="curtain-half-viewport curtain-half-viewport--left">
          <CurtainBrandDisplay progress={progress} statusText={statusText} />
        </div>

        {/* Vertical Bevel Line along right split edge */}
        <div className="curtain-edge-bevel curtain-edge-bevel--right" aria-hidden="true" />
      </div>

      {/* =======================================================================
          RIGHT CURTAIN PANEL
          50vw wide, fixed to right: 0.
          Slides to translateX(101%) carrying the right half of text & graphics.
         ======================================================================= */}
      <div className="curtain-panel curtain-panel--right">
        {/* Fabric Fold Ripple Shadows */}
        <div className="curtain-fabric-pleats" aria-hidden="true" />

        {/* Ambient Radial Lighting on Right */}
        <div className="curtain-ambient-spot curtain-ambient-spot--right" aria-hidden="true" />

        {/* Cyber Diagonal Grid */}
        <div className="curtain-grid-texture" aria-hidden="true" />

        {/* 100vw content canvas anchored at right: 0. Displays [50vw .. 100vw] */}
        <div className="curtain-half-viewport curtain-half-viewport--right">
          <CurtainBrandDisplay progress={progress} statusText={statusText} />
        </div>

        {/* Vertical Bevel Line along left split edge */}
        <div className="curtain-edge-bevel curtain-edge-bevel--left" aria-hidden="true" />
      </div>

      {/* =======================================================================
          CENTER SEAM LASER & FLASH
          Vertical radiant seam that splits and flashes when curtains part.
         ======================================================================= */}
      <div className="curtain-seam-laser" aria-hidden="true">
        <div className="curtain-seam-flash" />
      </div>

      {/* =======================================================================
          FLOATING SKIP BUTTON (Top Right)
         ======================================================================= */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          triggerInstantOpen();
        }}
        className="curtain-skip-btn"
        aria-label="Skip Welcome Intro"
      >
        <span>Skip Intro</span>
        <span className="curtain-skip-kbd">Esc</span>
      </button>
    </div>
  );
}
