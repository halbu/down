
var falling_block_switch = function(x, y) {
    enemy.call(this, x, y);
    
    this.mySprite = 'enemy_switch';
    this.killerName = 'SOME WEIRD BUG??';

    var gx = this.getMyGridPosition().x;
    var gy = this.getMyGridPosition().y;

    var foundFallBlock = false;
    var pos = gy - 3;

    while(pos > 0 && Math.abs(gy - pos) < 8 && !foundFallBlock) {
        if (DOWN.mapGrid[pos][gx].t === 1) {
            foundFallBlock = true;
        } else pos--;
    }

    if (!foundFallBlock) {
        this.deleteMe = true;
        return;
    }

    for (var i=gy; i!=pos; --i) {
        DOWN.mapGrid[i][gx] = new block(gx * Constants.BlockSize, i * Constants.BlockSize, Constants.TileTypes.BGChain);
    }

    var yOffset = gy - pos;

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
        var trapYPos = gy - yOffset;

        // erase the switch
        this.deleteMe = true;

        // erase the background chain between switch and block, and the static block itself
        for (var y = gy; y >= trapYPos; --y) {
            DOWN.mapGrid[y][gx] = new block(gx * Constants.BlockSize, y * Constants.BlockSize, 0);
        }

        // add new active, falling block
        DOWN.enemies.push(new falling_block(gx * Constants.BlockSize, trapYPos * Constants.BlockSize));
    };
};