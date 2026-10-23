"use client";

import { useState, useEffect, useRef } from "react";
import "./CurtainIntro.css";

export default function CurtainIntro() {
  const [isOpen, setIsOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [flyStyle, setFlyStyle] = useState({});
  const hasTriggeredRef = useRef(false);
  const brandCoreRef = useRef(null);

  // Formatted DevFest-style counter: e.g. "085 / 100"
  const counterText = `${String(Math.floor(progress)).padStart(3, "0")} / 100`;

  useEffect(() => {
    // Lock scrolling on mount
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress animation driver (2.0s duration)
    const startTime = performance.now();
    const duration = 2000;

    let frameId;
    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (pct < 100 && !hasTriggeredRef.current) {
        frameId = requestAnimationFrame(updateProgress);
      } else if (!hasTriggeredRef.current) {
        triggerDockingOpen();
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    // Keyboard shortcut (Space, Enter, Esc) to skip
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        triggerDockingOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = originalOverflow || "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const triggerDockingOpen = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setProgress(100);

    // 1. Measure initial position of brand core
    if (brandCoreRef.current) {
      const coreRect = brandCoreRef.current.getBoundingClientRect();

      // 2. Locate target brand logo in Header navbar
      const targetEl =
        document.getElementById("header-brand-target") ||
        document.querySelector('[data-brand-target="true"]');

      let targetRect;
      if (targetEl) {
        targetRect = targetEl.getBoundingClientRect();
      } else {
        // Safe viewport fallback if header not yet rendered
        targetRect = {
          left: window.innerWidth > 768 ? 48 : 20,
          top: 18,
          width: 120,
          height: 40,
        };
      }

      // Compute center-to-center delta translation
      const coreCenterX = coreRect.left + coreRect.width / 2;
      const coreCenterY = coreRect.top + coreRect.height / 2;

      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      const deltaX = targetCenterX - coreCenterX;
      const deltaY = targetCenterY - coreCenterY;

      // Scale factor to match header brand size
      const targetScale = Math.max(
        0.38,
        Math.min(0.62, (targetRect.height || 40) / (coreRect.height || 64))
      );

      // Execute flight on next animation frame for smooth CSS transition
      requestAnimationFrame(() => {
        setFlyStyle({
          transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${targetScale})`,
        });
        setIsOpen(true);
      });
    } else {
      setIsOpen(true);
    }

    document.body.style.overflow = "unset";

    // Unmount intro after flight & curtain doors fully open (1.65s total)
    setTimeout(() => {
      setIsComplete(true);
    }, 1650);
  };

  if (isComplete) return null;

  return (
    <div
      onClick={triggerDockingOpen}
      className={`curtain-overlay ${isOpen ? "curtain-overlay--opening" : ""}`}
      aria-label="Welcome Curtain Intro"
      role="banner"
    >
      {/* =========================================================================
          LEFT CURTAIN PANEL (DevFest Fluted Luminous Slat Doors)
          ========================================================================= */}
      <div className="curtain-panel curtain-panel--left">
        {/* Colorful Luminous Fluted Slat Columns (Blue/Cyan/Teal spectrum) */}
        <div className="curtain-fluted-slats curtain-fluted-slats--left" aria-hidden="true" />

        {/* Ambient Specular Highlight Beams */}
        <div className="curtain-ambient-glow curtain-ambient-glow--left" aria-hidden="true" />

        {/* Diagonal Cyber Grid Accent */}
        <div className="curtain-cyber-grid" aria-hidden="true" />

        {/* Vertical Bevel Line along right split edge */}
        <div className="curtain-split-edge curtain-split-edge--right" aria-hidden="true" />
      </div>

      {/* =========================================================================
          RIGHT CURTAIN PANEL (DevFest Fluted Luminous Slat Doors)
          ========================================================================= */}
      <div className="curtain-panel curtain-panel--right">
        {/* Colorful Luminous Fluted Slat Columns (Amber/Yellow/Ruby spectrum) */}
        <div className="curtain-fluted-slats curtain-fluted-slats--right" aria-hidden="true" />

        {/* Ambient Specular Highlight Beams */}
        <div className="curtain-ambient-glow curtain-ambient-glow--right" aria-hidden="true" />

        {/* Diagonal Cyber Grid Accent */}
        <div className="curtain-cyber-grid" aria-hidden="true" />

        {/* Vertical Bevel Line along left split edge */}
        <div className="curtain-split-edge curtain-split-edge--left" aria-hidden="true" />
      </div>

      {/* Center Laser Seam */}
      <div className="curtain-laser-seam" aria-hidden="true">
        <div className="curtain-laser-flare" />
      </div>

      {/* Skip Button (Top Right) */}


      {/* =========================================================================
          FOUR CORNER TELEMETRY ANNOTATIONS (DevFest Noida 2026 Style)
          ========================================================================= */}
      <div className="curtain-corner-tag curtain-corner-tag--tl" aria-hidden="true">
        <span>HAPPICO PLATFORM</span>
      </div>



      <div className="curtain-corner-tag curtain-corner-tag--bl" aria-hidden="true">
        <span className="curtain-counter-number">{counterText}</span>
      </div>

      <div className="curtain-corner-tag curtain-corner-tag--br" aria-hidden="true">
        <span>Gurgaon• GLOBAL</span>
      </div>

      {/* =========================================================================
          CENTRAL LOGO LOCKUP STAGE (Glides up to header on open!)
          ========================================================================= */}
      <div className="curtain-lockup-stage">
        {/* Left Developer Bracket */}
        <div className="curtain-bracket-wrapper curtain-bracket-wrapper--left" aria-hidden="true">
          <svg
            viewBox="0 0 40 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="curtain-bracket-svg"
          >
            <path
              d="M4.3 30.3H8.3C9.7 30.3 10.9 29.1 10.9 27.7V13.4C10.9 6.3 16.7 0.5 23.8 0.5H32.8C33.4 0.5 33.8 1 33.8 1.5V16C33.8 16.6 33.4 17 32.8 17H26.2C24.8 17 23.6 18.2 23.6 19.6V58.8C23.6 60.2 24.8 61.4 26.2 61.4H32.8C33.4 61.4 33.8 61.8 33.8 62.4V76.9C33.8 77.4 33.4 77.9 32.8 77.9H23.8C16.7 77.9 10.9 72.1 10.9 65V50.1C10.9 48.6 9.7 47.5 8.3 47.5H4.3C3.7 47.5 3.3 47 3.3 46.4V31.3C3.3 30.7 3.7 30.3 4.3 30.3Z"
              fill="white"
              stroke="#202124"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Central Core: Emblem + Happico Brand Name + Split Capsule */}
        <div className="curtain-center-cluster">
          {/* THE BRAND CORE: This element flies & docks right into Header! */}
          <div
            ref={brandCoreRef}
            style={flyStyle}
            className={`curtain-brand-core ${isOpen ? "curtain-brand-core--flying" : ""}`}
          >
            {/* Glowing Brand Icon Emblem */}
            <div className="curtain-brand-icon">
              <svg viewBox="0 0 24 24" fill="none" className="curtain-icon-svg">
                <path
                  d="M6 4V20M18 4V20M6 12H18"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="7" r="1.5" fill="currentColor" />
              </svg>
            </div>

            {/* Large Brand Typography */}
            <span className="curtain-brand-wordmark">Happico</span>
          </div>

          {/* DevFest-Style Split Capsule: [ Platform | 2026 ] */}
          <div className="curtain-split-capsule" aria-hidden="true">
            <div className="curtain-capsule-side curtain-capsule-side--left">
              <span>Platform</span>
            </div>
            <div className="curtain-capsule-side curtain-capsule-side--right">
              <span>2026</span>
            </div>
          </div>
        </div>

        {/* Right Developer Bracket */}
        <div className="curtain-bracket-wrapper curtain-bracket-wrapper--right" aria-hidden="true">
          <svg
            viewBox="0 0 40 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="curtain-bracket-svg"
          >
            <path
              d="M35.7 30.3H31.7C30.3 30.3 29.1 29.1 29.1 27.7V13.4C29.1 6.3 23.3 0.5 16.2 0.5H7.2C6.6 0.5 6.2 1 6.2 1.5V16C6.2 16.6 6.6 17 7.2 17H13.8C15.2 17 16.4 18.2 16.4 19.6V58.8C16.4 60.2 15.2 61.4 13.8 61.4H7.2C6.6 61.4 6.2 61.8 6.2 62.4V76.9C6.2 77.4 6.6 77.9 7.2 77.9H16.2C23.3 77.9 29.1 72.1 29.1 65V50.1C29.1 48.6 30.3 47.5 31.7 47.5H35.7C36.3 47.5 36.7 47 36.7 46.4V31.3C36.7 30.7 36.3 30.3 35.7 30.3Z"
              fill="white"
              stroke="#202124"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
