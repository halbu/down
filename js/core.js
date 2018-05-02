var DOWN = {
    cnv: document.getElementById('myCanvas'),
    ctx: document.getElementById('myCanvas').getContext('2d'),
    collisionTiles: [],
    deathMessagePreroll: 0,
    debug: false,
    depth: 0,
    enemies: [],
    KB: [],
    KP: '',
    mapGrid: [],
    mouse: { x: 0, y: 0 },
    yOffset: 0,
    preroll: 0,
    rowcount: Constants.MapChunkHeight - 1, // TODO: not the most descriptive name
    deltaTime: 0,
    lastFrameTime: 0
};

DOWN.init = function(options) {
    DOWN.cnv.width = Constants.Canvas.Width;
    DOWN.cnv.height = Constants.Canvas.Height;

    DOWN.am = new AssetManager();
    DOWN.am.loadSprites([
        'bg_rock',
        'bg_chain',
        'bg_witheredtree',
        'block_arrow_launcher_l',
        'block_arrow_launcher_r',
        'block_spinner',
        'block',
        'crumble_1',
        'crumble_2',
        'crumble_3',
        'crumble_4',
        'enemy_arrow_l',
        'enemy_arrow_r',
        'enemy_ball',
        'enemy_chain',
        'enemy_switch',
        'player_dead_l',
        'player_dead_r',
        'player_l',
        'player_r',
        'skull_l',
        'skull_r',
        'spikes',
    ]);

    window.onkeydown = function (e) {
        DOWN.KB[e.keyCode] = true;
        DOWN.KP = e.keyCode;
    };

    window.onkeyup = function (e) {
        DOWN.KB[e.keyCode] = false;
    };

    DOWN.addStartArea();

    [1,2,3].forEach(i => { DOWN.addFourNewBlocksFromPresets(); });

    DOWN.player = new player(100, 100);

    DOWN.lastFrame = performance.now();
    window.requestAnimationFrame(DOWN.tick);
};

DOWN.tick = function() {
    DOWN.ctx.fillStyle = Constants.Colors.Darkest;
    DOWN.ctx.fillRect(0, 0, DOWN.cnv.width, DOWN.cnv.height);

    DOWN.mapGrid.forEach(x => x.forEach(y => y.draw()));
    
    DOWN.enemies.forEach(e => { e.act(); });
    DOWN.enemies = DOWN.enemies.filter(e => { return !e.deleteMe; }); // remove enemies that request their own deletion

    DOWN.enemies.forEach(e => {
        e.draw();
        if (DOWN.debug) e.drawDebugRects();
        if (DOWN.player.state === 'ALIVE' && e.isOverlappingPlayer()) {
            e.reactToTouch();
        }
    });

    DOWN.player.act();
    DOWN.player.update();
    DOWN.player.draw();

    DOWN.advanceGameState();

    if (DOWN.yOffset === Constants.BlockSize && DOWN.player.state === 'ALIVE') {
        DOWN.rowcount++;
        DOWN.depth++;
        
        DOWN.updateGrid();

        DOWN.yOffset = 0;
    }

    DOWN.drawOnscreenText();

    DOWN.KP = ''; // reset key pressed this frame

    while (DOWN.deltaTime < Constants.MillisecondsPerFrame) {
        DOWN.deltaTime = performance.now() - DOWN.lastFrameTime;
    }

    DOWN.deltaTime = 0;
    DOWN.lastFrameTime = performance.now();

    window.requestAnimationFrame(DOWN.tick);
};

DOWN.advanceGameState = function() {
    if (DOWN.player.state === 'ALIVE') {
        if (DOWN.preroll > Constants.PauseFramesAtGameStart) {
            DOWN.yOffset++;
        } else {
            DOWN.preroll++;
        }
    } else {
        DOWN.deathMessagePreroll = Math.min(Constants.PauseFramesBeforeDeathMessage, ++DOWN.deathMessagePreroll);
    }
};

DOWN.overlap = function(a, b) {
    return (a.x + a.w > b.x &&
        a.x < b.x + b.w &&
        a.y + a.h > b.y &&
        a.y < b.y + b.h);
};

// Take that Phil Karlton
DOWN.overlapMoreThanJustATinyBitInTheYDirection = function(a, b) {
    return (a.x + a.w > b.x &&
        a.x < b.x + b.w &&
        a.y + a.h + 0.5 > b.y &&
        a.y < b.y + b.h);
};

