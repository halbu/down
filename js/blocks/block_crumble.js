var crumble_block = function (x, y, t) {
    block.call(this, x, y, t);

    this.framesRemaining = 12;
    this.c = true;
    
    this.reactToTouch = function() {
        this.framesRemaining--;
        if (this.framesRemaining === 0) this.c = false;
    };

    this.draw = function() {
        if (this.y > DOWN.cnv.height) return; // if we're offscreen don't bother drawing
        if (this.framesRemaining > 10) {
            DOWN.drawWorldSprite('crumble_1', this.x, this.y);
        } else if (this.framesRemaining > 7) {
            DOWN.drawWorldSprite('crumble_2', this.x, this.y);
        } else if (this.framesRemaining > 4) {
            DOWN.drawWorldSprite('crumble_3', this.x, this.y);
        } else if (this.framesRemaining >= 1) {
            DOWN.drawWorldSprite('crumble_4', this.x, this.y);
        }
    };
};


