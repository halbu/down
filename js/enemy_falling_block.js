var falling_block = function(x, y) {
    enemy.call(this, x, y);

    this.yv = 0;
    
    this.mySprite = 'block';
    this.killerName = 'BLOCKHEADEDNESS';

    this.act = function() {
        this.moveAndCollide();
    };
    
    this.moveAndCollide = function() {
        this.yv += Constants.Gravity;
        
        // Collide and resolve vertically
        this.y += this.yv;
        this.getMyCollidables();
    
        for (var i=0; i!=4; ++i) {
            var testTile = DOWN.collisionTiles[i];
            if (testTile===undefined || !testTile.c) continue;
            if (DOWN.overlap(this, testTile)) {
                this.deleteMe = true;
                
                var gx = this.getMyGridPosition().x;
                var gy = this.getMyGridPosition().y;

                DOWN.mapgrid[gy][gx] = new block(gx * Constants.BlockSize, gy * Constants.BlockSize, 1);
            }
        }

        this.setFacing();

        this.flashTimer++;
        if (this.flashTimer > this.flashInterval) this.flashTimer = 0;
    };

    this.getMyHitbox = function() {
        return {
            x: this.x + Constants.BlockSize/4,
            y: this.y + 3 * Constants.BlockSize/4,
            w: this.w - Constants.BlockSize/2,
            h: Constants.BlockSize/4
        };
    };
};