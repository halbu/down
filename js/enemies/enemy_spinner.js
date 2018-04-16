var spinner = function(x, y) {
    enemy.call(this, x, y);
    
    this.bx = -1;
    this.by = -1;
    this.bw = 24;
    this.bh = 24;

    this.chainLength = 64 + Math.floor(Math.random()*96);
    
    this.radians = Math.random() * 2;
    this.angularVelocity = Math.random() * 0.02 + 0.015; // TODO: magic numbers

    if (Math.random() < 0.5) this.angularVelocity = -this.angularVelocity;

    this.killerName = 'BEING MACED';

    this.flashInterval = 25;
    this.flashTimer = Math.floor(Math.random() * this.flashInterval);

    this.act = function() {
        this.radians += this.angularVelocity;

        this.bx = this.x + Math.sin(this.radians) * this.chainLength;
        this.by = this.y + Math.cos(this.radians) * this.chainLength;

        this.bx -= Constants.BlockSize/2;
        this.by -= Constants.BlockSize/2;

        this.flashTimer++;
        if (this.flashTimer > this.flashInterval) this.flashTimer = 0;
    };
    
    this.getMyHitbox = function() {
        return { x: this.bx + 1, y: this.by + 1, w: this.bw - 2, h: this.bh - 2 };
    };

    this.draw = function() {
        var chainLinks = 5;
        var chainWidth = 12;
        for (var i=0; i<chainLinks; ++i) {
            var spriteCentreX = this.x + Math.sin(this.radians) * ((this.chainLength / chainLinks)*i);
            var spriteCentreY = this.y + Math.cos(this.radians) * ((this.chainLength / chainLinks)*i);
            
            DOWN.drawWorldSprite('enemy_chain', spriteCentreX-chainWidth/2, spriteCentreY-chainWidth/2);
        }
        
        if (this.flashTimer > this.flashInterval - 4) return;

        DOWN.drawWorldSprite('enemy_ball', this.bx, this.by);
    };
};