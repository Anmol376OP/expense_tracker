import React, { useEffect, useRef, useState } from 'react';

const DonutChart = () => {
    const canvasRef = useRef(null);
    const [animationProgress, setAnimationProgress] = useState(0);
    const animationDuration = 1000; // Duration of the animation in milliseconds

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const outerRadius = Math.min(centerX, centerY) - 20;
        const innerRadius = outerRadius - 10; // Adjust this value to control the size of the hole
        const data = [30, 40, 30];

        // Create linear gradients for each value
        const gradients = [
            ctx.createLinearGradient(0, 0, canvas.width, canvas.height),
            ctx.createLinearGradient(0, 0, canvas.width, canvas.height),
            ctx.createLinearGradient(0, 0, canvas.width, canvas.height),
        ];

        gradients[0].addColorStop(0, '#fcc612');
        gradients[0].addColorStop(1, '#a10500');

        gradients[1].addColorStop(0, '#7fc3f0');
        gradients[1].addColorStop(1, '#320536');

        gradients[2].addColorStop(0, '#1bfa8b');
        gradients[2].addColorStop(1, '#0b331f');

        const animate = (timestamp) => {
            if (!animationStartTime) {
                animationStartTime = timestamp;
            }

            const progress = Math.min(1, (timestamp - animationStartTime) / animationDuration);

            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the donut chart with the gradient fills
            let total = 0;
            for (let i = 0; i < data.length; i++) {
                total += data[i];
            }

            let currentAngle = -Math.PI / 2; // Start at the top of the circle
            for (let i = 0; i < data.length; i++) {
                const sliceAngle = (Math.PI * 2 * data[i] * progress) / total;

                // Set the fill style to the appropriate gradient
                ctx.fillStyle = gradients[i];

                // Create a filled arc
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
                ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true); // Draw the inner arc in reverse
                ctx.closePath();
                ctx.fill();

                currentAngle += sliceAngle;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        let animationStartTime = null;
        requestAnimationFrame(animate);
    }, []);

    return <canvas ref={canvasRef} width={150} height={150} />;
};

export default DonutChart;
