
var falling_block_switch = function(x, y) {
    enemy.call(this, x, y);
    
    this.mySprite = 'enemy_switch';
    this.killerName = 'SOME WEIRD BUG??';

    this.getMyHitbox = function() {
        return {
            x: this.x + Constants.BlockSize / 4,
            y: this.y + 3 * Constants.BlockSize / 4,
            w: this.w - Constants.BlockSize / 2,
            h: Constants.BlockSize / 4
        };
    };

    this.reactToTouch = function() {
        var gx = this.getMyGridPosition().x;
        var gy = this.getMyGridPosition().y;

        var foundTrapBlock = false;
        var pos = gy;

        while(pos >=0 && !foundTrapBlock) {
            if (DOWN.mapGrid[pos][gx].t === 1) {
                foundTrapBlock = true;
            } else pos--;
        }

        if (!foundTrapBlock) return;

        this.deleteMe = true;

        for (var y = gy; y >= pos; --y) {
            DOWN.mapGrid[y][gx] = new block(gx * Constants.BlockSize, y * Constants.BlockSize, 0);
        }

        DOWN.enemies.push(new falling_block(gx * Constants.BlockSize, pos * Constants.BlockSize));
    };
};