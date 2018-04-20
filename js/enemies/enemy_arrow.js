var arrow = function(x, y, d) {
    enemy.call(this, x, y);

    this.facing = d;
    this.xv = (this.facing === 'R') ? 6.5 : -6.5;
    
    this.killerName = 'ARROW TO KNEE (SORRY)';

    this.act = function() {
        this.moveAndCollide();
    };
    
    this.moveAndCollide = function() {
        // Collide and resolve horizontally
        this.x += this.xv;
        this.getMyCollidables();
    
        for (var i=0; i!=4; ++i) {
            var t = DOWN.collisionTiles[i];
            if (t===undefined || !t.c) continue;
            if (DOWN.overlap(this.getMyHitbox(), t)) {
                this.deleteMe = true;
            }
        }
    };

    this.getMyHitbox = function() {
        return {
            x: this.x + Constants.BlockSize / 8,
            y: this.y + (3 * Constants.BlockSize / 8),
            w: this.w - (3 * Constants.BlockSize / 4),
            h: (3 * Constants.BlockSize / 8)
        };
    };

    this.draw = function() {
        var spriteStr = 'enemy_arrow_' + ((this.facing === 'R') ? 'r' : 'l');

        DOWN.drawWorldSprite(spriteStr, this.x, this.y);
    };
};