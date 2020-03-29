import React from 'react';
import Point2D from './Point2D';

export default Circle = (props) => {

        
    const computeCircleLine = () => {
        let samples = 50;
        let angle = 2 * Math.PI / samples;
        let point = new Point2D(0, props.radius);
    
        const points = [];
    
        // iterate to (including) samples to createFromNumber3Array a closed polyline
        for (let i = 0; i <= samples; i++) {
            points.push(point.copy());
            point.rotateLocal(angle);
        }
    
        return new Polyline(points);
    }

    return (
        <ViroPolyline
            position={props.position}
            rotation={props.rotation}
            scale={props.scale}
            points={circleLine.toNumber3Array()}
            thickness={props.thickness}
        />
    );
}