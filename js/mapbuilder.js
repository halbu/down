
DOWN.getChunk = function() {
    var chunk = maps[Math.floor(Math.random() * maps.length)];

    if (Math.random() < 0.5) chunk.forEach(c => c.reverse());

    return chunk;
};

DOWN.addStartArea = function() {
    DOWN.arrayToWorldObjects(startArea, 0);
};

DOWN.addFourNewBlocksFromPresets = function() {
    
    var newRows = [DOWN.PLAYAREA_X];

    for (var j=0; j!=8; ++j) {
        newRows[j] = [];
        for (var i=0; i!=DOWN.PLAYAREA_X; ++i) {
            newRows[j][i] = -1;
        }
    }

    for (var chunk = 0; chunk != 4; ++chunk) {
        var xOffset = chunk * 7;
        var randomChunk = DOWN.getChunk();
    
        for (var i=0; i!=8; ++i) for (var j=0; j!=8; ++j) {
            if (newRows[j][i + xOffset] !== 0) { // Don't overwrite open space with walls
                newRows[j][i + xOffset] = randomChunk[j][i];
            }
            if ((i + xOffset)===0 || (i + xOffset)===DOWN.PLAYAREA_X-1) newRows[j][i + xOffset] = 1; // Ensure edges always solid
        }
    }

    DOWN.arrayToWorldObjects(newRows, DOWN.mapgrid.length);
};

// Convert 2d array of ints to appropriately positioned block and enemy objects
DOWN.arrayToWorldObjects = function(arr, yOffset) {

    // add arr.length new arrays to the tile map
    for (var j=0; j!=arr.length; ++j) {
        DOWN.mapgrid[j + yOffset] = [];
    }

    // add appropriate blocks to the mapgrid and enemies to the enemy array
    for (var i=0; i!=DOWN.PLAYAREA_X; ++i) {
        for (var j=0; j!=arr.length; ++j) {

            var gy = j+yOffset;
            var gx = i;

            var x = gx * Constants.BlockSize;
            var y = gy * Constants.BlockSize;

            var blockType = arr[j][i];

            // Block types
            if (blockType <= 5) { // this is a bit clumsy
                DOWN.mapgrid[gy][gx] = new block(x, y, blockType);
            } else if (blockType === Constants.TileTypes.CrumbleBlock) {
                DOWN.mapgrid[gy][gx] = new crumble_block(x, y, blockType);
            }

            // Enemy types
            if (blockType === Constants.TileTypes.EnemySkull) {
                this.enemies.push(new skull(x, y));
            } else if (blockType === Constants.TileTypes.EnemySpikes) {
                this.enemies.push(new spike(x, y));
            } else if (blockType === Constants.TileTypes.BlockSpinner) {
                DOWN.mapgrid[gy][gx] = new spinner_block(x, y, blockType);
            } else if (blockType === Constants.TileTypes.EnemyFallingBlockTrapSwitch) {
                DOWN.createFallingBlockTrap(gx, gy);
            }
        }
    }
};

DOWN.createFallingBlockTrap = function(gx, gy) {
    
    DOWN.mapgrid[gy][gx] = new block(gx * Constants.BlockSize, gy * Constants.BlockSize, 0);

    var found = false;
    var pos = gy - 3;

    while(pos > 0 && Math.abs(gy - pos) < 8 && !found) {
        if (DOWN.mapgrid[pos][gx].t === 1) {
            found = true;
        } else pos--;
    }

    if (!found) return;

    DOWN.enemies.push(new falling_block_switch(gx * Constants.BlockSize, gy * Constants.BlockSize));

    for (var i=gy; i!=pos; --i) {
        DOWN.mapgrid[i][gx] = new block(gx * Constants.BlockSize, i * Constants.BlockSize, Constants.TileTypes.BGChain);
    }
};