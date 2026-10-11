import React, { useEffect, useId, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, MotionConfig, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '../style.css';
import shoeSvg from './shoe.svg?raw';

const colors = [
  { name: 'Moss / Volt', filter: 'none', swatch: '#b7bf94' },
  { name: 'Chalk / Stone', filter: 'grayscale(1) brightness(1.35)', swatch: '#e8e7db' },
  { name: 'Carbon / Volt', filter: 'brightness(.48) saturate(.7)', swatch: '#343c2a' },
];
const easing = [0.22, 1, 0.36, 1];
function Arrow({ direction = 'diagonal' }) {
  const paths = { diagonal: 'M5 19 19 5M5 5h14v14', down: 'M12 4v16M5 13l7 7 7-7', up: 'M12 20V4M5 11l7-7 7 7' };
  return <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[direction]}/></svg>;
}
function ShoeArt({ filter = 'none', className = '' }) {
  const id = useId().replaceAll(':', '');
  const artwork = shoeSvg.replace(/id="([^"]+)"/g, (_, value) => `id="${id}-${value}"`).replace(/url\(#([^)]+)\)/g, (_, value) => `url(#${id}-${value})`);
  return <div className={`shoe-art ${className}`} style={{ filter }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: artwork }} />;
}
function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .8, delay, ease: easing }}>{children}</motion.div>;
}
function useViewport() {
  const [size, setSize] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }));
  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
}
function App() {
  const experience = useRef(null);
  const reduced = useReducedMotion();
  const { width } = useViewport();
  const mobile = width <= 700;
  const [color, setColor] = useState(0);
  const { scrollYProgress } = useScroll({ target: experience, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: .5 });
  const rotateZ = useTransform(progress, [0, .5, 1], [-19, -5, 11]);
  const rotateY = useTransform(progress, [0, .5, 1], [-15, 12, 35]);
  const rotateX = useTransform(progress, [0, .5, 1], [0, 12, 0]);
  const x = useTransform(progress, [0, .5, 1], [0, 0, mobile ? 0 : -width * .49]);
  const opacity = useTransform(progress, [0, .2, .45, 1], [1, 1, mobile ? .3 : 1, mobile ? .3 : 1]);
  const { scrollYProgress: pageProgress } = useScroll();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: true, duration: 1.15, smoothWheel: true, anchors: { offset: -80 } });
    return () => lenis.destroy();
  }, [reduced]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <motion.div className="scroll-progress" style={{ scaleX: pageProgress }} aria-hidden="true" />
    <header><a className="logo" href="#home" aria-label="Stride home">STRIDE<span>®</span></a><nav aria-label="Main navigation"><a href="#design">The design</a><a href="#performance">Performance</a><a className="nav-buy" href="#collection">Explore Aero 01 <Arrow/></a></nav></header>
    <main id="main">
      <div className="experience" id="home" ref={experience}>
        <div className="stage" aria-hidden="true"><div className="halo"/><div className="orbit orbit-one"/><div className="orbit orbit-two"/>
          <motion.div className="shoe-wrap" style={reduced ? { rotateZ: -19, opacity: mobile ? .3 : .8 } : { x, rotateZ, rotateY, rotateX, opacity }}><ShoeArt filter={colors[color].filter}/><div className="shoe-shadow"/></motion.div>
          <span className="stage-label">AERO 01 / {colors[color].name.toUpperCase()}</span>
        </div>
        <section className="scene hero">
          <Reveal><div className="eyebrow"><span className="dot"/>A NEW FORM OF FORWARD</div></Reveal>
          <Reveal delay={.12}><h1>MOVE<br/>BEYOND<span>.</span></h1></Reveal>
          <div className="hero-bottom"><p>Built for the everyday.<br/>Made for the extraordinary.</p><motion.a whileHover={{ y: 4 }} className="round-link" href="#design" aria-label="Discover the design"><Arrow direction="down"/></motion.a><span className="micro">SCROLL TO EXPLORE<br/>01 — 04</span></div><span className="side-note">ENGINEERED MOVEMENT — EST. 2026</span>
        </section>
        <section className="scene details" id="design"><Reveal><div className="section-number">01 / THE DESIGN</div><h2>LESS WEIGHT.<br/>MORE <em>POSSIBILITY.</em></h2><p>A sculpted silhouette. A breathable knit upper.<br/>Every detail has a reason. Nothing holds you back.</p><div className="spec"><strong>238<span>g</span></strong><span>LIGHT ON YOUR FEET.<br/>HEAVY ON INTENTION.</span></div></Reveal></section>
        <section className="scene performance" id="performance"><Reveal><div className="section-number">02 / THE FEELING</div><h2>ALL DAY.<br/>ALL <em>IN.</em></h2><p>Responsive cushioning meets effortless support.<br/>From the first step to the last train home.</p><div className="feature-list"><span>01 <b>Adaptive knit</b></span><span>02 <b>Cloudform midsole</b></span><span>03 <b>Gripwave outsole</b></span></div></Reveal></section>
      </div>
      <section className="collection" id="collection"><Reveal><div className="section-number">03 / YOUR NEXT MOVE</div><div className="collection-top"><h2>FIND YOUR<br/>FORWARD<span>.</span></h2><p>One silhouette. Three expressions.<br/>Choose your own direction.</p></div></Reveal>
        <div className="product-grid">{colors.map((variant, index) => <Reveal key={variant.name} delay={index * .1}><motion.button className={`product ${index === color ? 'selected' : ''}`} whileHover={{ y: -6 }} whileTap={{ scale: .985 }} transition={{ duration: .25 }} aria-pressed={index === color} aria-label={`Select Aero 01 in ${variant.name}, $140`} onClick={() => setColor(index)}><span className="product-top">AERO 01 <small>0{index + 1}</small></span><div className="product-art"><ShoeArt filter={variant.filter}/></div><span className="product-bottom"><span><i className="swatch" style={{ background: variant.swatch }}/>{variant.name}</span><b>$140 <Arrow/></b></span><span className="selected-label">{color === index ? 'SELECTED' : 'SELECT COLORWAY'}</span></motion.button></Reveal>)}</div>
        <div className="selection" aria-live="polite">Selected: Aero 01 — {colors[color].name}<span>Concept collection · Coming soon</span></div>
      </section>
    </main>
    <footer><a className="logo" href="#home">STRIDE<span>®</span></a><p>KEEP MOVING FORWARD.</p><span>© 2026 STRIDE</span><a href="#home">BACK TO TOP <Arrow direction="up"/></a></footer>
  </>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><MotionConfig reducedMotion="user"><App/></MotionConfig></React.StrictMode>);
