var skull = function(x, y) {
    enemy.call(this, x, y);
    
    this.killerName = 'THE HEEBIE-JEEBIES';

    this.facing = 'R';
    this.xv = 1;
    this.flashInterval = 25;
    this.flashTimer = Math.floor(Math.random() * this.flashInterval);

    this.act = function() {
        this.moveAndCollide();
    };
    
    this.getMyHitbox = function() {
        return { x: this.x + 1, y: this.y + 1, w: this.w - 2, h: this.h - 2 };
    };

    this.moveAndCollide = function() {
        // Collide and resolve horizontally
        this.x += this.xv;
        this.getMyCollidables();
    
        for (var i=0; i!=4; ++i) {
            var t = DOWN.collisionTiles[i];
            if (t===undefined || !t.c) continue;
            if (DOWN.overlap(this, t)) {
                this.x =  (this.xv < 0) ? t.rightEdge() + 0.01 : t.leftEdge() - this.w - 0.01;
                this.xv = -this.xv;
            }
        }

        this.setFacing();

        this.flashTimer++;
        if (this.flashTimer > this.flashInterval) this.flashTimer = 0;
    };

    this.draw = function() {
        if (this.flashTimer > this.flashInterval - 4) return;

        var spriteStr = 'skull_' + ((this.facing==='R') ? 'r' : 'l');

        DOWN.drawWorldSprite(spriteStr, this.x, this.y);
    };
};