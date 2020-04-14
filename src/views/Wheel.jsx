import React, { useState, useRef } from 'react'
import { Stage, Container, Text, Graphics } from '@inlet/react-pixi';
import { TweenLite, TimelineMax, Linear } from 'gsap'
import { TextStyle } from 'pixi.js';

const radius = 250

const initSections = [
    { text: "Subject 1", colour: 0xFF4 },
    { text: "Subject 2", colour: 0x1F0 },
    { text: "Subject 3", colour: 0xF01 },
    { text: "Subject 4", colour: 0x10F },
    { text: "Subject 5", colour: 0x4FA },
    { text: "Subject 6", colour: 0x188 },
    { text: "Subject 7", colour: 0x849 },
    { text: "Subject 8", colour: 0x11F },
    { text: "Subject 9", colour: 0xFA3 },
    { text: "Subject 10", colour: 0xAA1 },
]

export const Wheel = () => {
    const wheel = useRef(null)

    const [sections, setSections] = useState(initSections)
    const [spinning, setSpinning] = useState(false)
    const [selected, setSelected] = useState("")

    const numberOfSections = () => sections.length
    const radiansPerSection = () => 2*Math.PI / numberOfSections()

    const finalPosition = () => {
        const choosenSector = Math.floor(Math.random() * numberOfSections());
        const sectorsToMinus = numberOfSections() - choosenSector;
        const rotation = sectorsToMinus * radiansPerSection();
        return rotation;
    }

    const createSegment = (section, index) => {
        const rps = radiansPerSection()
        const startingAngle = index * rps - rps / 2;
        const endingAngle = startingAngle + rps;

        const draw = g => {
            g.clear()
            g.beginFill(section.colour);
            g.lineStyle(2, 0xFFFFFF, 1);
            g.moveTo(0, 0);
            g.arc(0, 0, radius, startingAngle, endingAngle);
            g.lineTo(0, 0);     
            g.endFill()
        }
    
        return (
            <Graphics key={index} position={[radius, radius]} draw={draw} section={section}>
                { createSegmentText(section, index) }
            </Graphics>
        )
    }

    const createSegmentText = (section, index) => {
        const rotation = index * radiansPerSection() 
        const textAnchorPercentage = (radius - 40 / 2) / radius;
        const x = 3 * radius / 4 * textAnchorPercentage * Math.cos(rotation);
        const y = 3 * radius / 4 * textAnchorPercentage * Math.sin(rotation);
        return <Text 
            key={index} 
            text={section.text} 
            anchor={0.5} 
            x={x} 
            y={y} 
            rotation={rotation} 
            style={ new TextStyle({
                align: 'center',
                fontSize: 22,
                fill: '#FFFFFF',
            })}
        />
    }

    const spin = () => {
        if (spinning || selected) { return }
        setSpinning(true)
        // wheel.current.rotation = 0;
        const rotation = 2*Math.PI + finalPosition();
        const tl = new TimelineMax();
        tl.to(wheel.current, 7, { rotation: `+=${rotation}` });
        TweenLite
            .to(tl, 4, { timeScale: 0, ease: Linear.easeNone, delay: 3 })
            .then(() => {
                const { children } = wheel.current
                const highest = children.reduce((prev, segment) => (segment.getBounds().y < prev.getBounds().y) ? segment : prev, children[0])
                pickSegment(highest)
            })
    }

    const pickSegment = segment => {
        const { section } = segment
        setSelected(section)
        setSections(sections.filter(s => s !== section))
        setSpinning(false)
    }

    return (
        <>
        <Stage width={2 * radius} height={2 * radius} onClick={spin} options={{ backgroundColor: 0x130303 }}>
            <Container ref={wheel} position={[radius, radius]} buttonMode={true} interactive={true} pivot={[radius, radius]}>
                { sections.map(createSegment) }
            </Container>
            <Graphics position={[radius, 0]} draw={g => {
                g.beginFill('#000').moveTo(-20, 0).lineTo(0, 40).lineTo(20, 0).lineTo(-20, 0).endFill()
            }}/>
        </Stage>
        { selected && (
            <div className="selectedSegment" onClick={() => setSelected("")}>
                { selected.text }
            </div>
        )}
        </>
    )
}