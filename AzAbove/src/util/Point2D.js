class Point2D {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    scale(scalar) {
        return this.copy().scaleLocal(scalar);
    }
    
    scaleLocal(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }
    
    rotate(angle) {
        return this.copy().rotateLocal(angle);
    }
    
    rotateLocal(angle) {
        let sin = Math.sin(angle);
        let cos = Math.cos(angle);
        let tmpX = this.x * cos - this.y * sin;
        let tmpY = this.y * cos + this.x * sin;
        this.x = tmpX;
        this.y = tmpY;
        return this;
    }
    
    distanceTo(point) {
        let dx = point.x - this.x;
        let dy = point.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    toArray2D() {
        return [this.x, this.y];
    }
    
    toArray3D() {
        return [this.x, this.y, 0];
    }
    
    copy(){
        return new Point2D(this.x, this.y);
    }
    
    
    /**
     * Computes the angle of the triangle spanned by p1 - this - p2
     *
     * @param a
     * @param c
     */
    angle(p1, p2){
        const a = this.distanceTo(p2); // a
        const b = p1.distanceTo(p2); // b
        const c = p1.distanceTo(this); // c
        let cos = ((a * a) + (c * c) - (b * b)) / (2 * a * c);
        console.log(180 / Math.PI);
        return Math.acos(cos) * 180 / Math.PI;
    }
    
    static angleBetween(a, b, c) {
        return b.angle(a, c);
    }
}