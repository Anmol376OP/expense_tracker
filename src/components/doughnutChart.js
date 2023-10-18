import React, { useEffect, useRef, useState } from 'react';

const DonutChart = (props) => {
    const canvasRef = useRef(null);
    const [hoveredSection, setHoveredSection] = useState(null);
    const animationDuration = 500; // Duration of the animation in milliseconds
    let sum = 0.00
    for (let i = 0; i < props.data.length; i++) {
        sum += props.data[i]
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const outerRadius = Math.min(centerX, centerY) - 20;
        const innerRadius = outerRadius - 15; // Adjust this value to control the size of the hole

        // Create linear gradients for each value
        const gradients = [
            ctx.createLinearGradient(0, 0, canvas.width, canvas.height),
            ctx.createLinearGradient(0, 0, canvas.width, canvas.height),
            ctx.createLinearGradient(0, 0, canvas.width, canvas.height),
            ctx.createLinearGradient(0, 0, canvas.width, canvas.height),
            ctx.createLinearGradient(0, 0, canvas.width, canvas.height),
        ];
        for (let itr = 0; itr < props.data.length; itr++) {
            gradients[itr].addColorStop(0, props.color[(itr * 2)]);
            gradients[itr].addColorStop(1, props.color[(itr * 2) + 1]);
        }
        canvas.addEventListener('mousemove', handleMouseHover);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        const animate = (timestamp) => {
            if (!animationStartTime) {
                animationStartTime = timestamp;
            }

            const progress = Math.min(1, (timestamp - animationStartTime) / animationDuration);

            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the donut chart with the gradient fills
            let total = 0;
            for (let i = 0; i < props.data.length; i++) {
                total += props.data[i];
            }

            let currentAngle = -Math.PI / 2; // Start at the top of the circle
            for (let i = 0; i < props.data.length; i++) {
                const sliceAngle = (Math.PI * 2 * props.data[i] * progress) / total;

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
        return () => {
            canvas.removeEventListener('mousemove', handleMouseHover);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [props.data]);
    const handleMouseHover = (e) => {
        const canvas = canvasRef.current;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        let angle = Math.atan2(y - centerY, x - centerX) + Math.PI / 2;
        if (angle < 0) {
            angle += 2 * Math.PI;
        }

        const total = props.data.reduce((acc, val) => acc + val, 0);
        let currentAngle = 0;
        for (let i = 0; i < props.data.length; i++) {
            const sliceAngle = (Math.PI * 2 * props.data[i]) / total;
            if (angle >= currentAngle && angle < currentAngle + sliceAngle) {
                setHoveredSection(i);
                return;
            }
            currentAngle += sliceAngle;
        }

        setHoveredSection(null);
    };

    const handleMouseLeave = () => {
        setHoveredSection(null);
    };
    return (
        <div className='relative w-[200px] h-[200px] flex items-center justify-center'>
            <div className='absolute'><canvas ref={canvasRef} width={props.w} height={props.h} /></div>
            {hoveredSection !== null && (
                <div className=''>
                    {((props.data[hoveredSection] / sum) * 100).toFixed(2)}%
                </div>
            )}
        </div>
    );
};

export default DonutChart;
