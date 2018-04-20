
var arrow_switch = function(x, y) {
    enemy.call(this, x, y);
    
    this.mySprite = 'enemy_switch';
    this.killerName = 'SOME WEIRD BUG??';

    var gx = this.getMyGridPosition().x;
    var gy = this.getMyGridPosition().y;

    var foundSideBlock = false;
    var pos = gx;

    this.sx = null;
    this.direction = (Math.random() > 0.5) ? 'R' : 'L';

    // search to the side to find a normal block to place the arrow launcher on the side of
    while(pos >=0 && pos < Constants.PlayArea.Width && !foundSideBlock) {
        if (DOWN.mapGrid[gy][pos].c === true) {
            if (DOWN.mapGrid[gy][pos].t === 1) {
                foundSideBlock = true;
            } else pos = -1; // give up if there's another block type in the way
        } else pos += (this.direction === 'R') ? 1 : -1;
    }

    // if no legit position for the launcher, don't place the trigger switch
    if (!foundSideBlock) {
        this.deleteMe = true;
        return;
    }

    this.sx = pos + ((this.direction === 'R') ? -1 : 1);

    DOWN.mapGrid[gy][this.sx] =
        new block(this.sx * Constants.BlockSize, gy * Constants.BlockSize,
            (this.direction === 'R') ? Constants.TileTypes.EnemyArrowLauncherL : Constants.TileTypes.EnemyArrowLauncherR);

    this.getMyHitbox = function() {
        return {
            x: this.x + Constants.BlockSize / 4,
            y: this.y + 3 * Constants.BlockSize / 4,
            w: this.w - Constants.BlockSize / 2,
            h: Constants.BlockSize / 4
        };
    };

    this.reactToTouch = function() {
        this.deleteMe = true;

        var gy = this.getMyGridPosition().y;

        // fire an arrow out of the launcher and then delete it
        DOWN.mapGrid[gy][this.sx] = new block(this.sx * Constants.BlockSize, this.gy * Constants.BlockSize, 0);
        DOWN.enemies.push(new arrow(this.sx * Constants.BlockSize, gy * Constants.BlockSize, (this.direction==='R'?'L':'R')));
    };
};