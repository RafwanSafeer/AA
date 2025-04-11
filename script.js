document.addEventListener('DOMContentLoaded', () => {
    const memoryCards = document.querySelectorAll('.memory-card');
    const stickers = document.querySelectorAll('.sticker');
    
    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Setup random rotations for stickers
    stickers.forEach(sticker => {
        const randomRotation = Math.random() * 20 - 10;
        gsap.set(sticker, { rotation: randomRotation, scale: 1 });
    });
    
    // Animate stickers with GSAP
    stickers.forEach((sticker, index) => {
        gsap.to(sticker, {
            y: "-10px",
            rotation: "+=5",
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: index * 0.2
        });
    });
    
    // Initial animations for memory cards
    gsap.from(memoryCards, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
    });
    
    // Add wiggling effect to title letters
    const titleLetters = document.querySelectorAll('.title span, .letter-title span');
    titleLetters.forEach((letter, index) => {
        gsap.to(letter, {
            rotation: "+=5",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.1
        });
    });
    
    // Animate the title
    gsap.from('.title, .letter-title', {
        y: -50,
        opacity: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)"
    });
    
    // Animate the intro card
    gsap.from('.intro-card, .letter-container', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.7)"
    });
    
    // Add hover effects to memory cards
    memoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -15,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                duration: 0.3,
                ease: "power2.out"
            });
            
            const desc = card.getAttribute('data-description');
            if (desc) {
                const descElement = card.querySelector('.memory-description') || 
                                   createDescriptionElement(card, desc);
                gsap.to(descElement, {
                    y: 0,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
                duration: 0.3,
                ease: "power2.out"
            });
            
            const descElement = card.querySelector('.memory-description');
            if (descElement) {
                gsap.to(descElement, {
                    y: 20,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
    
    function createDescriptionElement(card, text) {
        const descElement = document.createElement('div');
        descElement.className = 'memory-description';
        descElement.innerText = text;
        descElement.style.position = 'absolute';
        descElement.style.bottom = '0';
        descElement.style.left = '0';
        descElement.style.width = '100%';
        descElement.style.padding = '20px 15px';
        descElement.style.background = 'rgba(255, 108, 158, 0.85)';
        descElement.style.color = 'white';
        descElement.style.transform = 'translateY(100%)';
        descElement.style.opacity = '0';
        descElement.style.borderBottomLeftRadius = '15px';
        descElement.style.borderBottomRightRadius = '15px';
        descElement.style.zIndex = '5';
        card.appendChild(descElement);
        return descElement;
    }
    
    // Enhanced confetti creation function
    function createConfetti(x, y) {
        const confettiContainer = document.getElementById('confetti-container');
        const colors = ['#ffeb3b', '#ff9fc2', '#ff6c9e', '#ffd700', '#ffffff'];
        const count = x && y ? 30 : 50;
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'falling-confetti';
            
            let left = Math.random() * 100;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const duration = 8 + Math.random() * 7;
            const delay = Math.random() * 5;
            const size = 5 + Math.random() * 10;
            
            confetti.style.left = `${left}%`;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            if (Math.random() > 0.7) {
                confetti.innerHTML = '★';
                confetti.style.fontSize = `${size * 2}px`;
                confetti.style.backgroundColor = 'transparent';
                confetti.style.color = color;
            } else if (Math.random() > 0.5) {
                confetti.innerHTML = '❤';
                confetti.style.fontSize = `${size * 2}px`;
                confetti.style.backgroundColor = 'transparent';
                confetti.style.color = color;
            } else if (Math.random() > 0.4) {
                confetti.style.borderRadius = '0';
            } else {
                confetti.style.borderRadius = '50%';
            }
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }
    }
    
    // Create initial confetti burst
    createConfetti();
    
    // Create continuous slow confetti
    setInterval(() => {
        createConfetti();
    }, 3000);
    
    // Add floating circles background
    function createFloatingElements() {
        const container = document.querySelector('.memory-lane-container');
        const colors = ['#ff77ff', '#ff77aa', '#aa77ff', '#77aaff', '#77ffaa'];
        
        for (let i = 0; i < 15; i++) {
            const floater = document.createElement('div');
            floater.className = 'floating-decoration';
            container.appendChild(floater);
            
            const size = Math.random() * 15 + 5;
            const shape = Math.random() > 0.5 ? '50%' : '0';
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            gsap.set(floater, {
                width: size,
                height: size,
                position: 'absolute',
                backgroundColor: color,
                borderRadius: shape,
                opacity: 0.4,
                zIndex: -1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
            });
            
            gsap.to(floater, {
                y: -30,
                rotation: Math.random() * 360,
                duration: Math.random() * 10 + 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 5
            });
        }
    }
    
    // Initialize floating elements
    createFloatingElements();
    
    // Add animated balloon movements
    function animateBalloons() {
        const balloons = document.querySelectorAll('.balloon');
        
        balloons.forEach((balloon, index) => {
            const xPos = balloon.style.left;
            const duration = parseFloat(balloon.style.animationDuration) || 15;
            
            gsap.set(balloon, {
                y: '100vh',
                x: xPos,
                opacity: 0.7,
                xPercent: -50
            });
            
            gsap.to(balloon, {
                y: '-100vh',
                rotation: Math.random() * 360,
                duration: duration,
                delay: index * 2,
                repeat: -1,
                ease: "none",
                onStart: () => {
                    gsap.to(balloon, {
                        opacity: 0,
                        duration: duration * 0.1,
                        delay: duration * 0.9,
                        ease: "power1.in"
                    });
                }
            });
        });
    }
    
    // Initialize balloon animations
    animateBalloons();
}); 