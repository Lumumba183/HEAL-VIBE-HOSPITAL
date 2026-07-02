import { useEffect, useRef } from 'react';

const carouselImages = [
  '/img-hero-1.jpg',
  '/img-hero-2.jpg',
  '/img-hero-3.jpg',
  '/img-hero-4.jpg',
  '/img-hero-5.jpg',
  '/img-hero-6.jpg',
];

interface ScrollState {
  ease: number;
  current: number;
  target: number;
  last: number;
  position: number;
}

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<{
    list: HTMLElement | null;
    items: HTMLElement[];
    container: HTMLElement | null;
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    rafID: number;
    spring: number;
    curr: number;
    scroll: ScrollState;
    isDown: boolean;
    startX: number;
  }>({
    list: null,
    items: [],
    container: null,
    width: 0,
    height: 0,
    canvas: document.createElement('canvas'),
    ctx: null as unknown as CanvasRenderingContext2D,
    rafID: 0,
    spring: 0.03,
    curr: 0,
    scroll: { ease: 0.05, current: 0, target: 0, last: 0, position: 0 },
    isDown: false,
    startX: 0,
  });

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const engine = engineRef.current;

    // Check if mobile - hide carousel
    if (window.innerWidth < 768) {
      carousel.style.display = 'none';
      return;
    }

    engine.ctx = engine.canvas.getContext('2d')!;
    engine.width = window.innerWidth;
    engine.height = window.innerHeight;
    engine.spring = 0.03;
    engine.scroll = { ease: 0.05, current: 0, target: 0, last: 0, position: 0 };
    document.body.style.cursor = 'grab';

    function setupElements() {
      engine.list = carousel!.querySelector('.carousel__list');
      engine.items = [...carousel!.querySelectorAll('.carousel__item')] as HTMLElement[];
      engine.container = carousel!.querySelector('.carousel__container');
      engine.canvas.width = engine.items.length * 300;
      engine.canvas.height = 400;
      engine.scroll.current = 0;
      renderCanvasImages();
    }

    function renderCanvasImages() {
      engine.items.forEach((item, index) => {
        renderOneCanvasImage(item, index);
      });
    }

    function renderOneCanvasImage(item: HTMLElement, index: number) {
      const imgEl = item.querySelector('img');
      if (!imgEl) return;
      const src = imgEl.src;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const x = index * 300;
        engine.ctx.clearRect(x, 0, 300, 400);
        engine.ctx.drawImage(img, x, 0, 300, 400);
      };
      img.src = src;
    }

    function onMouseDown(event: MouseEvent | TouchEvent) {
      engine.isDown = true;
      engine.scroll.position = engine.scroll.current;
      engine.scroll.last = engine.scroll.current;
      const pageX = event.type === 'mousedown'
        ? (event as MouseEvent).pageX
        : (event as TouchEvent).touches[0].pageX;
      engine.startX = pageX - engine.scroll.current;
      document.body.style.cursor = 'grabbing';
      document.documentElement.style.cursor = 'grabbing';
    }

    function onMouseMove(event: MouseEvent | TouchEvent) {
      if (!engine.isDown) return;
      const pageX = event.type === 'mousemove'
        ? (event as MouseEvent).pageX
        : (event as TouchEvent).touches[0].pageX;
      const currentX = pageX - engine.startX;
      const move = currentX - engine.scroll.last;
      const velocity = move * 0.1;
      engine.scroll.target = engine.scroll.current + velocity;
      engine.scroll.last = currentX;
      event.preventDefault();
    }

    function onMouseUp() {
      engine.isDown = false;
      document.body.style.cursor = 'grab';
      document.documentElement.style.cursor = 'grab';
      engine.scroll.target = Math.round(engine.scroll.current / engine.width) * engine.width;
    }

    function onResize() {
      engine.width = window.innerWidth;
      engine.height = window.innerHeight;
      engine.canvas.width = engine.items.length * 300;
      engine.canvas.height = 400;
      renderCanvasImages();
      create3d();
    }

    function shading(percent: number) {
      engine.items.forEach((item, index) => {
        const angle = index * (360 / engine.items.length);
        const radians = angle * (Math.PI / 180);
        const hue = Math.cos(radians) * 100;
        const shade = percent * hue;
        item.style.filter = 'brightness(' + (100 + shade * 0.8) + '%)';
      });
    }

    function create3d() {
      const spacing = 360 / engine.items.length;
      engine.items.forEach((item, i) => {
        const angle = i * spacing;
        item.style.transform = 'rotateY(' + angle + 'deg) translateZ(400px)';
        item.style.position = 'absolute';
        item.style.top = '50%';
        item.style.left = '50%';
        item.style.marginTop = '-200px';
        item.style.marginLeft = '-150px';
      });
    }

    function update() {
      if (!engine.isDown) {
        engine.scroll.target += (engine.spring * (engine.scroll.current - engine.scroll.target));
      }
      engine.scroll.current += (engine.scroll.target - engine.scroll.current) * engine.scroll.ease;
      engine.curr = engine.scroll.current;
      const percent = engine.curr / engine.scroll.position;
      const intro = engine.curr / engine.width;
      const rotation = (intro * 360) + (360 * (engine.scroll.current % engine.width) / engine.width);
      if (engine.list) {
        engine.list.style.transform = 'rotateY(' + rotation + 'deg)';
      }
      shading(percent || 0);
      engine.rafID = requestAnimationFrame(update);
    }

    function setupInput() {
      window.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchstart', onMouseDown, { passive: false });
      window.addEventListener('touchmove', onMouseMove, { passive: false });
      window.addEventListener('touchend', onMouseUp);
      window.addEventListener('resize', onResize);
    }

    setupElements();
    setupInput();
    create3d();
    engine.rafID = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(engine.rafID);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('resize', onResize);
      document.body.style.cursor = '';
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <div ref={carouselRef} className="carousel hidden md:block">
      <div className="carousel__container">
        <div className="carousel__list">
          {carouselImages.map((src, i) => (
            <div key={i} className="carousel__item" aria-hidden="true">
              <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <clipPath id={`clip-${i}`}>
                    <path d="M 0,20 Q 0,0 20,0 L 280,0 Q 300,0 300,20 L 300,380 Q 300,400 280,400 L 20,400 Q 0,400 0,380 Z" />
                  </clipPath>
                </defs>
                <path d="M 0,20 Q 0,0 20,0 L 280,0 Q 300,0 300,20 L 300,380 Q 300,400 280,400 L 20,400 Q 0,400 0,380 Z" />
                <image
                  href={src}
                  width="300"
                  height="400"
                  clipPath={`url(#clip-${i})`}
                  preserveAspectRatio="xMidYMid slice"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
