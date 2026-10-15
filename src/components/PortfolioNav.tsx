"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

type StickyMetrics = {
  top: number;
  left: number;
  width: number;
  height: number;
  backdropLeft: number;
  backdropWidth: number;
  navGap: string;
  justifyContent: string;
  markWidth: string;
  markMinWidth: string;
  linksGap: string;
  linkFontSize: string;
  isPinned: boolean;
};

function PortfolioNav({ mobile = false }: { mobile?: boolean }) {
  const navRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [stickyMetrics, setStickyMetrics] = useState<StickyMetrics | null>(null);

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 999px)");

    const updateNavigationState = () => {
      const isCurrentNavigation = mobile === mobileViewport.matches;
      setIsActive(isCurrentNavigation);

      if (!isCurrentNavigation || window.scrollY <= 0 || !navRef.current) {
        setStickyMetrics(null);
        return;
      }

      const nav = navRef.current;
      const navRect = nav.getBoundingClientRect();
      const contentFrame = nav.closest<HTMLElement>(mobile ? ".mobile-visual" : ".cutaway-desktop");
      const navStyle = window.getComputedStyle(nav);
      const mark = nav.querySelector<HTMLElement>(".folio-mark");
      const links = nav.querySelector<HTMLElement>(".folio-nav__links");
      const link = links?.querySelector<HTMLElement>("a");

      if (!contentFrame || !mark || !links || !link) {
        setStickyMetrics(null);
        return;
      }

      const contentRect = contentFrame.getBoundingClientRect();
      const markStyle = window.getComputedStyle(mark);
      const linksStyle = window.getComputedStyle(links);
      const linkStyle = window.getComputedStyle(link);

      setStickyMetrics({
        top: Math.max(0, navRect.top),
        left: navRect.left,
        width: navRect.width,
        height: navRect.height,
        backdropLeft: mobile ? navRect.left : contentRect.left,
        backdropWidth: mobile ? navRect.width : contentRect.width,
        navGap: navStyle.gap,
        justifyContent: navStyle.justifyContent,
        markWidth: markStyle.width,
        markMinWidth: markStyle.minWidth,
        linksGap: linksStyle.gap,
        linkFontSize: linkStyle.fontSize,
        isPinned: navRect.top <= 0,
      });
    };

    updateNavigationState();
    window.addEventListener("scroll", updateNavigationState, { passive: true });
    window.addEventListener("resize", updateNavigationState);
    mobileViewport.addEventListener("change", updateNavigationState);

    return () => {
      window.removeEventListener("scroll", updateNavigationState);
      window.removeEventListener("resize", updateNavigationState);
      mobileViewport.removeEventListener("change", updateNavigationState);
    };
  }, [mobile]);

  const navigation = (
    <>
      <a className="folio-mark" href={mobile ? "#mobile-about" : "#about"} aria-label="John Paul Fernandez, home">
        <svg viewBox="0 0 46 32" aria-hidden="true">
          <path d="M4 3h20L14 29H0z" fill="#0849b0" />
          <path d="M26 3h20L36 29H16z" fill="#f86d49" />
        </svg>
      </a>
      <div className="folio-nav__links">
        <a href={mobile ? "#mobile-about" : "#about"}>About</a>
        <a href="#work-list">Work</a>
        <a href="#experiences">Experience</a>
        <a href="#contact">Contact</a>
      </div>
    </>
  );

  const originalIsHidden = isActive && stickyMetrics !== null;
  const stickyNavStyle: CSSProperties | undefined = stickyMetrics
    ? {
        top: stickyMetrics.top,
        left: stickyMetrics.left,
        width: stickyMetrics.width,
        height: stickyMetrics.height,
        gap: stickyMetrics.navGap,
        justifyContent: stickyMetrics.justifyContent,
      }
    : undefined;
  const stickyMarkStyle: CSSProperties | undefined = stickyMetrics
    ? { width: stickyMetrics.markWidth, minWidth: stickyMetrics.markMinWidth }
    : undefined;
  const stickyLinksStyle: CSSProperties | undefined = stickyMetrics
    ? { gap: stickyMetrics.linksGap }
    : undefined;
  const stickyLinkStyle: CSSProperties | undefined = stickyMetrics
    ? { fontSize: stickyMetrics.linkFontSize }
    : undefined;

  return (
    <>
      <nav
        ref={navRef}
        className="folio-nav"
        aria-label="Main navigation"
        aria-hidden={originalIsHidden || undefined}
        inert={originalIsHidden || undefined}
      >
        {navigation}
      </nav>
      {isActive && stickyMetrics && createPortal(
        <>
          <div
            className={`folio-nav-sticky-backdrop${stickyMetrics.isPinned ? " folio-nav-sticky-backdrop--active" : ""}`}
            style={{
              top: stickyMetrics.top,
              left: stickyMetrics.backdropLeft,
              width: stickyMetrics.backdropWidth,
              height: stickyMetrics.height,
            }}
            aria-hidden="true"
          />
          <nav
            className={`folio-nav-sticky__inner${mobile ? " folio-nav-sticky__inner--mobile" : ""}${stickyMetrics.isPinned ? " folio-nav-sticky__inner--pinned" : ""}`}
            aria-label="Main navigation"
            style={stickyNavStyle}
          >
            <a
              className="folio-mark"
              href={mobile ? "#mobile-about" : "#about"}
              aria-label="John Paul Fernandez, home"
              style={stickyMarkStyle}
            >
              <svg viewBox="0 0 46 32" aria-hidden="true">
                <path d="M4 3h20L14 29H0z" fill="#0849b0" />
                <path d="M26 3h20L36 29H16z" fill="#f86d49" />
              </svg>
            </a>
            <div className="folio-nav__links" style={stickyLinksStyle}>
              <a href={mobile ? "#mobile-about" : "#about"} style={stickyLinkStyle}>About</a>
              <a href="#work-list" style={stickyLinkStyle}>Work</a>
              <a href="#experiences" style={stickyLinkStyle}>Experience</a>
              <a href="#contact" style={stickyLinkStyle}>Contact</a>
            </div>
          </nav>
        </>,
        document.body,
      )}
    </>
  );
}

export default PortfolioNav;