DOWN.updateGrid = function() {
    DOWN.mapGrid.splice(0, 1); // discard the uppermost row of the map

    // shift everything (tiles, enemies, player) up by the size of one block
    for (var j=0; j!=DOWN.mapGrid.length; ++j) {
        for (var i=0; i!=Constants.PlayArea.Width; ++i) {
            var thing = DOWN.mapGrid[j][i];
            thing.y -= Constants.BlockSize;
        }
    }

    DOWN.player.y -= Constants.BlockSize;
    this.enemies.forEach(e => { e.y -= Constants.BlockSize; });

    // remove enemies that have gone off the top of the play area
    this.enemies = this.enemies.filter(e => { return e.y > -Constants.BlockSize; });

    if (DOWN.rowcount === Constants.MapChunkHeight) {
        DOWN.rowcount = 0;
        DOWN.addFourNewBlocksFromPresets();
    }
};

DOWN.clamp = function(val, lo, hi) {
    return Math.min(hi, Math.max(lo, val));
};

// OK yes this draws the string to the canvas like 25 times but using strokeText() doesn't give as nice a border
DOWN.drawBorderedText = function(str, x, y, opts) {
    var px =        opts.px ? opts.px : 12;
    var centre =    opts.centre ? opts.centre : false;
    var bgColor =   opts.bgColor ? opts.bgColor : Constants.Colors.Darkest;
    var tx =        (centre) ? DOWN.cnv.width/2 : x;
    var step =      Constants.TextBorderPixels;

    if (centre) DOWN.ctx.textAlign = 'center';
    DOWN.ctx.font = '' + px + 'px "Press Start 2P"';

    DOWN.ctx.fillStyle = bgColor;
    for (var i=-step*2; i<=step*2; i+=step) for (var j=-step*2; j<=step*2; j+=step) {
        DOWN.ctx.fillText(str, tx+i, y+j);
    }
    
    DOWN.ctx.fillStyle = Constants.Colors.Lightest;
    DOWN.ctx.fillText(str, tx, y);
    
    if (centre) DOWN.ctx.textAlign = 'start';
};

DOWN.drawWorldSprite = function(str, x, y) {
    DOWN.ctx.drawImage(DOWN.am.getSprite(str), x, y - DOWN.yOffset);
};

DOWN.drawOnscreenText = function() {
    this.drawBorderedText('DEPTH: ' + DOWN.depth + 'ft', 10, 20, {px: 13, bgColor: Constants.Colors.Darkest});
        
    if (DOWN.player.state === 'DEAD' &&
        DOWN.deathMessagePreroll === Constants.PauseFramesBeforeDeathMessage)
    {
        this.drawBorderedText('DEAD', null, Constants.DeathMessageYPosition, {px: 48, centre: true});
        this.drawBorderedText('FROM ' + DOWN.player.causeOfDeath, null, Constants.DeathMessageYPosition + 35, {px: 24, centre: true});
        this.drawBorderedText('F5 TO TRY AGAIN', null, Constants.DeathMessageYPosition + 65, {px: 14, centre: true});
    }

    if (DOWN.debug) {
        this.drawBorderedText('PLAYER X: ' + DOWN.player.x, 425, 20, {});
        this.drawBorderedText('PLAYER Y: ' + DOWN.player.y, 425, 35, {});
        this.drawBorderedText('yOffset: ' + DOWN.yOffset, 425, 50, {});
        this.drawBorderedText('ENEMIES.LENGTH: ' + DOWN.enemies.length, 425, 65, {});
        this.drawBorderedText('MAP HEIGHT: ' + DOWN.mapGrid.length, 425, 80, {});
        this.drawBorderedText('ROWCOUNT: ' + DOWN.rowcount, 425, 95, {});
    }
};

DOWN.getAngle = function(a, b) {
    var ca = { x : a.x + a.w/2, y : a.y + a.h / 2 };
    var cb = { x : b.x + b.w/2, y : b.y + b.h / 2 };
    var dx = ca.x - cb.x;
    var dy = ca.y - cb.y;
    
    return Math.atan2(dy, dx);
};

DOWN.debugRect = function(obj, col) {
    DOWN.ctx.fillStyle = col;
    DOWN.ctx.fillRect(obj.x, obj.y - DOWN.yOffset, obj.w, obj.h);
};